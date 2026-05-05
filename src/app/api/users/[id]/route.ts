import { NextRequest, NextResponse } from 'next/server'
import { getUserById, updateUser, deleteUser, changePassword } from '@/lib/data/users'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const user = await getUserById(id)
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    return NextResponse.json(user)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()

    if (body.password) {
      const ok = await changePassword(id, body.password)
      if (!ok) return NextResponse.json({ error: 'User not found' }, { status: 404 })
      return NextResponse.json({ success: true })
    }

    const user = await updateUser(id, {
      name: body.name,
      email: body.email,
      role: body.role,
    })
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    return NextResponse.json(user)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update user'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const ok = await deleteUser(id)
    if (!ok) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}
