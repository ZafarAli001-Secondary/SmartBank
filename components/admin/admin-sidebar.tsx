'use client'

import { LayoutGrid, Zap, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth/auth-provider'
import { Button } from '@/components/ui/button'

export function AdminSidebar() {
  const { signOut } = useAuth()

  return (
    <aside className="w-64 fincore-sidebar-gradient flex flex-col h-screen p-4 text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white">FinCore Admin</h1>
        <p className="text-xs text-white/80">Branch Management</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        <Link href="/admin/kiosks">
          <div className="fincore-sidebar-item text-white hover:bg-white/10 rounded-lg text-sm font-medium">
            <LayoutGrid className="size-5" />
            Kiosk Management
          </div>
        </Link>
        <Link href="/admin/devices">
          <div className="fincore-sidebar-item text-white hover:bg-white/10 rounded-lg text-sm font-medium">
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
