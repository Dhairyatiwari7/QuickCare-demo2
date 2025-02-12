"use client"

import { useEffect, useState } from "react"
import Image from 'next/image'
import { gsap } from "gsap"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "../contexts/AuthContext" 

type Doctor = {
  _id: string
  id: number
  name: string
  username: string
  speciality: string
  fees: number
  availability: string
  rating: number
  image: string
}

type Appointment = {
  id: string
  doctor: Doctor
  userId: string
  date: string
  time: string
  status: "upcoming" | "completed" | "cancelled"
}

export default function AppointmentsPage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`/api/appointments/user/${user?._id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
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
    if (!user===null) {
      setLoading(false);
      setError("You must be logged in to view your appointments.");
    } else {
      fetchAppointments();

     
    }
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
                  src={appointment.doctor.image || '/placeholder-avatar.jpg'} // Added fallback
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
                <div className="space-y-2">
                  <p><span className="font-medium">Date:</span> {new Date(appointment.date).toLocaleDateString()}</p>
                  <p><span className="font-medium">Time:</span> {appointment.time}</p>
                  <p><span className="font-medium">Status:</span> <span className="capitalize">{appointment.status}</span></p>
                  <p><span className="font-medium">Fees:</span> ₹{appointment.doctor.fees}</p>
                  <p><span className="font-medium">Doctor's Availability:</span> {appointment.doctor.availability}</p>
                  <p><span className="font-medium">Rating:</span> {appointment.doctor.rating}/5</p>
                </div>
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
  );
}

function isValidAppointment(appointment: any): appointment is Appointment {
  return (
    typeof appointment.id === 'string' &&
    typeof appointment.date === 'string' &&
    typeof appointment.time === 'string' &&
    ['upcoming', 'completed', 'cancelled'].includes(appointment.status) &&
    isValidDoctor(appointment.doctor)
  )
}

function isValidDoctor(doctor: any): doctor is Doctor {
  return (
    typeof doctor._id === 'string' &&
    typeof doctor.id === 'number' &&
    typeof doctor.name === 'string' &&
    typeof doctor.username === 'string' &&
    typeof doctor.speciality === 'string' &&
    typeof doctor.fees === 'number' &&
    typeof doctor.availability === 'string' &&
    typeof doctor.rating === 'number' &&
    typeof doctor.image === 'string'
  )
}