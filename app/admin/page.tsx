"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";

export default function Admin() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchData = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await API.get("/appointments");
            setAppointments(res.data.data || []);
        } catch (err: any) {
            console.log(err);
            setError("Failed to load appointments");
            setAppointments([]);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, status: string) => {
        try {
            await API.patch(`/appointments/${id}/status`, { status });
            fetchData();
        } catch (err: any) {
            console.log(err);
            const msg = err.response?.data?.message || "Failed to update status";
            alert(`Error: ${msg}`);
        }
    };

    const deleteAppointment = async (id: string) => {
        if (!confirm("Delete this appointment?")) return;
        try {
            await API.delete(`/appointments/${id}`);
            fetchData();
        } catch (err: any) {
            console.log(err);
            const msg = err.response?.data?.message || "Failed to delete";
            alert(`Error: ${msg}`);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <div className="p-10">Loading...</div>;
    if (error) return <div className="p-10 text-red-500">{error} <button onClick={fetchData} className="underline ml-2">Retry</button></div>;

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-5">Admin Panel</h1>

            {appointments.length === 0 && <p>No appointments yet.</p>}

            {appointments.map((item: any) => (
                <div
                    key={item._id}
                    className="border p-4 mb-3 flex justify-between items-center"
                >
                    <div>
                        <p><b>{item.customer_name}</b></p>
                        <p>{item.date} - {item.time} ({item.day})</p>
                        <p>Status: {item.status}</p>
                    </div>

                    <div className="flex gap-2">
                        {item.status !== "accepted" && (
                            <button
                                onClick={() => updateStatus(item._id, "accepted")}
                                className="bg-green-500 text-white px-3 py-1 rounded"
                            >
                                Accept
                            </button>
                        )}
                        {item.status !== "rejected" && (
                            <button
                                onClick={() => updateStatus(item._id, "rejected")}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                                Reject
                            </button>
                        )}
                        <button
                            onClick={() => deleteAppointment(item._id)}
                            className="bg-gray-500 text-white px-3 py-1 rounded"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}