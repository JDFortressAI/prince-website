"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, Bed, Bath, Users, MapPin, Wifi, Car, Home, Building2, X, Loader2 } from "lucide-react"

type Property = {
  id: string
  title: string
  address: string
  city: string
  postcode: string
  bedrooms: number
  bathrooms: number
  maxGuests: number
  type: string
  status: string
  amenities: string
  description: string
  pricePerNight: number | null
  available: boolean
}

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  inactive: "bg-slate-100 text-slate-500",
}

export default function PropertiesDashboardPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProperties = async () => {
    const res = await fetch("/api/properties")
    const data = await res.json()
    setProperties(data)
    setLoading(false)
  }

  useEffect(() => { fetchProperties() }, [])

  const toggleAvailability = async (property: Property) => {
    const res = await fetch(`/api/properties/${property.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ available: !property.available }),
    })
    if (res.ok) {
      setProperties((prev) =>
        prev.map((p) => (p.id === property.id ? { ...p, available: !p.available } : p))
      )
    }
  }

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Properties</h1>
          <p className="text-slate-500 text-sm">{properties.length} total properties</p>
        </div>
        <Link
          href="/dashboard/properties/add"
          className="flex items-center gap-2 px-5 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <Plus size={16} />
          Add Property
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-72 bg-slate-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
          <Building2 size={40} className="text-slate-200 mx-auto mb-4" />
          <p className="text-slate-500 mb-4">No properties yet</p>
          <Link
            href="/dashboard/properties/add"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-white text-sm font-semibold rounded-xl"
          >
            <Plus size={16} />
            Add First Property
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {properties.map((property) => {
            let amenities: string[] = []
            try { amenities = JSON.parse(property.amenities) } catch {}

            return (
              <div key={property.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-md transition-all">
                {/* Header */}
                <div className="hero-gradient h-32 p-4 flex items-start justify-between">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[property.status] ?? "bg-slate-100 text-slate-500"}`}>
                    {property.status}
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    property.type === "House" ? "bg-blue-500 text-white" : "bg-purple-500 text-white"
                  }`}>
                    {property.type === "House" ? <Home size={11} className="inline mr-1" /> : <Building2 size={11} className="inline mr-1" />}
                    {property.type}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-bold text-[#0F172A] text-sm leading-snug flex-1 mr-2">
                      {property.title}
                    </h3>
                    {property.pricePerNight && (
                      <span className="text-[#F59E0B] font-bold text-sm shrink-0">
                        £{property.pricePerNight}/n
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-slate-400 text-xs mb-3">
                    <MapPin size={11} />
                    {property.city}, {property.postcode}
                  </div>

                  <div className="flex gap-3 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Bed size={13} className="text-slate-400" />
                      {property.bedrooms} beds
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath size={13} className="text-slate-400" />
                      {property.bathrooms} baths
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={13} className="text-slate-400" />
                      Max {property.maxGuests}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {amenities.slice(0, 4).map((a) => (
                      <span key={a} className="text-xs px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-slate-500">
                        {a}
                      </span>
                    ))}
                  </div>

                  {/* Availability toggle */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="text-xs font-medium text-slate-500">Available</span>
                    <button
                      onClick={() => toggleAvailability(property)}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        property.available ? "bg-[#F59E0B]" : "bg-slate-200"
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                          property.available ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
