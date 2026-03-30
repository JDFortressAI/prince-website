"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const scrollToQuote = (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById("quote")
    if (el) el.scrollIntoView({ behavior: "smooth" })
    setOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 text-xl font-bold text-navy-900">
            <span className="text-[#0F172A]">Homes For Workers</span>
            <span className="text-[#F59E0B] text-2xl leading-none">.</span>
          </Link>

          {/* Phone — always visible */}
          <a href="tel:+442034882119" className="hidden sm:flex items-center gap-1 text-xs text-slate-500 hover:text-[#F59E0B] transition-colors">
            <span>+44 203 488 2119</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-[#0F172A] transition-colors">
              Home
            </Link>
            <Link href="/properties" className="text-sm font-medium text-slate-600 hover:text-[#0F172A] transition-colors">
              Our Properties
            </Link>
            <Link href="/for-hosts" className="text-sm font-medium text-slate-600 hover:text-[#0F172A] transition-colors">
              List Your Property
            </Link>
            <Link href="/contact" className="text-sm font-medium text-slate-600 hover:text-[#0F172A] transition-colors">
              Contact
            </Link>
            <a
              href="#quote"
              onClick={scrollToQuote}
              className="ml-2 px-4 py-2 bg-[#F59E0B] hover:bg-[#D97706] text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
            >
              Get a Quote
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-[#0F172A] hover:bg-slate-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-1">
          <Link
            href="/"
            className="block py-2 text-sm font-medium text-slate-700 hover:text-[#0F172A]"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/properties"
            className="block py-2 text-sm font-medium text-slate-700 hover:text-[#0F172A]"
            onClick={() => setOpen(false)}
          >
            Our Properties
          </Link>
          <Link
            href="/for-hosts"
            className="block py-2 text-sm font-medium text-slate-700 hover:text-[#0F172A]"
            onClick={() => setOpen(false)}
          >
            List Your Property
          </Link>
          <Link
            href="/contact"
            className="block py-2 text-sm font-medium text-slate-700 hover:text-[#0F172A]"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
          <div className="pt-2">
            <a
              href="#quote"
              onClick={scrollToQuote}
              className="block w-full text-center px-4 py-2 bg-[#F59E0B] hover:bg-[#D97706] text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Get a Quote
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
