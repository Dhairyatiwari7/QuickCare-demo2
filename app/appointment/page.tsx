"use client"

import { useEffect, useState } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Notification } from "@/components/notification"
import { useAuth } from "../contexts/AuthContext"

export default function AppointmentPage() {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState<{ _id: string; name: string; speciality: string; image: string; fees: number; availability: string; rating: number }[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState<{ _id: string; name: string; speciality: string; image: string; fees: number; availability: string; rating: number } | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('/api/doctors')
        const data = await response.json()
        setDoctors(data.doctors)
      } catch (error) {
        console.error("Error fetching doctors:", error)
      }
    }

    fetchDoctors()

    gsap.from(".appointment-content", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
    })
  }, [])

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleBookAppointment = async () => {
    if (selectedDoctor && selectedDate && selectedTime && user) {
      try {
        const response = await fetch('/api/appointment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            doctorId: selectedDoctor._id,
            userId: user._id,
            date: selectedDate.toISOString(),
            time: selectedTime,
          }),
        });

        if (response.ok) {
          setShowNotification(true);
        } else {
          console.error('Failed to book appointment');
        }
      } catch (error) {
        console.error('Error booking appointment:', error);
      }
    }
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="appointment-content text-3xl font-bold text-center mb-8">Book an Appointment</h1>
      <div className="appointment-content mb-8">
        <Label htmlFor="search">Search for doctors, specialities, or diseases</Label>
        <Input id="search" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <div className="appointment-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor._id} className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
            <CardHeader>
              <Avatar className="w-16 h-16 mx-auto">
                <AvatarImage src={doctor.image} />
                <AvatarFallback>
                  {doctor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-center mt-2">{doctor.name}</CardTitle>
              <CardDescription className="text-center">{doctor.speciality}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center mb-2">Fees: ${doctor.fees}</p>
              <p className="text-center mb-2">Available: {doctor.availability}</p>
              <div className="flex justify-center items-center">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="ml-1">{doctor.rating}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" onClick={() => setSelectedDoctor(doctor)}>
                    Book Appointment
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Book Appointment with {selectedDoctor?.name}</DialogTitle>
                    <DialogDescription>Select a date and time for your appointment.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                    <Select onValueChange={setSelectedTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00">09:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM</SelectItem>
                        <SelectItem value="14:00">02:00 PM</SelectItem>
                        <SelectItem value="15:00">03:00 PM</SelectItem>
                        <SelectItem value="16:00">04:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleBookAppointment}>Confirm Booking</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
      {showNotification && (
        <Notification
          message={`Appointment booked with ${selectedDoctor?.name} on ${selectedDate?.toDateString()} at ${selectedTime}`}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  )
}
