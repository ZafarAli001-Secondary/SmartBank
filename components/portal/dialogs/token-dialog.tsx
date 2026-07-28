'use client'

import { useState } from 'react'
import { Loader2, Ticket } from 'lucide-react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAuth } from '@/lib/auth/auth-provider'
import { generateToken } from '@/services/queue-service'
import { SERVICE_LABELS } from '@/lib/services-config'
import type { QueueToken, ServiceType } from '@/lib/supabase/types'

const TOKEN_SERVICES: ServiceType[] = [
  'cash_deposit',
  'cash_withdrawal',
  'fund_transfer',
  'cheque_deposit',
  'digital_kyc',
]

export function TokenDialog({
  open,
  onClose,
  onCompleted,
}: {
  open: boolean
  onClose: () => void
  onCompleted: () => void
}) {
  const { user } = useAuth()
  const [serviceType, setServiceType] = useState<ServiceType>('cash_deposit')
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState<QueueToken | null>(null)

  function handleClose() {
    setToken(null)
    setLoading(false)
    setServiceType('cash_deposit')
    onClose()
  }

  async function handleGenerate() {
    setLoading(true)
    try {
      const created = await generateToken({
        user_id: user?.id ?? null,
        customer_name: user?.full_name ?? 'Guest',
        service_type: serviceType,
      })
      setToken(created)
      onCompleted()
    } catch {
      toast.error('Could not generate token.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Ticket className="size-5 text-primary" /> Queue Token
          </DialogTitle>
          <DialogDescription>
            Get a token and wait for your number to be called.
          </DialogDescription>
        </DialogHeader>

        {token ? (
          <div className="flex flex-col items-center py-4 text-center">
            <div className="w-full rounded-xl bg-primary p-8 text-primary-foreground">
              <div className="text-sm font-medium opacity-80">Your Token</div>
              <div className="text-6xl font-bold tracking-wider">
                {token.token_number}
              </div>
              <div className="mt-2 text-sm opacity-90">
                {SERVICE_LABELS[token.service_type]}
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Please watch the counter display. You&apos;ll be called shortly.
            </p>
            <Button onClick={handleClose} className="mt-5 h-12 w-full font-semibold">
              Done
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Service required</Label>
              <Select
                value={serviceType}
                onValueChange={(v) => setServiceType(v as ServiceType)}
              >
                <SelectTrigger className="h-12 text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TOKEN_SERVICES.map((type) => (
                    <SelectItem key={type} value={type} className="h-11 text-base">
                      {SERVICE_LABELS[type]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleClose}
                className="h-12 flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleGenerate}
                disabled={loading}
                className="h-12 flex-1 gap-2 font-semibold"
              >
                {loading && <Loader2 className="size-4 animate-spin" />}
                {loading ? 'Generating…' : 'Generate Token'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
