import { NextResponse } from 'next/server'
import { getLeads, createLead } from '@/lib/data/leads'

export async function GET() {
  try {
    const leads = await getLeads()
    return NextResponse.json(leads)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const lead = await createLead(body)
    return NextResponse.json(lead, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 })
  }
}
