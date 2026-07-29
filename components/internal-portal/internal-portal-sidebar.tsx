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
    <aside className="w-64 border-r border-border bg-card p-4 flex flex-col h-screen overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-foreground">FinCore</h1>
        <p className="text-xs text-muted-foreground">Internal Portal</p>
      </div>

      {/* Employee Info */}
      <div className="mb-6 rounded-lg bg-accent/30 p-3">
        <p className="text-xs text-muted-foreground">Logged in as</p>
        <p className="text-sm font-semibold text-foreground">{employee.full_name}</p>
        <p className="text-xs text-muted-foreground capitalize">{employee.role}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {filteredNav.map((item) => (
          <Link key={item.id} href={item.href}>
            <div className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-accent/50 transition-colors cursor-pointer">
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
