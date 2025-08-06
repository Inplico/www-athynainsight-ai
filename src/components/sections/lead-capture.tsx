"use client"

import { useState } from "react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"

type UserType = "expert" | "realEstate" | "construction" | ""

export function LeadCapture() {
  const [userType, setUserType] = useState<UserType>("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    companySize: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Send to Loops platform via API route
      // TODO: Replace with actual Loops API endpoint when configured
      const response = await fetch("/api/loops-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userType,
          mailingLists: [userType], // Segment users by type in Loops
          timestamp: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setSubmitted(true)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="py-24 bg-gradient-to-b from-orange-50 to-white">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-6">
              <svg
                className="w-20 h-20 mx-auto text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
            <p className="text-lg text-gray-600">
              You're on the list! We'll be in touch soon with early access to our revolutionary 
              building code AI platform.
            </p>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="py-24 bg-gradient-to-b from-white to-orange-50">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Join the Building Code Revolution
            </h2>
            <p className="text-xl text-gray-600">
              Be among the first to experience AI-powered compliance that saves hours of research 
              while ensuring 100% accuracy.
            </p>
          </div>

          {/* User Type Selection */}
          {!userType && (
            <div className="space-y-4">
              <p className="text-center text-gray-700 font-medium mb-6">
                I am a...
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <button
                  onClick={() => setUserType("expert")}
                  className="p-6 border-2 border-gray-200 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition-all group"
                >
                  <div className="text-orange-500 mb-3">
                    <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Building Code Expert</h3>
                  <p className="text-sm text-gray-600">
                    Architect, City Official, or Architectural Technologist
                  </p>
                </button>

                <button
                  onClick={() => setUserType("realEstate")}
                  className="p-6 border-2 border-gray-200 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition-all group"
                >
                  <div className="text-orange-500 mb-3">
                    <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Real Estate Professional</h3>
                  <p className="text-sm text-gray-600">
                    Get instant zoning and building code answers
                  </p>
                </button>

                <button
                  onClick={() => setUserType("construction")}
                  className="p-6 border-2 border-gray-200 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition-all group"
                >
                  <div className="text-orange-500 mb-3">
                    <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Construction Company</h3>
                  <p className="text-sm text-gray-600">
                    Streamline compliance for your projects
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* Registration Form */}
          {userType && (
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-lg">
              <div className="mb-6">
                <button
                  type="button"
                  onClick={() => setUserType("")}
                  className="text-sm text-gray-600 hover:text-orange-600 flex items-center gap-2"
                >
                  ← Back to selection
                </button>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company {userType === "construction" && "*"}
                </label>
                <input
                  type="text"
                  id="company"
                  required={userType === "construction"}
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              {userType === "construction" && (
                <div>
                  <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Size *
                  </label>
                  <select
                    id="companySize"
                    required
                    value={formData.companySize}
                    onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Select company size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>
              )}

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  size="lg"
                >
                  {isSubmitting ? "Submitting..." : "Get Early Access"}
                </Button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                By signing up, you agree to receive updates about Athyna Insight's building code AI platform.
              </p>
            </form>
          )}
        </div>
      </Container>
    </div>
  )
}