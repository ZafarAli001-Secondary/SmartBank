'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, Bell, CheckCircle2, Info, Trash2 } from 'lucide-react'

interface Notification {
  id: string
  type: 'alert' | 'info' | 'success' | 'warning'
  title: string
  message: string
  timestamp: string
  read: boolean
  action?: { label: string; href: string }
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'alert',
    title: 'High Queue Wait Time',
    message: 'Current queue wait time exceeds 15 minutes. Consider calling additional staff.',
    timestamp: '2 minutes ago',
    read: false,
  },
  {
    id: '2',
    type: 'alert',
    title: 'Pending KYC Documents',
    message: 'Aarav Sharma has 1 pending KYC document requiring verification.',
    timestamp: '5 minutes ago',
    read: false,
    action: { label: 'Review', href: '/internal-portal/kyc' },
  },
  {
    id: '3',
    type: 'success',
    title: 'Transaction Processed',
    message: 'Cash deposit of ₹60,000 by Vikram Singh has been successfully completed.',
    timestamp: '15 minutes ago',
    read: true,
  },
  {
    id: '4',
    type: 'info',
    title: 'New Service Request',
    message: 'New fund transfer request received from Neha Gupta for ₹25,000.',
    timestamp: '22 minutes ago',
    read: true,
    action: { label: 'View', href: '/internal-portal/requests' },
  },
  {
    id: '5',
    type: 'warning',
    title: 'Device Offline',
    message: 'Kiosk-003 (Ground Floor) has gone offline. Last heartbeat 2 hours ago.',
    timestamp: '1 hour ago',
    read: true,
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length
  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertCircle className="size-5 text-red-600" />
      case 'warning':
        return <AlertCircle className="size-5 text-yellow-600" />
      case 'success':
        return <CheckCircle2 className="size-5 text-green-600" />
      case 'info':
        return <Info className="size-5 text-blue-600" />
      default:
        return <Bell className="size-5 text-primary" />
    }
  }

  const getBgColor = (type: string) => {
    switch (type) {
      case 'alert':
        return 'border-red-200 bg-red-50/50 dark:border-red-900/30 dark:bg-red-950/20'
      case 'warning':
        return 'border-yellow-200 bg-yellow-50/50 dark:border-yellow-900/30 dark:bg-yellow-950/20'
      case 'success':
        return 'border-green-200 bg-green-50/50 dark:border-green-900/30 dark:bg-green-950/20'
      case 'info':
        return 'border-blue-200 bg-blue-50/50 dark:border-blue-900/30 dark:bg-blue-950/20'
      default:
        return 'border-border'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">System alerts and updates</p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={handleMarkAllAsRead} variant="outline" size="sm">
            Mark all as read
          </Button>
        )}
      </div>

      {/* Unread Count */}
      {unreadCount > 0 && (
        <Card className="p-4 bg-primary/10 border-primary/20">
          <p className="text-sm font-medium text-foreground">
            You have <span className="font-bold text-primary">{unreadCount}</span> unread notification{unreadCount > 1 ? 's' : ''}
          </p>
        </Card>
      )}

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <Card className="p-12 text-center space-y-3">
            <Bell className="size-12 text-muted-foreground mx-auto opacity-50" />
            <p className="text-muted-foreground">No notifications</p>
          </Card>
        ) : (
          notifications.map((notif) => (
            <Card
              key={notif.id}
              className={`p-4 border-2 transition-all ${getBgColor(notif.type)} ${!notif.read ? 'border-2' : ''}`}
            >
              <div className="flex items-start gap-4">
                <div className="pt-1 shrink-0">{getIcon(notif.type)}</div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{notif.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{notif.timestamp}</p>
                    </div>
                    {!notif.read && (
                      <Badge className="shrink-0 bg-primary text-primary-foreground">New</Badge>
                    )}
                  </div>

                  {notif.action && (
                    <div className="mt-3">
                      <Button variant="outline" size="sm">
                        {notif.action.label}
                      </Button>
                    </div>
                  )}
                </div>

                <div className="flex gap-1 shrink-0">
                  {!notif.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMarkAsRead(notif.id)}
                      title="Mark as read"
                    >
                      ✓
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(notif.id)}
                    title="Delete"
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
