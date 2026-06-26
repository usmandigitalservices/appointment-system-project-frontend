import connectDB from "@/lib/db";
import Appointment from "@/models/Appointment";

export async function POST(request) {
  try {
    await connectDB();

    const { customer_name, date, time, day } = await request.json();

    if (!customer_name || !date || !time || !day) {
      return Response.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const newAppointment = new Appointment({ customer_name, date, time, day });
    await newAppointment.save();

    return Response.json(
      { success: true, message: "Appointment Created", data: newAppointment },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
