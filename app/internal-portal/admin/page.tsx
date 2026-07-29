'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Users,
  BarChart3,
  FileText,
  Settings,
  Zap,
  RadioTower,
  AlertCircle,
} from 'lucide-react'

export default function AdminDashboardPage() {
  const adminModules = [
    {
      title: 'Employee Management',
      description: 'Manage staff roles, permissions, and access',
      icon: Users,
      href: '/internal-portal/admin/employees',
      status: 'coming-soon',
    },
    {
      title: 'Analytics & Reports',
      description: 'View performance metrics and generate reports',
      icon: BarChart3,
      href: '/internal-portal/admin/analytics',
      status: 'coming-soon',
    },
    {
      title: 'Branch Management',
      description: 'Configure branch settings and details',
      icon: RadioTower,
      href: '/internal-portal/admin/branches',
      status: 'coming-soon',
    },
    {
      title: 'Kiosk Management',
      description: 'Monitor and manage kiosk devices',
      icon: Zap,
      href: '/internal-portal/admin/kiosks',
      status: 'coming-soon',
    },
    {
      title: 'Device Management',
      description: 'Monitor hardware and network devices',
      icon: Settings,
      href: '/internal-portal/admin/devices',
      status: 'coming-soon',
    },
    {
      title: 'System Settings',
      description: 'Configure system parameters and integrations',
      icon: Settings,
      href: '/internal-portal/admin/settings',
      status: 'coming-soon',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Administration</h1>
        <p className="text-muted-foreground">Manage system configuration and bank operations</p>
      </div>

      {/* Coming Soon Notice */}
      <Card className="p-4 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 space-y-2">
        <div className="flex items-start gap-3">
          <AlertCircle className="size-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-400">Admin Features Coming Soon</p>
            <p className="text-sm text-blue-800/80 dark:text-blue-500/80 mt-1">
              Admin modules are currently under development. Staff modules are fully operational.
            </p>
          </div>
        </div>
      </Card>

      {/* Admin Modules Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {adminModules.map((module) => {
          const Icon = module.icon
          return (
            <Card
              key={module.href}
              className="p-6 space-y-4 border border-border hover:border-primary/50 transition-colors cursor-not-allowed opacity-60"
            >
              <div className="flex items-start justify-between">
                <Icon className="size-8 text-muted-foreground" />
                <span className="text-xs font-semibold px-2 py-1 rounded bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-400">
                  {module.status === 'coming-soon' ? 'Coming Soon' : 'Available'}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">{module.title}</h3>
                <p className="text-sm text-muted-foreground">{module.description}</p>
              </div>

              <Button disabled variant="outline" className="w-full">
                Disabled
              </Button>
            </Card>
          )
        })}
      </div>

      {/* System Status */}
      <Card className="p-6 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">System Status</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">API Status</p>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-green-600" />
              <span className="text-sm font-medium text-foreground">Operational</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Database Status</p>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-green-600" />
              <span className="text-sm font-medium text-foreground">Connected</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Uptime</p>
            <p className="text-sm font-medium text-foreground">99.8%</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Last Backup</p>
            <p className="text-sm font-medium text-foreground">Today 02:00 AM</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
