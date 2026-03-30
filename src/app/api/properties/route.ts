import { NextResponse } from 'next/server'
import { getProperties, createProperty } from '@/lib/data/properties'

export async function GET() {
  try {
    const properties = await getProperties()
    return NextResponse.json(properties)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const property = await createProperty(body)
    return NextResponse.json(property, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create property' }, { status: 500 })
  }
}
