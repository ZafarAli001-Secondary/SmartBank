'use client'

import { useState } from 'react'
import {
  BadgePercent,
  ChevronRight,
  CreditCard,
  FileText,
  HandCoins,
  LayoutGrid,
  Phone,
  ShieldCheck,
  UserCog,
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
import { RatesTable } from '@/components/portal/rates-table'
import type { LucideIcon } from 'lucide-react'

interface MoreItem {
  icon: LucideIcon
  title: string
  description: string
}

const ITEMS: MoreItem[] = [
  { icon: HandCoins, title: 'Apply for a Loan', description: 'Home, personal, car & education loans' },
  { icon: CreditCard, title: 'Debit / Credit Cards', description: 'Request, block or manage cards' },
  { icon: BadgePercent, title: 'Open Fixed Deposit', description: 'Lock in high FD interest rates' },
  { icon: FileText, title: 'Request Statement', description: 'Email or print account statements' },
  { icon: UserCog, title: 'Update Profile', description: 'Change contact details & preferences' },
  { icon: Phone, title: 'Talk to an Advisor', description: 'Connect to a branch representative' },
]

export function MoreServicesDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [view, setView] = useState<'menu' | 'rates'>('menu')

  function handleClose() {
    setView('menu')
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <LayoutGrid className="size-5 text-primary" /> More Services
          </DialogTitle>
          <DialogDescription>
            Explore loans, deposits and account services.
          </DialogDescription>
        </DialogHeader>

        {view === 'menu' ? (
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setView('rates')}
              className="flex w-full items-center gap-3 rounded-lg border border-border bg-accent/60 px-4 py-3 text-left transition hover:border-primary"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ShieldCheck className="size-5" />
              </span>
              <div className="flex-1">
                <div className="text-sm font-semibold text-foreground">
                  View Interest Rates
                </div>
                <div className="text-xs text-muted-foreground">
                  Current FD & loan rates
                </div>
              </div>
              <ChevronRight className="size-4 text-muted-foreground" />
            </button>

            {ITEMS.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() =>
                  toast.info(`${item.title} — a staff member will assist you.`)
                }
                className="flex w-full items-center gap-3 rounded-lg border border-border px-4 py-3 text-left transition hover:border-primary hover:bg-muted"
              >
                <span className="flex size-10 items-center justify-center rounded-lg bg-muted text-foreground">
                  <item.icon className="size-5" />
                </span>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-foreground">
                    {item.title}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {item.description}
                  </div>
                </div>
                <ChevronRight className="size-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <RatesTable />
            <Button
              variant="outline"
              onClick={() => setView('menu')}
              className="w-full bg-transparent"
            >
              Back to services
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
