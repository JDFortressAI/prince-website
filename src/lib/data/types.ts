export interface User {
  id: string
  email: string
  name: string
  role: string
  createdAt: string
}

export interface UserWithPassword extends User {
  password: string
}

export interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  location: string
  workers: string
  checkin?: string
  checkout?: string
  budget?: string
  sharedRooms: string
  message?: string
  status: string
  source: string
  createdAt: string
  updatedAt: string
}

export interface Property {
  id: string
  title: string
  address: string
  city: string
  postcode: string
  bedrooms: number
  bathrooms: number
  maxGuests: number
  type: string
  status: string
  amenities: string[]
  description: string
  pricePerNight?: number
  available: boolean
  images?: string[]
  createdAt: string
  updatedAt: string
}

export interface Booking {
  id: string
  propertyId: string
  leadId?: string
  guestName: string
  guestEmail: string
  checkin: string
  checkout: string
  workers: number
  totalCost?: number
  status: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export type CreateLeadInput = Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'sharedRooms'> & {
  sharedRooms?: string
}

export type UpdateLeadInput = Partial<Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>>

export type CreatePropertyInput = Omit<Property, 'id' | 'status' | 'available' | 'createdAt' | 'updatedAt'>

export type UpdatePropertyInput = Partial<Omit<Property, 'id' | 'createdAt' | 'updatedAt'>>

export type CreateBookingInput = Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>

export interface DashboardStats {
  totalLeads: number
  newLeads: number
  activeProperties: number
  totalBookings: number
  recentLeads: Lead[]
  leadsByStatus: { status: string; count: number }[]
}
