"use client"

import { useEffect, useState } from "react"
import { Search, X, ChevronDown, Loader2 } from "lucide-react"

type Lead = {
  id: string
  name: string
  email: string
  phone?: string
  location: string
  workers: string
  checkin?: string
  checkout?: string
  budget?: string
  sharedRooms: string
  message?: string
  status: string
  source: string
  createdAt: string
  updatedAt: string
}

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700 border-blue-200",
  contacted: "bg-yellow-100 text-yellow-700 border-yellow-200",
  quoted: "bg-purple-100 text-purple-700 border-purple-200",
  booked: "bg-green-100 text-green-700 border-green-200",
  lost: "bg-red-100 text-red-700 border-red-200",
}

const statusOptions = ["new", "contacted", "quoted", "booked", "lost"]
const tabs = ["All", "New", "Contacted", "Quoted", "Booked", "Lost"]

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState("All")
  const [selected, setSelected] = useState<Lead | null>(null)
  const [updating, setUpdating] = useState(false)
  const [newStatus, setNewStatus] = useState("")

  const fetchLeads = async () => {
    const res = await fetch("/api/leads")
    const data = await res.json()
    setLeads(data)
    setLoading(false)
  }

  useEffect(() => { fetchLeads() }, [])

  const filtered = leads.filter((lead) => {
    const matchesTab =
      activeTab === "All" || lead.status === activeTab.toLowerCase()
    const matchesSearch =
      !search ||
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.location.toLowerCase().includes(search.toLowerCase())
    return matchesTab && matchesSearch
  })

  const handleUpdateStatus = async () => {
    if (!selected || !newStatus) return
    setUpdating(true)
    try {
      const res = await fetch(`/api/leads/${selected.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        const updated = await res.json()
        setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)))
        setSelected(updated)
      }
    } finally {
      setUpdating(false)
    }
  }

  const tabCounts = tabs.reduce((acc, t) => {
    acc[t] =
      t === "All"
        ? leads.length
        : leads.filter((l) => l.status === t.toLowerCase()).length
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="flex h-full">
      {/* Main panel */}
      <div className={`flex-1 flex flex-col overflow-hidden ${selected ? "hidden lg:flex" : "flex"}`}>
        {/* Header */}
        <div className="px-6 sm:px-8 pt-8 pb-4 bg-white border-b border-slate-100">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-2xl font-bold text-[#0F172A]">Leads</h1>
              <p className="text-slate-500 text-sm">{leads.length} total leads</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === tab
                    ? "bg-[#0F172A] text-white"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                {tab}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === tab ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                }`}>
                  {tabCounts[tab]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto bg-slate-50 p-4">
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <Loader2 className="animate-spin text-slate-400" size={24} />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-400">No leads found</div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Workers</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Dates</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Budget</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Source</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => { setSelected(lead); setNewStatus(lead.status) }}
                      className={`cursor-pointer hover:bg-amber-50/40 transition-colors ${
                        selected?.id === lead.id ? "bg-amber-50" : ""
                      }`}
                    >
                      <td className="px-5 py-3">
                        <p className="text-sm font-semibold text-[#0F172A]">{lead.name}</p>
                        <p className="text-xs text-slate-400">{lead.email}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{lead.location}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{lead.workers}</td>
                      <td className="px-4 py-3 text-xs text-slate-500">
                        {lead.checkin && <div>{lead.checkin}</div>}
                        {lead.checkout && <div className="text-slate-400">{lead.checkout}</div>}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{lead.budget || "—"}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColors[lead.status] ?? "bg-slate-100 text-slate-600 border-slate-200"}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-400">{lead.source}</td>
                      <td className="px-4 py-3 text-xs text-slate-400">
                        {new Date(lead.createdAt).toLocaleDateString("en-GB")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="w-full lg:w-96 bg-white border-l border-slate-100 flex flex-col overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-[#0F172A]">Lead Details</h2>
            <button
              onClick={() => setSelected(null)}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {/* Name & email */}
            <div>
              <p className="text-lg font-bold text-[#0F172A]">{selected.name}</p>
              <a href={`mailto:${selected.email}`} className="text-sm text-[#F59E0B] hover:underline">
                {selected.email}
              </a>
              {selected.phone && (
                <p className="text-sm text-slate-500 mt-0.5">{selected.phone}</p>
              )}
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Location", value: selected.location },
                { label: "Workers", value: selected.workers },
                { label: "Check-in", value: selected.checkin || "—" },
                { label: "Check-out", value: selected.checkout || "—" },
                { label: "Budget", value: selected.budget || "—" },
                { label: "Shared Rooms", value: selected.sharedRooms },
                { label: "Source", value: selected.source },
                {
                  label: "Created",
                  value: new Date(selected.createdAt).toLocaleDateString("en-GB"),
                },
              ].map((item) => (
                <div key={item.label} className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400 mb-0.5">{item.label}</p>
                  <p className="text-sm font-medium text-[#0F172A]">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Message */}
            {selected.message && (
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">Message</p>
                <p className="text-sm text-slate-700 leading-relaxed">{selected.message}</p>
              </div>
            )}

            {/* Status update */}
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
              <p className="text-sm font-semibold text-[#0F172A] mb-3">Update Status</p>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#F59E0B] bg-white"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
                <button
                  onClick={handleUpdateStatus}
                  disabled={updating || newStatus === selected.status}
                  className="px-4 py-2 bg-[#F59E0B] hover:bg-[#D97706] disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2"
                >
                  {updating ? <Loader2 size={14} className="animate-spin" /> : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
