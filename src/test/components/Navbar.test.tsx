/**
 * RED PHASE — Component tests for Navbar
 */
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Navbar from '@/components/Navbar'

describe('Navbar', () => {
  it('renders the brand name', () => {
    render(<Navbar />)
    expect(screen.getByText(/homes for workers/i)).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Navbar />)
    // getAllByRole because Home appears in logo + nav
    expect(screen.getAllByRole('link', { name: /home/i }).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByRole('link', { name: /our properties/i }).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByRole('link', { name: /list your property/i }).length).toBeGreaterThanOrEqual(1)
  })

  it('renders a CTA button', () => {
    render(<Navbar />)
    expect(screen.getAllByRole('link', { name: /get a quote/i }).length).toBeGreaterThanOrEqual(1)
  })

  it('renders phone number', () => {
    render(<Navbar />)
    expect(screen.getAllByText(/203 488 2119/).length).toBeGreaterThanOrEqual(1)
  })
})
