"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ProfilePage() {
  useEffect(() => {
    gsap.from(".profile-content", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
    })
  }, [])

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="profile-content text-3xl font-bold text-center mb-8">My Profile</h1>
      <div className="flex justify-end mb-6">
        <ThemeToggle />
      </div>
      <form className="space-y-6">
        <div className="profile-content grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="age">Age</Label>
            <Input id="age" type="number" placeholder="Enter your age" />
          </div>
          <div>
            <Label htmlFor="contact">Contact</Label>
            <Input id="contact" type="tel" placeholder="Enter your contact number" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email address" />
          </div>
          <div>
            <Label htmlFor="nationality">Nationality</Label>
            <Input id="nationality" placeholder="Enter your nationality" />
          </div>
        </div>
        <div className="profile-content">
          <Label htmlFor="address">Address</Label>
          <Input id="address" placeholder="Enter your address" />
        </div>
        <div className="profile-content">
          <Label htmlFor="profile-pic">Profile Picture</Label>
          <Input id="profile-pic" type="file" accept="image/*" />
        </div>
        <Button className="profile-content w-full" type="submit">
          Save Profile
        </Button>
      </form>
    </div>
  )
}

