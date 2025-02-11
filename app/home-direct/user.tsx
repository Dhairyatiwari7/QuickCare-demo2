"use client";

import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import Button from "../components/ProfileButton"; // Replace with the actual library
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "user") {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
        <p>Welcome, {user.username}!</p>
        <p>Book appointments and consult doctors.</p>
      </div>
      <Link
        href="/consultation"
        className="bg-sky-500 text-white px-6 py-3 rounded-md hover:bg-sky-600 transition duration-300"
      >
        Start Consultation
      </Link>
      <Link
        href="/appointment"
        className="bg-white text-sky-500 border border-sky-500 px-6 py-3 rounded-md hover:bg-sky-50 transition duration-300"
      >
        Book an Appointment
      </Link>
      <Link
        href="/ai-help"
        className="bg-white text-sky-500 border border-sky-500 px-6 py-3 rounded-md hover:bg-sky-50 transition duration-300"
      >
        Chat with AI
      </Link>
    </div>
  );
}
