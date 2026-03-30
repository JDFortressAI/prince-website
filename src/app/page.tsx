import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import QuoteForm from "@/components/QuoteForm"
import {
  MapPin,
  Users,
  Wifi,
  Home,
  Building2,
  Phone,
  CheckCircle,
  Clock,
  Star,
  ArrowRight,
  Zap,
  Shield,
  HeartHandshake,
  HardHat,
  Wrench,
  Truck,
  Factory,
} from "lucide-react"

const services = [
  {
    icon: Home,
    title: "Fully Furnished",
    desc: "Move-in ready properties with everything your team needs — beds, linen, kitchen essentials, and high-speed WiFi included.",
  },
  {
    icon: Users,
    title: "Team Accommodation",
    desc: "From 2 to 20+ workers, we source and manage properties that keep your crew together and comfortable.",
  },
  {
    icon: Clock,
    title: "Flexible Stays",
    desc: "Weekly, monthly or project-length bookings. We adapt to your schedule, not the other way around.",
  },
  {
    icon: MapPin,
    title: "Prime Locations",
    desc: "Properties close to major project sites across the UK — reducing commute time and keeping productivity high.",
  },
  {
    icon: Shield,
    title: "Professionally Managed",
    desc: "All properties are vetted, inspected, and managed. Any issues are handled fast — guaranteed.",
  },
  {
    icon: Phone,
    title: "24/7 Support",
    desc: "Real people, real responses. Our team is always available when your crew needs help.",
  },
]

const steps = [
  {
    n: "01",
    title: "Submit Your Request",
    desc: "Tell us where you need accommodation, how many workers, and when. Takes 2 minutes.",
  },
  {
    n: "02",
    title: "Get Your Quote",
    desc: "We source the best available properties and send you a tailored quote within 24 hours.",
  },
  {
    n: "03",
    title: "Move In",
    desc: "Once confirmed, your team checks in to a fully prepared, comfortable home away from home.",
  },
]

const whyUs = [
  {
    icon: Zap,
    title: "24-Hour Sourcing",
    desc: "We respond fast. Most accommodation requests are matched and quoted within a single working day.",
  },
  {
    icon: HeartHandshake,
    title: "Dedicated Account Manager",
    desc: "One point of contact who knows your project. No call centres, no being passed around.",
  },
  {
    icon: CheckCircle,
    title: "Fully Vetted Properties",
    desc: "Every property is inspected before booking. Your crew deserves a safe, clean place to rest.",
  },
]

const stats = [
  { value: "500+", label: "Stays Delivered" },
  { value: "50+", label: "UK Locations" },
  { value: "24h", label: "Sourcing Time" },
  { value: "100%", label: "Dedicated Support" },
]

const industries = [
  { icon: HardHat, label: "Construction" },
  { icon: Zap, label: "Engineering" },
  { icon: Truck, label: "Infrastructure" },
  { icon: Factory, label: "Industrial" },
  { icon: Wrench, label: "Maintenance" },
  { icon: Building2, label: "Fit-Out" },
]

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <section className="hero-gradient min-h-[92vh] flex items-center relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 right-0 w-96 h-96 bg-[#F59E0B] rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-400 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full border border-white/20 mb-6">
                <span className="w-2 h-2 bg-[#F59E0B] rounded-full animate-pulse" />
                Trusted by construction & engineering companies across the UK
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                Reliable Contractor{" "}
                <span className="text-[#F59E0B]">Accommodation</span>{" "}
                Across the UK
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
                We house your workforce so you can focus on the project. Quality furnished accommodation, fast sourcing, and a dedicated team behind every booking.
              </p>

              <div className="flex flex-wrap gap-4 mb-14">
                <a
                  href="#quote"
                  className="px-7 py-3.5 bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold rounded-xl text-sm transition-all shadow-lg hover:shadow-amber-500/30 flex items-center gap-2"
                >
                  Get a Free Quote <ArrowRight size={16} />
                </a>
                <Link
                  href="/properties"
                  className="px-7 py-3.5 bg-transparent border-2 border-white/40 hover:border-white text-white font-semibold rounded-xl text-sm transition-all"
                >
                  View Properties
                </Link>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <div className="text-2xl font-extrabold text-[#F59E0B]">{s.value}</div>
                    <div className="text-xs text-slate-300 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3">
                How It Works
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                Getting accommodation for your team has never been simpler. Three steps, zero hassle.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {steps.map((step, i) => (
                <div key={step.n} className="relative">
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-[#F59E0B]/40 to-transparent z-0 -translate-x-8" />
                  )}
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 relative z-10">
                    <div className="w-14 h-14 bg-[#F59E0B] rounded-2xl flex items-center justify-center text-white font-extrabold text-lg mb-5 shadow-lg shadow-amber-200">
                      {step.n}
                    </div>
                    <h3 className="text-lg font-bold text-[#0F172A] mb-2">{step.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services ── */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3">
                Everything Your Team Needs
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                We've thought of everything so your workforce can settle in fast and stay productive.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((svc) => (
                <div
                  key={svc.title}
                  className="group bg-white border border-slate-100 rounded-2xl p-7 hover:border-[#F59E0B]/40 hover:shadow-lg transition-all"
                >
                  <div className="w-11 h-11 bg-amber-50 group-hover:bg-[#F59E0B] rounded-xl flex items-center justify-center mb-4 transition-colors">
                    <svc.icon
                      size={22}
                      className="text-[#F59E0B] group-hover:text-white transition-colors"
                    />
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A] mb-2">{svc.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{svc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ── */}
        <section className="py-20 bg-[#0F172A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                Why Companies Choose Us
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto">
                We understand what project managers need. Speed, reliability, and a partner they can trust.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whyUs.map((item) => (
                <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <div className="w-12 h-12 bg-[#F59E0B]/20 rounded-xl flex items-center justify-center mb-5">
                    <item.icon size={24} className="text-[#F59E0B]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonial ── */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Star className="text-[#F59E0B] mx-auto mb-2" size={28} />
            <div className="flex justify-center gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-[#F59E0B] fill-[#F59E0B]" />
              ))}
            </div>
            <blockquote className="text-2xl sm:text-3xl font-medium text-[#0F172A] leading-snug mb-8">
              "Homes For Workers handled accommodation for our 12-person team in Manchester. Seamless process from quote to check-in — and the properties were excellent. We'll use them on every project."
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-[#0F172A] rounded-full flex items-center justify-center text-white font-bold text-sm">
                JT
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-[#0F172A]">James Thornton</p>
                <p className="text-xs text-slate-500">Project Manager, BuildCorp</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats bar ── */}
        <section className="amber-gradient py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-4xl font-extrabold text-white mb-1">{s.value}</div>
                  <div className="text-sm text-amber-100">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Quote Form ── */}
        <section id="quote" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3">
                Get Accommodation Options
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                Tell us about your project and we'll have options ready for you within 24 hours.
              </p>
            </div>
            <QuoteForm />
          </div>
        </section>

        {/* ── Industries ── */}
        <section id="industries" className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3">
                Industries We Serve
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                From major infrastructure to specialist fit-out, we support the workers that build Britain.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {industries.map((ind) => (
                <div
                  key={ind.label}
                  className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col items-center gap-3 hover:border-[#F59E0B]/40 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                    <ind.icon size={24} className="text-[#F59E0B]" />
                  </div>
                  <span className="text-sm font-semibold text-[#0F172A]">{ind.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="py-16 bg-[#0F172A]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to sort accommodation for your team?
            </h2>
            <p className="text-slate-400 mb-8">
              Call us now or submit a request. We'll have options to you within 24 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#quote"
                className="px-7 py-3.5 bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold rounded-xl text-sm transition-colors"
              >
                Get a Free Quote
              </a>
              <a
                href="tel:+442034882119"
                className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-sm transition-colors flex items-center gap-2"
              >
                <Phone size={16} />
                +44 203 488 2119
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
