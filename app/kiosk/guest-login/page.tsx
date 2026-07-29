'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/brand/logo'
import { Clock } from '@/components/kiosk/clock'
import { LanguageSelect } from '@/components/kiosk/language-select'
import { AccessibilityButton } from '@/components/kiosk/accessibility-button'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react'

type Step = 'mobile' | 'otp' | 'success'

export default function GuestLoginPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('mobile')
  const [mobileNo, setMobileNo] = useState('')
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleMobileSubmit = () => {
    if (!mobileNo.trim()) return
    // Simulate OTP sending
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep('otp')
    }, 1000)
  }

  const handleOtpSubmit = () => {
    if (!otp.trim()) return
    // Simulate OTP verification
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep('success')
    }, 1500)
  }

  const handleSuccess = () => {
    router.push('/kiosk/guest')
  }

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
      {/* Header */}
      <header className="flex items-center justify-between gap-3 p-5 bg-card border-b">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="size-5" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">Guest Verification</h1>
        </div>
        <div className="flex items-center gap-3">
          <Clock />
          <LanguageSelect />
          <AccessibilityButton variant="outline" />
        </div>
      </header>

      {/* Login Form */}
      <main className="flex flex-1 items-center justify-center px-6 py-10">
        <Card className="w-full max-w-md p-8 space-y-6">
          {/* Step 1: Mobile Number */}
          {step === 'mobile' && (
            <>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Verify Your Identity</h2>
                <p className="text-muted-foreground">Enter your mobile number to continue</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input
                    id="mobile"
                    placeholder="Enter your 10-digit mobile number"
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    maxLength={10}
                    className="text-lg"
                    autoFocus
                  />
                  <p className="text-xs text-muted-foreground">We'll send you an OTP for verification</p>
                </div>

                <Button
                  onClick={handleMobileSubmit}
                  disabled={!mobileNo.trim() || mobileNo.length < 10 || isLoading}
                  className="w-full gap-2"
                >
                  {isLoading ? 'Sending OTP...' : 'Send OTP'}
                  <ArrowRight className="size-4" />
                </Button>

                <Button
                  variant="outline"
                  onClick={() => router.back()}
                  className="w-full"
                >
                  Back to Services
                </Button>
              </div>
            </>
          )}

          {/* Step 2: OTP Verification */}
          {step === 'otp' && (
            <>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Enter OTP</h2>
                <p className="text-muted-foreground">OTP sent to +91 •••••{mobileNo.slice(-4)}</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">OTP Code</Label>
                  <Input
                    id="otp"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength={6}
                    className="text-center text-2xl tracking-widest"
                    autoFocus
                  />
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Did not receive OTP? <button className="text-primary font-medium hover:underline">Resend</button>
                </p>

                <Button
                  onClick={handleOtpSubmit}
                  disabled={!otp.trim() || otp.length < 6 || isLoading}
                  className="w-full gap-2"
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                  <ArrowRight className="size-4" />
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setStep('mobile')}
                  className="w-full gap-2"
                >
                  <ArrowLeft className="size-4" />
                  Change Mobile Number
                </Button>
              </div>
            </>
          )}

          {/* Success */}
          {step === 'success' && (
            <>
              <div className="text-center space-y-4 py-6">
                <div className="flex justify-center">
                  <div className="rounded-full bg-green-500/20 p-4">
                    <CheckCircle className="size-12 text-green-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">Verification Complete</h2>
                  <p className="text-muted-foreground">You can now access guest services</p>
                </div>
              </div>
              <Button onClick={handleSuccess} className="w-full gap-2">
                Continue to Services
                <ArrowRight className="size-4" />
              </Button>
            </>
          )}
        </Card>
      </main>
    </div>
  )
}
