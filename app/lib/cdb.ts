import mongoose from "mongoose";

const MONGODB_URI ="mongodb+srv://quickcare:quickcare@cluster0.qpo69.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return; 

  try {
    await mongoose.connect(MONGODB_URI, { dbName: "test" });
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
  }
};

export default connectDB;
