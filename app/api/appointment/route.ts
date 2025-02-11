import { NextResponse } from "next/server";
import clientPromise from "../../lib/db"; // ✅ Ensure correct import

export async function GET() {
  try {
    console.log("🔹 Connecting to MongoDB...");
    const client = await clientPromise;
    const db = client.db("test"); // ✅ Ensure database name is correct
    const appointments = await db.collection("appointments").find().toArray();

    return NextResponse.json({ appointments });
  } catch (error) {
    console.error("❌ Error fetching appointments:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
