import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    subject: String,
    message: String,
    department: String,
    preferredDate: String,
    urgency: String,
    symptoms: String,
  },
  { timestamps: true }
);

const Contact = mongoose.models.contact || mongoose.model("contact", ContactSchema);
export default Contact;
