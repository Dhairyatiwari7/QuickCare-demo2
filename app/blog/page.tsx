"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

gsap.registerPlugin(ScrollTrigger)

const blogPosts = [
  {
    id: 1,
    title: "The Future of AI in Healthcare: Revolutionizing Patient Care",
    excerpt:
      "Explore how artificial intelligence is transforming healthcare delivery and improving patient outcomes...",
    category: "AI & Healthcare",
    readTime: "8 min read",
    date: "2024-02-07",
  },
  {
    id: 2,
    title: "Understanding mRNA Technology: Beyond COVID-19 Vaccines",
    excerpt: "Dive deep into the revolutionary mRNA technology and its potential applications in modern medicine...",
    category: "Medical Science",
    readTime: "10 min read",
    date: "2024-02-06",
  },
  // Add more blog posts here...
]

export default function BlogPage() {
  useEffect(() => {
    const cards = document.querySelectorAll(".blog-card")

    cards.forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
        delay: index * 0.2,
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mb-12 font-montserrat">Healthcare & AI Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Link href={`/blog/${post.id}`} key={post.id}>
            <Card className="blog-card hover:scale-105 transition-transform duration-300 cursor-pointer h-full">
              <CardHeader>
                <div className="text-sm text-muted-foreground mb-2">
                  {post.category} • {post.readTime}
                </div>
                <CardTitle className="font-montserrat">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-merriweather text-muted-foreground">{post.excerpt}</p>
                <p className="text-sm text-muted-foreground mt-4">{new Date(post.date).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

