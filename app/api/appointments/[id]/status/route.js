import connectDB from "@/lib/db";
import Appointment from "@/models/Appointment";

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const { status } = await request.json();

    if (!["accepted", "rejected"].includes(status)) {
      return Response.json(
        { success: false, message: "Status must be 'accepted' or 'rejected'" },
        { status: 400 }
      );
    }

    const updated = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return Response.json(
        { success: false, message: "Appointment not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: `Appointment ${status}`,
      data: updated,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
