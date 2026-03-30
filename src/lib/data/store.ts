/**
 * In-memory data store — works in Node.js serverless AND in tests.
 * On Vercel: resets per cold start (fine for demo).
 * Swap this module for a real DB adapter in production.
 */
import { SEED_USERS, SEED_PROPERTIES, SEED_LEADS, SEED_BOOKINGS } from './seed'
import type { UserWithPassword, Lead, Property, Booking } from './types'

// Deep clone so mutations don't affect seed constants
function cloneSeed<T>(arr: T[]): T[] {
  return JSON.parse(JSON.stringify(arr))
}

let users: UserWithPassword[] = cloneSeed(SEED_USERS)
let leads: Lead[] = cloneSeed(SEED_LEADS)
let properties: Property[] = cloneSeed(SEED_PROPERTIES)
let bookings: Booking[] = cloneSeed(SEED_BOOKINGS)

export function getStore() {
  return { users, leads, properties, bookings }
}

/** Reset to seed data — used in tests before each test */
export function resetToSeed() {
  users = cloneSeed(SEED_USERS)
  leads = cloneSeed(SEED_LEADS)
  properties = cloneSeed(SEED_PROPERTIES)
  bookings = cloneSeed(SEED_BOOKINGS)
}

export { users, leads, properties, bookings }
