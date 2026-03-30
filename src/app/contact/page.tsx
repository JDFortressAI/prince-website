"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Phone, Mail, MessageCircle, MapPin, CheckCircle, Loader2 } from "lucide-react"

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          location: "Contact enquiry",
          workers: "N/A",
          message: `Subject: ${form.subject}\n\n${form.message}`,
          source: "contact",
        }),
      })
      if (!res.ok) throw new Error("Failed")
      setSuccess(true)
    } catch {
      setError("Sorry, something went wrong. Please try again or call us.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="hero-gradient py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
              Get in Touch
            </h1>
            <p className="text-slate-300 text-lg max-w-xl mx-auto">
              Whether you need accommodation for your team or want to list your property — we'd love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              {/* Left: contact details */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Contact Details</h2>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    We're a UK-based team. Reach us by phone, email, or WhatsApp — we aim to respond within a few hours during business hours.
                  </p>
                </div>

                {/* Cards */}
                <div className="space-y-4">
                  <a
                    href="tel:+442034882119"
                    className="flex items-center gap-4 bg-white rounded-xl p-4 border border-slate-100 hover:border-[#F59E0B]/40 transition-all group"
                  >
                    <div className="w-11 h-11 bg-amber-50 group-hover:bg-[#F59E0B] rounded-xl flex items-center justify-center shrink-0 transition-colors">
                      <Phone size={20} className="text-[#F59E0B] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-0.5">Phone</p>
                      <p className="text-sm font-semibold text-[#0F172A]">+44 203 488 2119</p>
                    </div>
                  </a>

                  <a
                    href="mailto:hello@homesforworkers.co.uk"
                    className="flex items-center gap-4 bg-white rounded-xl p-4 border border-slate-100 hover:border-[#F59E0B]/40 transition-all group"
                  >
                    <div className="w-11 h-11 bg-amber-50 group-hover:bg-[#F59E0B] rounded-xl flex items-center justify-center shrink-0 transition-colors">
                      <Mail size={20} className="text-[#F59E0B] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-0.5">Email</p>
                      <p className="text-sm font-semibold text-[#0F172A]">hello@homesforworkers.co.uk</p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/442034882119"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-white rounded-xl p-4 border border-slate-100 hover:border-[#F59E0B]/40 transition-all group"
                  >
                    <div className="w-11 h-11 bg-green-50 group-hover:bg-green-500 rounded-xl flex items-center justify-center shrink-0 transition-colors">
                      <MessageCircle size={20} className="text-green-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-0.5">WhatsApp</p>
                      <p className="text-sm font-semibold text-[#0F172A]">Message us on WhatsApp</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 bg-white rounded-xl p-4 border border-slate-100">
                    <div className="w-11 h-11 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin size={20} className="text-[#F59E0B]" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-0.5">Operating Hours</p>
                      <p className="text-sm font-semibold text-[#0F172A]">Mon–Fri 8am–6pm</p>
                      <p className="text-xs text-slate-400">Urgent support available 24/7</p>
                    </div>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="bg-[#0F172A] rounded-2xl h-48 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={32} className="text-[#F59E0B] mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">UK-Wide Coverage</p>
                    <p className="text-slate-400 text-xs mt-1">Serving contractors from London to Edinburgh</p>
                  </div>
                </div>
              </div>

              {/* Right: form */}
              <div className="lg:col-span-3">
                {success ? (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-10 text-center h-full flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-2">Message Sent!</h3>
                    <p className="text-slate-500 mb-6">
                      Thanks for getting in touch. We'll get back to you within a few hours.
                    </p>
                    <button
                      onClick={() => { setSuccess(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }) }}
                      className="text-[#F59E0B] font-semibold text-sm hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8"
                  >
                    <h2 className="text-xl font-bold text-[#0F172A] mb-6">Send Us a Message</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B] bg-white"
                        >
                          <option value="">Select subject...</option>
                          <option value="Accommodation enquiry">Accommodation enquiry</option>
                          <option value="List my property">List my property</option>
                          <option value="Existing booking">Existing booking</option>
                          <option value="Partnership">Partnership</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B] resize-none"
                          placeholder="Tell us about your requirements..."
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
                      className="mt-6 w-full py-3 bg-[#F59E0B] hover:bg-[#D97706] disabled:opacity-60 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" /> Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
