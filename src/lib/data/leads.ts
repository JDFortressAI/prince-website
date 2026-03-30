import { getStore } from './store'
import type { Lead, CreateLeadInput, UpdateLeadInput } from './types'

function now() {
  return new Date().toISOString()
}

function uid() {
  return `lead-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export async function getLeads(): Promise<Lead[]> {
  const { leads } = getStore()
  return [...leads].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export async function getLeadById(id: string): Promise<Lead | null> {
  const { leads } = getStore()
  return leads.find(l => l.id === id) ?? null
}

export async function createLead(input: CreateLeadInput): Promise<Lead> {
  const { leads } = getStore()
  const lead: Lead = {
    id: uid(),
    name: input.name,
    email: input.email,
    phone: input.phone,
    location: input.location,
    workers: input.workers,
    checkin: input.checkin,
    checkout: input.checkout,
    budget: input.budget,
    sharedRooms: input.sharedRooms ?? 'Yes',
    message: input.message,
    status: input.status ?? 'new',
    source: input.source ?? 'website',
    createdAt: now(),
    updatedAt: now(),
  }
  leads.push(lead)
  return lead
}

export async function updateLead(id: string, input: UpdateLeadInput): Promise<Lead | null> {
  const { leads } = getStore()
  const idx = leads.findIndex(l => l.id === id)
  if (idx === -1) return null
  leads[idx] = { ...leads[idx], ...input, updatedAt: now() }
  return leads[idx]
}

export async function getLeadsByStatus(status: string): Promise<Lead[]> {
  const { leads } = getStore()
  return leads.filter(l => l.status === status)
}

export async function searchLeads(query: string): Promise<Lead[]> {
  const { leads } = getStore()
  const q = query.toLowerCase()
  return leads.filter(l =>
    l.name.toLowerCase().includes(q) ||
    l.email.toLowerCase().includes(q) ||
    l.location.toLowerCase().includes(q) ||
    (l.message ?? '').toLowerCase().includes(q)
  )
}
