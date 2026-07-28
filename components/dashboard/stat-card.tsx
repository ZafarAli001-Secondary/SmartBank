import type { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function StatCard({
  label,
  value,
  icon: Icon,
  tone = 'default',
  hint,
}: {
  label: string
  value: string | number
  icon: LucideIcon
  tone?: 'default' | 'primary' | 'success' | 'warning' | 'destructive'
  hint?: string
}) {
  const toneClasses: Record<string, string> = {
    default: 'bg-muted text-foreground',
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/15 text-success',
    warning: 'bg-warning/15 text-warning',
    destructive: 'bg-destructive/10 text-destructive',
  }

  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-5">
        <span
          className={cn(
            'flex size-12 shrink-0 items-center justify-center rounded-lg',
            toneClasses[tone],
          )}
        >
          <Icon className="size-6" />
        </span>
        <div className="min-w-0">
          <div className="text-2xl font-bold leading-tight text-foreground">
            {value}
          </div>
          <div className="truncate text-sm text-muted-foreground">{label}</div>
          {hint && <div className="text-xs text-muted-foreground">{hint}</div>}
        </div>
      </CardContent>
    </Card>
  )
}
