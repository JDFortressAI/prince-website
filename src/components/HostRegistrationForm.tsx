"use client"

import { useState } from "react"
import { CheckCircle, Loader2 } from "lucide-react"

type Field = {
  label: string
  name: string
  type: string
  placeholder?: string
  required?: boolean
  options?: string[]
  half?: boolean
}

const fields: Field[] = [
  { label: "Your Full Name", name: "name", type: "text", placeholder: "Jane Smith", required: true, half: true },
  { label: "Email Address", name: "email", type: "email", placeholder: "jane@example.com", required: true, half: true },
  { label: "Phone Number", name: "phone", type: "tel", placeholder: "+44 7700 900000", half: true },
  { label: "Property Postcode", name: "location", type: "text", placeholder: "e.g. NW7 3QN", required: true, half: true },
  {
    label: "Property Type",
    name: "propertyType",
    type: "select",
    required: true,
    half: true,
    options: ["House", "Apartment / Flat", "Bungalow", "HMO", "Other"],
  },
  {
    label: "Number of Bedrooms",
    name: "bedrooms",
    type: "select",
    required: true,
    half: true,
    options: ["1", "2", "3", "4", "5", "6", "7–10", "10+"],
  },
  {
    label: "Is the property currently furnished?",
    name: "furnished",
    type: "select",
    required: true,
    half: true,
    options: ["Yes — fully furnished", "Partially furnished", "Unfurnished"],
  },
  {
    label: "When can it be available?",
    name: "availability",
    type: "select",
    required: true,
    half: true,
    options: ["Immediately", "Within 1 month", "1–3 months", "Not sure yet"],
  },
  {
    label: "Anything else we should know?",
    name: "message",
    type: "textarea",
    placeholder: "e.g. parking available, bills included, recent refurb…",
  },
]

export default function HostRegistrationForm() {
  const [form, setForm] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    try {
      const payload = {
        name: form.name || "",
        email: form.email || "",
        phone: form.phone || "",
        location: form.location || "",
        workers: "0",
        sharedRooms: "N/A",
        source: "host-registration",
        status: "new",
        message: [
          form.propertyType && `Property type: ${form.propertyType}`,
          form.bedrooms && `Bedrooms: ${form.bedrooms}`,
          form.furnished && `Furnished: ${form.furnished}`,
          form.availability && `Available: ${form.availability}`,
          form.message && `Notes: ${form.message}`,
        ]
          .filter(Boolean)
          .join(" | "),
      }

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Submission failed")
      setStatus("success")
    } catch {
      setStatus("error")
      setErrorMsg("Something went wrong — please try again or call us on +44 203 488 2119.")
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-100 text-center max-w-xl mx-auto">
        <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-[#0F172A] mb-2">We&rsquo;ve got your details</h3>
        <p className="text-slate-500 text-sm leading-relaxed">
          Our team will review your property and be in touch within 48 hours. If you&rsquo;d rather speak now, call us on{" "}
          <a href="tel:+442034882119" className="text-[#F59E0B] font-semibold">+44 203 488 2119</a>.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {fields.map((f) => (
          <div key={f.name} className={f.half === false || f.type === "textarea" ? "sm:col-span-2" : ""}>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {f.label}
              {f.required && <span className="text-[#F59E0B] ml-0.5">*</span>}
            </label>

            {f.type === "select" ? (
              <select
                name={f.name}
                required={f.required}
                value={form[f.name] || ""}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B] bg-white text-slate-700"
              >
                <option value="">Select…</option>
                {f.options?.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            ) : f.type === "textarea" ? (
              <textarea
                name={f.name}
                placeholder={f.placeholder}
                value={form[f.name] || ""}
                onChange={handleChange}
                rows={3}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B] resize-none"
              />
            ) : (
              <input
                type={f.type}
                name={f.name}
                placeholder={f.placeholder}
                required={f.required}
                value={form[f.name] || ""}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
              />
            )}
          </div>
        ))}
      </div>

      {errorMsg && (
        <p className="mt-4 text-sm text-red-500">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 w-full py-3.5 bg-[#F59E0B] hover:bg-[#D97706] disabled:opacity-60 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
      >
        {status === "loading" ? (
          <><Loader2 size={16} className="animate-spin" /> Submitting…</>
        ) : (
          "Register My Property"
        )}
      </button>

      <p className="text-center text-xs text-slate-400 mt-4">
        We review every submission within 48 hours. No commitment required.
      </p>
    </form>
  )
}
