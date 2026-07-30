'use client'

import { Flame, BadgeCheck, FileText, Printer, Globe, MapPin } from 'lucide-react'
import { Logo } from '@/components/brand/logo'
import { ServiceCard } from '@/components/kiosk/service-card'
import { services } from '@/components/kiosk/services-data'

export default function WelcomePage() {
  return (
    <main className="flex h-screen flex-col overflow-hidden bg-[#eef0f2]">
      {/* Header */}
      <header className="flex items-center gap-6 bg-white px-6 py-3.5">
        <Logo />

        <div className="ml-2 h-14 w-px bg-gray-200" aria-hidden="true" />

        <div className="flex flex-col justify-center">
          <p className="text-lg font-bold text-gray-900">Welcome!</p>
          <p className="text-sm text-gray-500">How can we help you today?</p>
        </div>

        <div className="ml-auto flex items-center gap-6">
          <button
            type="button"
            className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-2.5 text-gray-700 transition hover:bg-gray-50"
          >
            <Globe className="h-5 w-5 text-gray-500" />
            <span className="text-base font-medium">English</span>
          </button>

          <div className="h-12 w-px bg-gray-200" aria-hidden="true" />

          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">10:30 AM</p>
            <p className="text-xs text-gray-500">Friday, 24 May 2024</p>
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* Sidebar */}
        <nav className="flex w-64 shrink-0 flex-col justify-around bg-gradient-to-b from-[#f47b20] via-[#ea5a12] to-[#c62828] py-2">
          {[
            { label: 'Notice Board', Icon: BadgeCheck },
            { label: 'Deposit Cheques', Icon: FileText },
            { label: 'Print Passbook', Icon: Printer },
            { label: 'Internet Banking', Icon: Globe },
            { label: 'Locate Branch / ATM', Icon: MapPin },
          ].map(({ label, Icon }, i) => (
            <button
              key={label}
              type="button"
              className={`flex items-center gap-4 px-6 py-4 text-left transition hover:bg-white/10 ${
                i !== 4 ? 'border-b border-white/15' : ''
              }`}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                <Icon className="h-6 w-6 text-[#ea5a12]" />
              </span>
              <span className="text-lg font-semibold leading-tight text-white text-balance">{label}</span>
            </button>
          ))}
        </nav>

        {/* Main Content */}
        <section className="flex min-h-0 flex-1 flex-col bg-[#f3f4f6] px-6 py-4 xl:px-8">
          <div className="mb-4 flex shrink-0 items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
              <Flame className="h-5 w-5 text-[#ea5a12]" />
            </span>
            <h1 className="text-2xl font-bold text-gray-900">Trending Services</h1>
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-3 grid-rows-4 gap-4">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="flex items-center gap-5 bg-white px-6 py-4">
        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#f47b20] to-[#ea5a12] px-6 py-4 text-lg font-semibold text-white shadow-sm transition hover:brightness-105"
        >
          Home
        </button>

        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-6 py-4 text-lg font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Back
        </button>

        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-6 py-4 text-lg font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Keyboard
        </button>

        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-6 py-4 text-lg font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Help
        </button>

        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-3 rounded-xl bg-[#d32029] px-6 py-4 text-lg font-semibold text-white shadow-sm transition hover:brightness-105"
        >
          Exit
        </button>
      </footer>
    </main>
  )
}
