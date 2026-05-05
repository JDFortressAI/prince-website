import { NextResponse } from 'next/server'
import { getAllUsers, createUser } from '@/lib/data/users'

export async function GET() {
  try {
    const users = await getAllUsers()
    return NextResponse.json(users)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const user = await createUser(body)
    return NextResponse.json(user, { status: 201 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create user'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
