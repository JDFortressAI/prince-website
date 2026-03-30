"use client"

import { useEffect, useState } from "react"
import { CalendarCheck, Loader2 } from "lucide-react"

type Booking = {
  id: string
  propertyId: string
  guestName: string
  guestEmail: string
  checkin: string
  checkout: string
  workers: number
  totalCost: number | null
  status: string
  notes?: string
  createdAt: string
}

const statusColors: Record<string, string> = {
  confirmed: "bg-blue-100 text-blue-700",
  "checked-in": "bg-green-100 text-green-700",
  completed: "bg-slate-100 text-slate-600",
  cancelled: "bg-red-100 text-red-700",
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/bookings")
      .then((r) => r.json())
      .then((data) => {
        setBookings(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0F172A]">Bookings</h1>
        <p className="text-slate-500 text-sm">{bookings.length} total bookings</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="animate-spin text-slate-400" size={24} />
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
          <CalendarCheck size={40} className="text-slate-200 mx-auto mb-4" />
          <p className="text-slate-500">No bookings yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Guest</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Check-in</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Check-out</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Workers</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Total</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-[#0F172A]">{booking.guestName}</p>
                    <p className="text-xs text-slate-400">{booking.guestEmail}</p>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">
                    {new Date(booking.checkin).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">
                    {new Date(booking.checkout).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">{booking.workers}</td>
                  <td className="px-4 py-4 text-sm font-medium text-[#0F172A]">
                    {booking.totalCost ? `£${booking.totalCost.toLocaleString()}` : "—"}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[booking.status] ?? "bg-slate-100 text-slate-500"}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
