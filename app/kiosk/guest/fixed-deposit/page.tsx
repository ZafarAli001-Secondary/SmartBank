'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Logo } from '@/components/brand/logo'
import { Clock } from '@/components/kiosk/clock'
import { LanguageSelect } from '@/components/kiosk/language-select'
import { AccessibilityButton } from '@/components/kiosk/accessibility-button'
import { ArrowLeft } from 'lucide-react'

const TENURE_RATES = [
  { months: 3, rate: 4.0 },
  { months: 6, rate: 4.5 },
  { months: 12, rate: 5.5 },
  { months: 24, rate: 6.0 },
  { months: 36, rate: 6.25 },
  { months: 60, rate: 6.5 },
]

export default function FixedDepositPage() {
  const router = useRouter()
  const [amount, setAmount] = useState('10000')
  const [selectedTenure, setSelectedTenure] = useState(12)
  const [maturityAmount, setMaturityAmount] = useState(0)
  const [interest, setInterest] = useState(0)

  const calculateMaturity = () => {
    const principal = parseFloat(amount) || 0
    const rate = TENURE_RATES.find((t) => t.months === selectedTenure)?.rate || 0
    const years = selectedTenure / 12
    const calc = principal * Math.pow(1 + rate / 100, years)
    const int = calc - principal
    setMaturityAmount(Math.round(calc))
    setInterest(Math.round(int))
  }

  const handleAmountChange = (value: string) => {
    setAmount(value)
  }

  const handleTenureChange = (tenure: number) => {
    setSelectedTenure(tenure)
  }

  useEffect(() => {
    calculateMaturity()
  }, [amount, selectedTenure])

  const currentRate = TENURE_RATES.find((t) => t.months === selectedTenure)?.rate || 0

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <aside className="relative hidden w-[42%] flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
        <Logo size="lg" className="[&_*]:text-primary-foreground [&>div:first-child]:bg-primary-foreground [&>div:first-child]:text-primary" />
        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight text-balance">
            Fixed Deposit
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-primary-foreground/80">
            Calculate your returns and grow your savings with our competitive fixed deposit rates.
          </p>
        </div>
      </aside>

      <main className="flex flex-1 flex-col">
        <header className="flex items-center justify-end gap-3 p-5">
          <Clock />
          <LanguageSelect />
          <AccessibilityButton variant="outline" />
        </header>

        <div className="flex-1 overflow-auto px-6 pb-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Fixed Deposit</h1>
              <p className="text-muted-foreground">Calculate your maturity returns</p>
            </div>
            <Button variant="outline" size="lg" onClick={() => router.back()} className="gap-2">
              <ArrowLeft className="size-4" />
              Back
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Calculator */}
            <Card className="p-6 space-y-6">
              <h2 className="text-xl font-bold text-foreground">Maturity Calculator</h2>

              <div>
                <Label htmlFor="amount" className="text-sm font-semibold">
                  Deposit Amount (₹)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  min="1000"
                  max="10000000"
                  className="mt-2 text-lg"
                />
              </div>

              <div>
                <Label className="text-sm font-semibold">Tenure (Months)</Label>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {TENURE_RATES.map((tenure) => (
                    <Button
                      key={tenure.months}
                      variant={selectedTenure === tenure.months ? 'default' : 'outline'}
                      onClick={() => handleTenureChange(tenure.months)}
                      className="h-12"
                    >
                      {tenure.months}M
                    </Button>
                  ))}
                </div>
              </div>

              <div className="rounded-lg bg-accent/30 p-4">
                <p className="text-sm text-muted-foreground">Current Interest Rate</p>
                <p className="text-3xl font-bold text-primary">{currentRate}% p.a.</p>
              </div>
            </Card>

            {/* Results */}
            <Card className="p-6 space-y-6">
              <h2 className="text-xl font-bold text-foreground">Investment Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <span className="text-muted-foreground">Principal Amount</span>
                  <span className="text-lg font-semibold text-foreground">
                    ₹{parseFloat(amount).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <span className="text-muted-foreground">Tenure</span>
                  <span className="text-lg font-semibold text-foreground">
                    {selectedTenure} months ({(selectedTenure / 12).toFixed(1)} years)
                  </span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <span className="text-muted-foreground">Rate of Interest</span>
                  <span className="text-lg font-semibold text-foreground">
                    {currentRate}% p.a.
                  </span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-primary">
                  <span className="text-muted-foreground">Interest Earned</span>
                  <span className="text-lg font-semibold text-primary">
                    ₹{interest.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <span className="text-sm font-medium text-muted-foreground">Maturity Amount</span>
                  <span className="text-3xl font-bold text-primary">
                    ₹{maturityAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              <Button className="w-full h-12 text-base" onClick={() => router.push('/kiosk/guest/contact-rep')}>
                Get Consultation
              </Button>
            </Card>
          </div>

          {/* Rates Table */}
          <Card className="mt-6 p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Interest Rates by Tenure</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left font-semibold text-foreground py-3">Tenure</th>
                    <th className="text-left font-semibold text-foreground py-3">Min. Deposit</th>
                    <th className="text-left font-semibold text-foreground py-3">Interest Rate p.a.</th>
                  </tr>
                </thead>
                <tbody>
                  {TENURE_RATES.map((tenure) => (
                    <tr key={tenure.months} className="border-b border-border hover:bg-accent/30">
                      <td className="py-3 text-muted-foreground">{tenure.months} months</td>
                      <td className="py-3 text-muted-foreground">₹1,000</td>
                      <td className="py-3 font-semibold text-foreground">{tenure.rate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
