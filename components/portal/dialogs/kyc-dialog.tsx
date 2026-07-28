'use client'

import { useMemo, useState } from 'react'
import {
  Camera,
  Check,
  FileText,
  IdCard,
  Loader2,
  RotateCcw,
  ScanLine,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SuccessView } from '@/components/portal/dialogs/success-view'
import { useAuth } from '@/lib/auth/auth-provider'
import { submitKyc, type KycDocType } from '@/services/kyc-service'
import { cn } from '@/lib/utils'
import type { KycStatus } from '@/lib/supabase/types'

interface DocSpec {
  type: KycDocType
  label: string
  hint: string
  icon: LucideIcon
  fileName: string
}

const DOCUMENTS: DocSpec[] = [
  {
    type: 'pan',
    label: 'PAN Card',
    hint: 'Place your PAN card on the scanner',
    icon: IdCard,
    fileName: 'pan_card.jpg',
  },
  {
    type: 'aadhaar',
    label: 'Aadhaar Card',
    hint: 'Both front and back',
    icon: ScanLine,
    fileName: 'aadhaar.jpg',
  },
  {
    type: 'address',
    label: 'Address Proof',
    hint: 'Utility bill or passport',
    icon: FileText,
    fileName: 'address_proof.pdf',
  },
  {
    type: 'photo',
    label: 'Live Photo',
    hint: 'Look at the camera to capture',
    icon: Camera,
    fileName: 'selfie.jpg',
  },
]

const STATUS_META: Record<
  KycStatus,
  { label: string; className: string }
> = {
  not_submitted: {
    label: 'Not Submitted',
    className: 'bg-muted text-muted-foreground border-border',
  },
  pending: {
    label: 'Under Review',
    className: 'bg-warning/15 text-warning border-warning/30',
  },
  verified: {
    label: 'Verified',
    className: 'bg-success/15 text-success border-success/30',
  },
  rejected: {
    label: 'Rejected',
    className: 'bg-destructive/15 text-destructive border-destructive/30',
  },
}

export function KycDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { user } = useAuth()
  const [captured, setCaptured] = useState<Record<KycDocType, boolean>>({
    pan: false,
    aadhaar: false,
    address: false,
    photo: false,
  })
  const [scanning, setScanning] = useState<KycDocType | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [reference, setReference] = useState<string | null>(null)

  const status: KycStatus = user?.kyc_status ?? 'not_submitted'
  const statusMeta = STATUS_META[status]

  const capturedCount = useMemo(
    () => Object.values(captured).filter(Boolean).length,
    [captured],
  )
  const allCaptured = capturedCount === DOCUMENTS.length

  function reset() {
    setCaptured({ pan: false, aadhaar: false, address: false, photo: false })
    setScanning(null)
    setSubmitting(false)
    setReference(null)
  }

  function handleClose() {
    reset()
    onClose()
  }

  function handleCapture(type: KycDocType) {
    setScanning(type)
    // Simulate the kiosk scanner / camera capturing the document.
    setTimeout(() => {
      setCaptured((c) => ({ ...c, [type]: true }))
      setScanning(null)
    }, 900)
  }

  async function handleSubmit() {
    if (!allCaptured) {
      toast.error('Please capture all four documents first.')
      return
    }
    setSubmitting(true)
    try {
      const result = await submitKyc({
        user_id: user?.id ?? 'guest',
        documents: DOCUMENTS.map((d) => ({
          doc_type: d.type,
          file_name: d.fileName,
        })),
      })
      setReference(result.reference)
    } catch {
      toast.error('Could not submit your documents. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <ShieldCheck className="size-5 text-primary" /> Digital KYC
            Verification
          </DialogTitle>
          <DialogDescription>
            Scan your documents to complete Know Your Customer verification.
          </DialogDescription>
        </DialogHeader>

        {reference ? (
          <SuccessView
            reference={reference}
            title="Documents Submitted"
            message="Your documents are now under review. Verification usually completes within 24 hours."
            showTokenButton={false}
            onDone={handleClose}
          />
        ) : (
          <div className="space-y-4">
            {/* Current status */}
            <div className="flex items-center justify-between rounded-lg border border-border bg-muted px-4 py-3">
              <span className="text-sm font-medium text-muted-foreground">
                Current KYC status
              </span>
              <span
                className={cn(
                  'inline-flex items-center whitespace-nowrap rounded-full border px-3 py-1 text-xs font-semibold',
                  statusMeta.className,
                )}
              >
                {statusMeta.label}
              </span>
            </div>

            {/* Progress */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">
                Documents
              </span>
              <span className="text-sm font-medium text-muted-foreground tabular-nums">
                {capturedCount} of {DOCUMENTS.length} captured
              </span>
            </div>

            <ScrollArea className="max-h-[280px] pr-1">
              <ul className="space-y-3">
                {DOCUMENTS.map((doc) => {
                  const isCaptured = captured[doc.type]
                  const isScanning = scanning === doc.type
                  const Icon = doc.icon
                  return (
                    <li
                      key={doc.type}
                      className={cn(
                        'flex items-center gap-3 rounded-xl border p-3 transition-colors',
                        isCaptured
                          ? 'border-success/40 bg-success/5'
                          : 'border-border bg-card',
                      )}
                    >
                      <div
                        className={cn(
                          'flex size-11 shrink-0 items-center justify-center rounded-lg',
                          isCaptured
                            ? 'bg-success/15 text-success'
                            : 'bg-accent text-primary',
                        )}
                      >
                        {isCaptured ? (
                          <Check className="size-5" />
                        ) : (
                          <Icon className="size-5" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-foreground">
                          {doc.label}
                        </div>
                        <div className="truncate text-sm text-muted-foreground">
                          {isCaptured ? doc.fileName : doc.hint}
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant={isCaptured ? 'outline' : 'default'}
                        onClick={() => handleCapture(doc.type)}
                        disabled={isScanning || submitting}
                        className="h-10 shrink-0 gap-2"
                      >
                        {isScanning ? (
                          <>
                            <Loader2 className="size-4 animate-spin" />
                            Scanning…
                          </>
                        ) : isCaptured ? (
                          <>
                            <RotateCcw className="size-4" />
                            Recapture
                          </>
                        ) : (
                          <>
                            <Camera className="size-4" />
                            Capture
                          </>
                        )}
                      </Button>
                    </li>
                  )
                })}
              </ul>
            </ScrollArea>

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
                type="button"
                onClick={handleSubmit}
                disabled={!allCaptured || submitting}
                className="h-12 flex-1 gap-2 font-semibold"
              >
                {submitting && <Loader2 className="size-4 animate-spin" />}
                {submitting ? 'Submitting…' : 'Submit for Verification'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
