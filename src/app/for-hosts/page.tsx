import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import HostRegistrationForm from "@/components/HostRegistrationForm"
import {
  PoundSterling,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  HardHat,
  Wrench,
  Zap,
  Users,
  Home,
  Building2,
  HeartHandshake,
  FileCheck,
} from "lucide-react"

const hostSteps = [
  {
    n: "01",
    title: "Register Your Property",
    desc: "Submit your property details — we review it within 48 hours and let you know if it meets our criteria.",
  },
  {
    n: "02",
    title: "We Handle Everything",
    desc: "From vetting tenants to managing check-ins and maintenance requests. You sit back and collect rent.",
  },
  {
    n: "03",
    title: "Earn Reliable Income",
    desc: "Contractor bookings typically run 1–6 months. Consistent, professional tenants who treat your property well.",
  },
]

const guestTypes = [
  { icon: HardHat, label: "Construction Workers" },
  { icon: Zap, label: "Electrical Engineers" },
  { icon: Wrench, label: "Maintenance Crews" },
  { icon: Building2, label: "Civil Engineers" },
  { icon: Users, label: "Project Managers" },
  { icon: Home, label: "Site Supervisors" },
]

const whatTheyLookFor = [
  { icon: CheckCircle, text: "Fully furnished with beds, linen, and kitchen essentials" },
  { icon: CheckCircle, text: "Fast, reliable WiFi (50Mbps+ preferred)" },
  { icon: CheckCircle, text: "Washing machine / laundry facilities" },
  { icon: CheckCircle, text: "Off-road parking (for vans preferred)" },
  { icon: CheckCircle, text: "Close to project site or good transport links" },
  { icon: CheckCircle, text: "Bills included in the rent" },
  { icon: CheckCircle, text: "Secure property with good locks" },
  { icon: CheckCircle, text: "Clean, well-maintained throughout" },
]

const benefits = [
  {
    icon: PoundSterling,
    title: "Premium Rental Rates",
    desc: "Contractor accommodation commands above-average rental rates. Your property earns more than with standard tenants.",
  },
  {
    icon: Shield,
    title: "Vetted Professional Tenants",
    desc: "All guests are employed professionals on active contracts. No lifestyle tenants, no uncertainty.",
  },
  {
    icon: Clock,
    title: "Longer Stays",
    desc: "Bookings typically last 1–6 months — sometimes longer. Less turnover, more stability for you.",
  },
  {
    icon: HeartHandshake,
    title: "Fully Managed",
    desc: "We manage the relationship end-to-end. You don't need to deal with tenants directly unless you want to.",
  },
  {
    icon: FileCheck,
    title: "Clear Agreements",
    desc: "Proper licence agreements in place for every booking. Your property is always protected.",
  },
  {
    icon: Users,
    title: "Ongoing Demand",
    desc: "The UK's construction pipeline is massive. We have more contractor demand than available properties right now.",
  },
]

export default function ForHostsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="hero-gradient py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full border border-white/20 mb-6">
                <span className="w-2 h-2 bg-[#F59E0B] rounded-full" />
                For Property Owners &amp; Landlords
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
                Earn Reliable Income From{" "}
                <span className="text-[#F59E0B]">Professional Tenants</span>
              </h1>
              <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-2xl">
                Partner with Homes For Workers and let your property to vetted, employed contractors and engineers. Longer stays, better rates, fully managed.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#register"
                  className="px-7 py-3.5 bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold rounded-xl text-sm transition-colors flex items-center gap-2"
                >
                  Register Your Property <ArrowRight size={16} />
                </a>
                <a
                  href="tel:+442034882119"
                  className="px-7 py-3.5 border-2 border-white/30 hover:border-white text-white font-semibold rounded-xl text-sm transition-colors"
                >
                  Speak to the Team
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* How it works for hosts */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3">
                How It Works for Hosts
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                Getting your property on our books is straightforward. We do the heavy lifting.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {hostSteps.map((step) => (
                <div key={step.n} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                  <div className="w-14 h-14 bg-[#F59E0B] rounded-2xl flex items-center justify-center text-white font-extrabold text-lg mb-5 shadow-lg shadow-amber-200">
                    {step.n}
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What companies look for */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-4">
                  What Contractor Companies Look For
                </h2>
                <p className="text-slate-500 mb-8 leading-relaxed">
                  Our corporate clients have clear requirements. Properties that tick these boxes get booked first and booked often.
                </p>
                <ul className="space-y-3">
                  {whatTheyLookFor.map((item) => (
                    <li key={item.text} className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-[#F59E0B] shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#0F172A] rounded-3xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4 text-[#F59E0B]">Current Demand</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Right now we have active enquiries from companies looking for contractor accommodation in:
                </p>
                <div className="space-y-3">
                  {[
                    { city: "London & Home Counties", count: "12+ teams" },
                    { city: "Manchester & North West", count: "8+ teams" },
                    { city: "Birmingham & Midlands", count: "6+ teams" },
                    { city: "Leeds & Yorkshire", count: "5+ teams" },
                    { city: "Essex & East Anglia", count: "7+ teams" },
                  ].map((item) => (
                    <div key={item.city} className="flex items-center justify-between bg-white/10 rounded-xl px-4 py-3">
                      <span className="text-sm font-medium">{item.city}</span>
                      <span className="text-xs bg-[#F59E0B] px-2.5 py-1 rounded-full font-semibold">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-slate-400 text-xs mt-5">Updated weekly. More locations available.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Guest types */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Who Stays in Your Property</h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                Employed professionals working on project contracts. Reliable, respectful, and often repeat customers.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {guestTypes.map((gt) => (
                <div
                  key={gt.label}
                  className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col items-center gap-3 hover:border-[#F59E0B]/40 transition-all"
                >
                  <div className="w-11 h-11 bg-amber-50 rounded-xl flex items-center justify-center">
                    <gt.icon size={22} className="text-[#F59E0B]" />
                  </div>
                  <span className="text-xs font-semibold text-[#0F172A] text-center">{gt.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3">
                The Benefits of Hosting
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                Contractor accommodation isn't just good income — it's smart property management.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((b) => (
                <div key={b.title} className="bg-white border border-slate-100 rounded-2xl p-7 hover:shadow-md transition-all">
                  <div className="w-11 h-11 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
                    <b.icon size={22} className="text-[#F59E0B]" />
                  </div>
                  <h3 className="font-bold text-[#0F172A] mb-2">{b.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Form */}
        <section id="register" className="py-20 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3">
                Register Your Property
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                Fill in your details below and we&rsquo;ll review your property within 48 hours. No obligation — we&rsquo;ll simply let you know if it&rsquo;s a good fit and what it could earn.
              </p>
            </div>
            <HostRegistrationForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
