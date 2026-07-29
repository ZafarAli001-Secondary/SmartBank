import { Banknote } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Logo({
  className,
  size = 'md',
}: {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const box =
    size === 'lg' ? 'size-12' : size === 'sm' ? 'size-8' : 'size-10'
  const icon = size === 'lg' ? 'size-6' : size === 'sm' ? 'size-4' : 'size-5'
  const title =
    size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-base' : 'text-xl'

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div
        className={cn(
          'flex items-center justify-center rounded-lg bg-primary text-primary-foreground',
          box,
        )}
      >
        <Banknote className={icon} strokeWidth={2.25} />
      </div>
      <div className="leading-none">
        <div className={cn('font-bold tracking-tight text-foreground', title)}>
          FinCore
        </div>
        <div className="text-xs font-medium text-muted-foreground">
          Financial Intelligence Platform
        </div>
      </div>
    </div>
  )
}
