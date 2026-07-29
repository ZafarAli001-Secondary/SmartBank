'use client'

import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/brand/logo'
import { Clock } from '@/components/kiosk/clock'
import { LanguageSelect } from '@/components/kiosk/language-select'
import { AccessibilityButton } from '@/components/kiosk/accessibility-button'
import { ArrowLeft } from 'lucide-react'

const LOANS = [
  {
    name: 'Home Loan',
    rate: '6.75% - 8.25%',
    fee: '0.5% - 1%',
    eligibility: 'Min. ₹5 Lakh, Salaried/Self-Employed',
    features: ['Up to ₹1 Cr', 'Tenure up to 30 years', 'Flexible repayment'],
  },
  {
    name: 'Personal Loan',
    rate: '10% - 12.5%',
    fee: '1% - 2%',
    eligibility: 'Min. ₹50K, Income ₹1.5 Lakh+',
    features: ['Min ₹50K - Max ₹25 Lakh', 'Instant approval', 'No collateral'],
  },
  {
    name: 'Auto Loan',
    rate: '7% - 9.5%',
    fee: '0.75%',
    eligibility: 'Vehicle owner, Min. income ₹2.5 Lakh',
    features: ['Up to 90% financing', 'Tenure up to 7 years', 'Low rates'],
  },
  {
    name: 'Education Loan',
    rate: '6% - 8.5%',
    fee: '0.5%',
    eligibility: 'Indian/NRI student, Min. age 18',
    features: ['Up to ₹50 Lakh', 'Moratorium period available', 'Affordable EMI'],
  },
  {
    name: 'Gold Loan',
    rate: '7.25% - 9.5%',
    fee: '0%',
    eligibility: 'Gold pledge, Min. ₹10K',
    features: ['Instant funds', 'Quick processing', 'Insurance covered'],
  },
]

export default function LoanInfoPage() {
  const router = useRouter()

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <aside className="relative hidden w-[42%] flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
        <Logo size="lg" className="[&_*]:text-primary-foreground [&>div:first-child]:bg-primary-foreground [&>div:first-child]:text-primary" />
        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight text-balance">
            Loan Products
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-primary-foreground/80">
            Explore our range of loan products with competitive rates and flexible terms.
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
              <h1 className="text-3xl font-bold text-foreground">Loan Products</h1>
              <p className="text-muted-foreground">Find the right loan for your needs</p>
            </div>
            <Button variant="outline" size="lg" onClick={() => router.back()} className="gap-2">
              <ArrowLeft className="size-4" />
              Back
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {LOANS.map((loan) => (
              <Card key={loan.name} className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-foreground">{loan.name}</h3>
                
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Interest Rate</p>
                    <p className="font-semibold text-foreground">{loan.rate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Processing Fee</p>
                    <p className="font-semibold text-foreground">{loan.fee}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Eligibility</p>
                    <p className="font-semibold text-foreground text-xs">{loan.eligibility.split(',')[0]}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">Key Features:</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {loan.features.map((feature) => (
                      <li key={feature} className="flex gap-2">
                        <span className="text-primary">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="w-full" onClick={() => router.push('/kiosk/guest/contact-rep')}>
                  Get Consultation
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
