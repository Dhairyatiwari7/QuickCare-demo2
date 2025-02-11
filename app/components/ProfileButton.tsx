"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useAuth } from "../contexts/AuthContext"

export default function ProfileButton() {
  const router = useRouter()
  const { logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      gsap.from(dropdownRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className="relative z-[9999]"> 
      <Button
        onClick={toggleDropdown}
        variant="ghost"
        className="relative z-[9999] block rounded-md bg-white p-2 focus:outline-none"
      >
        <Avatar>
          <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </Button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-[9999]" // Added z-index here
        >
          <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            My Profile
          </Link>
          <Link href="/appointments" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            My Appointments
          </Link>
          <Link href="/blog" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Blog
          </Link>
          <Link href="/support" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Support
          </Link>
          <Link href="/faq" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Help & FAQs
          </Link>
          <div className="border-t border-gray-100 my-1" />
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
