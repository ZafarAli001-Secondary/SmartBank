'use client'

import { LayoutGrid, Zap, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth/auth-provider'
import { Button } from '@/components/ui/button'

export function AdminSidebar() {
  const { signOut } = useAuth()

  return (
    <aside className="w-64 border-r border-border bg-card p-4 flex flex-col h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-foreground">FinCore Admin</h1>
        <p className="text-xs text-muted-foreground">Branch Management</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        <Link href="/admin/kiosks">
          <div className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-accent/50 transition-colors cursor-pointer">
            <LayoutGrid className="size-5" />
            Kiosk Management
          </div>
        </Link>
        <Link href="/admin/devices">
          <div className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-accent/50 transition-colors cursor-pointer">
            <Zap className="size-5" />
            Device Management
          </div>
        </Link>
      </nav>

      {/* Footer */}
      <Button
        onClick={signOut}
        variant="ghost"
        className="w-full justify-start text-muted-foreground hover:text-foreground"
      >
        <LogOut className="mr-2 size-4" />
        Sign Out
      </Button>
    </aside>
  )
}
