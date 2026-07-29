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

type FormStep = 'form' | 'confirmation'

const ACCOUNT_TYPES = [
  { value: 'savings', label: 'Savings Account' },
  { value: 'current', label: 'Current Account' },
  { value: 'salary', label: 'Salary Account' },
  { value: 'student', label: 'Student Account' },
  { value: 'senior', label: 'Senior Citizen Account' },
]

export default function AccountOpeningPage() {
  const router = useRouter()
  const [step, setStep] = useState<FormStep>('form')
  const [loading, setLoading] = useState(false)
  const [referenceNumber, setReferenceNumber] = useState('')
  const [queueToken, setQueueToken] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    accountType: 'savings',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.dob) {
      toast.error('Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const ref = makeReference()
      const token = `SB-BHL-AON-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-001`
      
      setReferenceNumber(ref)
      setQueueToken(token)
      setStep('confirmation')
      toast.success('Application submitted successfully')
    } catch (error) {
      toast.error('Failed to submit application')
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
              Application Submitted
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-primary-foreground/80">
              Your account opening application has been received and is being processed.
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
                <h2 className="text-2xl font-bold text-foreground">Application Submitted</h2>
              </div>

              <div className="space-y-4 rounded-lg bg-accent/30 p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Reference Number</p>
                  <p className="text-lg font-bold text-foreground">{referenceNumber}</p>
                  <p className="text-xs text-muted-foreground mt-1">Save this for your records</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Queue Token</p>
                  <p className="text-lg font-bold text-foreground">{queueToken}</p>
                  <p className="text-xs text-muted-foreground mt-1">Estimated wait: 30 minutes</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Account Type</p>
                  <p className="text-lg font-semibold text-foreground capitalize">
                    {ACCOUNT_TYPES.find((t) => t.value === formData.accountType)?.label}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => router.push('/kiosk/guest')}
                  className="w-full"
                >
                  Back to Services
                </Button>
                <Button variant="outline" onClick={() => router.push('/kiosk')} className="w-full">
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
            Open New Account
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-primary-foreground/80">
            Get started with SmartBank. Choose your preferred account type and submit your details.
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
              <h2 className="text-2xl font-bold text-foreground">Account Details</h2>
              <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-2">
                <ArrowLeft className="size-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="fullName" className="text-sm font-semibold">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Enter your full name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-semibold">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-semibold">
                  Mobile Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter 10-digit mobile number"
                  maxLength="10"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="dob" className="text-sm font-semibold">
                  Date of Birth
                </Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="address" className="text-sm font-semibold">
                  Address
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter your address"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="accountType" className="text-sm font-semibold">
                  Account Type
                </Label>
                <select
                  id="accountType"
                  value={formData.accountType}
                  onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground"
                >
                  {ACCOUNT_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <Button type="submit" disabled={loading} className="h-12 w-full text-base font-semibold">
                {loading ? 'Submitting...' : 'Submit Application'}
              </Button>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}
