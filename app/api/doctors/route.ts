import clientPromise from '../../lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, Db, Collection } from 'mongodb';

interface Doctor {
  _id: string;
  id: number;
  name: string;
  username: string;
  speciality: string;
  fees: number;
  availability: string;
  rating: number;
  image: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method !== 'GET') {
      res.status(405).json({ message: 'Method not allowed' });
      return;
    }
  
    try {
      const client: MongoClient = await clientPromise;
      const db: Db = client.db("test");
      
      const collection: Collection<Doctor> = db.collection("doctors");
      const doctors: Doctor[] = await collection.find({}).toArray();
      
      res.status(200).json(doctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
}
  

