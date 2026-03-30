/**
 * RED PHASE — Tests written before implementation
 * Data layer: User auth operations
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { getUserByEmail, verifyPassword, createUser } from '@/lib/data/users'

beforeEach(async () => {
  const { resetToSeed } = await import('@/lib/data/store')
  resetToSeed()
})

describe('getUserByEmail()', () => {
  it('returns the seeded admin user', async () => {
    const user = await getUserByEmail('admin@homesforworkers.co.uk')
    expect(user).not.toBeNull()
    expect(user!.email).toBe('admin@homesforworkers.co.uk')
    expect(user!.role).toBe('admin')
  })

  it('returns null for unknown email', async () => {
    const user = await getUserByEmail('nobody@nowhere.com')
    expect(user).toBeNull()
  })
})

describe('verifyPassword()', () => {
  it('returns true for correct password', async () => {
    const valid = await verifyPassword('demo1234', 'demo1234')
    expect(valid).toBe(true)
  })

  it('returns false for wrong password', async () => {
    const valid = await verifyPassword('wrongpassword', 'demo1234')
    expect(valid).toBe(false)
  })

  it('is case-sensitive', async () => {
    const valid = await verifyPassword('DEMO1234', 'demo1234')
    expect(valid).toBe(false)
  })
})

describe('createUser()', () => {
  it('creates a user and returns it without password', async () => {
    const user = await createUser({ name: 'Test User', email: 'test@test.com', password: 'secret123', role: 'admin' })
    expect(user.id).toBeDefined()
    expect(user.email).toBe('test@test.com')
    expect(user.name).toBe('Test User')
    expect((user as any).password).toBeUndefined()
  })

  it('new user can be found by email', async () => {
    await createUser({ name: 'Jane', email: 'jane@hw.co.uk', password: 'abc123', role: 'admin' })
    const found = await getUserByEmail('jane@hw.co.uk')
    expect(found).not.toBeNull()
    expect(found!.name).toBe('Jane')
  })

  it('duplicate email throws', async () => {
    await expect(
      createUser({ name: 'Dupe', email: 'admin@homesforworkers.co.uk', password: 'x', role: 'admin' })
    ).rejects.toThrow()
  })
})
