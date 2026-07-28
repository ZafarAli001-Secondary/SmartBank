'use client'

import { useEffect, useState } from 'react'
import { Clock as ClockIcon } from 'lucide-react'

export function Clock({ compact = false }: { compact?: boolean }) {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const time = now
    ? now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: compact ? undefined : '2-digit',
        hour12: true,
      })
    : '--:--'
  const date = now
    ? now.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : ''

  return (
    <div className="flex items-center gap-2 text-right">
      <ClockIcon className="size-4 text-muted-foreground" />
      <div className="leading-tight">
        <div className="font-semibold tabular-nums text-foreground">{time}</div>
        {!compact && (
          <div className="text-xs text-muted-foreground">{date}</div>
        )}
      </div>
    </div>
  )
}
