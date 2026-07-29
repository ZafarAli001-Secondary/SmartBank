'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2, LogIn, Smartphone, Lock } from 'lucide-react'
import { Logo } from '@/components/brand/logo'
import { Clock } from '@/components/kiosk/clock'
import { LanguageSelect } from '@/components/kiosk/language-select'
import { AccessibilityButton } from '@/components/kiosk/accessibility-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth/auth-provider'

type LoginStep = 'mobile' | 'otp'

export function LoginScreen() {
  const router = useRouter()
  const { generateOtp, verifyOtp, branch } = useAuth()
  const [step, setStep] = useState<LoginStep>('mobile')
  const [mobileNumber, setMobileNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [language, setLanguage] = useState('en')
  const [submitting, setSubmitting] = useState(false)
  const [otpMessage, setOtpMessage] = useState('')

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault()
    const mobile = mobileNumber.replace(/\D/g, '')
    if (!mobile || mobile.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number.')
      return
    }
    setSubmitting(true)
    try {
      const result = await generateOtp(mobileNumber)
      if (result.success) {
        setOtpMessage(result.message)
        setStep('otp')
        toast.success('OTP sent successfully')
      } else {
        toast.error(result.message)
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to send OTP')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault()
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP.')
      return
    }
    setSubmitting(true)
    try {
      const result = await verifyOtp(mobileNumber, otp)
      if (result.success) {
        toast.success(`Welcome, ${result.user?.full_name.split(' ')[0]}`)
        router.push('/kiosk/portal')
      } else {
        toast.error(result.error || 'OTP verification failed')
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Verification failed')
    } finally {
      setSubmitting(false)
    }
  }

  function handleBackToMobile() {
    setStep('mobile')
    setOtp('')
  }

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
            Access your banking services at {branch?.name || 'your branch'}.
            Complete transactions securely and efficiently.
          </p>
        </div>
        <p className="text-sm text-primary-foreground/70">
          Branch: {branch?.name || 'MG Road, Bengaluru'} · Kiosk #04
        </p>
      </aside>

      {/* Login form */}
      <main className="flex flex-1 flex-col">
        <header className="flex items-center justify-end gap-3 p-5">
          <Clock />
          <LanguageSelect value={language} onChange={setLanguage} />
          <AccessibilityButton variant="outline" />
        </header>

        <div className="flex flex-1 items-center justify-center px-6 pb-10">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <Logo size="lg" />
            </div>
            <div className="mb-7">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Welcome to SmartBank
              </h2>
              <p className="mt-2 text-muted-foreground">
                {branch?.name}
              </p>
            </div>

            {step === 'mobile' && (
              <form onSubmit={handleSendOtp} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="mobile" className="text-sm font-semibold">
                    Registered Mobile Number
                  </Label>
                  <div className="relative">
                    <Smartphone className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="mobile"
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="Enter 10-digit mobile number"
                      autoComplete="tel"
                      maxLength="14"
                      className="h-14 pl-11 text-base"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="h-14 w-full gap-2 text-base font-semibold"
                >
                  {submitting ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : (
                    <LogIn className="size-5" />
                  )}
                  {submitting ? 'Sending OTP…' : 'Send OTP'}
                </Button>

                <p className="rounded-lg bg-muted px-4 py-3 text-center text-sm text-muted-foreground">
                  Demo: Use mobile number <span className="font-semibold text-foreground">9876543210</span>
                </p>
              </form>
            )}

            {step === 'otp' && (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm font-semibold">
                    Enter OTP sent to {mobileNumber}
                  </p>
                  {otpMessage && (
                    <p className="text-xs text-amber-600 dark:text-amber-500">
                      {otpMessage}
                    </p>
                  )}
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="Enter 6-digit OTP"
                      maxLength="6"
                      className="h-14 pl-11 text-center text-2xl tracking-widest"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="h-14 w-full gap-2 text-base font-semibold"
                >
                  {submitting ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : (
                    <LogIn className="size-5" />
                  )}
                  {submitting ? 'Verifying…' : 'Verify OTP'}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBackToMobile}
                  className="h-12 w-full text-base font-semibold"
                >
                  Back
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
