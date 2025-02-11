"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type User = {
  username: string
  role: "user" | "doctor"
}

type AuthContextType = {
  user: User | null
  login: (username: string, password: string) => Promise<void>
  signup: (username: string, password: string, role: "user" | "doctor") => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (username: string, password: string) => {
    // Here you would typically make an API call to verify credentials
    // For this example, we'll just set the user directly
    const newUser = { username, role: "user" as const }
    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
  }

  const signup = async (username: string, password: string, role: "user" | "doctor") => {
    // Here you would typically make an API call to create a new user
    // For this example, we'll just set the user directly
    const newUser = { username, role }
    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

