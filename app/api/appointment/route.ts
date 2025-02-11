import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../lib/db";
import { ObjectId } from "mongodb"; // Import ObjectId

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const collection = db.collection("appointments");

    // Extract userId from query parameters
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    // Convert userId to ObjectId if stored as ObjectId in MongoDB
    const query = ObjectId.isValid(userId) ? { userId: new ObjectId(userId) } : { userId };

    // Fetch appointments
    const appointments = await collection.find(query).toArray();
    console.log("API Raw Response:", JSON.stringify({ appointments }, null, 2));

    console.log("Fetched appointments:", appointments); // Debugging
    
    return NextResponse.json({ appointments: Array.isArray(appointments) ? appointments : [] }, { status: 200 });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
  }
}
