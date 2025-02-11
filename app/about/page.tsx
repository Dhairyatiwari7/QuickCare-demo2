"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutUsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    // Create floating particles with smoother movement
    if (particlesRef.current) {
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div')
        particle.className = 'particle'
        particle.style.setProperty('--x', `${Math.random() * 100}%`)
        particle.style.setProperty('--y', `${Math.random() * 100}%`)
        particle.style.setProperty('--duration', `${Math.random() * 30 + 15}s`) // Slower, smoother movement
        particle.style.setProperty('--delay', `-${Math.random() * 30}s`)
        particlesRef.current.appendChild(particle)
      }
    }

    // Smooth heading animation
    const heading = document.querySelector('.about-heading')
    if (heading && heading.textContent) {
      const text = heading.textContent
      heading.textContent = ''
      text.split('').forEach((char, i) => {
        const span = document.createElement('span')
        span.textContent = char === ' ' ? '\u00A0' : char
        span.style.opacity = '0'
        span.style.display = 'inline-block'
        heading.appendChild(span)
        
        gsap.to(span, {
          opacity: 1,
          rotateY: 360,
          duration: 1.2,
          delay: i * 0.05,
          ease: "power4.out"
        })
      })
    }

    // Super smooth card animations
    const cards = document.querySelectorAll(".about-card")
    const cardTimeline = gsap.timeline({
      defaults: {
        ease: "power3.out",
        duration: 1.5
      }
    })

    cards.forEach((card, index) => {
      // Initial scroll animation
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          end: "top center+=100",
          scrub: 1.5, // Smoother scrubbing
        },
        opacity: 0,
        y: 100,
        scale: 0.95,
        duration: 1.5,
        ease: "power2.out"
      })

      // Ultra-smooth hover animations
      let currentRotation = { x: 0, y: 0 }
      let rafId: number

      const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor
      }

      const animateCard = (targetRotation: { x: number, y: number }) => {
        const animate = () => {
          currentRotation.x = lerp(currentRotation.x, targetRotation.x, 0.1)
          currentRotation.y = lerp(currentRotation.y, targetRotation.y, 0.1)

          gsap.set(card, {
            rotateX: currentRotation.x,
            rotateY: currentRotation.y,
            transformPerspective: 1000,
            transformOrigin: "center"
          })

          if (Math.abs(targetRotation.x - currentRotation.x) > 0.01 ||
              Math.abs(targetRotation.y - currentRotation.y) > 0.01) {
            rafId = requestAnimationFrame(animate)
          }
        }
        
        cancelAnimationFrame(rafId)
        rafId = requestAnimationFrame(animate)
      }

      card.addEventListener('mousemove', (e) => {
        const rect = (card as HTMLElement).getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        
        const rotateX = ((y - centerY) / centerY) * 5 // Max 5 degrees rotation
        const rotateY = ((x - centerX) / centerX) * 5 // Max 5 degrees rotation

        animateCard({ x: -rotateX, y: rotateY })
      })

      card.addEventListener('mouseleave', () => {
        animateCard({ x: 0, y: 0 })
      })

      // Cleanup
      return () => {
        cancelAnimationFrame(rafId)
      }
    })

    // Smoother background animation
    const bg = document.querySelector('.morphing-bg')
    if (bg) {
      gsap.to(bg, {
        backgroundPosition: '100% 100%',
        duration: 30, // Slower, smoother movement
        repeat: -1,
        ease: "none"
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden perspective">
      {/* Smoother morphing background */}
      <div 
        className="morphing-bg absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-1000"
        style={{
          backgroundImage: `
            radial-gradient(circle at 0% 0%, rgba(104, 171, 237, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 100% 0%, rgba(47, 124, 198, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 100% 100%, rgba(82, 157, 231, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 0% 100%, rgba(127, 185, 241, 0.15) 0%, transparent 50%)
          `,
          backgroundSize: '200% 200%',
          filter: 'blur(100px)',
          transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />

      {/* Floating particles container */}
      <div ref={particlesRef} className="particles-container absolute inset-0 pointer-events-none" />

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="about-heading text-5xl md:text-6xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
          About HealthBuddy
        </h1>

        <div ref={cardsRef} className="space-y-16">
          {/* Cards with smoother transitions */}
          <Card className="about-card transform-gpu will-change-transform transition-[transform,shadow] duration-700 ease-out hover:shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">
                At HealthBuddy, our mission is to revolutionize healthcare accessibility through innovative technology. 
                We believe that quality healthcare should be available to everyone, anywhere, at any time. Through our 
                platform, we're breaking down traditional barriers and creating a seamless connection between patients 
                and healthcare providers.
              </p>
            </CardContent>
          </Card>

          <Card className="about-card transform-gpu will-change-transform transition-[transform,shadow] duration-700 ease-out hover:shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-500 bg-clip-text text-transparent">
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">
                We envision a future where healthcare is not just reactive, but proactive and personalized. By leveraging 
                cutting-edge technology and artificial intelligence, we're creating a healthcare ecosystem that anticipates 
                needs, provides timely interventions, and ensures optimal health outcomes for all our users.
              </p>
            </CardContent>
          </Card>

          <Card className="about-card transform-gpu will-change-transform transition-[transform,shadow] duration-700 ease-out hover:shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Our Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">
                Behind HealthBuddy stands a diverse team of visionaries, including experienced healthcare professionals, 
                innovative technologists, and dedicated customer experience specialists. Our team combines decades of 
                medical expertise with cutting-edge technical knowledge to deliver a healthcare platform that truly 
                understands and meets your needs.
              </p>
            </CardContent>
          </Card>

          <Card className="about-card transform-gpu will-change-transform transition-[transform,shadow] duration-700 ease-out hover:shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-500 bg-clip-text text-transparent">
                Our Commitment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">
                Your health and privacy are our top priorities. We uphold the highest standards of medical ethics and 
                data security, ensuring that your personal health information remains confidential and protected. We're 
                constantly evolving, incorporating user feedback and the latest technological advancements to provide 
                you with the best possible healthcare experience.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
