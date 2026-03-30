"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { MapPin, Bed, Bath, Users, Wifi, Car, Building2, Home, ChevronDown } from "lucide-react"

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

const amenityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi size={14} />,
  Parking: <Car size={14} />,
  Kitchen: <span className="text-xs">🍳</span>,
  Laundry: <span className="text-xs">🧺</span>,
  Garden: <span className="text-xs">🌿</span>,
  TV: <span className="text-xs">📺</span>,
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [cityFilter, setCityFilter] = useState("")
  const [bedroomsFilter, setBedroomsFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")

  useEffect(() => {
    fetch("/api/properties")
      .then((r) => r.json())
      .then((data) => {
        setProperties(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const cities = Array.from(new Set(properties.map((p) => p.city)))

  const filtered = properties.filter((p) => {
    if (cityFilter && p.city !== cityFilter) return false
    if (bedroomsFilter && p.bedrooms < parseInt(bedroomsFilter)) return false
    if (typeFilter && p.type !== typeFilter) return false
    return true
  })

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="hero-gradient py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
              Our Properties
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Fully furnished, professionally managed contractor accommodation across the UK.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="bg-white border-b border-slate-100 sticky top-16 z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-sm font-medium text-slate-500 mr-1">Filter:</span>

              <div className="relative">
                <select
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="pl-3 pr-8 py-2 border border-slate-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#F59E0B] bg-white"
                >
                  <option value="">All Cities</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="pl-3 pr-8 py-2 border border-slate-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#F59E0B] bg-white"
                >
                  <option value="">All Types</option>
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={bedroomsFilter}
                  onChange={(e) => setBedroomsFilter(e.target.value)}
                  className="pl-3 pr-8 py-2 border border-slate-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#F59E0B] bg-white"
                >
                  <option value="">Any bedrooms</option>
                  <option value="2">2+ bedrooms</option>
                  <option value="3">3+ bedrooms</option>
                  <option value="4">4+ bedrooms</option>
                  <option value="5">5+ bedrooms</option>
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              {(cityFilter || typeFilter || bedroomsFilter) && (
                <button
                  onClick={() => { setCityFilter(""); setTypeFilter(""); setBedroomsFilter("") }}
                  className="text-xs text-[#F59E0B] hover:underline font-medium"
                >
                  Clear filters
                </button>
              )}

              <span className="ml-auto text-sm text-slate-400">
                {filtered.length} propert{filtered.length !== 1 ? "ies" : "y"}
              </span>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="py-14 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="text-center py-20 text-slate-400">Loading properties...</div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-slate-500 text-lg mb-4">No properties match your filters.</p>
                <button
                  onClick={() => { setCityFilter(""); setTypeFilter(""); setBedroomsFilter("") }}
                  className="text-[#F59E0B] font-semibold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((property) => {
                  let amenities: string[] = []
                  try { amenities = JSON.parse(property.amenities) } catch {}

                  return (
                    <div
                      key={property.id}
                      className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg hover:border-[#F59E0B]/30 transition-all group"
                    >
                      {/* Card header */}
                      <div className="h-44 hero-gradient relative flex items-end p-5">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            property.type === "House"
                              ? "bg-blue-500 text-white"
                              : "bg-purple-500 text-white"
                          }`}>
                            {property.type === "House" ? <Home size={11} className="inline mr-1" /> : <Building2 size={11} className="inline mr-1" />}
                            {property.type}
                          </span>
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            property.status === "active"
                              ? "bg-green-500 text-white"
                              : property.status === "pending"
                              ? "bg-yellow-500 text-white"
                              : "bg-slate-400 text-white"
                          }`}>
                            {property.status}
                          </span>
                        </div>
                        {property.pricePerNight && (
                          <div className="ml-auto text-right">
                            <span className="text-[#F59E0B] font-bold text-xl">
                              £{property.pricePerNight}
                            </span>
                            <span className="text-white/70 text-xs">/night</span>
                          </div>
                        )}
                      </div>

                      {/* Card body */}
                      <div className="p-6">
                        <h3 className="font-bold text-[#0F172A] text-base mb-1 group-hover:text-[#F59E0B] transition-colors">
                          {property.title}
                        </h3>
                        <div className="flex items-center gap-1 text-slate-400 text-sm mb-4">
                          <MapPin size={13} />
                          <span>{property.city}, {property.postcode}</span>
                        </div>

                        {/* Stats row */}
                        <div className="flex gap-4 text-sm text-slate-600 mb-4">
                          <span className="flex items-center gap-1.5">
                            <Bed size={15} className="text-slate-400" />
                            {property.bedrooms} bed{property.bedrooms !== 1 ? "s" : ""}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Bath size={15} className="text-slate-400" />
                            {property.bathrooms} bath{property.bathrooms !== 1 ? "s" : ""}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Users size={15} className="text-slate-400" />
                            Up to {property.maxGuests}
                          </span>
                        </div>

                        {/* Amenities */}
                        <div className="flex flex-wrap gap-2 mb-5">
                          {amenities.slice(0, 5).map((a) => (
                            <span
                              key={a}
                              className="flex items-center gap-1 text-xs px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-600"
                            >
                              {amenityIcons[a] || null}
                              {a}
                            </span>
                          ))}
                        </div>

                        <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-5">
                          {property.description}
                        </p>

                        <a
                          href="/#quote"
                          className="block w-full text-center py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-white text-sm font-semibold rounded-xl transition-colors"
                        >
                          Enquire About This Property
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-3">
              Can't find what you need?
            </h2>
            <p className="text-slate-500 mb-7">
              We source properties across the whole UK. Tell us what you need and we'll find the right accommodation within 24 hours.
            </p>
            <a
              href="/#quote"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold rounded-xl text-sm transition-colors"
            >
              Submit a Custom Request
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
