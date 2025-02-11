import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  speciality: {
    type: String,
    required: true
  },
  fees: {
    type: Number,
    required: true
  },
  availability: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

export default mongoose.models.doctors || mongoose.model('doctors', DoctorSchema);
