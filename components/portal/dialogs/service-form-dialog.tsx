'use client'

import { useMemo, useState } from 'react'
import { Loader2 } from 'lucide-react'
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
import { Textarea } from '@/components/ui/textarea'
import { SuccessView } from '@/components/portal/dialogs/success-view'
import { useAuth } from '@/lib/auth/auth-provider'
import { formatINR, type ServiceDef } from '@/lib/services-config'
import { createServiceRequest } from '@/services/service-requests'
import { generateToken } from '@/services/queue-service'
import type { ServiceType } from '@/lib/supabase/types'

interface Field {
  name: string
  label: string
  kind: 'text' | 'amount' | 'textarea'
  placeholder: string
  optional?: boolean
}

const FIELDS: Record<string, Field[]> = {
  cash_withdrawal: [
    { name: 'account_number', label: 'Account Number', kind: 'text', placeholder: 'Enter account number' },
    { name: 'amount', label: 'Amount', kind: 'amount', placeholder: '0' },
    { name: 'remarks', label: 'Remarks', kind: 'textarea', placeholder: 'Optional note', optional: true },
  ],
  cash_deposit: [
    { name: 'account_number', label: 'Account Number', kind: 'text', placeholder: 'Enter account number' },
    { name: 'amount', label: 'Amount', kind: 'amount', placeholder: '0' },
    { name: 'depositor_name', label: 'Depositor Name', kind: 'text', placeholder: 'Name of person depositing' },
  ],
  fund_transfer: [
    { name: 'from_account', label: 'From Account', kind: 'text', placeholder: 'Your account number' },
    { name: 'to_account', label: 'To Account', kind: 'text', placeholder: 'Beneficiary account number' },
    { name: 'beneficiary', label: 'Beneficiary Name', kind: 'text', placeholder: 'Beneficiary name' },
    { name: 'amount', label: 'Amount', kind: 'amount', placeholder: '0' },
    { name: 'remarks', label: 'Remarks', kind: 'textarea', placeholder: 'Optional note', optional: true },
  ],
  cheque_deposit: [
    { name: 'account_number', label: 'Account Number', kind: 'text', placeholder: 'Enter account number' },
    { name: 'cheque_number', label: 'Cheque Number', kind: 'text', placeholder: '6-digit cheque number' },
    { name: 'amount', label: 'Amount', kind: 'amount', placeholder: '0' },
  ],
}

const PRESETS = [1000, 5000, 10000, 25000]

export function ServiceFormDialog({
  service,
  open,
  onClose,
  onCompleted,
}: {
  service: ServiceDef
  open: boolean
  onClose: () => void
  onCompleted: () => void
}) {
  const { user } = useAuth()
  const fields = useMemo(() => FIELDS[service.type] ?? [], [service.type])
  const [values, setValues] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [reference, setReference] = useState<string | null>(null)

  function reset() {
    setValues({})
    setReference(null)
    setSubmitting(false)
  }

  function handleClose() {
    reset()
    onClose()
  }

  const set = (name: string, value: string) =>
    setValues((v) => ({ ...v, [name]: value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    for (const field of fields) {
      if (!field.optional && !values[field.name]?.trim()) {
        toast.error(`${field.label} is required.`)
        return
      }
    }
    const amountRaw = values.amount
    const amount = amountRaw ? Number(amountRaw) : null
    if (amount !== null && (Number.isNaN(amount) || amount <= 0)) {
      toast.error('Enter a valid amount greater than zero.')
      return
    }

    setSubmitting(true)
    try {
      const { amount: _a, ...details } = values
      const request = await createServiceRequest({
        user_id: user?.id ?? 'guest',
        customer_name: user?.full_name ?? 'Guest',
        service_type: service.type,
        amount,
        details,
      })
      setReference(request.reference)
      onCompleted()
    } catch {
      toast.error('Could not submit your request. Please try again.')
      setSubmitting(false)
    }
  }

  async function handleGenerateToken() {
    try {
      const token = await generateToken({
        user_id: user?.id ?? null,
        customer_name: user?.full_name ?? 'Guest',
        service_type: service.type as ServiceType,
      })
      onCompleted()
      toast.success(`Queue token ${token.token_number} generated`)
      handleClose()
    } catch {
      toast.error('Could not generate token.')
    }
  }

  const amount = Number(values.amount || 0)

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">{service.title}</DialogTitle>
          <DialogDescription>{service.description}</DialogDescription>
        </DialogHeader>

        {reference ? (
          <SuccessView
            reference={reference}
            onGenerateToken={handleGenerateToken}
            onDone={handleClose}
          />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name} className="text-sm font-semibold">
                  {field.label}
                  {field.optional && (
                    <span className="ml-1 font-normal text-muted-foreground">
                      (optional)
                    </span>
                  )}
                </Label>

                {field.kind === 'textarea' ? (
                  <Textarea
                    id={field.name}
                    value={values[field.name] ?? ''}
                    onChange={(e) => set(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="min-h-[64px] resize-none text-base"
                  />
                ) : (
                  <Input
                    id={field.name}
                    inputMode={field.kind === 'amount' ? 'numeric' : 'text'}
                    value={values[field.name] ?? ''}
                    onChange={(e) =>
                      set(
                        field.name,
                        field.kind === 'amount'
                          ? e.target.value.replace(/[^0-9]/g, '')
                          : e.target.value,
                      )
                    }
                    placeholder={field.placeholder}
                    className="h-12 text-base"
                  />
                )}

                {field.kind === 'amount' && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {PRESETS.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => set('amount', String(p))}
                        className="rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground hover:border-primary hover:bg-accent"
                      >
                        +{formatINR(p).replace('₹', '₹')}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {amount > 0 && (
              <div className="flex items-center justify-between rounded-lg bg-accent px-4 py-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Total
                </span>
                <span className="text-lg font-bold text-primary">
                  {formatINR(amount)}
                </span>
              </div>
            )}

            <div className="flex gap-3 pt-1">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="h-12 flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="h-12 flex-1 gap-2 font-semibold"
              >
                {submitting && <Loader2 className="size-4 animate-spin" />}
                {submitting ? 'Submitting…' : 'Submit'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
