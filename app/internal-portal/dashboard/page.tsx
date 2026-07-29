'use client'

import { Card } from '@/components/ui/card'
import { kiosks, alerts, devices } from '@/lib/mock/db'
import { AlertCircle, CheckCircle2, AlertTriangle, BarChart3, Zap } from 'lucide-react'

export default function InternalPortalDashboard() {
  const onlineKiosks = kiosks.filter((k) => k.status === 'online').length
  const offlineKiosks = kiosks.filter((k) => k.status === 'offline').length
  const maintenanceKiosks = kiosks.filter((k) => k.status === 'maintenance').length
  const onlineDevices = devices.filter((d) => d.status === 'online').length
  const criticalAlerts = alerts.filter((a) => a.severity === 'critical' && !a.resolved).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Monitor your kiosks and devices in real-time</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Kiosks</p>
              <p className="text-3xl font-bold text-foreground">{kiosks.length}</p>
            </div>
            <BarChart3 className="size-8 text-primary/50" />
          </div>
        </Card>

        <Card className="p-4 border-green-600/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Online</p>
              <p className="text-3xl font-bold text-green-600">{onlineKiosks}</p>
            </div>
            <CheckCircle2 className="size-8 text-green-600/50" />
          </div>
        </Card>

        <Card className="p-4 border-red-600/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Offline</p>
              <p className="text-3xl font-bold text-red-600">{offlineKiosks}</p>
            </div>
            <AlertCircle className="size-8 text-red-600/50" />
          </div>
        </Card>

        <Card className="p-4 border-yellow-600/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Maintenance</p>
              <p className="text-3xl font-bold text-yellow-600">{maintenanceKiosks}</p>
            </div>
            <AlertTriangle className="size-8 text-yellow-600/50" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Devices</p>
              <p className="text-3xl font-bold text-foreground">{onlineDevices}/{devices.length}</p>
            </div>
            <Zap className="size-8 text-primary/50" />
          </div>
        </Card>
      </div>

      {/* Recent Alerts */}
      {criticalAlerts > 0 && (
        <Card className="p-4 border-red-600/50 bg-red-600/5">
          <div className="flex items-start gap-3">
            <AlertCircle className="size-5 text-red-600 mt-1 shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground">Critical Alerts</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {criticalAlerts} critical issue{criticalAlerts > 1 ? 's' : ''} require{criticalAlerts > 1 ? '' : 's'} immediate attention
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
