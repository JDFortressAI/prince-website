import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const property = await prisma.property.findUnique({ where: { id } })
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }
    return NextResponse.json(property)
  } catch {
    return NextResponse.json({ error: "Failed to fetch property" }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const data: Record<string, any> = {}

    if (body.title !== undefined) data.title = body.title
    if (body.status !== undefined) data.status = body.status
    if (body.available !== undefined) data.available = body.available
    if (body.pricePerNight !== undefined) data.pricePerNight = body.pricePerNight
    if (body.description !== undefined) data.description = body.description

    const property = await prisma.property.update({ where: { id }, data })
    return NextResponse.json(property)
  } catch {
    return NextResponse.json({ error: "Failed to update property" }, { status: 500 })
  }
}
