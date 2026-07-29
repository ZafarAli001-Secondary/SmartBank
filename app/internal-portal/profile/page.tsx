'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Mail, Phone, Building, User, Lock, Calendar } from 'lucide-react'

interface EmployeeProfile {
  employeeId: string
  fullName: string
  email: string
  phone: string
  role: string
  department: string
  branch: string
  joinDate: string
}

const mockProfile: EmployeeProfile = {
  employeeId: 'EMP-001',
  fullName: 'Priya Nair',
  email: 'priya.nair@smartbank.example',
  phone: '+91 90000 11111',
  role: 'staff',
  department: 'Customer Service',
  branch: 'MG Road, Bengaluru',
  joinDate: '2022-01-05',
}

export default function ProfilePage() {
  const [profile] = useState(mockProfile)
  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' })
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()

    if (!passwordForm.current || !passwordForm.new || !passwordForm.confirm) {
      setPasswordMessage({ type: 'error', text: 'All fields are required' })
      return
    }

    if (passwordForm.new !== passwordForm.confirm) {
      setPasswordMessage({ type: 'error', text: 'New passwords do not match' })
      return
    }

    if (passwordForm.new.length < 6) {
      setPasswordMessage({ type: 'error', text: 'Password must be at least 6 characters' })
      return
    }

    setPasswordMessage({ type: 'success', text: 'Password changed successfully!' })
    setPasswordForm({ current: '', new: '', confirm: '' })
    setTimeout(() => {
      setShowPasswordChange(false)
      setPasswordMessage(null)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and information</p>
      </div>

      {/* Profile Information */}
      <Card className="p-8 space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-foreground">{profile.fullName}</h2>
              <Badge className="capitalize bg-primary/20 text-primary border-primary/30">{profile.role}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{profile.employeeId}</p>
          </div>
        </div>

        {/* Profile Details Grid */}
        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Information</h3>

            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                  <Mail className="size-3" />
                  Email
                </Label>
                <p className="text-sm font-medium text-foreground">{profile.email}</p>
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                  <Phone className="size-3" />
                  Phone
                </Label>
                <p className="text-sm font-medium text-foreground">{profile.phone}</p>
              </div>
            </div>
          </div>

          {/* Employment Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Employment Information</h3>

            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                  <Building className="size-3" />
                  Department
                </Label>
                <p className="text-sm font-medium text-foreground">{profile.department}</p>
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                  <Calendar className="size-3" />
                  Join Date
                </Label>
                <p className="text-sm font-medium text-foreground">
                  {new Date(profile.joinDate).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                  <User className="size-3" />
                  Branch
                </Label>
                <p className="text-sm font-medium text-foreground">{profile.branch}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Change Password Section */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Lock className="size-4" />
            Security Settings
          </h3>
          <Button
            variant={showPasswordChange ? 'destructive' : 'outline'}
            size="sm"
            onClick={() => {
              setShowPasswordChange(!showPasswordChange)
              setPasswordMessage(null)
            }}
          >
            {showPasswordChange ? 'Cancel' : 'Change Password'}
          </Button>
        </div>

        {showPasswordChange && (
          <form onSubmit={handlePasswordChange} className="space-y-4 pt-4 border-t border-border">
            <div className="space-y-2">
              <Label htmlFor="current">Current Password</Label>
              <Input
                id="current"
                type="password"
                placeholder="Enter current password"
                value={passwordForm.current}
                onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new">New Password</Label>
              <Input
                id="new"
                type="password"
                placeholder="Enter new password"
                value={passwordForm.new}
                onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm New Password</Label>
              <Input
                id="confirm"
                type="password"
                placeholder="Confirm new password"
                value={passwordForm.confirm}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
              />
            </div>

            {passwordMessage && (
              <div
                className={`p-3 rounded-lg text-sm ${
                  passwordMessage.type === 'success'
                    ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400'
                }`}
              >
                {passwordMessage.text}
              </div>
            )}

            <Button type="submit" className="w-full">
              Update Password
            </Button>
          </form>
        )}
      </Card>

      {/* Account Information */}
      <Card className="p-6 space-y-4">
        <h3 className="font-semibold text-foreground">Account Information</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Last Login</span>
            <span className="font-medium text-foreground">Today at 08:00 AM</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Account Status</span>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400">Active</Badge>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">Two-Factor Authentication</span>
            <Badge variant="outline">Not Enabled</Badge>
          </div>
        </div>
      </Card>
    </div>
  )
}
