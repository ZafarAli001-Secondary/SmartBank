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
      className="group flex h-full min-h-[128px] flex-col items-start justify-between rounded-xl border border-border bg-card p-5 text-left transition-all hover:border-primary hover:shadow-md active:scale-[0.98] active:bg-accent"
    >
      <div className="flex size-12 items-center justify-center rounded-lg bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="size-6" strokeWidth={2} />
      </div>
      <div>
        <div className="text-lg font-semibold text-foreground">
          {service.title}
        </div>
        <div className="text-sm text-muted-foreground">
          {service.description}
        </div>
      </div>
    </button>
  )
}
