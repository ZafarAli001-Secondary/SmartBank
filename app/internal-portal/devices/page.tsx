'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { devices } from '@/lib/mock/db'
import { MoreVertical, RefreshCw, AlertCircle } from 'lucide-react'
import type { Device, DeviceStatus } from '@/lib/supabase/types'

function getStatusColor(status: DeviceStatus) {
  switch (status) {
    case 'online':
      return 'bg-green-600/10 text-green-700 border-green-600/20'
    case 'offline':
      return 'bg-red-600/10 text-red-700 border-red-600/20'
    case 'error':
      return 'bg-red-600/10 text-red-700 border-red-600/20'
    case 'busy':
      return 'bg-blue-600/10 text-blue-700 border-blue-600/20'
    case 'maintenance':
      return 'bg-yellow-600/10 text-yellow-700 border-yellow-600/20'
    default:
      return 'bg-gray-600/10 text-gray-700 border-gray-600/20'
  }
}

export default function DeviceManagementPage() {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null)
  const errorDevices = devices.filter((d) => d.status === 'error' || d.status === 'offline')
  const onlineDevices = devices.filter((d) => d.status === 'online')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Device Management</h1>
          <p className="text-muted-foreground">Monitor hardware devices attached to kiosks</p>
        </div>
        <Button className="gap-2">
          <RefreshCw className="size-4" />
          Refresh Status
        </Button>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Devices</p>
            <p className="text-3xl font-bold text-foreground">{devices.length}</p>
          </div>
        </Card>
        <Card className="p-4 border-green-600/50">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Online</p>
            <p className="text-3xl font-bold text-green-600">{onlineDevices.length}</p>
          </div>
        </Card>
        <Card className="p-4 border-red-600/50">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Errors</p>
            <p className="text-3xl font-bold text-red-600">{errorDevices.length}</p>
          </div>
        </Card>
        <Card className="p-4 border-yellow-600/50">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Health</p>
            <p className="text-3xl font-bold text-yellow-600">
              {Math.round((onlineDevices.length / devices.length) * 100)}%
            </p>
          </div>
        </Card>
      </div>

      {/* Devices Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-accent/50">
                <th className="px-6 py-3 text-left font-semibold text-foreground">Device Name</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Type</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Kiosk</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Firmware</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Last Checked</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Errors</th>
                <th className="px-6 py-3 text-right font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {devices.map((device) => (
                <tr key={device.id} className="hover:bg-accent/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{device.device_name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {device.device_type.replace(/_/g, ' ')}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {device.device_id}
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={getStatusColor(device.status)}>
                      {device.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {device.firmware_version}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(device.last_checked).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4">
                    {device.error_count > 0 ? (
                      <div className="flex items-center gap-1 text-red-600">
                        <AlertCircle className="size-4" />
                        {device.error_count}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">0</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedDevice(device)}
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

      {/* Device Details Panel */}
      {selectedDevice && (
        <Card className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {selectedDevice.device_name}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedDevice.device_type.replace(/_/g, ' ')} • {selectedDevice.device_id}
              </p>
            </div>
            <Button variant="outline" onClick={() => setSelectedDevice(null)}>
              Close
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* General Information */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">General Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Manufacturer:</span>
                  <span className="text-foreground">{selectedDevice.manufacturer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Model:</span>
                  <span className="text-foreground">{selectedDevice.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Serial Number:</span>
                  <span className="text-foreground">{selectedDevice.serial_number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Connection:</span>
                  <span className="text-foreground">{selectedDevice.connection_type}</span>
                </div>
              </div>
            </div>

            {/* Status Information */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Status</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Status:</span>
                  <Badge className={getStatusColor(selectedDevice.status)}>
                    {selectedDevice.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Firmware Version:</span>
                  <span className="text-foreground">{selectedDevice.firmware_version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Error Count:</span>
                  <span className="text-foreground">{selectedDevice.error_count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Uptime:</span>
                  <span className="text-foreground">{selectedDevice.uptime_hours} hours</span>
                </div>
              </div>
            </div>

            {/* Health Metrics */}
            {selectedDevice.temperature !== null && (
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Health Metrics</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Temperature:</span>
                    <span className="text-foreground">{selectedDevice.temperature}°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Activity:</span>
                    <span className="text-foreground">
                      {new Date(selectedDevice.last_activity).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-2 pt-6 border-t border-border">
            <Button variant="outline">Test Device</Button>
            <Button variant="outline">Restart Device</Button>
            <Button variant="outline">Update Firmware</Button>
            <Button variant="outline" className="ml-auto">Close Details</Button>
          </div>
        </Card>
      )}
    </div>
  )
}
