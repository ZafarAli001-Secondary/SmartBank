import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

export function Progress({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="flex items-center gap-2" aria-label="Progress">
      {steps.map((label, i) => {
        const done = i < current
        const active = i === current
        return (
          <li key={label} className="flex flex-1 items-center gap-2">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                  done && "bg-primary text-primary-foreground",
                  active && "bg-primary/15 text-primary ring-2 ring-primary",
                  !done && !active && "bg-muted text-muted-foreground",
                )}
                aria-current={active ? "step" : undefined}
              >
                {done ? <Check className="size-4" aria-hidden /> : i + 1}
              </span>
              <span
                className={cn(
                  "text-sm font-medium",
                  active ? "text-foreground" : "text-muted-foreground",
                  "hidden sm:inline",
                )}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span className={cn("h-px flex-1 transition-colors", done ? "bg-primary" : "bg-border")} />
            )}
          </li>
        )
      })}
    </ol>
  )
}
