"use client";

import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/ProfileButton"; // Adjust the import path as necessary
import Link from "next/link";

export default function DoctorDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "doctor") {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Doctor Dashboard</h1>
        <p>Welcome, Dr. {user.username}!</p>
        <p>Manage your appointments and patients here.</p>
        <Link
          href="/doctor/appointments"
          className="bg-sky-500 text-white px-6 py-3 rounded-md hover:bg-sky-600 transition duration-300"
        >
          View Appointments
        </Link>
        <Link
          href="/ai-help"
          className="bg-white text-sky-500 border border-sky-500 px-6 py-3 rounded-md hover:bg-sky-50 transition duration-300"
        >
          Get Help with AI
        </Link>
      </div>
    </div>
  );
}
