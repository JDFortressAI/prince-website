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
