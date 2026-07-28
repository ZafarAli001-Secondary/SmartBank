'use client'

import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/brand/logo'
import { Clock } from '@/components/kiosk/clock'
import { Button } from '@/components/ui/button'
import {
  Avatar,
  AvatarFallback,
} from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/lib/auth/auth-provider'

export function DashboardShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, signOut } = useAuth()

  async function handleSignOut() {
    await signOut()
    router.replace('/')
  }

  const initials = (user?.full_name ?? 'U')
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between gap-4 px-6">
          <Logo size="sm" />
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <Clock />
            </div>
            <div className="flex items-center gap-3 border-l border-border pl-4">
              <Avatar className="size-9">
                <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-sm sm:block">
                <div className="font-semibold leading-tight text-foreground">
                  {user?.full_name}
                </div>
                <Badge variant="secondary" className="mt-0.5 h-5 capitalize">
                  {user?.role}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSignOut}
                aria-label="Sign out"
              >
                <LogOut className="size-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        {children}
      </main>
    </div>
  )
}
