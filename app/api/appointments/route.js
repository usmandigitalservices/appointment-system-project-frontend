import connectDB from "@/lib/db";
import Appointment from "@/models/Appointment";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let filter = {};
    if (status) filter.status = status;

    const appointments = await Appointment.find(filter).sort({ createdAt: -1 });

    return Response.json({
      success: true,
      results: appointments.length,
      data: appointments,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
