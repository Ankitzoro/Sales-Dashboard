import React from 'react'
import {
  ResponsiveContainer, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Cell,
} from 'recharts'
import { fmt, pct } from '../utils/format'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  const d = payload[0]?.payload
  const p = pct(d?.actual, d?.target)
  return (
    <div className="tooltip-custom min-w-[180px]">
      <p className="font-display font-semibold text-white text-sm mb-2">{label}</p>
      <div className="space-y-1">
        <div className="flex justify-between text-sm gap-6">
          <span className="text-white/50">Actual</span>
          <span className="font-mono text-acid">{fmt(d?.actual)}</span>
        </div>
        <div className="flex justify-between text-sm gap-6">
          <span className="text-white/50">Target</span>
          <span className="font-mono text-sky-dash">{fmt(d?.target)}</span>
        </div>
        <div className="flex justify-between text-sm gap-6 pt-1 border-t border-white/10">
          <span className="text-white/50">Attainment</span>
          <span className={`font-mono font-semibold ${p >= 100 ? 'text-acid' : p >= 85 ? 'text-amber-dash' : 'text-coral'}`}>
            {p}%
          </span>
        </div>
      </div>
    </div>
  )
}

function getBarColor(actual, target) {
  const p = pct(actual, target)
  if (p >= 100) return '#c6f135'
  if (p >= 85)  return '#fbbf24'
  return '#ff6b6b'
}

export default function TeamPerformance({ data, selectedTeam, onSelectTeam }) {
  return (
    <div className="card-glow p-6 animate-fade-up stagger-3" style={{ opacity: 0 }}>
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="section-title">Team Performance</h2>
          <p className="text-white/40 text-sm mt-0.5">Click a bar to filter reps</p>
        </div>
        {selectedTeam && (
          <button
            onClick={() => onSelectTeam(null)}
            className="btn-ghost text-xs px-3 py-1.5"
          >
            Clear filter
          </button>
        )}
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: 0 }}
          onClick={e => {
            if (e?.activePayload?.[0]) {
              const team = e.activePayload[0].payload.team
              onSelectTeam(selectedTeam === team ? null : team)
            }
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis
            dataKey="team"
            tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10, fontFamily: 'DM Mono' }}
            axisLine={false} tickLine={false}
            interval={0}
            tickFormatter={v => v.split(' ')[0]}
          />
          <YAxis
            tickFormatter={v => fmt(v)}
            tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10, fontFamily: 'DM Mono' }}
            axisLine={false} tickLine={false} width={52}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Bar dataKey="actual" radius={[4, 4, 0, 0]} maxBarSize={40} cursor="pointer">
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={getBarColor(entry.actual, entry.target)}
                opacity={selectedTeam && selectedTeam !== entry.team ? 0.25 : 1}
              />
            ))}
          </Bar>
          <Bar dataKey="target" fill="#38bdf8" radius={[4, 4, 0, 0]} maxBarSize={40} opacity={0.2} />
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center gap-5 mt-2 justify-end">
        <span className="flex items-center gap-1.5 text-xs text-white/40">
          <span className="w-2.5 h-2.5 rounded-sm bg-acid inline-block" /> Actual
        </span>
        <span className="flex items-center gap-1.5 text-xs text-white/40">
          <span className="w-2.5 h-2.5 rounded-sm bg-sky-dash inline-block opacity-40" /> Target
        </span>
      </div>
    </div>
  )
}
