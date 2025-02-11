"use client"

import { useEffect, useState } from "react"
import { gsap } from "gsap"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Appointment = {
  id: number
  doctorName: string
  date: string
  time: string
  status: "upcoming" | "completed" | "cancelled"
}

const dummyAppointments: Appointment[] = [
  { id: 1, doctorName: "Dr. John Doe", date: "2023-06-15", time: "10:00 AM", status: "upcoming" },
  { id: 2, doctorName: "Dr. Jane Smith", date: "2023-06-10", time: "2:00 PM", status: "completed" },
  { id: 3, doctorName: "Dr. Mike Johnson", date: "2023-06-20", time: "11:30 AM", status: "upcoming" },
  { id: 4, doctorName: "Dr. Sarah Lee", date: "2023-06-05", time: "3:30 PM", status: "cancelled" },
]

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(dummyAppointments)

  useEffect(() => {
    gsap.from(".appointment-card", {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
    })
  }, [])

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-8">My Appointments</h1>
      <div className="grid gap-6">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="appointment-card">
            <CardHeader>
              <CardTitle>{appointment.doctorName}</CardTitle>
              <CardDescription>Appointment ID: {appointment.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Date: {appointment.date}</p>
              <p>Time: {appointment.time}</p>
              <p className="capitalize">Status: {appointment.status}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button asChild>
          <Link href="/appointment">Book New Appointment</Link>
        </Button>
      </div>
    </div>
  )
}

