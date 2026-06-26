"use client";

import { useState } from "react";
import API from "@/lib/api";

export default function Home() {
  const [form, setForm] = useState({
    customer_name: "",
    date: "",
    time: "",
    day: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!form.customer_name || !form.date || !form.time || !form.day) {
      setMessage("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("appointments/create", form);
      setMessage("Appointment Created Successfully!");
      setForm({ customer_name: "", date: "", time: "", day: "" });
      console.log(res.data);
    } catch (error: any) {
      console.log(error);
      const msg =
        error.response?.data?.message || error.message || "Something went wrong";
      setMessage(`Error: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">Book Appointment</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input
          name="customer_name"
          placeholder="Name"
          value={form.customer_name}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          name="time"
          placeholder="Time"
          value={form.time}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          name="day"
          placeholder="Day"
          value={form.day}
          onChange={handleChange}
          className="border p-2"
        />

        {message && (
          <p className={message.startsWith("Error") ? "text-red-500" : "text-green-500"}>
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}