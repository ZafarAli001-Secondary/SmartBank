'use client'

import { ArrowDownLeft, ArrowUpRight, X } from 'lucide-react'
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
import { cn } from '@/lib/utils'

interface Transaction {
  id: string
  type: 'debit' | 'credit'
  description: string
  amount: number
  date: string
  time: string
  balance: number
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    type: 'debit',
    description: 'ATM Withdrawal',
    amount: 5000,
    date: 'Today',
    time: '2:30 PM',
    balance: 2547891.50,
  },
  {
    id: '2',
    type: 'credit',
    description: 'Salary Credit',
    amount: 75000,
    date: 'Yesterday',
    time: '10:15 AM',
    balance: 2552891.50,
  },
  {
    id: '3',
    type: 'debit',
    description: 'Bill Payment',
    amount: 2500,
    date: '28 Jul',
    time: '5:45 PM',
    balance: 2477891.50,
  },
  {
    id: '4',
    type: 'debit',
    description: 'Fund Transfer',
    amount: 25000,
    date: '27 Jul',
    time: '11:20 AM',
    balance: 2480391.50,
  },
  {
    id: '5',
    type: 'credit',
    description: 'Interest Credit',
    amount: 850,
    date: '25 Jul',
    time: '6:00 AM',
    balance: 2505391.50,
  },
]

export function MiniStatementDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { primaryAccount } = useAuth()

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">Mini Statement</DialogTitle>
          <DialogDescription>
            Last 5 transactions - {primaryAccount?.account_number}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-2 pr-4">
          {MOCK_TRANSACTIONS.map((txn, idx) => (
            <div key={txn.id}>
              <div className="flex items-start gap-3 py-3">
                <div
                  className={cn(
                    'flex size-10 shrink-0 items-center justify-center rounded-lg',
                    txn.type === 'debit'
                      ? 'bg-red-100 text-red-600 dark:bg-red-900/30'
                      : 'bg-green-100 text-green-600 dark:bg-green-900/30'
                  )}
                >
                  {txn.type === 'debit' ? (
                    <ArrowDownLeft className="size-5" />
                  ) : (
                    <ArrowUpRight className="size-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {txn.description}
                    </p>
                    <p
                      className={cn(
                        'text-sm font-bold whitespace-nowrap',
                        txn.type === 'debit' ? 'text-red-600' : 'text-green-600'
                      )}
                    >
                      {txn.type === 'debit' ? '-' : '+'}
                      {formatINR(txn.amount)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-2 mt-1">
                    <p className="text-xs text-muted-foreground">
                      {txn.date} at {txn.time}
                    </p>
                    <p className="text-xs font-medium text-muted-foreground">
                      Balance: {formatINR(txn.balance)}
                    </p>
                  </div>
                </div>
              </div>
              {idx < MOCK_TRANSACTIONS.length - 1 && <Separator className="my-0" />}
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-4 border-t">
          <Button
            variant="outline"
            className="h-11 flex-1"
            onClick={onClose}
          >
            Close
          </Button>
          <Button className="h-11 flex-1 font-semibold">Print</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
