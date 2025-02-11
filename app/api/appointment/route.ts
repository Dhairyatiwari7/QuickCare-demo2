import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../lib/db"; // Ensure this is the correct path to your database connection

export async function GET(req: NextRequest) {
  try {
    // Get MongoDB connection
    const client = await clientPromise;
    const db = client.db("test"); // Ensure this matches your database name
    const collection = db.collection("appointments");

    // Extract userId from query parameters
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    // Fetch appointments for the user
    const appointments = await collection.find({ userId }).toArray();

    return NextResponse.json({ appointments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}
