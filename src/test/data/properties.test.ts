/**
 * RED PHASE — Tests written before implementation
 * Data layer: Property CRUD operations
 */
import { describe, it, expect, beforeEach } from 'vitest'
import {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  toggleAvailability,
  getPropertiesByCity,
} from '@/lib/data/properties'
import type { CreatePropertyInput } from '@/lib/data/types'

beforeEach(async () => {
  const { resetToSeed } = await import('@/lib/data/store')
  resetToSeed()
})

describe('getProperties()', () => {
  it('returns an array', async () => {
    const props = await getProperties()
    expect(Array.isArray(props)).toBe(true)
  })

  it('returns at least 5 seeded properties', async () => {
    const props = await getProperties()
    expect(props.length).toBeGreaterThanOrEqual(5)
  })

  it('each property has required fields', async () => {
    const props = await getProperties()
    for (const p of props) {
      expect(p).toHaveProperty('id')
      expect(p).toHaveProperty('title')
      expect(p).toHaveProperty('city')
      expect(p).toHaveProperty('postcode')
      expect(p).toHaveProperty('bedrooms')
      expect(p).toHaveProperty('bathrooms')
      expect(p).toHaveProperty('maxGuests')
      expect(p).toHaveProperty('type')
      expect(p).toHaveProperty('status')
      expect(p).toHaveProperty('amenities')
      expect(p).toHaveProperty('available')
    }
  })
})

describe('getPropertyById()', () => {
  it('returns the correct property', async () => {
    const props = await getProperties()
    const target = props[0]
    const found = await getPropertyById(target.id)
    expect(found).not.toBeNull()
    expect(found!.id).toBe(target.id)
  })

  it('returns null for unknown id', async () => {
    const result = await getPropertyById('no-such-property')
    expect(result).toBeNull()
  })
})

describe('createProperty()', () => {
  it('creates and returns a new property', async () => {
    const input: CreatePropertyInput = {
      title: 'Test House',
      address: '1 Test Street',
      city: 'Sheffield',
      postcode: 'S1 1AA',
      bedrooms: 4,
      bathrooms: 2,
      maxGuests: 6,
      type: 'House',
      amenities: ['WiFi', 'Kitchen', 'Parking'],
      description: 'A test property',
      pricePerNight: 120,
    }
    const prop = await createProperty(input)
    expect(prop.id).toBeDefined()
    expect(prop.title).toBe('Test House')
    expect(prop.city).toBe('Sheffield')
    expect(prop.bedrooms).toBe(4)
    expect(prop.status).toBe('active')
    expect(prop.available).toBe(true)
  })

  it('new property appears in getProperties()', async () => {
    const before = await getProperties()
    await createProperty({
      title: 'New Place', address: '2 New St', city: 'Hull', postcode: 'HU1 1AA',
      bedrooms: 2, bathrooms: 1, maxGuests: 3, type: 'Apartment',
      amenities: ['WiFi'], description: 'Test', pricePerNight: 80,
    })
    const after = await getProperties()
    expect(after.length).toBe(before.length + 1)
  })
})

describe('updateProperty()', () => {
  it('updates property fields', async () => {
    const props = await getProperties()
    const id = props[0].id
    const updated = await updateProperty(id, { status: 'inactive', pricePerNight: 999 })
    expect(updated!.status).toBe('inactive')
    expect(updated!.pricePerNight).toBe(999)
  })

  it('returns null for unknown id', async () => {
    const result = await updateProperty('ghost-id', { status: 'inactive' })
    expect(result).toBeNull()
  })
})

describe('toggleAvailability()', () => {
  it('flips available from true to false', async () => {
    const props = await getProperties()
    const target = props.find(p => p.available)!
    const toggled = await toggleAvailability(target.id)
    expect(toggled!.available).toBe(false)
  })

  it('flips available from false to true', async () => {
    const props = await getProperties()
    const target = props[0]
    await toggleAvailability(target.id) // → false
    const toggled = await toggleAvailability(target.id) // → true
    expect(toggled!.available).toBe(true)
  })
})

describe('getPropertiesByCity()', () => {
  it('returns only properties in the given city (case-insensitive)', async () => {
    const results = await getPropertiesByCity('london')
    for (const p of results) {
      expect(p.city.toLowerCase()).toContain('london')
    }
  })

  it('returns empty array for unknown city', async () => {
    const results = await getPropertiesByCity('timbuktu')
    expect(results).toHaveLength(0)
  })
})
