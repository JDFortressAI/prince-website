import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const [totalLeads, newLeads, activeProperties, totalBookings, recentLeads, allLeads] =
      await Promise.all([
        prisma.lead.count(),
        prisma.lead.count({ where: { status: "new" } }),
        prisma.property.count({ where: { status: "active" } }),
        prisma.booking.count(),
        prisma.lead.findMany({
          orderBy: { createdAt: "desc" },
          take: 5,
        }),
        prisma.lead.findMany({ select: { status: true } }),
      ])

    // Group leads by status
    const statusCounts: Record<string, number> = {}
    for (const lead of allLeads) {
      statusCounts[lead.status] = (statusCounts[lead.status] || 0) + 1
    }

    const leadsByStatus = Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count,
    }))

    return NextResponse.json({
      totalLeads,
      newLeads,
      activeProperties,
      totalBookings,
      recentLeads,
      leadsByStatus,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
