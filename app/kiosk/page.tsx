'use client'

import { useRouter } from 'next/navigation'
import { Logo } from '@/components/brand/logo'
import { Clock } from '@/components/kiosk/clock'
import { LanguageSelect } from '@/components/kiosk/language-select'
import { AccessibilityButton } from '@/components/kiosk/accessibility-button'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { branchConfig } from '@/lib/mock/db'
import { ArrowRight } from 'lucide-react'

export default function WelcomePage() {
  const router = useRouter()

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Brand panel */}
      <aside className="relative hidden w-[42%] flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
        <Logo
          size="lg"
          className="[&_*]:text-primary-foreground [&>div:first-child]:bg-primary-foreground [&>div:first-child]:text-primary"
        />
        
        {/* Welcome and Token Section */}
        <div className="space-y-8">
          {/* Welcome text */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight">
              Welcome to SmartBank
            </h1>
            <p className="text-lg leading-relaxed text-primary-foreground/80">
              Your self-service banking kiosk for quick, secure and convenient banking services.
            </p>
          </div>

          {/* Current Token Card */}
          <div className="rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 p-6 space-y-4">
            <p className="text-sm font-medium text-primary-foreground/80">Current Token</p>
            <div className="space-y-3">
              <div className="text-5xl font-bold tracking-wider text-primary-foreground">
                A012
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-sm font-medium text-green-300">Now Serving</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-primary-foreground/70">
          Branch: {branchConfig.name} · Kiosk #04
        </p>
      </aside>

      {/* Welcome screen */}
      <main className="flex flex-1 flex-col">
        <header className="flex items-center justify-end gap-3 p-5">
          <Clock />
          <LanguageSelect />
          <AccessibilityButton variant="outline" />
        </header>

        <div className="flex flex-1 flex-col items-center justify-center px-6 pb-10">
          <div className="w-full max-w-lg space-y-6">
            {/* Mobile Header */}
            <div className="space-y-4 lg:hidden">
              <Logo size="lg" />
              <h1 className="text-4xl font-bold leading-tight">
                Welcome to SmartBank
              </h1>
              <p className="text-lg text-muted-foreground">
                Your self-service banking kiosk
              </p>
            </div>

            {/* Action Cards - Stacked Vertically */}
            <div className="space-y-4 w-full">
              {/* Registered Customer */}
              <Card
                className="group relative overflow-hidden border-2 border-transparent bg-card p-6 cursor-pointer transition-all hover:border-primary hover:shadow-lg"
                onClick={() => router.push('/kiosk/login')}
              >
                <div className="space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <div className="text-2xl">👤</div>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-foreground">
                      Registered Customer
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Already have a SmartBank account?
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Access your account securely using your registered details.
                    </p>
                  </div>
                  <Button
                    className="w-full gap-2 group-hover:gap-3 transition-all"
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push('/kiosk/login')
                    }}
                  >
                    Continue
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </Card>

              {/* Guest Services */}
              <Card
                className="group relative overflow-hidden border-2 border-transparent bg-card p-6 cursor-pointer transition-all hover:border-primary hover:shadow-lg"
                onClick={() => router.push('/kiosk/guest-login')}
              >
                <div className="space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <div className="text-2xl">👥</div>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-foreground">
                      Guest Services
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Quick verification required.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Access banking services with mobile OTP verification only.
                    </p>
                  </div>
                  <Button
                    className="w-full gap-2 group-hover:gap-3 transition-all"
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push('/kiosk/guest-login')
                    }}
                  >
                    Continue
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
