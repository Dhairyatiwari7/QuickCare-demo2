import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const client = await clientPromise;
        const db = client.db("test");

        if (req.method === "GET") {
            const { userId } = req.query;
            if (!userId) {
                return res.status(400).json({ error: "User ID is required" });
            }
            const appointments = await db.collection("appointments").find({ userId }).toArray();
            return res.status(200).json({ appointments });
        } 
        
        else if (req.method === "POST") {
            const { doctorId, userId, date, time, status } = req.body;
            if (!doctorId || !userId || !date || !time) {
                return res.status(400).json({ error: "Missing required fields" });
            }
            const result = await db.collection("appointments").insertOne({ doctorId, userId, date, time, status: status || "pending" });
            return res.status(201).json({ message: "Appointment created", appointmentId: result.insertedId });
        } 
        
        else {
            res.setHeader("Allow", ["GET", "POST"]);
            return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
