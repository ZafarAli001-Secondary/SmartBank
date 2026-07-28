'use client'

import { HelpCircle, Phone, ShieldQuestion, Users2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const ITEMS = [
  {
    icon: Users2,
    title: 'Talk to branch staff',
    body: 'Raise your hand or approach any open counter for assistance.',
  },
  {
    icon: Phone,
    title: '24x7 Helpline',
    body: '1800 200 4000 (toll free) · care@smartbank.example',
  },
  {
    icon: ShieldQuestion,
    title: 'Safety first',
    body: 'Never share your PIN or OTP. Staff will never ask for it.',
  },
]

export function HelpDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <HelpCircle className="size-5 text-primary" /> Need help?
          </DialogTitle>
          <DialogDescription>
            We&apos;re here to make your visit quick and easy.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          {ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="flex gap-3 rounded-lg border border-border bg-card p-4"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
                  <Icon className="size-5" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {item.title}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.body}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
