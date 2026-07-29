'use client'

import { Wallet, TrendingUp, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { formatINR } from '@/lib/services-config'
import { useAuth } from '@/lib/auth/auth-provider'

export function AccountDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { primaryAccount } = useAuth()
  const [showBalance, setShowBalance] = useState(true)

  // Mock balance data
  const balance = 2547891.50
  const availableBalance = 2500000.00
  const ledgerBalance = 2547891.50

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Wallet className="size-5 text-primary" /> Account Balance
          </DialogTitle>
          <DialogDescription>
            {primaryAccount?.account_number}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Balance Display */}
          <div className="rounded-lg bg-accent/50 p-4 border border-accent">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-muted-foreground">
                Current Balance
              </span>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {showBalance ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
              </button>
            </div>
            <div className="text-3xl font-bold text-foreground">
              {showBalance ? formatINR(balance) : '••••••••'}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Last updated: Today at 2:30 PM
            </p>
          </div>

          <Separator />

          {/* Balance Breakdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Available Balance
              </span>
              <span className="text-sm font-semibold text-foreground">
                {showBalance ? formatINR(availableBalance) : '••••••••'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Ledger Balance
              </span>
              <span className="text-sm font-semibold text-foreground">
                {showBalance ? formatINR(ledgerBalance) : '••••••••'}
              </span>
            </div>
          </div>

          <Separator />

          {/* Account Info */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Account Type</span>
              <span className="font-semibold text-foreground">
                {primaryAccount?.account_type}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Interest Rate</span>
              <span className="font-semibold text-primary flex items-center gap-1">
                <TrendingUp className="size-4" /> 4.50% p.a.
              </span>
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <Button variant="outline" className="h-11">
              Mini Statement
            </Button>
            <Button variant="outline" className="h-11">
              Download Statement
            </Button>
          </div>

          <Button onClick={onClose} className="h-12 w-full font-semibold">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
