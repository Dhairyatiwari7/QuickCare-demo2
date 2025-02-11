"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { gsap } from "gsap"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const patientDetails = {
  1: {
    name: "Alice Johnson",
    age: 35,
    condition: "Chronic Migraine",
    symptoms: ["Severe headaches", "Sensitivity to light", "Nausea"],
    history:
      "Patient has been experiencing migraines for the past 5 years, with increasing frequency in recent months.",
    medications: ["Sumatriptan", "Propranolol"],
    lastVisit: "2024-01-15",
    notes:
      "Patient reports stress as a major trigger. Recommended lifestyle modifications and stress management techniques.",
  },
  // Add more patient details...
}

export default function PatientDetailPage() {
  const { id } = useParams()
  const patient = patientDetails[id as keyof typeof patientDetails]

  useEffect(() => {
    gsap.from(".detail-card", {
      opacity: 0,
      y: 50,
      rotationX: 45,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    })
  }, [])

  if (!patient) return <div>Patient not found</div>

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 font-montserrat">Patient Details</h1>
      <div className="grid gap-6">
        <Card className="detail-card">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Name:</p>
                <p>{patient.name}</p>
              </div>
              <div>
                <p className="font-semibold">Age:</p>
                <p>{patient.age}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="detail-card">
          <CardHeader>
            <CardTitle>Medical Condition</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">Current Condition:</p>
            <p>{patient.condition}</p>
            <p className="font-semibold mt-4">Symptoms:</p>
            <ul className="list-disc list-inside">
              {patient.symptoms.map((symptom, index) => (
                <li key={index}>{symptom}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="detail-card">
          <CardHeader>
            <CardTitle>Medical History</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{patient.history}</p>
          </CardContent>
        </Card>

        <Card className="detail-card">
          <CardHeader>
            <CardTitle>Current Medications</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              {patient.medications.map((medication, index) => (
                <li key={index}>{medication}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="detail-card">
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{patient.notes}</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

