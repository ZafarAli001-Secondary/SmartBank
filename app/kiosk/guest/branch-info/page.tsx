'use client'

import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/brand/logo'
import { Clock } from '@/components/kiosk/clock'
import { LanguageSelect } from '@/components/kiosk/language-select'
import { AccessibilityButton } from '@/components/kiosk/accessibility-button'
import { MapPin, Phone, Clock as ClockIcon, User, ArrowLeft } from 'lucide-react'
import { branchConfig } from '@/lib/mock/db'

export default function BranchInfoPage() {
  const router = useRouter()

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <aside className="relative hidden w-[42%] flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
        <Logo size="lg" className="[&_*]:text-primary-foreground [&>div:first-child]:bg-primary-foreground [&>div:first-child]:text-primary" />
        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight text-balance">
            Branch Information
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-primary-foreground/80">
            Contact details and operating hours for your nearest FinCore branch.
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
              <h1 className="text-3xl font-bold text-foreground">Branch Information</h1>
              <p className="text-muted-foreground">{branchConfig.name}</p>
            </div>
            <Button variant="outline" size="lg" onClick={() => router.back()} className="gap-2">
              <ArrowLeft className="size-4" />
              Back
            </Button>
          </div>

          <div className="grid gap-6">
            {/* Address Card */}
            <Card className="p-6 space-y-4">
              <div className="flex gap-3">
                <MapPin className="size-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground text-lg mb-2">Address</h3>
                  <p className="text-muted-foreground">{branchConfig.address}</p>
                </div>
              </div>
            </Card>

            {/* Contact Card */}
            <Card className="p-6 space-y-4">
              <div className="flex gap-3">
                <Phone className="size-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground text-lg mb-2">Contact Number</h3>
                  <p className="text-muted-foreground text-lg font-semibold">{branchConfig.contact}</p>
                  <p className="text-sm text-muted-foreground mt-1">Available 24/7 for assistance</p>
                </div>
              </div>
            </Card>

            {/* Working Hours Card */}
            <Card className="p-6 space-y-4">
              <div className="flex gap-3">
                <ClockIcon className="size-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground text-lg mb-3">Working Hours</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Friday</span>
                      <span className="font-semibold text-foreground">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday</span>
                      <span className="font-semibold text-foreground">9:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="font-semibold text-foreground">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Available Services Card */}
            <Card className="p-6 space-y-4">
              <h3 className="font-bold text-foreground text-lg">Available Services</h3>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="flex gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-foreground">Account Opening</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-foreground">Cash Deposit/Withdrawal</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-foreground">Loan Consultation</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-foreground">Investment Advice</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-foreground">Fixed Deposit</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-foreground">Card Services</span>
                </div>
              </div>
            </Card>

            {/* Staff Card */}
            <Card className="p-6 space-y-4">
              <div className="flex gap-3">
                <User className="size-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground text-lg mb-3">Branch Manager</h3>
                  <div className="space-y-2">
                    <p className="text-foreground font-semibold">Rajesh Kumar</p>
                    <p className="text-sm text-muted-foreground">Email: rajesh.kumar@smartbank.example</p>
                    <p className="text-sm text-muted-foreground">Ext: 102</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Kiosk Info */}
            <Card className="p-6 space-y-2 bg-accent/30">
              <p className="text-sm text-muted-foreground">CURRENT KIOSK</p>
              <p className="text-lg font-semibold text-foreground">KIOSK-04 | Main Hall</p>
              <p className="text-xs text-muted-foreground">Available 24/7 for self-service banking</p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
