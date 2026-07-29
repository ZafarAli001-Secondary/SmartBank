import { RouteGuard } from '@/components/auth/route-guard'
import { CustomerPortal } from '@/components/portal/customer-portal'

export default function PortalPage() {
  return (
    <RouteGuard role="customer">
      <CustomerPortal />
    </RouteGuard>
  )
}
