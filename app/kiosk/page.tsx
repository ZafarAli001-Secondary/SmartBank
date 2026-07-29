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
        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight text-balance">
            Welcome to SmartBank
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-primary-foreground/80">
            Your self-service banking kiosk for quick, secure and convenient banking services.
          </p>
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

        <div className="flex flex-1 items-center justify-center px-6 pb-10">
          <div className="w-full max-w-2xl space-y-10">
            {/* Header */}
            <div className="space-y-4 lg:hidden">
              <Logo size="lg" />
              <h1 className="text-4xl font-bold leading-tight text-balance">
                Welcome to SmartBank
              </h1>
              <p className="text-lg text-muted-foreground">
                Your self-service banking kiosk for quick, secure and convenient banking services.
              </p>
            </div>

            <div className="hidden lg:block text-center space-y-2">
              <h1 className="text-4xl font-bold text-foreground">
                Welcome to SmartBank
              </h1>
              <p className="text-lg text-muted-foreground">
                How would you like to continue?
              </p>
            </div>

            {/* Branch and Kiosk Info */}
            <div className="grid grid-cols-2 gap-4 rounded-lg bg-accent/30 p-4">
              <div>
                <p className="text-sm text-muted-foreground">Branch</p>
                <p className="text-lg font-semibold text-foreground">{branchConfig.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Kiosk ID</p>
                <p className="text-lg font-semibold text-foreground">KIOSK-04</p>
              </div>
            </div>

            {/* Action Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Registered Customer */}
              <Card
                className="group relative overflow-hidden border-2 border-transparent bg-card p-6 cursor-pointer transition-all hover:border-primary hover:shadow-lg"
                onClick={() => router.push('/kiosk/login')}
              >
                <div className="space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <div className="text-2xl font-bold text-primary">👤</div>
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
                onClick={() => router.push('/kiosk/guest')}
              >
                <div className="space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <div className="text-2xl font-bold text-primary">👥</div>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-foreground">
                      Guest Services
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      No login required.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Use banking services such as account opening, cash deposits, loan enquiries and more.
                    </p>
                  </div>
                  <Button
                    className="w-full gap-2 group-hover:gap-3 transition-all"
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push('/kiosk/guest')
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
