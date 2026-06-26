import connectDB from "@/lib/db";
import Appointment from "@/models/Appointment";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return Response.json(
        { success: false, message: "Appointment not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: appointment });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const { customer_name, date, time, day } = await request.json();

    const updated = await Appointment.findByIdAndUpdate(
      id,
      { customer_name, date, time, day },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return Response.json(
        { success: false, message: "Appointment not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Appointment Updated",
      data: updated,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const deleted = await Appointment.findByIdAndDelete(id);

    if (!deleted) {
      return Response.json(
        { success: false, message: "Appointment not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, message: "Appointment Deleted" });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
