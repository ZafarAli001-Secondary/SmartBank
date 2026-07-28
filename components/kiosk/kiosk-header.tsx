'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { Logo } from '@/components/brand/logo'
import { Clock } from '@/components/kiosk/clock'
import { LanguageSelect } from '@/components/kiosk/language-select'
import { AccessibilityButton } from '@/components/kiosk/accessibility-button'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/lib/auth/auth-provider'

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function KioskHeader() {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [language, setLanguage] = useState('en')

  async function handleLogout() {
    await signOut()
    router.replace('/')
  }

  return (
    <header className="flex h-20 shrink-0 items-center justify-between border-b border-border bg-card px-6">
      <div className="flex items-center gap-4">
        <Logo />
        <Badge
          variant="outline"
          className="hidden border-border font-medium text-muted-foreground md:inline-flex"
        >
          MG Road, Bengaluru · Kiosk #04
        </Badge>
      </div>

      <div className="flex items-center gap-3">
        <Clock />
        <div className="hidden lg:block">
          <LanguageSelect value={language} onChange={setLanguage} />
        </div>
        <AccessibilityButton variant="outline" />

        {user && (
          <div className="flex items-center gap-3 border-l border-border pl-3">
            <Avatar className="size-10 border border-border">
              <AvatarFallback className="bg-accent font-semibold text-primary">
                {initials(user.full_name)}
              </AvatarFallback>
            </Avatar>
            <div className="hidden leading-tight sm:block">
              <div className="text-sm font-semibold text-foreground">
                {user.full_name}
              </div>
              <div className="text-xs capitalize text-muted-foreground">
                {user.role}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              aria-label="Log out"
              className="size-11 text-muted-foreground hover:text-destructive"
            >
              <LogOut className="size-5" />
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
