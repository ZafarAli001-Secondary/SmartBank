import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import { AuthProvider } from '@/lib/auth/auth-provider'
import { EmployeeAuthProvider } from '@/lib/auth/employee-auth-provider'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'FinCore Banking Platform',
  description:
    'FinCore self-service banking kiosk and internal portal for customers, staff and administrators.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ea5a12',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`light ${poppins.variable}`}>
      <body className="bg-background font-sans antialiased">
        <AuthProvider>
          <EmployeeAuthProvider>
            {children}
          </EmployeeAuthProvider>
        </AuthProvider>
        <Toaster position="top-center" richColors />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
