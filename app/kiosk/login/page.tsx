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

type Step = 'account' | 'mobile' | 'otp' | 'success'

export default function RegisteredCustomerLoginPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('account')
  const [accountNo, setAccountNo] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleAccountSubmit = () => {
    if (!accountNo.trim()) return
    setStep('mobile')
  }

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
    router.push('/kiosk/portal')
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Brand panel */}
      <aside className="relative hidden w-[42%] flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
        <Logo
          size="lg"
          className="[&_*]:text-primary-foreground [&>div:first-child]:bg-primary-foreground [&>div:first-child]:text-primary"
        />
        
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight">
              Welcome Back
            </h1>
            <p className="text-lg leading-relaxed text-primary-foreground/80">
              Access your FinCore account securely with your account details and OTP verification.
            </p>
          </div>

          {/* Step Indicator */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-primary-foreground/80">Authentication Steps</p>
            <div className="space-y-2">
              {[
                { num: 1, label: 'Account Number', current: step === 'account' || ['mobile', 'otp', 'success'].includes(step) },
                { num: 2, label: 'Mobile Number', current: step === 'mobile' || ['otp', 'success'].includes(step) },
                { num: 3, label: 'OTP Verification', current: step === 'otp' || step === 'success' },
              ].map((item) => (
                <div key={item.num} className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 font-semibold ${item.current ? 'border-green-400 bg-green-400/20 text-green-300' : 'border-primary-foreground/30 text-primary-foreground/60'}`}>
                    {item.num}
                  </div>
                  <span className={item.current ? 'text-primary-foreground' : 'text-primary-foreground/60'}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm text-primary-foreground/70">
          Secure Authentication · FinCore
        </p>
      </aside>

      {/* Login Form */}
      <main className="flex flex-1 flex-col">
        <header className="flex items-center justify-end gap-3 p-5">
          <Clock />
          <LanguageSelect />
          <AccessibilityButton variant="outline" />
        </header>

        <div className="flex flex-1 items-center justify-center px-6 pb-10">
          <Card className="w-full max-w-md p-8 space-y-6">
            {/* Step 1: Account Number */}
            {step === 'account' && (
              <>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">Step 1 of 3</h2>
                  <p className="text-muted-foreground">Enter your account number</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="account">Account Number</Label>
                    <Input
                      id="account"
                      placeholder="Enter your 12-digit account number"
                      value={accountNo}
                      onChange={(e) => setAccountNo(e.target.value.replace(/\D/g, '').slice(0, 12))}
                      maxLength={12}
                      className="text-lg"
                      autoFocus
                    />
                  </div>
                  <Button
                    onClick={handleAccountSubmit}
                    disabled={!accountNo.trim()}
                    className="w-full gap-2"
                  >
                    Continue
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </>
            )}

            {/* Step 2: Mobile Number */}
            {step === 'mobile' && (
              <>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">Step 2 of 3</h2>
                  <p className="text-muted-foreground">Enter your registered mobile number</p>
                </div>
                <div className="space-y-2 p-3 rounded-lg bg-accent/30">
                  <p className="text-xs font-medium text-muted-foreground">Account Number</p>
                  <p className="font-semibold text-foreground">{accountNo}</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Registered Mobile Number</Label>
                    <Input
                      id="mobile"
                      placeholder="Enter your 10-digit mobile number"
                      value={mobileNo}
                      onChange={(e) => setMobileNo(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      maxLength={10}
                      className="text-lg"
                      autoFocus
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setStep('account')}
                      className="gap-2"
                    >
                      <ArrowLeft className="size-4" />
                      Back
                    </Button>
                    <Button
                      onClick={handleMobileSubmit}
                      disabled={!mobileNo.trim() || isLoading}
                      className="flex-1 gap-2"
                    >
                      {isLoading ? 'Sending OTP...' : 'Send OTP'}
                      <ArrowRight className="size-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}

            {/* Step 3: OTP Verification */}
            {step === 'otp' && (
              <>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">Step 3 of 3</h2>
                  <p className="text-muted-foreground">Enter the OTP sent to your mobile</p>
                </div>
                <div className="space-y-3 p-3 rounded-lg bg-accent/30">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Account</span>
                    <span className="font-semibold text-foreground">{accountNo}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-accent pt-3">
                    <span className="text-muted-foreground">Mobile</span>
                    <span className="font-semibold text-foreground">•••••{mobileNo.slice(-4)}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp">Enter OTP</Label>
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
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setStep('mobile')}
                      className="gap-2"
                    >
                      <ArrowLeft className="size-4" />
                      Back
                    </Button>
                    <Button
                      onClick={handleOtpSubmit}
                      disabled={!otp.trim() || otp.length < 6 || isLoading}
                      className="flex-1 gap-2"
                    >
                      {isLoading ? 'Verifying...' : 'Verify'}
                      <ArrowRight className="size-4" />
                    </Button>
                  </div>
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
                    <h2 className="text-2xl font-bold text-foreground">Authentication Successful</h2>
                    <p className="text-muted-foreground">Welcome back! Redirecting to your account...</p>
                  </div>
                </div>
                <Button onClick={handleSuccess} className="w-full gap-2">
                  Continue to Account
                  <ArrowRight className="size-4" />
                </Button>
              </>
            )}
          </Card>
        </div>
      </main>
    </div>
  )
}
