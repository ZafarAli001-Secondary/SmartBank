'use client'

import { Home, DollarSign, Zap, BookOpen } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const LOAN_TYPES = [
  {
    id: 'home_loan',
    name: 'Home Loan',
    icon: Home,
    description: 'Flexible terms and competitive rates',
  },
  {
    id: 'gold_loan',
    name: 'Gold Loan',
    icon: Zap,
    description: 'Quick approval and instant disbursal',
  },
  {
    id: 'vehicle_loan',
    name: 'Vehicle Loan',
    icon: DollarSign,
    description: 'Finance your dream vehicle',
  },
  {
    id: 'education_loan',
    name: 'Education Loan',
    icon: BookOpen,
    description: 'Support your educational goals',
  },
]

export function LoansDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Loan Rates</DialogTitle>
          <DialogDescription>
            Select a loan type to learn more or apply
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3">
          {LOAN_TYPES.map((loan) => {
            const Icon = loan.icon
            return (
              <button
                key={loan.id}
                className={cn(
                  'rounded-lg border-2 border-border bg-card p-4 text-left transition-all hover:border-primary/50 hover:bg-accent/50'
                )}
              >
                <Icon className="mb-2 size-6 text-primary" />
                <div className="text-sm font-semibold text-foreground">
                  {loan.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {loan.description}
                </div>
              </button>
            )
          })}
        </div>

        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
          className="mt-4 h-11 w-full"
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  )
}
