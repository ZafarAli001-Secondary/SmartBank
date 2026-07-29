'use client'

import { useState } from 'react'
import { DollarSign, TrendingUp } from 'lucide-react'
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

const FD_RATES = [
  { tenure: 1, rate: 6.0 },
  { tenure: 2, rate: 6.25 },
  { tenure: 5, rate: 6.8 },
  { tenure: 10, rate: 7.0 },
  { tenure: 20, rate: 7.5 },
]

export function FdRatesDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [principal, setPrincipal] = useState('100000')
  const [selectedTenure, setSelectedTenure] = useState(1)

  const selectedRate = FD_RATES.find((r) => r.tenure === selectedTenure)?.rate || 6.0
  const amount = parseFloat(principal) || 0
  const maturityAmount = amount * Math.pow(1 + selectedRate / 100, selectedTenure)
  const interest = maturityAmount - amount

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>FD Rates Calculator</DialogTitle>
          <DialogDescription>
            Calculate your Fixed Deposit maturity amount
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Principal Input */}
          <div className="space-y-2">
            <Label htmlFor="principal" className="text-sm font-semibold">
              Principal Amount (₹)
            </Label>
            <div className="relative">
              <DollarSign className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="principal"
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="Enter amount"
                className="h-11 pl-10"
              />
            </div>
          </div>

          {/* Tenure Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Select Tenure (Years)</Label>
            <div className="grid grid-cols-5 gap-2">
              {FD_RATES.map((item) => (
                <button
                  key={item.tenure}
                  onClick={() => setSelectedTenure(item.tenure)}
                  className={`rounded-lg border-2 py-2 text-center text-sm font-semibold transition-all ${
                    selectedTenure === item.tenure
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  {item.tenure}y
                </button>
              ))}
            </div>
          </div>

          {/* Interest Rate Display */}
          <div className="rounded-lg bg-muted p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="size-4" />
              Current Interest Rate
            </div>
            <div className="text-3xl font-bold text-primary">{selectedRate}%</div>
            <div className="text-xs text-muted-foreground">
              per annum for {selectedTenure} year{selectedTenure > 1 ? 's' : ''}
            </div>
          </div>

          {/* Calculation Results */}
          <div className="space-y-2 rounded-lg border border-border bg-card p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Principal</span>
              <span className="font-semibold text-foreground">
                ₹{amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Interest Earned</span>
              <span className="font-semibold text-green-600">
                +₹{interest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="border-t border-border pt-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">Maturity Amount</span>
                <span className="text-lg font-bold text-primary">
                  ₹{maturityAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          </div>
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
