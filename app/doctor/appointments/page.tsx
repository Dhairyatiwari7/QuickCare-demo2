"use client"

import { useEffect, useState } from "react"
import { gsap } from "gsap"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Appointment = {
  id: number
  patientName: string
  date: string
  time: string
}

const dummyAppointments: Appointment[] = [
  { id: 1, patientName: "Alice Johnson", date: "2023-06-15", time: "10:00 AM" },
  { id: 2, patientName: "Bob Smith", date: "2023-06-15", time: "11:30 AM" },
  { id: 3, patientName: "Charlie Brown", date: "2023-06-16", time: "2:00 PM" },
  // Add more dummy appointments as needed
]

export default function DoctorAppointmentsPage() {
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
      <h1 className="text-3xl font-bold text-center mb-8">Your Appointments</h1>
      <div className="grid gap-6">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="appointment-card">
            <CardHeader>
              <CardTitle>{appointment.patientName}</CardTitle>
              <CardDescription>Appointment ID: {appointment.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Date: {appointment.date}</p>
              <p>Time: {appointment.time}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

