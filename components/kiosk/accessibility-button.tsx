'use client'

import { useEffect, useState } from 'react'
import { Accessibility } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function AccessibilityButton({
  variant = 'ghost',
}: {
  variant?: 'ghost' | 'outline'
}) {
  const [large, setLarge] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('a11y-large', large)
  }, [large])

  return (
    <Button
      type="button"
      variant={variant}
      onClick={() => setLarge((v) => !v)}
      aria-pressed={large}
      aria-label="Toggle larger text for accessibility"
      className={cn('h-12 gap-2 px-4', large && 'bg-accent text-accent-foreground')}
    >
      <Accessibility className="size-5" />
      <span className="hidden sm:inline">{large ? 'Larger text: On' : 'Accessibility'}</span>
    </Button>
  )
}
