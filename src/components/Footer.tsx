import Link from "next/link"
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-1 text-xl font-bold mb-3">
              <span>Homes For Workers</span>
              <span className="text-[#F59E0B] text-2xl leading-none">.</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              The UK's trusted contractor accommodation marketplace. We house your workforce so you can focus on the project.
            </p>
            <div className="space-y-2">
              <a
                href="tel:+442034882119"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-[#F59E0B] transition-colors"
              >
                <Phone size={15} />
                +44 203 488 2119
              </a>
              <a
                href="mailto:hello@homesforworkers.co.uk"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-[#F59E0B] transition-colors"
              >
                <Mail size={15} />
                hello@homesforworkers.co.uk
              </a>
              <a
                href="https://wa.me/442034882119"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-[#F59E0B] transition-colors"
              >
                <MessageCircle size={15} />
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Discover Locations */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Discover Locations
            </h4>
            <ul className="space-y-2">
              {[
                "Gerrards Cross",
                "Grays, Essex",
                "Mill Hill, London",
                "St Helens",
                "Basildon",
                "Blyth, Northumberland",
                "Manchester",
                "Birmingham",
              ].map((loc) => (
                <li key={loc}>
                  <Link
                    href="/properties"
                    className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-[#F59E0B] transition-colors"
                  >
                    <MapPin size={12} className="shrink-0" />
                    {loc}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Contractor Accommodation", href: "/properties" },
                { label: "Team Housing", href: "/properties" },
                { label: "Flexible Short Stays", href: "/properties" },
                { label: "List Your Property", href: "/for-hosts" },
                { label: "Get a Quote", href: "/#quote" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-[#F59E0B] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "/contact" },
                { label: "Contact", href: "/contact" },
                { label: "For Property Owners", href: "/for-hosts" },
                { label: "Industries We Serve", href: "/#industries" },
                { label: "Admin Login", href: "/login" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-[#F59E0B] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Homes For Workers. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Connecting UK contractors with quality accommodation since 2020.
          </p>
        </div>
      </div>
    </footer>
  )
}
