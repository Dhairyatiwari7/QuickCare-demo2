"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
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
  const { user  } = useAuth();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user === null ) return; 
    console.log("User is logged in:", user);

    if (!user) {
      setError("You must be logged in to view your appointments.");
      setLoading(false);
      return;
    }


    const fetchAppointments = async () => {
      try {
        const response = await fetch(/api/appointments/user/${user.username});
        if (!response.ok) {
          throw new Error(HTTP error! status: ${response.status});
        }
        const data = await response.json();
        console.log("Fetched appointments:", data);

        if (Array.isArray(data) && data.every(isValidAppointment)) {
          setAppointments(data);
        } else {
          throw new Error("Invalid appointment data received");
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError("Failed to load appointments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);

  if (loading) {
    return <div className="text-center py-12">Loading appointments...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-8">My Appointments</h1>
      {appointments.length > 0 ? (
        <div className="grid gap-6">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="appointment-card">
              <CardHeader className="flex flex-row items-center gap-4">
                <Image
                  src={appointment.doctor.image}
                  alt={appointment.doctor.name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
                <div>
                  <CardTitle>{appointment.doctor.name}</CardTitle>
                  <CardDescription>{appointment.doctor.speciality}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
                <p>Time: {appointment.time}</p>
                <p className="capitalize">Status: {appointment.status}</p>
                <p>Fees: ₹{appointment.doctor.fees}</p>
                <p>Doctor's Availability: {appointment.doctor.availability}</p>
                <p>Rating: {appointment.doctor.rating}/5</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-xl mb-4">No appointments found</p>
          <p className="text-gray-600 mb-8">Book a new appointment to get started</p>
        </div>
      )}
      <div className="mt-8 text-center">
        <Button asChild>
          <Link href="/appointment">Book New Appointment</Link>
        </Button>
      </div>
    </div>
  )
}
