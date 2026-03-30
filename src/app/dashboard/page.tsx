"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Users, Building2, CalendarCheck, TrendingUp, Plus, ArrowRight } from "lucide-react"

const BarChart = dynamic(
  () => import("recharts").then((m) => {
    const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = m
    return function Chart({ data }: { data: any[] }) {
      return (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="status" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
            />
            <Bar dataKey="count" fill="#F59E0B" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )
    }
  }),
  { ssr: false, loading: () => <div className="h-56 bg-slate-50 rounded-xl animate-pulse" /> }
)

type Stats = {
  totalLeads: number
  newLeads: number
  activeProperties: number
  totalBookings: number
  recentLeads: any[]
  leadsByStatus: { status: string; count: number }[]
}

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  quoted: "bg-purple-100 text-purple-700",
  booked: "bg-green-100 text-green-700",
  lost: "bg-red-100 text-red-700",
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/dashboard/stats")
      .then((r) => r.json())
      .then((data) => {
        setStats(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-100 rounded w-48" />
          <div className="grid grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-28 bg-slate-100 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  const statCards = [
    {
      label: "Total Leads",
      value: stats?.totalLeads ?? 0,
      icon: Users,
      color: "bg-blue-50 text-blue-600",
      change: "All time",
    },
    {
      label: "New Leads",
      value: stats?.newLeads ?? 0,
      icon: TrendingUp,
      color: "bg-amber-50 text-amber-600",
      change: "Need action",
    },
    {
      label: "Active Properties",
      value: stats?.activeProperties ?? 0,
      icon: Building2,
      color: "bg-green-50 text-green-600",
      change: "Listed & available",
    },
    {
      label: "Total Bookings",
      value: stats?.totalBookings ?? 0,
      icon: CalendarCheck,
      color: "bg-purple-50 text-purple-600",
      change: "All time",
    },
  ]

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Welcome back. Here's what's happening.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/dashboard/properties/add"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-[#0F172A] text-sm font-medium rounded-xl hover:border-[#F59E0B] transition-colors"
          >
            <Plus size={16} />
            Add Property
          </Link>
          <Link
            href="/dashboard/leads"
            className="flex items-center gap-2 px-4 py-2 bg-[#F59E0B] hover:bg-[#D97706] text-white text-sm font-semibold rounded-xl transition-colors"
          >
            <Plus size={16} />
            View Leads
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-slate-500">{card.label}</p>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.color}`}>
                <card.icon size={18} />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-[#0F172A]">{card.value}</p>
            <p className="text-xs text-slate-400 mt-1">{card.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Recent leads table */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-[#0F172A]">Recent Leads</h2>
            <Link
              href="/dashboard/leads"
              className="text-xs text-[#F59E0B] hover:underline font-medium flex items-center gap-1"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Workers</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {stats?.recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-3">
                      <p className="text-sm font-medium text-[#0F172A]">{lead.name}</p>
                      <p className="text-xs text-slate-400">{lead.email}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{lead.location}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{lead.workers}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[lead.status] ?? "bg-slate-100 text-slate-600"}`}>
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6">
          <h2 className="text-base font-bold text-[#0F172A] mb-5">Leads by Status</h2>
          {stats?.leadsByStatus && stats.leadsByStatus.length > 0 ? (
            <BarChart data={stats.leadsByStatus} />
          ) : (
            <div className="h-56 flex items-center justify-center text-slate-400 text-sm">
              No data yet
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-6 bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="text-base font-bold text-[#0F172A] mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard/properties/add"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-white text-sm font-semibold rounded-xl transition-colors"
          >
            <Plus size={16} />
            Add Property
          </Link>
          <Link
            href="/dashboard/leads"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            <Users size={16} />
            Manage Leads
          </Link>
          <Link
            href="/properties"
            target="_blank"
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-[#0F172A] text-sm font-medium rounded-xl hover:border-[#F59E0B] transition-colors"
          >
            View Live Site
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
