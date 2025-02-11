"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import doctor from "../models/doctor";

type AuthUser = {
  _id: string;
  username: string;
  role: "user" | "doctor";
};

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
  const { user } = useAuth() as { user: AuthUser | null };
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    const id='67a8784463abd080a76198ca';
    // if (!user || !user._id) {
    //   setLoading(false);
    //   return;
    // }

    setLoading(true);
    setError(null);
    console.log(id);
    try {
      const response = await fetch(`/api/appointment?userId=${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }
      
      const data = await response.json();
      
      if (!data || !Array.isArray(data.appointments)) {
        throw new Error("Invalid response format");
      }

      // Sort appointments by date, most recent first
      const sortedAppointments = data.appointments.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      setAppointments(sortedAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setError(error instanceof Error ? error.message : "Failed to load appointments");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  useEffect(() => {
    const handleAppointmentBooked = () => {
      fetchAppointments();
    };

    window.addEventListener('appointmentBooked', handleAppointmentBooked);

    return () => {
      window.removeEventListener('appointmentBooked', handleAppointmentBooked);
    };
  }, [fetchAppointments]);

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
        <Button onClick={fetchAppointments} className="mt-4">
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
                <CardTitle>
                  Doctor: {appointment.doctor?.name || "Unknown Doctor"}
                </CardTitle>
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
