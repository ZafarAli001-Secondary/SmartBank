'use client'

import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Home,
  Keyboard,
  LifeBuoy,
  LogOut,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth/auth-provider'
import { cn } from '@/lib/utils'

interface Action {
  key: string
  label: string
  icon: typeof Home
  onClick: () => void
  variant?: 'default' | 'danger'
}

export function BottomActionBar({
  onHome,
  onToggleKeyboard,
  onHelp,
}: {
  onHome: () => void
  onToggleKeyboard: () => void
  onHelp: () => void
}) {
  const router = useRouter()
  const { signOut } = useAuth()

  async function handleExit() {
    await signOut()
    router.replace('/')
  }

  const actions: Action[] = [
    { key: 'home', label: 'Home', icon: Home, onClick: onHome },
    { key: 'back', label: 'Back', icon: ArrowLeft, onClick: () => router.back() },
    { key: 'keyboard', label: 'Keyboard', icon: Keyboard, onClick: onToggleKeyboard },
    { key: 'help', label: 'Help', icon: LifeBuoy, onClick: onHelp },
    { key: 'exit', label: 'Exit', icon: LogOut, onClick: handleExit, variant: 'danger' },
  ]

  return (
    <nav className="flex h-20 shrink-0 items-center justify-center gap-3 border-t border-border bg-card px-6">
      {actions.map((action) => {
        const Icon = action.icon
        return (
          <Button
            key={action.key}
            variant="outline"
            onClick={action.onClick}
            className={cn(
              'h-14 flex-1 max-w-[180px] flex-col gap-1 text-sm font-semibold',
              action.variant === 'danger' &&
                'border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive',
            )}
          >
            <Icon className="size-5" />
            {action.label}
          </Button>
        )
      })}
    </nav>
  )
}
