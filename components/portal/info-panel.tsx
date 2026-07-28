'use client'

import { useState } from 'react'
import {
  Clock3,
  Ticket,
  Users2,
  Briefcase,
  TrendingUp,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAsync } from '@/hooks/use-async'
import { getQueueStats, listQueueTokens } from '@/services/queue-service'
import { LoansDialog } from './dialogs/loans-dialog'
import { FdRatesDialog } from './dialogs/fd-rates-dialog'

const TIMINGS = [
  { day: 'Mon – Fri', hours: '9:30 AM – 5:30 PM' },
  { day: 'Saturday', hours: '9:30 AM – 1:30 PM' },
  { day: 'Sunday', hours: 'Closed' },
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

      {/* Branch timings */}
      <section className="rounded-xl border border-border bg-card p-5">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          <Clock3 className="size-4" /> Branch Timings
        </div>
        <ul className="space-y-2">
          {TIMINGS.map((t) => (
            <li key={t.day} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{t.day}</span>
              <span className="font-medium text-foreground">{t.hours}</span>
            </li>
          ))}
        </ul>
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

      {/* Dialogs */}
      <LoansDialog open={loansOpen} onOpenChange={setLoansOpen} />
      <FdRatesDialog open={fdRatesOpen} onOpenChange={setFdRatesOpen} />
    </aside>
  )
}
