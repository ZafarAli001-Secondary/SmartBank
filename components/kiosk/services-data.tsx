import { CreditCard, DollarSign, Smartphone, Eye, Send, Landmark, Download, Settings, FileText, Shield, Clock, HelpCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Service {
  title: string
  description: string
  Icon: LucideIcon
  iconColor: string
  iconBg: string
}

export const services: Service[] = [
  {
    title: 'Check Balance',
    description: 'View your account balance',
    Icon: Eye,
    iconColor: '#2563eb',
    iconBg: '#eff6ff',
  },
  {
    title: 'Mini Statement',
    description: 'Recent transaction history',
    Icon: FileText,
    iconColor: '#ea5a12',
    iconBg: '#fef5e7',
  },
  {
    title: 'Fund Transfer',
    description: 'Send money to other accounts',
    Icon: Send,
    iconColor: '#10b981',
    iconBg: '#ecfdf5',
  },
  {
    title: 'Withdraw Cash',
    description: 'Dispense cash from ATM',
    Icon: DollarSign,
    iconColor: '#f59e0b',
    iconBg: '#fffbeb',
  },
  {
    title: 'Mobile Top-up',
    description: 'Recharge your mobile',
    Icon: Smartphone,
    iconColor: '#8b5cf6',
    iconBg: '#f5f3ff',
  },
  {
    title: 'Deposit Cheque',
    description: 'Deposit cheques instantly',
    Icon: CreditCard,
    iconColor: '#06b6d4',
    iconBg: '#ecfdfd',
  },
  {
    title: 'Open Account',
    description: 'Start banking with us',
    Icon: Landmark,
    iconColor: '#ec4899',
    iconBg: '#fdf2f8',
  },
  {
    title: 'Change Pin',
    description: 'Update your ATM PIN',
    Icon: Shield,
    iconColor: '#6366f1',
    iconBg: '#eef2ff',
  },
  {
    title: 'Print Passbook',
    description: 'Get passbook statement',
    Icon: Download,
    iconColor: '#14b8a6',
    iconBg: '#f0fdfa',
  },
  {
    title: 'Bill Payment',
    description: 'Pay bills and utilities',
    Icon: Clock,
    iconColor: '#f97316',
    iconBg: '#ffedd5',
  },
  {
    title: 'Settings',
    description: 'Account preferences',
    Icon: Settings,
    iconColor: '#64748b',
    iconBg: '#f8fafc',
  },
  {
    title: 'Help & Support',
    description: 'Get assistance',
    Icon: HelpCircle,
    iconColor: '#0891b2',
    iconBg: '#ecf8ff',
  },
]
