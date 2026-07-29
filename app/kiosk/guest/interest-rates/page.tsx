'use client'

import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/brand/logo'
import { Clock } from '@/components/kiosk/clock'
import { LanguageSelect } from '@/components/kiosk/language-select'
import { AccessibilityButton } from '@/components/kiosk/accessibility-button'
import { ArrowLeft } from 'lucide-react'

export default function InterestRatesPage() {
  const router = useRouter()

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <aside className="relative hidden w-[42%] flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
        <Logo size="lg" className="[&_*]:text-primary-foreground [&>div:first-child]:bg-primary-foreground [&>div:first-child]:text-primary" />
        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight text-balance">
            Interest Rates
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-primary-foreground/80">
            Check current interest rates for all our deposit and savings products.
          </p>
        </div>
      </aside>

      <main className="flex flex-1 flex-col">
        <header className="flex items-center justify-end gap-3 p-5">
          <Clock />
          <LanguageSelect />
          <AccessibilityButton variant="outline" />
        </header>

        <div className="flex-1 overflow-auto px-6 pb-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Interest Rates</h1>
              <p className="text-muted-foreground">Effective from July 2026</p>
            </div>
            <Button variant="outline" size="lg" onClick={() => router.back()} className="gap-2">
              <ArrowLeft className="size-4" />
              Back
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Savings Account */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Savings Account</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">Balance up to ₹1 Lakh</span>
                  <span className="font-semibold text-foreground">3.00% p.a.</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">₹1 Lakh to ₹5 Lakh</span>
                  <span className="font-semibold text-foreground">3.50% p.a.</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">₹5 Lakh and above</span>
                  <span className="font-semibold text-foreground">4.00% p.a.</span>
                </div>
              </div>
            </Card>

            {/* Current Account */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Current Account</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">All Balances</span>
                  <span className="font-semibold text-foreground">0.00% p.a.</span>
                </div>
                <div className="mt-4 p-3 bg-accent/30 rounded text-sm text-muted-foreground">
                  No interest earned on current account balances. Designed for business and frequent transactions.
                </div>
              </div>
            </Card>

            {/* Fixed Deposit - 3-12 Months */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Fixed Deposit (3-12 Months)</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">3 Months</span>
                  <span className="font-semibold text-foreground">4.00% p.a.</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">6 Months</span>
                  <span className="font-semibold text-foreground">4.50% p.a.</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">12 Months</span>
                  <span className="font-semibold text-foreground">5.50% p.a.</span>
                </div>
              </div>
            </Card>

            {/* Fixed Deposit - 24+ Months */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Fixed Deposit (24+ Months)</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">24 Months</span>
                  <span className="font-semibold text-foreground">6.00% p.a.</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">36 Months</span>
                  <span className="font-semibold text-foreground">6.25% p.a.</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">60 Months</span>
                  <span className="font-semibold text-foreground">6.50% p.a.</span>
                </div>
              </div>
            </Card>

            {/* Recurring Deposit */}
            <Card className="p-6 lg:col-span-2">
              <h3 className="text-xl font-bold text-foreground mb-4">Recurring Deposit</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">6 Months</span>
                  <span className="font-semibold text-foreground">4.00% p.a.</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">12 Months</span>
                  <span className="font-semibold text-foreground">4.75% p.a.</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">24 Months</span>
                  <span className="font-semibold text-foreground">5.50% p.a.</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">Minimum monthly deposit: ₹1,000</p>
            </Card>
          </div>

          <Card className="mt-6 p-6 border-l-4 border-l-amber-500 bg-amber-50/30">
            <h4 className="font-semibold text-foreground mb-2">Important Information</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Rates are subject to change without notice</li>
              <li>• Senior Citizens (60+ years) get additional 0.50% interest on Fixed Deposits</li>
              <li>• Interest is credited quarterly/annually as per your choice</li>
              <li>• TDS applicable as per Income Tax rules</li>
            </ul>
          </Card>
        </div>
      </main>
    </div>
  )
}
