import React, { useState } from 'react'
import {
  ResponsiveContainer, ComposedChart, Line, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
} from 'recharts'
import { fmt } from '../utils/format'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="tooltip-custom min-w-[160px]">
      <p className="label mb-2">{label}</p>
      {payload.map(p => (
        <div key={p.name} className="flex items-center justify-between gap-4 text-sm">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} />
            <span className="text-white/60">{p.name}</span>
          </span>
          <span className="font-mono font-medium text-white">{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  )
}

export default function RevenueTrend({ data }) {
  const [showBars, setShowBars] = useState(true)

  return (
    <div className="card-glow p-6 animate-fade-up stagger-2" style={{ opacity: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="section-title">Revenue Trend</h2>
          <p className="text-white/40 text-sm mt-0.5">Actual vs Target over time</p>
        </div>
        <button
          onClick={() => setShowBars(v => !v)}
          className={`badge border cursor-pointer transition-colors ${
            showBars
              ? 'border-acid/40 text-acid bg-acid/5'
              : 'border-ink-500 text-white/40 bg-transparent'
          }`}
        >
          {showBars ? 'Bars ON' : 'Bars OFF'}
        </button>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11, fontFamily: 'DM Mono' }}
            axisLine={false} tickLine={false}
          />
          <YAxis
            tickFormatter={v => fmt(v)}
            tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11, fontFamily: 'DM Mono' }}
            axisLine={false} tickLine={false} width={56}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Legend
            wrapperStyle={{ fontSize: 12, fontFamily: 'DM Sans', paddingTop: 16 }}
            formatter={v => <span style={{ color: 'rgba(255,255,255,0.5)' }}>{v}</span>}
          />
          {showBars && (
            <Bar
              dataKey="actual" name="Actual" fill="#c6f135"
              radius={[4, 4, 0, 0]} opacity={0.25} maxBarSize={28}
            />
          )}
          <Line
            type="monotone" dataKey="actual" name="Actual"
            stroke="#c6f135" strokeWidth={2.5} dot={false}
            activeDot={{ r: 5, fill: '#c6f135', strokeWidth: 0 }}
          />
          <Line
            type="monotone" dataKey="target" name="Target"
            stroke="#38bdf8" strokeWidth={1.5} strokeDasharray="6 3" dot={false}
            activeDot={{ r: 4, fill: '#38bdf8', strokeWidth: 0 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
