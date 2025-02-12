import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/db";

export async function GET(request: Request, { params }: { params: { userid: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db("test");

    const userid = params.userid;
    
    const appointments = await db.collection("Appointment").find({ userId: params.userid }).toArray();
    console.log("params.userid:", params.userid);
    return NextResponse.json(appointments, { status: 200 });
  } catch (error) {
    console.error("Error fetching user appointments:", error);
    return NextResponse.json({ message: "Failed to fetch appointments" }, { status: 500 });
  }
}