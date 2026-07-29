'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Logo } from '@/components/brand/logo'
import { Clock } from '@/components/kiosk/clock'
import { LanguageSelect } from '@/components/kiosk/language-select'
import { AccessibilityButton } from '@/components/kiosk/accessibility-button'
import { toast } from 'sonner'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { makeReference } from '@/lib/mock/db'

type FormStep = 'account' | 'amount' | 'confirmation'

const PURPOSE_OPTIONS = [
  'Self Deposit',
  'Family Support',
  'Loan Repayment',
  'Tuition Fees',
  'Rent Payment',
  'Business Payment',
  'Gift',
  'Other',
]

export default function CashDepositPage() {
  const router = useRouter()
  const [step, setStep] = useState<FormStep>('account')
  const [loading, setLoading] = useState(false)
  const [referenceNumber, setReferenceNumber] = useState('')
  const [queueToken, setQueueToken] = useState('')
  const [formData, setFormData] = useState({
    accountNumber: '',
    amount: '',
    purpose: 'Self Deposit',
  })
  const [accountHolder, setAccountHolder] = useState('')

  const handleVerifyAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.accountNumber) {
      toast.error('Please enter an account number')
      return
    }

    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setAccountHolder('Aarav Sharma')
      setStep('amount')
      toast.success('Account verified successfully')
    } catch (error) {
      toast.error('Account not found')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitDeposit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      toast.error('Please enter a valid amount')
      return
    }

    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const ref = makeReference()
      const token = `SB-BHL-DEP-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-001`
      
      setReferenceNumber(ref)
      setQueueToken(token)
      setStep('confirmation')
      toast.success('Deposit request submitted')
    } catch (error) {
      toast.error('Failed to submit deposit request')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'confirmation') {
    return (
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <aside className="relative hidden w-[42%] flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
          <Logo size="lg" className="[&_*]:text-primary-foreground [&>div:first-child]:bg-primary-foreground [&>div:first-child]:text-primary" />
          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight text-balance">
              Deposit Submitted
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-primary-foreground/80">
              Your cash deposit request has been received. Please proceed to the counter with your token.
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
                <h2 className="text-2xl font-bold text-foreground">Deposit Request Submitted</h2>
              </div>

              <div className="space-y-4 rounded-lg bg-accent/30 p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Reference Number</p>
                  <p className="text-lg font-bold text-foreground">{referenceNumber}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Queue Token</p>
                  <p className="text-lg font-bold text-foreground">{queueToken}</p>
                  <p className="text-xs text-muted-foreground mt-1">Estimated wait: 20 minutes</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Deposit Amount</p>
                  <p className="text-lg font-semibold text-foreground">₹{parseFloat(formData.amount).toLocaleString()}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Account Holder</p>
                  <p className="text-lg font-semibold text-foreground">{accountHolder}</p>
                </div>
              </div>

              <div className="space-y-3">
                <Button onClick={() => router.push('/kiosk/guest')} className="w-full">
                  Back to Services
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
            Cash Deposit
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-primary-foreground/80">
            Deposit cash into any SmartBank account. Your request will be processed by our staff.
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
              <h2 className="text-2xl font-bold text-foreground">
                {step === 'account' ? 'Account Details' : 'Deposit Amount'}
              </h2>
              <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-2">
                <ArrowLeft className="size-4" />
              </Button>
            </div>

            {step === 'account' && (
              <form onSubmit={handleVerifyAccount} className="space-y-4">
                <div>
                  <Label htmlFor="accountNumber" className="text-sm font-semibold">
                    Recipient Account Number
                  </Label>
                  <Input
                    id="accountNumber"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    placeholder="Enter 12-digit account number"
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-2">Demo: Use any account number like 123456789012</p>
                </div>

                <Button type="submit" disabled={loading} className="h-12 w-full text-base font-semibold">
                  {loading ? 'Verifying...' : 'Verify Account'}
                </Button>
              </form>
            )}

            {step === 'amount' && (
              <form onSubmit={handleSubmitDeposit} className="space-y-4">
                <div className="rounded-lg bg-accent/30 p-3">
                  <p className="text-xs text-muted-foreground">Account Holder</p>
                  <p className="text-lg font-semibold text-foreground">{accountHolder}</p>
                </div>

                <div>
                  <Label htmlFor="amount" className="text-sm font-semibold">
                    Deposit Amount (₹)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="Enter amount"
                    min="100"
                    max="100000"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="purpose" className="text-sm font-semibold">
                    Purpose of Deposit
                  </Label>
                  <select
                    id="purpose"
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground"
                  >
                    {PURPOSE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <Button type="submit" disabled={loading} className="h-12 w-full text-base font-semibold">
                  {loading ? 'Submitting...' : 'Submit Deposit Request'}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep('account')}
                  className="w-full"
                >
                  Back
                </Button>
              </form>
            )}
          </Card>
        </div>
      </main>
    </div>
  )
}
