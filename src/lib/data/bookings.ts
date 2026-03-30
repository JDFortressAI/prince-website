import { getStore } from './store'
import type { Booking, CreateBookingInput } from './types'

function now() {
  return new Date().toISOString()
}

function uid() {
  return `booking-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export async function getBookings(): Promise<Booking[]> {
  const { bookings } = getStore()
  return [...bookings].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export async function getBookingById(id: string): Promise<Booking | null> {
  const { bookings } = getStore()
  return bookings.find(b => b.id === id) ?? null
}

export async function createBooking(input: CreateBookingInput): Promise<Booking> {
  const { bookings } = getStore()
  const booking: Booking = {
    id: uid(),
    ...input,
    createdAt: now(),
    updatedAt: now(),
  }
  bookings.push(booking)
  return booking
}
