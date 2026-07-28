'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  LogIn,
  ShieldCheck,
  User,
  UserCog,
  Users,
} from 'lucide-react'
import { Logo } from '@/components/brand/logo'
import { Clock } from '@/components/kiosk/clock'
import { LanguageSelect } from '@/components/kiosk/language-select'
import { AccessibilityButton } from '@/components/kiosk/accessibility-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth/auth-provider'
import type { UserRole } from '@/lib/supabase/types'

const ROLES: {
  value: UserRole
  label: string
  hint: string
  icon: typeof User
}[] = [
  { value: 'customer', label: 'Customer', hint: 'customer', icon: User },
  { value: 'staff', label: 'Staff', hint: 'staff', icon: Users },
  { value: 'admin', label: 'Admin', hint: 'admin', icon: UserCog },
]

const ROUTE_BY_ROLE: Record<UserRole, string> = {
  customer: '/portal',
  staff: '/staff',
  admin: '/admin',
}

export function LoginScreen() {
  const router = useRouter()
  const { signIn } = useAuth()
  const [role, setRole] = useState<UserRole>('customer')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [language, setLanguage] = useState('en')
  const [submitting, setSubmitting] = useState(false)

  const activeRole = ROLES.find((r) => r.value === role)!

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!username.trim() || !password.trim()) {
      toast.error('Enter your username and password to continue.')
      return
    }
    setSubmitting(true)
    try {
      const profile = await signIn(username, password, role)
      toast.success(`Welcome, ${profile.full_name.split(' ')[0]}`)
      router.push(ROUTE_BY_ROLE[profile.role])
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Login failed.')
      setSubmitting(false)
    }
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Brand panel */}
      <aside className="relative hidden w-[42%] flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
        <Logo size="lg" className="[&_*]:text-primary-foreground [&>div:first-child]:bg-primary-foreground [&>div:first-child]:text-primary" />
        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight text-balance">
            Banking made simple, right here at the branch.
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-primary-foreground/80">
            Deposit, withdraw, transfer and manage your accounts in seconds.
            Skip the wait with digital queue tokens.
          </p>
          <ul className="space-y-3 text-primary-foreground/90">
            {['Secure role-based access', '24x7 self-service', 'Instant queue tokens'].map(
              (item) => (
                <li key={item} className="flex items-center gap-3">
                  <ShieldCheck className="size-5 shrink-0" />
                  <span className="text-base">{item}</span>
                </li>
              ),
            )}
          </ul>
        </div>
        <p className="text-sm text-primary-foreground/70">
          Branch: MG Road, Bengaluru · Kiosk #04
        </p>
      </aside>

      {/* Login form */}
      <main className="flex flex-1 flex-col">
        <header className="flex items-center justify-end gap-3 p-5">
          <Clock />
          <LanguageSelect value={language} onChange={setLanguage} />
          <AccessibilityButton variant="outline" />
        </header>

        <div className="flex flex-1 items-center justify-center px-6 pb-10">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <Logo size="lg" />
            </div>
            <div className="mb-7">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Sign in to continue
              </h2>
              <p className="mt-2 text-muted-foreground">
                Select your role and enter your credentials.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Login as</Label>
                <div className="grid grid-cols-3 gap-3">
                  {ROLES.map((r) => {
                    const Icon = r.icon
                    const active = r.value === role
                    return (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => {
                          setRole(r.value)
                          setUsername(r.hint)
                        }}
                        aria-pressed={active}
                        className={cn(
                          'flex h-[84px] flex-col items-center justify-center gap-2 rounded-lg border-2 text-sm font-medium transition-colors',
                          active
                            ? 'border-primary bg-accent text-primary'
                            : 'border-border bg-card text-muted-foreground hover:border-primary/40',
                        )}
                      >
                        <Icon className="size-6" />
                        {r.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-semibold">
                  Username
                </Label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    autoComplete="username"
                    className="h-14 pl-11 text-base"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    autoComplete="current-password"
                    className="h-14 px-11 text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="h-14 w-full gap-2 text-base font-semibold"
              >
                {submitting ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <LogIn className="size-5" />
                )}
                {submitting ? 'Signing in…' : `Sign in as ${activeRole.label}`}
              </Button>

              <p className="rounded-lg bg-muted px-4 py-3 text-center text-sm text-muted-foreground">
                Demo access — username{' '}
                <span className="font-semibold text-foreground">
                  {activeRole.hint}
                </span>
                , any password.
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
