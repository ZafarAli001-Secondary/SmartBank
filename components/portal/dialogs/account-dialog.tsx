'use client'

import { ArrowDownLeft, ArrowUpRight, Eye, EyeOff, Wallet } from 'lucide-react'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RatesTable } from '@/components/portal/rates-table'
import { useAuth } from '@/lib/auth/auth-provider'
import { useAsync } from '@/hooks/use-async'
import { getAccount, getMiniStatement } from '@/services/account-service'
import { formatINR } from '@/lib/services-config'
import type { Account, Transaction } from '@/lib/supabase/types'

export function AccountDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { user } = useAuth()
  const [showBalance, setShowBalance] = useState(true)

  const { data: account, loading: accountLoading } = useAsync<Account | null>(
    () => getAccount(user?.id ?? ''),
    [user?.id, open],
  )
  const { data: txns, loading: txnLoading } = useAsync<Transaction[]>(
    () => (account ? getMiniStatement(account.id, 6) : Promise.resolve([])),
    [account?.id, open],
  )

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Wallet className="size-5 text-primary" /> Account Overview
          </DialogTitle>
          <DialogDescription>
            View your balance, recent activity and current rates.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-xl bg-primary p-5 text-primary-foreground">
          <div className="flex items-center justify-between">
            <span className="text-sm opacity-80">
              {account?.account_type
                ? `${account.account_type[0].toUpperCase()}${account.account_type.slice(1)} Account`
                : 'Account'}
            </span>
            <button
              type="button"
              onClick={() => setShowBalance((v) => !v)}
              className="opacity-80 transition hover:opacity-100"
              aria-label={showBalance ? 'Hide balance' : 'Show balance'}
            >
              {showBalance ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
            </button>
          </div>
          {accountLoading ? (
            <Skeleton className="mt-2 h-9 w-40 bg-primary-foreground/20" />
          ) : (
            <div className="mt-1 text-3xl font-bold tracking-tight">
              {showBalance ? formatINR(account?.balance ?? 0) : '••••••'}
            </div>
          )}
          <div className="mt-3 flex items-center justify-between text-sm opacity-90">
            <span>{account?.account_number ?? '—'}</span>
            <span>{account?.ifsc ?? ''}</span>
          </div>
        </div>

        <Tabs defaultValue="statement" className="mt-1">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="statement">Mini Statement</TabsTrigger>
            <TabsTrigger value="rates">Rates</TabsTrigger>
          </TabsList>

          <TabsContent value="statement" className="mt-3">
            <div className="space-y-1">
              {txnLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-14 w-full" />
                ))
              ) : txns && txns.length > 0 ? (
                txns.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between rounded-lg px-2 py-2.5 hover:bg-muted"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex size-9 items-center justify-center rounded-full ${
                          t.type === 'credit'
                            ? 'bg-success/15 text-success'
                            : 'bg-destructive/10 text-destructive'
                        }`}
                      >
                        {t.type === 'credit' ? (
                          <ArrowDownLeft className="size-4" />
                        ) : (
                          <ArrowUpRight className="size-4" />
                        )}
                      </span>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium text-foreground">
                          {t.description}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(t.created_at).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`text-sm font-semibold ${
                        t.type === 'credit' ? 'text-success' : 'text-foreground'
                      }`}
                    >
                      {t.type === 'credit' ? '+' : '−'}
                      {formatINR(t.amount)}
                    </span>
                  </div>
                ))
              ) : (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  No recent transactions.
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="rates" className="mt-3">
            <RatesTable />
          </TabsContent>
        </Tabs>

        <Button onClick={onClose} className="mt-1 h-12 w-full font-semibold">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  )
}
