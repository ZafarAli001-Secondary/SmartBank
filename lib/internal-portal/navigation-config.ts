import type { NavigationItem } from '@/lib/supabase/types'

export const INTERNAL_PORTAL_NAVIGATION: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/internal-portal/dashboard',
    icon: 'LayoutDashboard',
    roles: ['staff', 'admin'],
  },
  {
    id: 'queue',
    label: 'Queue Management',
    href: '/internal-portal/queue',
    icon: 'Users',
    roles: ['staff', 'admin'],
  },
  {
    id: 'requests',
    label: 'Customer Requests',
    href: '/internal-portal/requests',
    icon: 'FileText',
    roles: ['staff', 'admin'],
  },
  {
    id: 'customers',
    label: 'Customers',
    href: '/internal-portal/search',
    icon: 'User',
    roles: ['staff', 'admin'],
  },
  {
    id: 'transactions',
    label: 'Transactions',
    href: '/internal-portal/transactions',
    icon: 'TrendingUp',
    roles: ['staff', 'admin'],
  },
  {
    id: 'kyc',
    label: 'KYC Verification',
    href: '/internal-portal/kyc',
    icon: 'CheckCircle',
    roles: ['staff', 'admin'],
  },
  {
    id: 'notifications',
    label: 'Notifications',
    href: '/internal-portal/notifications',
    icon: 'Bell',
    roles: ['staff', 'admin'],
  },
  {
    id: 'activity-log',
    label: 'Activity Log',
    href: '/internal-portal/activity',
    icon: 'History',
    roles: ['staff', 'admin'],
  },
  {
    id: 'profile',
    label: 'Profile',
    href: '/internal-portal/profile',
    icon: 'User',
    roles: ['staff', 'admin'],
  },
  // Admin-only sections
  {
    id: 'admin',
    label: 'Administration',
    href: '/internal-portal/admin',
    icon: 'Settings',
    roles: ['admin'],
  },
]
