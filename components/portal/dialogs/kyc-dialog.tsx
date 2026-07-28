'use client'

import { useState } from 'react'
import { Check, FileText, IdCard, Loader2, User } from 'lucide-react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Progress } from '@/components/portal/dialogs/step-progress'
import { SuccessView } from '@/components/portal/dialogs/success-view'
import { useAuth } from '@/lib/auth/auth-provider'
import { createServiceRequest } from '@/services/service-requests'

const STEPS = ['Personal', 'Identity', 'Review']

export function KycDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { user } = useAuth()
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [reference, setReference] = useState<string | null>(null)
  const [form, setForm] = useState({
    fullName: user?.full_name ?? '',
    dob: '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    address: '',
    idType: 'aadhaar',
    idNumber: '',
  })

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function handleClose() {
    setStep(0)
    setReference(null)
    setSubmitting(false)
    onClose()
  }

  function stepValid() {
    if (step === 0)
      return Boolean(
        form.fullName && form.dob && form.email && form.phone && form.address,
      )
    if (step === 1) return Boolean(form.idType && form.idNumber)
    return true
  }

  async function handleSubmit() {
    setSubmitting(true)
    try {
      const request = await createServiceRequest({
        user_id: user?.id ?? 'guest',
        customer_name: form.fullName,
        service_type: 'digital_kyc',
        amount: null,
        details: {
          dob: form.dob,
          email: form.email,
          phone: form.phone,
          address: form.address,
          id_type: form.idType,
          id_number: form.idNumber,
        },
      })
      setReference(request.reference)
    } catch {
      toast.error('Could not submit onboarding. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="sm:max-w-lg">
        {reference ? (
          <SuccessView
            title="Application received"
            reference={reference}
            message="Your KYC application is under review. A staff member will verify your documents and activate your account shortly."
            showTokenButton={false}
            onDone={handleClose}
          />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <IdCard className="size-5 text-primary" aria-hidden />
                Digital KYC Onboarding
              </DialogTitle>
              <DialogDescription>
                Complete the steps below to verify your identity.
              </DialogDescription>
            </DialogHeader>

            <div className="py-2">
              <Progress steps={STEPS} current={step} />
            </div>

            <div className="space-y-4">
              {step === 0 && (
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="kyc-name">Full legal name</Label>
                    <Input
                      id="kyc-name"
                      className="h-11 text-base"
                      value={form.fullName}
                      onChange={(e) => set('fullName', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="kyc-dob">Date of birth</Label>
                      <Input
                        id="kyc-dob"
                        type="date"
                        className="h-11 text-base"
                        value={form.dob}
                        onChange={(e) => set('dob', e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="kyc-phone">Phone</Label>
                      <Input
                        id="kyc-phone"
                        inputMode="tel"
                        className="h-11 text-base"
                        value={form.phone}
                        onChange={(e) => set('phone', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="kyc-email">Email address</Label>
                    <Input
                      id="kyc-email"
                      type="email"
                      className="h-11 text-base"
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="kyc-address">Residential address</Label>
                    <Input
                      id="kyc-address"
                      className="h-11 text-base"
                      value={form.address}
                      onChange={(e) => set('address', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="kyc-idtype">Identity document</Label>
                    <Select
                      value={form.idType}
                      onValueChange={(v) => set('idType', v ?? '')}
                    >
                      <SelectTrigger id="kyc-idtype" className="h-11 text-base">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aadhaar">Aadhaar card</SelectItem>
                        <SelectItem value="pan">PAN card</SelectItem>
                        <SelectItem value="passport">Passport</SelectItem>
                        <SelectItem value="dl">Driver&apos;s license</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="kyc-idnum">Document number</Label>
                    <Input
                      id="kyc-idnum"
                      className="h-11 text-base"
                      value={form.idNumber}
                      onChange={(e) => set('idNumber', e.target.value)}
                    />
                  </div>
                  <div className="rounded-lg border border-dashed border-border bg-muted/40 p-6 text-center">
                    <FileText
                      className="mx-auto size-8 text-muted-foreground"
                      aria-hidden
                    />
                    <p className="mt-2 text-sm font-medium">Document scan</p>
                    <p className="text-xs text-muted-foreground">
                      Place your document on the kiosk scanner tray.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 bg-transparent"
                      type="button"
                      onClick={() => toast.success('Document scanned')}
                    >
                      Simulate scan
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-3 rounded-lg border border-border bg-muted/30 p-4 text-sm">
                  <Row
                    icon={<User className="size-4" />}
                    label="Name"
                    value={form.fullName}
                  />
                  <Row label="Date of birth" value={form.dob} />
                  <Row label="Email" value={form.email} />
                  <Row label="Phone" value={form.phone} />
                  <Row label="Address" value={form.address} />
                  <Row
                    icon={<IdCard className="size-4" />}
                    label="ID"
                    value={`${form.idType.toUpperCase()} · ${form.idNumber}`}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <Button
                variant="ghost"
                onClick={() => (step === 0 ? handleClose() : setStep((s) => s - 1))}
                disabled={submitting}
              >
                {step === 0 ? 'Cancel' : 'Back'}
              </Button>
              {step < STEPS.length - 1 ? (
                <Button onClick={() => setStep((s) => s + 1)} disabled={!stepValid()}>
                  Continue
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={submitting} className="gap-2">
                  {submitting ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Check className="size-4" aria-hidden />
                  )}
                  {submitting ? 'Submitting…' : 'Submit application'}
                </Button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

function Row({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="flex items-center gap-2 text-muted-foreground">
        {icon}
        {label}
      </span>
      <span className="text-right font-medium">{value || '—'}</span>
    </div>
  )
}
