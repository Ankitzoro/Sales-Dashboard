import React from 'react'
import { TrendingUp, TrendingDown, DollarSign, Target, Handshake, BarChart2 } from 'lucide-react'
import { fmt, pct, deltaBg } from '../utils/format'

function KpiCard({ icon: Icon, label, value, sub, accentClass, delay }) {
  return (
    <div
      className={`card-glow p-5 animate-fade-up ${delay}`}
      style={{ opacity: 0 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2 rounded-xl ${accentClass}`}>
          <Icon size={18} />
        </div>
        <span className="label">{label}</span>
      </div>
      <div className="stat-number">{value}</div>
      {sub && <div className="mt-1 text-sm text-white/40">{sub}</div>}
    </div>
  )
}

export default function KpiCards({ kpi }) {
  const attainment = pct(kpi.revenue, kpi.target)
  const isAhead    = kpi.revenue >= kpi.target

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <KpiCard
        icon={DollarSign}
        label="Total Revenue"
        value={fmt(kpi.revenue)}
        sub={`Target: ${fmt(kpi.target)}`}
        accentClass="bg-acid/10 text-acid"
        delay="stagger-1"
      />
      <KpiCard
        icon={Target}
        label="Attainment"
        value={`${attainment}%`}
        sub={
          <span className={`flex items-center gap-1 ${isAhead ? 'text-acid' : 'text-coral'}`}>
            {isAhead ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {isAhead ? `+${fmt(kpi.revenue - kpi.target)} vs target` : `${fmt(kpi.revenue - kpi.target)} vs target`}
          </span>
        }
        accentClass="bg-sky-dash/10 text-sky-dash"
        delay="stagger-2"
      />
      <KpiCard
        icon={Handshake}
        label="Deals Closed"
        value={kpi.deals.toLocaleString()}
        sub={`Avg deal: ${fmt(kpi.avgDeal)}`}
        accentClass="bg-amber-dash/10 text-amber-dash"
        delay="stagger-3"
      />
      <KpiCard
        icon={BarChart2}
        label="Win Rate"
        value={`${kpi.winRate}%`}
        sub={
          <span className={`flex items-center gap-1 ${kpi.growth > 0 ? 'text-acid' : 'text-coral'}`}>
            {kpi.growth > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {kpi.growth > 0 ? `+${kpi.growth}% YoY growth` : `${kpi.growth}% YoY growth`}
          </span>
        }
        accentClass="bg-coral/10 text-coral"
        delay="stagger-4"
      />
    </div>
  )
}
