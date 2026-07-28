'use client'

import { CheckCircle2, Copy, Ticket } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/kiosk/status-badge'

export function SuccessView({
  reference,
  title = 'Request Submitted',
  message = 'Your request has been recorded and is awaiting staff verification.',
  showTokenButton = true,
  onGenerateToken,
  onDone,
}: {
  reference: string
  title?: string
  message?: string
  showTokenButton?: boolean
  onGenerateToken?: () => void
  onDone: () => void
}) {
  return (
    <div className="flex flex-col items-center py-4 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-success/15 text-success">
        <CheckCircle2 className="size-9" />
      </div>
      <h3 className="mt-4 text-xl font-bold text-foreground">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{message}</p>

      <div className="mt-5 w-full rounded-lg border border-border bg-muted p-4">
        <div className="text-xs font-medium text-muted-foreground">
          Reference Number
        </div>
        <div className="mt-1 flex items-center justify-center gap-2">
          <span className="text-2xl font-bold tracking-wider text-foreground">
            {reference}
          </span>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(reference)
              toast.success('Reference copied')
            }}
            aria-label="Copy reference number"
            className="text-muted-foreground hover:text-foreground"
          >
            <Copy className="size-4" />
          </button>
        </div>
        <div className="mt-3 flex justify-center">
          <StatusBadge status="pending" />
        </div>
      </div>

      <div className="mt-6 flex w-full gap-3">
        {showTokenButton && onGenerateToken && (
          <Button
            variant="outline"
            onClick={onGenerateToken}
            className="h-12 flex-1 gap-2"
          >
            <Ticket className="size-5" /> Queue Token
          </Button>
        )}
        <Button onClick={onDone} className="h-12 flex-1 font-semibold">
          Done
        </Button>
      </div>
    </div>
  )
}
