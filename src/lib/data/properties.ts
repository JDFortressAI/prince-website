import { getStore } from './store'
import type { Property, CreatePropertyInput, UpdatePropertyInput } from './types'

function now() {
  return new Date().toISOString()
}

function uid() {
  return `prop-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export async function getProperties(): Promise<Property[]> {
  const { properties } = getStore()
  return [...properties].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const { properties } = getStore()
  return properties.find(p => p.id === id) ?? null
}

export async function createProperty(input: CreatePropertyInput): Promise<Property> {
  const { properties } = getStore()
  const property: Property = {
    id: uid(),
    ...input,
    status: 'active',
    available: true,
    createdAt: now(),
    updatedAt: now(),
  }
  properties.push(property)
  return property
}

export async function updateProperty(id: string, input: UpdatePropertyInput): Promise<Property | null> {
  const { properties } = getStore()
  const idx = properties.findIndex(p => p.id === id)
  if (idx === -1) return null
  properties[idx] = { ...properties[idx], ...input, updatedAt: now() }
  return properties[idx]
}

export async function toggleAvailability(id: string): Promise<Property | null> {
  const { properties } = getStore()
  const idx = properties.findIndex(p => p.id === id)
  if (idx === -1) return null
  properties[idx] = {
    ...properties[idx],
    available: !properties[idx].available,
    updatedAt: now(),
  }
  return properties[idx]
}

export async function getPropertiesByCity(city: string): Promise<Property[]> {
  const { properties } = getStore()
  const q = city.toLowerCase()
  return properties.filter(p => p.city.toLowerCase().includes(q))
}
