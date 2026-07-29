'use client'

import { useEmployeeAuth } from '@/lib/auth/employee-auth-provider'
import { Bell, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function InternalPortalHeader() {
  const { employee } = useEmployeeAuth()

  if (!employee) return null

  return (
    <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-foreground">{employee.branch_name}</h2>
        <p className="text-sm text-muted-foreground">
          Welcome, {employee.full_name}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Bell className="size-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Settings className="size-5" />
        </Button>
      </div>
    </header>
  )
}
