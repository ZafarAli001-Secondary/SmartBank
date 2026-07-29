import { redirect } from 'next/navigation'

export default function RootPage() {
  // Redirect to kiosk login by default
  redirect('/kiosk')
}
