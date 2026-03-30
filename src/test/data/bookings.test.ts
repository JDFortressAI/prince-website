/**
 * RED PHASE — Tests written before implementation
 * Data layer: Booking operations
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { getBookings, createBooking, getBookingById } from '@/lib/data/bookings'
import type { CreateBookingInput } from '@/lib/data/types'

beforeEach(async () => {
  const { resetToSeed } = await import('@/lib/data/store')
  resetToSeed()
})

describe('getBookings()', () => {
  it('returns an array', async () => {
    const bookings = await getBookings()
    expect(Array.isArray(bookings)).toBe(true)
  })

  it('returns at least 3 seeded bookings', async () => {
    const bookings = await getBookings()
    expect(bookings.length).toBeGreaterThanOrEqual(3)
  })

  it('each booking has required fields', async () => {
    const bookings = await getBookings()
    for (const b of bookings) {
      expect(b).toHaveProperty('id')
      expect(b).toHaveProperty('propertyId')
      expect(b).toHaveProperty('guestName')
      expect(b).toHaveProperty('guestEmail')
      expect(b).toHaveProperty('checkin')
      expect(b).toHaveProperty('checkout')
      expect(b).toHaveProperty('workers')
      expect(b).toHaveProperty('status')
    }
  })
})

describe('getBookingById()', () => {
  it('returns the correct booking', async () => {
    const bookings = await getBookings()
    const found = await getBookingById(bookings[0].id)
    expect(found).not.toBeNull()
    expect(found!.id).toBe(bookings[0].id)
  })

  it('returns null for unknown id', async () => {
    const result = await getBookingById('ghost')
    expect(result).toBeNull()
  })
})

describe('createBooking()', () => {
  it('creates a booking and returns it', async () => {
    const input: CreateBookingInput = {
      propertyId: 'prop-1',
      guestName: 'HS2 Rail Ltd',
      guestEmail: 'hs2@hs2.co.uk',
      checkin: '2026-05-01',
      checkout: '2026-06-01',
      workers: 8,
      totalCost: 3600,
      status: 'confirmed',
    }
    const booking = await createBooking(input)
    expect(booking.id).toBeDefined()
    expect(booking.guestName).toBe('HS2 Rail Ltd')
    expect(booking.workers).toBe(8)
    expect(booking.status).toBe('confirmed')
  })

  it('new booking appears in getBookings()', async () => {
    const before = await getBookings()
    await createBooking({ propertyId: 'p', guestName: 'X', guestEmail: 'x@x.com', checkin: '2026-06-01', checkout: '2026-07-01', workers: 2, status: 'confirmed' })
    const after = await getBookings()
    expect(after.length).toBe(before.length + 1)
  })
})
