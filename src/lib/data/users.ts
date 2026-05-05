import { getStore } from './store'
import type { User, UserWithPassword } from './types'

function uid() {
  return `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function now() {
  return new Date().toISOString()
}

export async function getUserByEmail(email: string): Promise<UserWithPassword | null> {
  const { users } = getStore()
  return users.find(u => u.email === email) ?? null
}

/**
 * For demo: plain-text comparison (no bcrypt overhead in serverless cold start).
 * In production: swap to bcrypt.compare(plain, hash).
 */
export async function verifyPassword(plain: string, stored: string): Promise<boolean> {
  return plain === stored
}

export async function getAllUsers(): Promise<User[]> {
  const { users } = getStore()
  return users.map(({ password: _pw, ...user }) => user)
}

export async function getUserById(id: string): Promise<User | null> {
  const { users } = getStore()
  const user = users.find(u => u.id === id)
  if (!user) return null
  const { password: _pw, ...safeUser } = user
  return safeUser
}

export async function updateUser(id: string, input: {
  name?: string
  email?: string
  role?: string
}): Promise<User | null> {
  const { users } = getStore()
  const user = users.find(u => u.id === id)
  if (!user) return null

  if (input.name !== undefined) user.name = input.name
  if (input.email !== undefined) {
    if (users.some(u => u.email === input.email && u.id !== id)) {
      throw new Error(`User with email ${input.email} already exists`)
    }
    user.email = input.email
  }
  if (input.role !== undefined) user.role = input.role

  const { password: _pw, ...safeUser } = user
  return safeUser
}

export async function deleteUser(id: string): Promise<boolean> {
  const { users } = getStore()
  const index = users.findIndex(u => u.id === id)
  if (index === -1) return false
  users.splice(index, 1)
  return true
}

export async function changePassword(id: string, newPassword: string): Promise<boolean> {
  const { users } = getStore()
  const user = users.find(u => u.id === id)
  if (!user) return false
  user.password = newPassword
  return true
}

export async function createUser(input: {
  name: string
  email: string
  password: string
  role: string
}): Promise<User> {
  const { users } = getStore()

  if (users.some(u => u.email === input.email)) {
    throw new Error(`User with email ${input.email} already exists`)
  }

  const userWithPassword: UserWithPassword = {
    id: uid(),
    email: input.email,
    name: input.name,
    role: input.role,
    password: input.password, // store plain for demo; hash in prod
    createdAt: now(),
  }
  users.push(userWithPassword)

  // Return without password
  const { password: _pw, ...user } = userWithPassword
  return user
}
