import { FD_RATES, LOAN_RATES, type RateRow } from '@/lib/services-config'

function RateGroup({ title, rows }: { title: string; rows: RateRow[] }) {
  return (
    <div>
      <h4 className="mb-2 text-sm font-semibold text-foreground">{title}</h4>
      <div className="overflow-hidden rounded-lg border border-border">
        {rows.map((row, i) => (
          <div
            key={row.name}
            className={`flex items-center justify-between px-4 py-2.5 ${
              i % 2 === 1 ? 'bg-muted/40' : 'bg-card'
            }`}
          >
            <div>
              <div className="text-sm font-medium text-foreground">{row.name}</div>
              <div className="text-xs text-muted-foreground">{row.detail}</div>
            </div>
            <span className="text-sm font-bold text-primary">{row.rate}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function RatesTable() {
  return (
    <div className="space-y-4">
      <RateGroup title="Fixed Deposit Rates" rows={FD_RATES} />
      <RateGroup title="Loan Interest Rates" rows={LOAN_RATES} />
    </div>
  )
}
