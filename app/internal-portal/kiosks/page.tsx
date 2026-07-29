'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { kiosks } from '@/lib/mock/db'
import { MoreVertical, RefreshCw } from 'lucide-react'
import type { Kiosk, KioskStatus } from '@/lib/supabase/types'

function getStatusColor(status: KioskStatus) {
  switch (status) {
    case 'online':
      return 'bg-green-600/10 text-green-700 border-green-600/20'
    case 'offline':
      return 'bg-red-600/10 text-red-700 border-red-600/20'
    case 'maintenance':
      return 'bg-yellow-600/10 text-yellow-700 border-yellow-600/20'
    case 'busy':
      return 'bg-blue-600/10 text-blue-700 border-blue-600/20'
    default:
      return 'bg-gray-600/10 text-gray-700 border-gray-600/20'
  }
}

export default function KioskManagementPage() {
  const [selectedKiosk, setSelectedKiosk] = useState<Kiosk | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Kiosk Management</h1>
          <p className="text-muted-foreground">Monitor and manage all self-service kiosks</p>
        </div>
        <Button className="gap-2">
          <RefreshCw className="size-4" />
          Refresh Status
        </Button>
      </div>

      {/* Kiosks Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-accent/50">
                <th className="px-6 py-3 text-left font-semibold text-foreground">Kiosk Name</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Location</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Current Customer</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Queue</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Version</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Uptime</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Last Heartbeat</th>
                <th className="px-6 py-3 text-right font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {kiosks.map((kiosk) => (
                <tr key={kiosk.id} className="hover:bg-accent/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{kiosk.kiosk_name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{kiosk.location}</td>
                  <td className="px-6 py-4">
                    <Badge className={getStatusColor(kiosk.status)}>
                      {kiosk.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {kiosk.current_customer || '—'}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {kiosk.queue_status}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {kiosk.software_version}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {kiosk.uptime_hours}h
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(kiosk.last_heartbeat).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedKiosk(kiosk)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <MoreVertical className="size-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Kiosk Details Panel */}
      {selectedKiosk && (
        <Card className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {selectedKiosk.kiosk_name}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedKiosk.location} • {selectedKiosk.kiosk_id}
              </p>
            </div>
            <Button variant="outline" onClick={() => setSelectedKiosk(null)}>
              Close
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* General Information */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">General Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Installation Date:</span>
                  <span className="text-foreground">
                    {new Date(selectedKiosk.installation_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Branch:</span>
                  <span className="text-foreground">{selectedKiosk.branch_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge className={getStatusColor(selectedKiosk.status)}>
                    {selectedKiosk.status}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Health Metrics */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Health Metrics</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CPU Usage:</span>
                  <span className="text-foreground">{selectedKiosk.cpu_usage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Memory Usage:</span>
                  <span className="text-foreground">{selectedKiosk.memory_usage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Storage Usage:</span>
                  <span className="text-foreground">{selectedKiosk.storage_usage}%</span>
                </div>
              </div>
            </div>

            {/* Software */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Software</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Version:</span>
                  <span className="text-foreground">{selectedKiosk.software_version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Uptime:</span>
                  <span className="text-foreground">{selectedKiosk.uptime_hours} hours</span>
                </div>
              </div>
            </div>

            {/* Network */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Network</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge className={selectedKiosk.network_status === 'connected' ? 'bg-green-600/10 text-green-700 border-green-600/20' : 'bg-red-600/10 text-red-700 border-red-600/20'}>
                    {selectedKiosk.network_status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Heartbeat:</span>
                  <span className="text-foreground">
                    {new Date(selectedKiosk.last_heartbeat).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-2 pt-6 border-t border-border">
            <Button variant="outline">View Details</Button>
            <Button variant="outline">Restart Kiosk</Button>
            <Button variant="outline">Lock Kiosk</Button>
            <Button variant="outline">Maintenance Mode</Button>
            <Button variant="outline" className="ml-auto">Close Details</Button>
          </div>
        </Card>
      )}
    </div>
  )
}
