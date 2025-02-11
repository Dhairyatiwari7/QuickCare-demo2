import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../lib/db";
import { ObjectId } from "mongodb";

type Appointment = {
  _id?: ObjectId;  
  doctorId: ObjectId;
  userId: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled";
  doctor?: {
    _id: string;
    name: string;
    speciality: string;
  };
};


/**
 * GET /api/appointment
 * Fetch all appointments for the given user id.
 * @param {NextRequest} req
 * @returns {Promise<NextResponse>}
 */export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const appointmentsCollection = db.collection<Appointment>("Appointment");

    const { searchParams } = new URL(req.url);
    const userId = 'abc1234';

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const appointments = await appointmentsCollection
      .aggregate([
        {
          $match: { userId: userId }
        },
        {
          $lookup: {
            from: "doctors",
            localField: "doctorId",
            foreignField: "_id",
            as: "doctorInfo"
          }
        },
        {
          $unwind: {
            path: "$doctorInfo",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $project: {
            _id: { $toString: "$_id" },
            doctorId: { $toString: "$doctorId" },
            userId: 1,
            date: 1,
            time: 1,
            status: 1,
            doctor: {
              _id: { $toString: "$doctorInfo._id" },
              name: "$doctorInfo.name",
              speciality: "$doctorInfo.speciality"
            }
          }
        }
      ])
      .toArray();

    console.log("API Processed Response:", JSON.stringify({ appointments }, null, 2));

    return NextResponse.json({ appointments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    // const userId = req.cookies.userId;
    // if (!userId) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
    // const doctorId = db.collection("doctors").findOne({ _id: new ObjectId(req.body.doctorId) });
    const appointmentsCollection = db.collection<Appointment>("Appointment");

    const { doctorId,userId, date, time, status } = await req.json();

    // console.log("Received appointment data:", { doctorId, userId, date, time, status }); // Updated logging

    if ( !date || !time ) {
      console.error("Missing required fields:", { doctorId, userId, date, time, status }); // Updated logging
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newAppointment = {
      doctorId: doctorId,
      userId   : 'abc1234',
      date,
      time,
      status
    };

    const result = await appointmentsCollection.insertOne(newAppointment);

    return NextResponse.json({ 
      success: true, 
      appointmentId: result.insertedId.toString() 
    }, { status: 201 });
  } catch (error) {
    console.error("Error booking appointment:", error);
    return NextResponse.json(
      { error: "Failed to book appointment", details: error.message },
      { status: 500 }
    );
  }
}

