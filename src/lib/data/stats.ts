import { getLeads } from './leads'
import { getProperties } from './properties'
import { getBookings } from './bookings'
import type { DashboardStats } from './types'

export async function getDashboardStats(): Promise<DashboardStats> {
  const [leads, properties, bookings] = await Promise.all([
    getLeads(),
    getProperties(),
    getBookings(),
  ])

  const totalLeads = leads.length
  const newLeads = leads.filter(l => l.status === 'new').length
  const activeProperties = properties.filter(p => p.status === 'active').length
  const totalBookings = bookings.length
  const recentLeads = leads.slice(0, 5)

  const statusMap: Record<string, number> = {}
  for (const lead of leads) {
    statusMap[lead.status] = (statusMap[lead.status] ?? 0) + 1
  }
  const leadsByStatus = Object.entries(statusMap).map(([status, count]) => ({ status, count }))

  return {
    totalLeads,
    newLeads,
    activeProperties,
    totalBookings,
    recentLeads,
    leadsByStatus,
  }
}
