'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { useEmployeeAuth } from '@/lib/auth/employee-auth-provider'
import type { EmployeeRole } from '@/lib/supabase/types'

export function EmployeeRouteGuard({
  role,
  children,
}: {
  role: EmployeeRole
  children: React.ReactNode
}) {
  const router = useRouter()
  const { employee, loading } = useEmployeeAuth()

  useEffect(() => {
    if (loading) return
    if (!employee) {
      router.replace('/internal-portal/login')
    } else if (employee.role !== role && role !== 'staff') {
      // Allow admin to access staff pages, but not vice versa
      if (!(employee.role === 'admin' && role === 'staff')) {
        router.replace('/internal-portal/login')
      }
    }
  }, [employee, loading, role, router])

  if (loading || !employee) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    )
  }

  // Allow access if employee role matches or if admin accessing staff resource
  const hasAccess = employee.role === role || (employee.role === 'admin' && role === 'staff')

  if (!hasAccess) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    )
  }

  return <>{children}</>
}
