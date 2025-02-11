import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import clientPromise from "../../../lib/db";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { username, password } = await request.json();
    if (!username || !password) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("test"); // Ensure the correct database name
    const user = await db.collection("User").findOne({ username: username.toLowerCase() });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json(
      { message: "Login successful", user: { username: user.username, role: user.role } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }
}
