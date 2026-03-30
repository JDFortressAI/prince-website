/**
 * RED PHASE — Tests written before implementation
 * Data layer: Dashboard stats aggregation
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { getDashboardStats } from '@/lib/data/stats'
import { createLead, updateLead, getLeads } from '@/lib/data/leads'

beforeEach(async () => {
  const { resetToSeed } = await import('@/lib/data/store')
  resetToSeed()
})

describe('getDashboardStats()', () => {
  it('returns all required fields', async () => {
    const stats = await getDashboardStats()
    expect(stats).toHaveProperty('totalLeads')
    expect(stats).toHaveProperty('newLeads')
    expect(stats).toHaveProperty('activeProperties')
    expect(stats).toHaveProperty('totalBookings')
    expect(stats).toHaveProperty('recentLeads')
    expect(stats).toHaveProperty('leadsByStatus')
  })

  it('totalLeads equals number of leads', async () => {
    const leads = await getLeads()
    const stats = await getDashboardStats()
    expect(stats.totalLeads).toBe(leads.length)
  })

  it('newLeads counts only new status', async () => {
    const leads = await getLeads()
    const newCount = leads.filter(l => l.status === 'new').length
    const stats = await getDashboardStats()
    expect(stats.newLeads).toBe(newCount)
  })

  it('newLeads increases when a lead is added', async () => {
    const before = await getDashboardStats()
    await createLead({ name: 'Extra', email: 'x@x.com', location: 'York', workers: '1 to 2', status: 'new', source: 'website' })
    const after = await getDashboardStats()
    expect(after.newLeads).toBe(before.newLeads + 1)
    expect(after.totalLeads).toBe(before.totalLeads + 1)
  })

  it('newLeads decreases when a lead status changes', async () => {
    const leads = await getLeads()
    const newLead = leads.find(l => l.status === 'new')!
    const before = await getDashboardStats()
    await updateLead(newLead.id, { status: 'contacted' })
    const after = await getDashboardStats()
    expect(after.newLeads).toBe(before.newLeads - 1)
  })

  it('recentLeads has at most 5 entries', async () => {
    const stats = await getDashboardStats()
    expect(stats.recentLeads.length).toBeLessThanOrEqual(5)
  })

  it('leadsByStatus is an array of {status, count} objects', async () => {
    const stats = await getDashboardStats()
    expect(Array.isArray(stats.leadsByStatus)).toBe(true)
    for (const entry of stats.leadsByStatus) {
      expect(entry).toHaveProperty('status')
      expect(entry).toHaveProperty('count')
      expect(typeof entry.count).toBe('number')
    }
  })

  it('leadsByStatus counts sum to totalLeads', async () => {
    const stats = await getDashboardStats()
    const sum = stats.leadsByStatus.reduce((acc: number, e: { count: number }) => acc + e.count, 0)
    expect(sum).toBe(stats.totalLeads)
  })
})
