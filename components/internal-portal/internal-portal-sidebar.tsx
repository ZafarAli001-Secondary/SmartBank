'use client'

import Link from 'next/link'
import { useEmployeeAuth } from '@/lib/auth/employee-auth-provider'
import { INTERNAL_PORTAL_NAVIGATION } from '@/lib/internal-portal/navigation-config'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import {
  LayoutDashboard,
  Users,
  FileText,
  User,
  TrendingUp,
  CheckCircle,
  Bell,
  History,
  BarChart,
  Building2,
  Zap,
  Cpu,
  Settings,
  Shield,
} from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="size-5" />,
  Users: <Users className="size-5" />,
  FileText: <FileText className="size-5" />,
  User: <User className="size-5" />,
  TrendingUp: <TrendingUp className="size-5" />,
  CheckCircle: <CheckCircle className="size-5" />,
  Bell: <Bell className="size-5" />,
  History: <History className="size-5" />,
  BarChart: <BarChart className="size-5" />,
  Building2: <Building2 className="size-5" />,
  Zap: <Zap className="size-5" />,
  Cpu: <Cpu className="size-5" />,
  Settings: <Settings className="size-5" />,
  Shield: <Shield className="size-5" />,
}

export function InternalPortalSidebar() {
  const { employee, signOut } = useEmployeeAuth()

  if (!employee) return null

  const filteredNav = INTERNAL_PORTAL_NAVIGATION.filter((item) =>
    item.roles.includes(employee.role),
  )

  return (
    <aside className="w-64 fincore-sidebar-gradient flex flex-col h-screen overflow-y-auto p-4 text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white">FinCore</h1>
        <p className="text-xs text-white/80">Internal Portal</p>
      </div>

      {/* Employee Info */}
      <div className="mb-6 rounded-lg bg-white/15 p-3 border border-white/20">
        <p className="text-xs text-white/70">Logged in as</p>
        <p className="text-sm font-semibold text-white">{employee.full_name}</p>
        <p className="text-xs text-white/70 capitalize">{employee.role}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {filteredNav.map((item) => (
          <Link key={item.id} href={item.href}>
            <div className="fincore-sidebar-item text-white hover:bg-white/10 rounded-lg">
              {item.icon && iconMap[item.icon]}
              {item.label}
            </div>
          </Link>
        ))}
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
