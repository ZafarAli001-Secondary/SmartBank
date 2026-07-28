import { cn } from '@/lib/utils'
import type { RequestStatus } from '@/lib/supabase/types'

const CONFIG: Record<RequestStatus, { label: string; className: string }> = {
  pending: {
    label: 'Pending Verification',
    className: 'bg-warning/15 text-warning border-warning/30',
  },
  approved: {
    label: 'Approved',
    className: 'bg-success/15 text-success border-success/30',
  },
  rejected: {
    label: 'Rejected',
    className: 'bg-destructive/15 text-destructive border-destructive/30',
  },
  completed: {
    label: 'Completed',
    className: 'bg-primary/10 text-primary border-primary/30',
  },
}

export function StatusBadge({
  status,
  className,
}: {
  status: RequestStatus
  className?: string
}) {
  const config = CONFIG[status]
  return (
    <span
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-full border px-3 py-1 text-xs font-semibold',
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  )
}
