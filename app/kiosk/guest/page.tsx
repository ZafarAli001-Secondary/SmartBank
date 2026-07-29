'use client'

import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/brand/logo'
import { Clock } from '@/components/kiosk/clock'
import { LanguageSelect } from '@/components/kiosk/language-select'
import { AccessibilityButton } from '@/components/kiosk/accessibility-button'
import { branchConfig } from '@/lib/mock/db'
import {
  Plus,
  DollarSign,
  Info,
  TrendingUp,
  Percent,
  CreditCard,
  MapPin,
  Phone,
  ArrowLeft,
} from 'lucide-react'

const GUEST_SERVICES = [
  {
    id: 'account-opening',
    title: 'Open New Account',
    description: 'Submit account opening request',
    icon: Plus,
    href: '/kiosk/guest/account-opening',
  },
  {
    id: 'cash-deposit',
    title: 'Cash Deposit',
    description: 'Deposit to any SmartBank account',
    icon: DollarSign,
    href: '/kiosk/guest/cash-deposit',
  },
  {
    id: 'loan-info',
    title: 'Loan Information',
    description: 'View loan products & rates',
    icon: Info,
    href: '/kiosk/guest/loan-info',
  },
  {
    id: 'fixed-deposit',
    title: 'Fixed Deposit',
    description: 'Maturity calculator & rates',
    icon: TrendingUp,
    href: '/kiosk/guest/fixed-deposit',
  },
  {
    id: 'interest-rates',
    title: 'Interest Rates',
    description: 'View current interest rates',
    icon: Percent,
    href: '/kiosk/guest/interest-rates',
  },
  {
    id: 'products',
    title: 'Product Information',
    description: 'Cards, insurance & more',
    icon: CreditCard,
    href: '/kiosk/guest/products',
  },
  {
    id: 'branch-info',
    title: 'Branch Information',
    description: 'Address, hours & contact',
    icon: MapPin,
    href: '/kiosk/guest/branch-info',
  },
  {
    id: 'contact-rep',
    title: 'Contact Representative',
    description: 'Generate consultation token',
    icon: Phone,
    href: '/kiosk/guest/contact-rep',
  },
]

export default function GuestServicesPage() {
  const router = useRouter()

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Brand panel */}
      <aside className="relative hidden w-[42%] flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
        <Logo
          size="lg"
          className="[&_*]:text-primary-foreground [&>div:first-child]:bg-primary-foreground [&>div:first-child]:text-primary"
        />
        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight text-balance">
            Guest Services
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-primary-foreground/80">
            Access our banking services without login. Open accounts, check rates, and more.
          </p>
        </div>
        <p className="text-sm text-primary-foreground/70">
          Branch: {branchConfig.name} · Kiosk #04
        </p>
      </aside>

      {/* Services grid */}
      <main className="flex flex-1 flex-col">
        <header className="flex items-center justify-end gap-3 p-5">
          <Clock />
          <LanguageSelect />
          <AccessibilityButton variant="outline" />
        </header>

        <div className="flex-1 overflow-auto px-6 pb-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Guest Services</h1>
              <p className="text-muted-foreground">
                What service can we help you with today?
              </p>
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.back()}
              className="gap-2"
            >
              <ArrowLeft className="size-4" />
              Back
            </Button>
          </div>

          {/* Services Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GUEST_SERVICES.map((service) => {
              const Icon = service.icon
              return (
                <Card
                  key={service.id}
                  className="group cursor-pointer overflow-hidden border-2 border-transparent p-4 transition-all hover:border-primary hover:shadow-lg"
                  onClick={() => router.push(service.href)}
                >
                  <div className="space-y-3 text-center">
                    <div className="flex justify-center">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="size-6 text-primary" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                    <Button
                      className="w-full text-sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(service.href)
                      }}
                    >
                      Select
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
