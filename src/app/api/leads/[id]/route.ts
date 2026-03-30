import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const lead = await prisma.lead.findUnique({ where: { id } })
    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 })
    }
    return NextResponse.json(lead)
  } catch {
    return NextResponse.json({ error: "Failed to fetch lead" }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const lead = await prisma.lead.update({
      where: { id },
      data: {
        ...(body.status !== undefined && { status: body.status }),
        ...(body.name !== undefined && { name: body.name }),
        ...(body.email !== undefined && { email: body.email }),
        ...(body.phone !== undefined && { phone: body.phone }),
        ...(body.location !== undefined && { location: body.location }),
        ...(body.workers !== undefined && { workers: body.workers }),
        ...(body.checkin !== undefined && { checkin: body.checkin }),
        ...(body.checkout !== undefined && { checkout: body.checkout }),
        ...(body.budget !== undefined && { budget: body.budget }),
        ...(body.sharedRooms !== undefined && { sharedRooms: body.sharedRooms }),
        ...(body.message !== undefined && { message: body.message }),
      },
    })
    return NextResponse.json(lead)
  } catch {
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 })
  }
}
