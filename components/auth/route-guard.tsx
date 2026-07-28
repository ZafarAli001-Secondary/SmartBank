'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@/lib/auth/auth-provider'
import type { UserRole } from '@/lib/supabase/types'

export function RouteGuard({
  role,
  children,
}: {
  role: UserRole
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.replace('/')
    } else if (user.role !== role) {
      const home =
        user.role === 'customer'
          ? '/portal'
          : user.role === 'staff'
            ? '/staff'
            : '/admin'
      router.replace(home)
    }
  }, [user, loading, role, router])

  if (loading || !user || user.role !== role) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    )
  }

  return <>{children}</>
}
