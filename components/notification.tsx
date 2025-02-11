"use client"

import { useEffect, useState } from "react"
import { gsap } from "gsap"
import { CheckCircle } from "lucide-react"

interface NotificationProps {
  message: string
  duration?: number
  onClose: () => void
}

export function Notification({ message, duration = 4000, onClose }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const notification = document.querySelector(".notification")

    gsap.fromTo(
      notification,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      },
    )

    const timeout = setTimeout(() => {
      gsap.to(notification, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "power3.in",
        onComplete: () => {
          setIsVisible(false)
          onClose()
        },
      })
    }, duration)

    return () => clearTimeout(timeout)
  }, [duration, onClose])

  if (!isVisible) return null

  return (
    <div className="notification fixed bottom-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-2">
      <CheckCircle className="w-5 h-5" />
      <p>{message}</p>
    </div>
  )
}

