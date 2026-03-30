"use client"

import { useState } from "react"
import { CheckCircle, Loader2 } from "lucide-react"

export default function QuoteForm() {
  const [form, setForm] = useState({
    location: "",
    workers: "",
    checkin: "",
    checkout: "",
    sharedRooms: "Yes",
    budget: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "website" }),
      })
      if (!res.ok) throw new Error("Submission failed")
      setSuccess(true)
    } catch {
      setError("Something went wrong. Please try again or call us directly.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-lg mx-auto">
        <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
          <CheckCircle className="text-green-600" size={32} />
        </div>
        <h3 className="text-xl font-bold text-[#0F172A] mb-2">Request Received!</h3>
        <p className="text-slate-600">
          Thanks, <strong>{form.name}</strong>. We've received your accommodation request and will get back to you within 24 hours with tailored options.
        </p>
        <p className="mt-4 text-sm text-slate-500">
          For urgent requests, call us on{" "}
          <a href="tel:+442034882119" className="text-[#F59E0B] font-semibold hover:underline">
            +44 203 488 2119
          </a>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Location */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Where do you need accommodation? <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            placeholder="e.g. Manchester, Birmingham, London..."
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
          />
        </div>

        {/* Workers */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Number of Workers <span className="text-red-500">*</span>
          </label>
          <select
            name="workers"
            value={form.workers}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent bg-white"
          >
            <option value="">Select...</option>
            <option value="1-2">1–2 workers</option>
            <option value="3-4">3–4 workers</option>
            <option value="5-6">5–6 workers</option>
            <option value="7-8">7–8 workers</option>
            <option value="9-10">9–10 workers</option>
            <option value="11-12">11–12 workers</option>
            <option value="13-15">13–15 workers</option>
            <option value="16+">16+ workers</option>
          </select>
        </div>

        {/* Shared Rooms */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Shared Rooms OK?
          </label>
          <select
            name="sharedRooms"
            value={form.sharedRooms}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent bg-white"
          >
            <option value="Yes">Yes – shared rooms fine</option>
            <option value="No">No – individual rooms needed</option>
            <option value="Mixed">Mixed – some each</option>
          </select>
        </div>

        {/* Check-in */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Check-in Date
          </label>
          <input
            type="date"
            name="checkin"
            value={form.checkin}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
          />
        </div>

        {/* Check-out */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Check-out Date
          </label>
          <input
            type="date"
            name="checkout"
            value={form.checkout}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
          />
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Budget (optional)
          </label>
          <input
            type="text"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            placeholder="e.g. £2,000/month"
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Full name"
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="you@company.com"
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
          />
        </div>

        {/* Phone */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+44..."
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
          />
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Additional Details
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={3}
            placeholder="Tell us about your project, any special requirements, preferred areas..."
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent resize-none"
          />
        </div>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full py-3 bg-[#F59E0B] hover:bg-[#D97706] disabled:opacity-60 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Sending your request...
          </>
        ) : (
          "Get Accommodation Options →"
        )}
      </button>

      <p className="mt-3 text-xs text-center text-slate-400">
        We respond within 24 hours. No commitment required.
      </p>
    </form>
  )
}
