import { NextResponse } from "next/server";
import connectDB from "../../lib/cdb";
import Contact from "../../models/contact";

export async function POST(req: Request) {
  try {
    await connectDB(); // Ensure database connection
    const body = await req.json();
    
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const newMessage = new Contact(body);
    await newMessage.save();

    return NextResponse.json({ success: true, message: "Thanks for your response!" }, { status: 201 });
  } catch (error) {
    console.error("❌ Error saving message:", error);
    return NextResponse.json({ success: false, message: "Failed to submit message" }, { status: 500 });
  }
}
