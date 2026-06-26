import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    customer_name: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    day: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);
