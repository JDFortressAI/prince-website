/**
 * RED PHASE — Tests written before implementation
 * Data layer: Lead CRUD operations
 */
import { describe, it, expect, beforeEach } from 'vitest'
import {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  getLeadsByStatus,
  searchLeads,
} from '@/lib/data/leads'
import type { Lead, CreateLeadInput, UpdateLeadInput } from '@/lib/data/types'

beforeEach(async () => {
  // Reset to seed data before each test
  const { resetToSeed } = await import('@/lib/data/store')
  resetToSeed()
})

describe('getLeads()', () => {
  it('returns an array', async () => {
    const leads = await getLeads()
    expect(Array.isArray(leads)).toBe(true)
  })

  it('returns at least 6 seeded leads', async () => {
    const leads = await getLeads()
    expect(leads.length).toBeGreaterThanOrEqual(6)
  })

  it('each lead has required fields', async () => {
    const leads = await getLeads()
    for (const lead of leads) {
      expect(lead).toHaveProperty('id')
      expect(lead).toHaveProperty('name')
      expect(lead).toHaveProperty('email')
      expect(lead).toHaveProperty('location')
      expect(lead).toHaveProperty('workers')
      expect(lead).toHaveProperty('status')
      expect(lead).toHaveProperty('createdAt')
    }
  })

  it('returns leads sorted by createdAt descending', async () => {
    const leads = await getLeads()
    for (let i = 0; i < leads.length - 1; i++) {
      expect(new Date(leads[i].createdAt).getTime()).toBeGreaterThanOrEqual(
        new Date(leads[i + 1].createdAt).getTime()
      )
    }
  })
})

describe('getLeadById()', () => {
  it('returns the correct lead by id', async () => {
    const leads = await getLeads()
    const first = leads[0]
    const found = await getLeadById(first.id)
    expect(found).not.toBeNull()
    expect(found!.id).toBe(first.id)
  })

  it('returns null for unknown id', async () => {
    const result = await getLeadById('nonexistent-id-xyz')
    expect(result).toBeNull()
  })
})

describe('createLead()', () => {
  it('creates a new lead and returns it', async () => {
    const input: CreateLeadInput = {
      name: 'Test Corp',
      email: 'test@testcorp.com',
      location: 'Birmingham',
      workers: '5 to 6',
      status: 'new',
      source: 'website',
    }
    const lead = await createLead(input)
    expect(lead.id).toBeDefined()
    expect(lead.name).toBe('Test Corp')
    expect(lead.email).toBe('test@testcorp.com')
    expect(lead.location).toBe('Birmingham')
    expect(lead.status).toBe('new')
  })

  it('new lead appears in getLeads()', async () => {
    const before = await getLeads()
    await createLead({ name: 'NewCo', email: 'new@co.com', location: 'Leeds', workers: '1 to 2', status: 'new', source: 'website' })
    const after = await getLeads()
    expect(after.length).toBe(before.length + 1)
  })

  it('assigns a unique id to each lead', async () => {
    const a = await createLead({ name: 'A', email: 'a@a.com', location: 'A', workers: '1 to 2', status: 'new', source: 'website' })
    const b = await createLead({ name: 'B', email: 'b@b.com', location: 'B', workers: '1 to 2', status: 'new', source: 'website' })
    expect(a.id).not.toBe(b.id)
  })

  it('defaults status to new if not provided', async () => {
    const input = { name: 'C', email: 'c@c.com', location: 'C', workers: '1 to 2', source: 'website' } as CreateLeadInput
    const lead = await createLead(input)
    expect(lead.status).toBe('new')
  })
})

describe('updateLead()', () => {
  it('updates lead status', async () => {
    const leads = await getLeads()
    const id = leads[0].id
    const updated = await updateLead(id, { status: 'contacted' })
    expect(updated).not.toBeNull()
    expect(updated!.status).toBe('contacted')
  })

  it('partial update does not clobber other fields', async () => {
    const leads = await getLeads()
    const original = leads[0]
    const updated = await updateLead(original.id, { status: 'quoted' })
    expect(updated!.name).toBe(original.name)
    expect(updated!.email).toBe(original.email)
    expect(updated!.location).toBe(original.location)
  })

  it('returns null for unknown id', async () => {
    const result = await updateLead('no-such-id', { status: 'lost' })
    expect(result).toBeNull()
  })

  it('valid statuses are: new contacted quoted booked lost', async () => {
    const leads = await getLeads()
    const id = leads[0].id
    const validStatuses = ['new', 'contacted', 'quoted', 'booked', 'lost']
    for (const status of validStatuses) {
      const updated = await updateLead(id, { status })
      expect(updated!.status).toBe(status)
    }
  })
})

describe('getLeadsByStatus()', () => {
  it('returns only leads with the given status', async () => {
    const newLeads = await getLeadsByStatus('new')
    for (const lead of newLeads) {
      expect(lead.status).toBe('new')
    }
  })

  it('returns empty array for status with no matches', async () => {
    // mark all as booked first
    const leads = await getLeads()
    for (const l of leads) await updateLead(l.id, { status: 'booked' })
    const newOnes = await getLeadsByStatus('new')
    expect(newOnes).toHaveLength(0)
  })
})

describe('searchLeads()', () => {
  it('finds leads by name (case-insensitive)', async () => {
    const leads = await getLeads()
    const target = leads[0]
    const results = await searchLeads(target.name.toLowerCase().slice(0, 4))
    expect(results.some(l => l.id === target.id)).toBe(true)
  })

  it('finds leads by location', async () => {
    const results = await searchLeads('Manchester')
    expect(results.length).toBeGreaterThan(0)
    expect(results.every(l =>
      l.location.toLowerCase().includes('manchester') ||
      l.name.toLowerCase().includes('manchester') ||
      l.email.toLowerCase().includes('manchester')
    )).toBe(true)
  })

  it('returns empty array for no matches', async () => {
    const results = await searchLeads('zzznomatchzzz')
    expect(results).toHaveLength(0)
  })
})
