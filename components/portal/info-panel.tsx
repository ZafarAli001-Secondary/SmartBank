'use client'

import {
  Bell,
  Clock3,
  Megaphone,
  Ticket,
  Users2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAsync } from '@/hooks/use-async'
import { getQueueStats, listQueueTokens } from '@/services/queue-service'
import { SERVICE_LABELS } from '@/lib/services-config'

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

      {/* Latest notice */}
      <section className="flex-1 rounded-xl border border-border bg-card p-5">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          <Megaphone className="size-4" /> Latest Notice
        </div>
        <div className="flex gap-3 rounded-lg bg-accent p-3">
          <Bell className="mt-0.5 size-4 shrink-0 text-primary" />
          <p className="text-sm leading-relaxed text-foreground">
            Revised FD interest rates effective 1 Aug 2026. Senior citizens earn
            an additional 0.50% p.a. on all tenures.
          </p>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Popular now:{' '}
          <span className="font-medium text-foreground">
            {SERVICE_LABELS.fund_transfer}
          </span>{' '}
          and{' '}
          <span className="font-medium text-foreground">
            {SERVICE_LABELS.cash_withdrawal}
          </span>
          .
        </p>
      </section>
    </aside>
  )
}
