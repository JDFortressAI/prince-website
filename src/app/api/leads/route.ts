import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(leads)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const lead = await prisma.lead.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        location: body.location,
        workers: body.workers,
        checkin: body.checkin || null,
        checkout: body.checkout || null,
        budget: body.budget || null,
        sharedRooms: body.sharedRooms || "Yes",
        message: body.message || null,
        status: body.status || "new",
        source: body.source || "website",
      },
    })
    return NextResponse.json(lead, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 })
  }
}
