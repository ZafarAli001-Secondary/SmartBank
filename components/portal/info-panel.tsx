'use client'

import { useState } from 'react'
import {
  Ticket,
  Users2,
  Briefcase,
  TrendingUp,
  AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAsync } from '@/hooks/use-async'
import { getQueueStats, listQueueTokens } from '@/services/queue-service'
import { LoansDialog } from './dialogs/loans-dialog'
import { FdRatesDialog } from './dialogs/fd-rates-dialog'

const BANK_HOLIDAYS = [
  { date: '15 Aug 2026', occasion: 'Independence Day' },
  { date: '2 Oct 2026', occasion: 'Gandhi Jayanti' },
  { date: '25 Dec 2026', occasion: 'Christmas' },
  { date: '26 Jan 2027', occasion: 'Republic Day' },
]

export function InfoPanel({
  onGenerateToken,
  refreshKey,
}: {
  onGenerateToken: () => void
  refreshKey: number
}) {
  const [loansOpen, setLoansOpen] = useState(false)
  const [fdRatesOpen, setFdRatesOpen] = useState(false)
  const { data: tokens, loading } = useAsync(listQueueTokens, [refreshKey])
  const stats = tokens ? getQueueStats(tokens) : { waiting: 0, serving: null }

  return (
    <aside className="flex h-full w-full flex-col gap-4 overflow-hidden">
      {/* Queue status */}
      <section className="rounded-xl border border-border bg-card p-5">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          <Users2 className="size-4" /> Live Queue Status
        </div>
        {loading ? (
          <Skeleton className="h-24 w-full rounded-lg" />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-primary p-4 text-primary-foreground">
              <div className="text-xs font-medium opacity-80">Now Serving</div>
              <div className="text-3xl font-bold tabular-nums">
                {stats.serving?.token_number ?? '—'}
              </div>
              <div className="text-xs opacity-80">
                {stats.serving ? `Counter ${stats.serving.counter}` : 'Idle'}
              </div>
            </div>
            <div className="rounded-lg border border-border bg-muted p-4">
              <div className="text-xs font-medium text-muted-foreground">
                Waiting
              </div>
              <div className="text-3xl font-bold tabular-nums text-foreground">
                {stats.waiting}
              </div>
              <div className="text-xs text-muted-foreground">in queue</div>
            </div>
          </div>
        )}
        <Button
          onClick={onGenerateToken}
          className="mt-4 h-12 w-full gap-2 font-semibold"
        >
          <Ticket className="size-5" /> Generate Queue Token
        </Button>
      </section>

      {/* Products */}
      <section className="rounded-xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          <Briefcase className="size-4" /> Products & Services
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setLoansOpen(true)}
            className="rounded-lg border-2 border-border bg-card p-4 text-left transition-all hover:border-primary/50 hover:bg-accent/50"
          >
            <Briefcase className="mb-2 size-5 text-primary" />
            <div className="text-sm font-semibold text-foreground">Loans</div>
            <div className="text-xs text-muted-foreground">
              Home, Gold, Vehicle, Education
            </div>
          </button>
          <button
            onClick={() => setFdRatesOpen(true)}
            className="rounded-lg border-2 border-border bg-card p-4 text-left transition-all hover:border-primary/50 hover:bg-accent/50"
          >
            <TrendingUp className="mb-2 size-5 text-primary" />
            <div className="text-sm font-semibold text-foreground">FD Rates</div>
            <div className="text-xs text-muted-foreground">
              Calculate & Apply
            </div>
          </button>
        </div>
      </section>

      {/* Bank Holidays */}
      <section className="rounded-xl border border-border bg-card p-5">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          <AlertCircle className="size-4" /> Upcoming Holidays
        </div>
        <ul className="space-y-2">
          {BANK_HOLIDAYS.slice(0, 1).map((holiday) => (
            <li
              key={holiday.date}
              className="rounded-lg bg-accent/50 p-3 border border-accent"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  {holiday.occasion}
                </span>
                <span className="text-xs font-medium text-primary">
                  {holiday.date}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Dialogs */}
      <LoansDialog open={loansOpen} onOpenChange={setLoansOpen} />
      <FdRatesDialog open={fdRatesOpen} onOpenChange={setFdRatesOpen} />
    </aside>
  )
}
