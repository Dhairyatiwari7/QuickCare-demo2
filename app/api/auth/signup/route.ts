import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

interface RequestBody {
  username: string;
  password: string;
  role: string;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { username, password, role }: RequestBody = await request.json();

    if (!username || !password || !role) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    const uri =
      "mongodb+srv://quickcare:quickcare@cluster0.qpo69.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // REPLACE THIS!
    const client = new MongoClient(uri);

    await client.connect();
    const db = client.db();

    const existingUser = await db.collection("User").findOne({ username });

    if (existingUser) {
      await client.close();
      return NextResponse.json({ message: "User exists already!" }, { status: 409 });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection("User").insertOne({
      username,
      password: hashedPassword,
      role, // Store the role
    });

    await client.close();
    return NextResponse.json({ 
      message: "Created user!", 
      user: { username, role } // Returning role as well
    }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error creating user!" }, { status: 500 });
  }
}
