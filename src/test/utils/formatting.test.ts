/**
 * RED PHASE — Utility function tests
 */
import { describe, it, expect } from 'vitest'
import {
  formatDate,
  formatCurrency,
  getStatusColor,
  slugify,
  truncate,
} from '@/lib/utils/formatting'

describe('formatDate()', () => {
  it('formats ISO date string to readable format', () => {
    const result = formatDate('2026-05-15T00:00:00.000Z')
    expect(result).toContain('2026')
    expect(result).toMatch(/may|15/i)
  })

  it('handles Date objects', () => {
    const result = formatDate(new Date('2026-01-01'))
    expect(result).toContain('2026')
  })

  it('returns "N/A" for null/undefined', () => {
    expect(formatDate(null)).toBe('N/A')
    expect(formatDate(undefined)).toBe('N/A')
  })
})

describe('formatCurrency()', () => {
  it('formats a number as GBP', () => {
    const result = formatCurrency(150)
    expect(result).toContain('150')
    expect(result).toMatch(/£|\bGBP\b/)
  })

  it('formats zero', () => {
    const result = formatCurrency(0)
    expect(result).toBeDefined()
  })

  it('handles decimal amounts', () => {
    const result = formatCurrency(99.99)
    expect(result).toContain('99')
  })
})

describe('getStatusColor()', () => {
  it('returns a colour class for "new"', () => {
    expect(getStatusColor('new')).toBeTruthy()
    expect(typeof getStatusColor('new')).toBe('string')
  })

  it('returns different colours for different statuses', () => {
    const statuses = ['new', 'contacted', 'quoted', 'booked', 'lost']
    const colours = statuses.map(getStatusColor)
    // At least some should differ
    const unique = new Set(colours)
    expect(unique.size).toBeGreaterThan(1)
  })

  it('returns a fallback for unknown status', () => {
    const result = getStatusColor('unknown-status')
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
  })
})

describe('slugify()', () => {
  it('lowercases and replaces spaces with hyphens', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })

  it('removes special characters', () => {
    expect(slugify('Hello, World!')).toBe('hello-world')
  })

  it('handles multiple spaces', () => {
    expect(slugify('a  b  c')).toBe('a-b-c')
  })
})

describe('truncate()', () => {
  it('returns string as-is if under limit', () => {
    expect(truncate('Hello', 10)).toBe('Hello')
  })

  it('truncates and adds ellipsis if over limit', () => {
    const result = truncate('Hello World', 5)
    expect(result.length).toBeLessThanOrEqual(8) // 5 + ...
    expect(result).toContain('...')
  })

  it('handles empty string', () => {
    expect(truncate('', 10)).toBe('')
  })
})
