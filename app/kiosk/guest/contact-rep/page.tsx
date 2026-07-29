'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/brand/logo'
import { Clock } from '@/components/kiosk/clock'
import { LanguageSelect } from '@/components/kiosk/language-select'
import { AccessibilityButton } from '@/components/kiosk/accessibility-button'
import { toast } from 'sonner'
import { ArrowLeft, CheckCircle2, Phone } from 'lucide-react'
import { makeReference } from '@/lib/mock/db'

type Step = 'service-select' | 'token-generated'

const SERVICE_OPTIONS = [
  { id: 'new-account', label: 'New Account Opening', wait: '25 minutes' },
  { id: 'loan-consult', label: 'Loan Consultation', wait: '20 minutes' },
  { id: 'invest-advice', label: 'Investment Advice', wait: '15 minutes' },
  { id: 'general', label: 'General Enquiry', wait: '10 minutes' },
]

export default function ContactRepPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('service-select')
  const [selectedService, setSelectedService] = useState('')
  const [loading, setLoading] = useState(false)
  const [queueToken, setQueueToken] = useState('')
  const [estimatedWait, setEstimatedWait] = useState('')

  const handleGenerateToken = async (serviceId: string) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      const token = `SB-BHL-${serviceId.substring(0, 3).toUpperCase()}-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-001`
      const service = SERVICE_OPTIONS.find((s) => s.id === serviceId)
      
      setQueueToken(token)
      setSelectedService(serviceId)
      setEstimatedWait(service?.wait || '15 minutes')
      setStep('token-generated')
      toast.success('Queue token generated successfully')
    } catch (error) {
      toast.error('Failed to generate token')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'token-generated') {
    const service = SERVICE_OPTIONS.find((s) => s.id === selectedService)
    return (
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <aside className="relative hidden w-[42%] flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
          <Logo size="lg" className="[&_*]:text-primary-foreground [&>div:first-child]:bg-primary-foreground [&>div:first-child]:text-primary" />
          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight text-balance">
              Token Generated
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-primary-foreground/80">
              Your consultation token has been generated. Please proceed to the designated counter.
            </p>
          </div>
        </aside>

        <main className="flex flex-1 flex-col">
          <header className="flex items-center justify-end gap-3 p-5">
            <Clock />
            <LanguageSelect />
            <AccessibilityButton variant="outline" />
          </header>

          <div className="flex flex-1 items-center justify-center px-6 pb-10">
            <Card className="w-full max-w-md space-y-6 p-8">
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <CheckCircle2 className="size-16 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Token Generated</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  {service?.label}
                </p>
              </div>

              <div className="space-y-4 rounded-lg bg-accent/30 p-6 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Queue Token</p>
                <p className="text-4xl font-bold text-primary tracking-wider">{queueToken}</p>
                <p className="text-xs text-muted-foreground">Please save or note this token</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-accent/20 p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Service</p>
                  <p className="font-semibold text-foreground text-sm">{service?.label.split(' ')[0]}</p>
                </div>
                <div className="rounded-lg bg-accent/20 p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Est. Wait</p>
                  <p className="font-semibold text-foreground text-sm">{estimatedWait}</p>
                </div>
              </div>

              <div className="rounded-lg border-l-4 border-l-blue-500 bg-blue-50/30 p-4 text-sm">
                <p className="font-semibold text-foreground mb-2">Next Steps:</p>
                <ol className="space-y-1 text-xs text-muted-foreground">
                  <li>1. Note your token number</li>
                  <li>2. Wait for your number to be called</li>
                  <li>3. Proceed to the counter</li>
                  <li>4. Speak with our representative</li>
                </ol>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => router.push('/kiosk/guest')}
                  className="w-full"
                >
                  Back to Services
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push('/kiosk')}
                  className="w-full"
                >
                  Back to Welcome
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <aside className="relative hidden w-[42%] flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
        <Logo size="lg" className="[&_*]:text-primary-foreground [&>div:first-child]:bg-primary-foreground [&>div:first-child]:text-primary" />
        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight text-balance">
            Connect with a Representative
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-primary-foreground/80">
            Schedule a consultation with our banking experts for personalized assistance.
          </p>
        </div>
      </aside>

      <main className="flex flex-1 flex-col">
        <header className="flex items-center justify-end gap-3 p-5">
          <Clock />
          <LanguageSelect />
          <AccessibilityButton variant="outline" />
        </header>

        <div className="flex flex-1 items-center justify-center px-6 pb-10 overflow-auto">
          <Card className="w-full max-w-md space-y-6 p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Select Service</h2>
              <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-2">
                <ArrowLeft className="size-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {SERVICE_OPTIONS.map((option) => (
                <Button
                  key={option.id}
                  variant="outline"
                  onClick={() => handleGenerateToken(option.id)}
                  disabled={loading}
                  className="h-auto w-full flex flex-col items-start p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="font-semibold text-foreground">{option.label}</span>
                    <Phone className="size-4 text-muted-foreground" />
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">Est. wait: {option.wait}</span>
                </Button>
              ))}
            </div>

            <div className="rounded-lg bg-accent/30 p-4 text-center text-sm">
              <p className="text-muted-foreground">
                Generating a token will add you to the queue. Please wait at the designated counter.
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
