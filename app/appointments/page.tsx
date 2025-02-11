"use client"

import { useEffect, useState } from "react"
import { gsap } from "gsap"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "../contexts/AuthContext"

type User = {
  id: string
  email: string
  username: string
  role: "patient" | "doctor"
}

type Doctor = {
  _id: string
  name: string
  speciality: string
}

type Appointment = {
  _id: string
  doctorId: string
  userId: string
  date: string
  time: string
  status: "pending" | "confirmed" | "cancelled"
  doctor?: Doctor
  user?: User
}

export default function AppointmentsPage() {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return

    async function fetchAppointments() {
      setLoading(true)
      setError(null)
      try {
        if (!user) return
        const response = await fetch(`/api/appointments${user.role === "doctor" ? "/doctor" : ""}?userId=${user.id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch appointments")
        }
        const data = await response.json()
        setAppointments(data.appointments || [])
      } catch (error) {
        console.error("Error fetching appointments:", error)
        setError("Failed to load appointments. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [user])

  useEffect(() => {
    if (appointments.length > 0) {
      gsap.from(".appointment-card", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      })
    }
  }, [appointments])

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <p>Please log in to view your appointments</p>
        <Button className="mt-4" asChild>
          <Link href="/login">Login</Link>
        </Button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <p>Loading appointments...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
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
                  {user.role === "doctor"
                    ? `Patient: ${appointment.user?.username || "Unknown Patient"}`
                    : `Doctor: ${appointment.doctor?.name || "Unknown Doctor"}`}
                </CardTitle>
                <CardDescription>
                  {appointment.doctor?.speciality && `Speciality: ${appointment.doctor.speciality}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
                  <p>Time: {appointment.time}</p>
                  <p className="capitalize">Status: <span 
                    className={`inline-block px-2 py-1 rounded-full text-sm ${
                      appointment.status === "confirmed" ? "bg-green-100 text-green-800" :
                      appointment.status === "cancelled" ? "bg-red-100 text-red-800" :
                      "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {appointment.status}
                  </span></p>
                </div>
              </CardContent>
            </Card>
          ))}
          <div className="mt-8 text-center">
            <Button asChild>
              <Link href="/appointment">Book New Appointment</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}