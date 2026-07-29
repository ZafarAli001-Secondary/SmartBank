'use client'

import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/brand/logo'
import { Clock } from '@/components/kiosk/clock'
import { LanguageSelect } from '@/components/kiosk/language-select'
import { AccessibilityButton } from '@/components/kiosk/accessibility-button'
import { ArrowLeft } from 'lucide-react'

const PRODUCTS = [
  {
    name: 'Debit Cards',
    description: 'Access your funds anytime, anywhere',
    features: ['24/7 ATM access', 'Contactless payments', 'Cashback rewards', 'Easy transactions'],
  },
  {
    name: 'Credit Cards',
    description: 'Smart spending with rewards',
    features: ['Rewards points', 'Interest-free period', 'Exclusive benefits', 'Shopping privileges'],
  },
  {
    name: 'Insurance',
    description: 'Protect your loved ones',
    features: ['Life insurance', 'Health insurance', 'Travel insurance', 'Affordable premiums'],
  },
  {
    name: 'Investments',
    description: 'Grow your wealth',
    features: ['Mutual funds', 'Stock brokerage', 'Investment advice', 'Portfolio management'],
  },
  {
    name: 'Internet Banking',
    description: 'Banking at your fingertips',
    features: ['24/7 access', 'Bill payments', 'Fund transfers', 'Secure transactions'],
  },
  {
    name: 'Mobile Banking',
    description: 'Banking on the go',
    features: ['Mobile app', 'Quick transactions', 'Push notifications', 'Biometric security'],
  },
]

export default function ProductsPage() {
  const router = useRouter()

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <aside className="relative hidden w-[42%] flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
        <Logo size="lg" className="[&_*]:text-primary-foreground [&>div:first-child]:bg-primary-foreground [&>div:first-child]:text-primary" />
        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight text-balance">
            Our Products
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-primary-foreground/80">
            Explore our comprehensive range of banking products and services designed for your needs.
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
              <h1 className="text-3xl font-bold text-foreground">Our Products</h1>
              <p className="text-muted-foreground">Discover solutions tailored for you</p>
            </div>
            <Button variant="outline" size="lg" onClick={() => router.back()} className="gap-2">
              <ArrowLeft className="size-4" />
              Back
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product) => (
              <Card key={product.name} className="p-6 space-y-4 hover:shadow-lg transition-shadow">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground">KEY FEATURES:</p>
                  <ul className="space-y-1">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex gap-2 text-sm text-foreground">
                        <span className="text-primary font-bold">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="w-full" onClick={() => router.push('/kiosk/guest/contact-rep')}>
                  Learn More
                </Button>
              </Card>
            ))}
          </div>

          <Card className="mt-8 p-6">
            <h3 className="text-lg font-bold text-foreground mb-3">Why Choose FinCore?</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="font-semibold text-foreground mb-2">Trusted Partner</p>
                <p className="text-sm text-muted-foreground">Serving customers for over 50 years with excellence and integrity.</p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-2">Digital First</p>
                <p className="text-sm text-muted-foreground">Modern banking solutions with cutting-edge technology and security.</p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-2">Customer Centric</p>
                <p className="text-sm text-muted-foreground">Dedicated support team available 24/7 to assist you.</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
