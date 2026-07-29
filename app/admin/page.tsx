'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/auth-provider'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { Lock, User } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const { signIn } = useAuth()
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('admin123')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const user = await signIn(username, password, 'admin')
      if (user) {
        toast.success('Admin login successful')
        router.push('/admin/branches')
      }
    } catch (error) {
      toast.error('Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-primary to-primary/80">
      <Card className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white">
            <Lock className="size-6" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Admin Access</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            SmartBank Branch Management System
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Username
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-accent/50 px-4 py-3">
              <User className="size-4 text-muted-foreground" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Password
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-accent/50 px-4 py-3">
              <Lock className="size-4 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="h-12 w-full font-semibold"
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 space-y-2 rounded-lg bg-accent/30 p-4 text-center text-sm">
          <p className="font-medium text-foreground">Demo Credentials</p>
          <p className="text-muted-foreground">
            Username: <span className="text-foreground font-mono">admin</span>
          </p>
          <p className="text-muted-foreground">
            Password: <span className="text-foreground font-mono">admin123</span>
          </p>
        </div>
      </Card>
    </div>
  )
}
