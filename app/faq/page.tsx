"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How do I book an appointment?",
    answer:
      "You can book an appointment by navigating to the 'Book Appointment' section, selecting your preferred doctor, choosing an available time slot, and confirming your booking.",
  },
  {
    question: "What should I do if I need to cancel my appointment?",
    answer:
      "To cancel an appointment, go to 'My Appointments' in your profile, find the appointment you wish to cancel, and click the cancel button. Please try to cancel at least 24 hours in advance.",
  },
  {
    question: "How can I access my medical records?",
    answer:
      "Your medical records can be accessed through your profile under the 'Medical Records' section. All your past consultations, prescriptions, and test results are stored securely.",
  },
  // Add more FAQs...
]

export default function FAQPage() {
  useEffect(() => {
    gsap.from(".faq-item", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    })
  }, [])

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mb-12 font-montserrat">Frequently Asked Questions</h1>
      <Accordion type="single" collapsible>
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="faq-item">
            <AccordionTrigger className="font-montserrat">{faq.question}</AccordionTrigger>
            <AccordionContent className="font-merriweather">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

