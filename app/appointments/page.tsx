"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";

type User = {
  _id: string;
  username: string;
  role: "user" | "doctor";
} | null;

type Doctor = {
  _id: string;
  name: string;
  speciality: string;
};

type Appointment = {
  _id: string;
  doctorId: string;
  userId: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled";
  doctor?: Doctor;
};

export default function AppointmentsPage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !user._id) return;

    async function fetchAppointments() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/appointment?userId=${user._id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        const data = await response.json();

        console.log("Fetched Appointments:", data);

        if (!Array.isArray(data.appointments)) {
          throw new Error("Invalid data format: Expected an array");
        }

        setAppointments(data.appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError("Failed to load appointments. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchAppointments();

    gsap.from(".appointment-card", {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
    });
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <p>Please log in to view your appointments</p>
        <Button className="mt-4" asChild>
          <Link href="/login">Login</Link>
        </Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <p>Loading appointments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">My Appointments</h1>
      {appointments.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500 mb-8">No appointments found.</p>
          <Button asChild>
            <Link href="/appointment">Book New Appointment</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {appointments.map((appointment) => (
            <Card key={appointment._id} className="appointment-card">
              <CardHeader>
                <CardTitle>Doctor: {appointment.doctor?.name || "Unknown Doctor"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Speciality: {appointment.doctor?.speciality || "Not available"}</p>
                <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
                <p>Time: {appointment.time}</p>
                <p>Status: {appointment.status}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
