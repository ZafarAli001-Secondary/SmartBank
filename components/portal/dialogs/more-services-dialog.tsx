'use client'

import { LayoutGrid } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

// Placeholder — implemented in the "More Services" module (loans, FD, profile).
export function MoreServicesDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <LayoutGrid className="size-5 text-primary" /> More Services
          </DialogTitle>
          <DialogDescription>This feature is coming soon.</DialogDescription>
        </DialogHeader>
        <Button onClick={onClose} className="h-12 w-full font-semibold">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  )
}
