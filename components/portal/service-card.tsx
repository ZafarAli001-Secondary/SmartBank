'use client'

import type { ServiceDef } from '@/lib/services-config'

export function ServiceCard({
  service,
  onSelect,
}: {
  service: ServiceDef
  onSelect: (service: ServiceDef) => void
}) {
  const Icon = service.icon
  return (
    <button
      type="button"
      onClick={() => onSelect(service)}
      className="group flex h-full min-h-0 flex-col items-start justify-between rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary hover:shadow-md active:scale-[0.98] active:bg-accent"
    >
      <div className="flex size-10 items-center justify-center rounded-lg bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground shrink-0">
        <Icon className="size-5" strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <div className="text-base font-semibold text-foreground">
          {service.title}
        </div>
        <div className="text-xs text-muted-foreground">
          {service.description}
        </div>
      </div>
    </button>
  )
}
