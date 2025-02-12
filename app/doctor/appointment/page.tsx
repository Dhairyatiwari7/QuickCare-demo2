"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { gsap } from "gsap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PatientDetailPage() {
  const { id } = useParams();
  interface Patient {
    name: string;
    age: number;
    condition: string;
    symptoms: string[];
    history: string;
    medications: string[];
    notes: string;
    lastVisit: string;
  }

  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    // Fetch patient details from API
    const fetchPatientDetails = async () => {
      try {
        const res = await fetch(`/api/patient/${id}`);
        if (!res.ok) throw new Error("Failed to fetch patient details");
        const data = await res.json();
        setPatient(data);
      } catch (err) {
        setError("Patient not found");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [id]);

  useEffect(() => {
    if (!patient) return;
    gsap.from(".detail-card", {
      opacity: 0,
      y: 50,
      rotationX: 45,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, [patient]);

  // if (loading) return <div>Loading patient details...</div>;
  // if (error) return <div className="text-red-500">{error}</div>;
  // if (!patient) return <div>No patient data available</div>;

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
                <p>abc123</p>
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
            <p>ok</p>
            <p className="font-semibold mt-4">Symptoms:</p>
            <ul className="list-disc list-inside">
              {/* {patient.symptoms.map((symptom: string, index: number) => (
                <li key={index}>{symptom}</li>
              ))} */}
              <li>cold</li>
            </ul>
          </CardContent>
        </Card>

        {/* <Card className="detail-card">
          <CardHeader>
            <CardTitle>Medical History</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{patient.history}</p>
          </CardContent>
        </Card> */}

        {/* <Card className="detail-card">
          <CardHeader>
            <CardTitle>Current Medications</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              {patient.medications.map((medication: string, index: number) => (
                <li key={index}>{medication}</li>
              ))}
            </ul>
          </CardContent>
        </Card> */}

        {/* <Card className="detail-card">
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{patient.notes}</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
            </p>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
