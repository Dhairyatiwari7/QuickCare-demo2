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

// Dummy doctor data (30 doctors)
const doctors = [
  { id: 1, name: "Dr. John Doe", speciality: "Cardiologist", fees: "$100", availability: "Mon, Wed, Fri", rating: 4.5 },
  {
    id: 2,
    name: "Dr. Jane Smith",
    speciality: "Dermatologist",
    fees: "$90",
    availability: "Tue, Thu, Sat",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Dr. Emily Brown",
    speciality: "Pediatrician",
    fees: "$80",
    availability: "Mon, Tue, Thu",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Dr. Michael Johnson",
    speciality: "Orthopedic Surgeon",
    fees: "$120",
    availability: "Wed, Fri, Sat",
    rating: 4.9,
  },
  { id: 5, name: "Dr. Sarah Lee", speciality: "Neurologist", fees: "$110", availability: "Mon, Thu, Fri", rating: 4.6 },
  {
    id: 6,
    name: "Dr. David Wilson",
    speciality: "Ophthalmologist",
    fees: "$95",
    availability: "Tue, Wed, Sat",
    rating: 4.7,
  },
  {
    id: 7,
    name: "Dr. Lisa Chen",
    speciality: "Gynecologist",
    fees: "$105",
    availability: "Mon, Wed, Fri",
    rating: 4.8,
  },
  {
    id: 8,
    name: "Dr. Robert Taylor",
    speciality: "Psychiatrist",
    fees: "$130",
    availability: "Tue, Thu, Sat",
    rating: 4.5,
  },
  {
    id: 9,
    name: "Dr. Amanda White",
    speciality: "Endocrinologist",
    fees: "$100",
    availability: "Mon, Wed, Fri",
    rating: 4.6,
  },
  {
    id: 10,
    name: "Dr. James Anderson",
    speciality: "Urologist",
    fees: "$110",
    availability: "Tue, Thu, Sat",
    rating: 4.7,
  },
  {
    id: 11,
    name: "Dr. Patricia Martinez",
    speciality: "Rheumatologist",
    fees: "$95",
    availability: "Mon, Wed, Fri",
    rating: 4.8,
  },
  {
    id: 12,
    name: "Dr. Thomas Harris",
    speciality: "Gastroenterologist",
    fees: "$105",
    availability: "Tue, Thu, Sat",
    rating: 4.6,
  },
  {
    id: 13,
    name: "Dr. Jennifer Clark",
    speciality: "Allergist",
    fees: "$90",
    availability: "Mon, Wed, Fri",
    rating: 4.7,
  },
  {
    id: 14,
    name: "Dr. Christopher Lee",
    speciality: "Pulmonologist",
    fees: "$115",
    availability: "Tue, Thu, Sat",
    rating: 4.9,
  },
  {
    id: 15,
    name: "Dr. Elizabeth Scott",
    speciality: "Oncologist",
    fees: "$125",
    availability: "Mon, Wed, Fri",
    rating: 4.8,
  },
  {
    id: 16,
    name: "Dr. Daniel Brown",
    speciality: "Nephrologist",
    fees: "$100",
    availability: "Tue, Thu, Sat",
    rating: 4.6,
  },
  {
    id: 17,
    name: "Dr. Michelle Davis",
    speciality: "Hematologist",
    fees: "$110",
    availability: "Mon, Wed, Fri",
    rating: 4.7,
  },
  {
    id: 18,
    name: "Dr. Kevin Wilson",
    speciality: "Plastic Surgeon",
    fees: "$150",
    availability: "Tue, Thu, Sat",
    rating: 4.9,
  },
  {
    id: 19,
    name: "Dr. Laura Thompson",
    speciality: "Geriatrician",
    fees: "$95",
    availability: "Mon, Wed, Fri",
    rating: 4.5,
  },
  {
    id: 20,
    name: "Dr. Richard Moore",
    speciality: "Otolaryngologist",
    fees: "$105",
    availability: "Tue, Thu, Sat",
    rating: 4.7,
  },
  {
    id: 21,
    name: "Dr. Karen Rodriguez",
    speciality: "Immunologist",
    fees: "$100",
    availability: "Mon, Wed, Fri",
    rating: 4.6,
  },
  {
    id: 22,
    name: "Dr. William Taylor",
    speciality: "Vascular Surgeon",
    fees: "$130",
    availability: "Tue, Thu, Sat",
    rating: 4.8,
  },
  {
    id: 23,
    name: "Dr. Susan Anderson",
    speciality: "Neonatologist",
    fees: "$120",
    availability: "Mon, Wed, Fri",
    rating: 4.9,
  },
  {
    id: 24,
    name: "Dr. Joseph Martinez",
    speciality: "Pain Management",
    fees: "$110",
    availability: "Tue, Thu, Sat",
    rating: 4.7,
  },
  {
    id: 25,
    name: "Dr. Nancy White",
    speciality: "Sports Medicine",
    fees: "$100",
    availability: "Mon, Wed, Fri",
    rating: 4.8,
  },
  {
    id: 26,
    name: "Dr. George Thompson",
    speciality: "Infectious Disease",
    fees: "$105",
    availability: "Tue, Thu, Sat",
    rating: 4.6,
  },
  {
    id: 27,
    name: "Dr. Carol Davis",
    speciality: "Anesthesiologist",
    fees: "$140",
    availability: "Mon, Wed, Fri",
    rating: 4.9,
  },
  {
    id: 28,
    name: "Dr. Edward Johnson",
    speciality: "Radiologist",
    fees: "$120",
    availability: "Tue, Thu, Sat",
    rating: 4.7,
  },
  {
    id: 29,
    name: "Dr. Margaret Brown",
    speciality: "Geneticist",
    fees: "$110",
    availability: "Mon, Wed, Fri",
    rating: 4.8,
  },
  {
    id: 30,
    name: "Dr. Charles Wilson",
    speciality: "Podiatrist",
    fees: "$95",
    availability: "Tue, Thu, Sat",
    rating: 4.6,
  },
]

export default function AppointmentPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState<(typeof doctors)[0] | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
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
      doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleBookAppointment = () => {
    if (selectedDoctor && selectedDate && selectedTime) {
      // Here you would typically make an API call to book the appointment
      setShowNotification(true)
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
          <Card key={doctor.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
            <CardHeader>
              <Avatar className="w-16 h-16 mx-auto">
                <AvatarImage src={`https://i.pravatar.cc/150?u=${doctor.id}`} />
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
              <p className="text-center mb-2">Fees: {doctor.fees}</p>
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

