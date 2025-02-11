import mongoose, { Schema, Document } from "mongoose";

export interface IAppointment extends Document {
  doctorId: string;
  userId: string;
  username: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled";
}

const AppointmentSchema = new Schema<IAppointment>({
  doctorId: { type: String, required: true },
  userId: { type: String, required: true },
  username: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
});

export default mongoose.models.Appointment || mongoose.model<IAppointment>("Appointment", AppointmentSchema);
