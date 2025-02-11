"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useParams } from "next/navigation"

gsap.registerPlugin(ScrollTrigger)

const blogPosts = {
  1: {
    title: "The Future of AI in Healthcare: Revolutionizing Patient Care",
    content: `
      <p>Artificial Intelligence (AI) is revolutionizing healthcare in ways we could only imagine a decade ago. From diagnostic assistance to personalized treatment plans, AI is becoming an invaluable tool in modern medicine.</p>

      <h2>Diagnostic Precision</h2>
      <p>AI algorithms can now analyze medical images with remarkable accuracy, often detecting subtle abnormalities that might escape the human eye. This capability is particularly valuable in radiology, pathology, and dermatology.</p>

      <h2>Personalized Treatment Plans</h2>
      <p>By analyzing vast amounts of patient data, AI can help doctors create highly personalized treatment plans. These systems consider multiple factors including genetic makeup, lifestyle, and previous medical history.</p>

      <h2>Predictive Healthcare</h2>
      <p>One of the most promising applications of AI in healthcare is its ability to predict potential health issues before they become serious. By analyzing patterns in patient data, AI can identify risk factors and suggest preventive measures.</p>

      <h2>Challenges and Considerations</h2>
      <p>While AI shows great promise, there are important considerations regarding data privacy, algorithmic bias, and the need for human oversight. Healthcare professionals must work to ensure AI systems are used ethically and effectively.</p>

      <h2>The Road Ahead</h2>
      <p>As AI technology continues to evolve, we can expect to see even more innovative applications in healthcare. The key will be balancing technological advancement with human expertise and ethical considerations.</p>
    `,
    author: "Dr. Sarah Johnson",
    date: "2024-02-07",
    readTime: "8 min read",
    category: "AI & Healthcare",
  },
  // Add more blog posts here...
}

export default function BlogPostPage() {
  const { id } = useParams()
  const contentRef = useRef<HTMLDivElement>(null)
  const post = blogPosts[id as keyof typeof blogPosts]

  useEffect(() => {
    if (!contentRef.current) return

    const paragraphs = contentRef.current.querySelectorAll("p")
    const headings = contentRef.current.querySelectorAll("h2")

    gsap.from(headings, {
      opacity: 0,
      x: -50,
      duration: 1,
      stagger: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top center",
        toggleActions: "play none none reverse",
      },
    })

    gsap.from(paragraphs, {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top center",
        toggleActions: "play none none reverse",
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  if (!post) return <div>Post not found</div>

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 font-montserrat">{post.title}</h1>
        <div className="flex items-center text-muted-foreground mb-4">
          <span>{post.author}</span>
          <span className="mx-2">•</span>
          <span>{new Date(post.date).toLocaleDateString()}</span>
          <span className="mx-2">•</span>
          <span>{post.readTime}</span>
          <span className="mx-2">•</span>
          <span>{post.category}</span>
        </div>
      </div>
      <div
        ref={contentRef}
        className="prose prose-lg max-w-none font-merriweather"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  )
}

