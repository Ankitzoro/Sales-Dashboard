import React from 'react'
import { REGION_SUMMARIES } from '../data/salesData'
import { fmt, pct } from '../utils/format'
import { clamp } from '../utils/format'

function RegionRow({ region, actual, target, color }) {
  const p = pct(actual, target)
  const clamped = clamp(p, 0, 100)

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
          <span className="text-sm text-white/70">{region}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-white/40">{fmt(actual)}</span>
          <span
            className={`badge font-mono ${
              p >= 100 ? 'bg-acid/10 text-acid' :
              p >= 85  ? 'bg-amber-dash/10 text-amber-dash' :
                         'bg-coral/10 text-coral'
            }`}
          >
            {p}%
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-2 bg-ink-700 rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${clamped}%`,
            background: color,
            boxShadow: `0 0 8px ${color}60`,
          }}
        />
        {/* Target line at 100% */}
        <div className="absolute inset-y-0 right-0 w-px bg-white/10" />
      </div>

      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-white/25">$0</span>
        <span className="text-[10px] text-white/25">Target {fmt(target)}</span>
      </div>
    </div>
  )
}

export default function RegionTargets() {
  const total = REGION_SUMMARIES.reduce((s, r) => s + r.actual, 0)
  const totalTarget = REGION_SUMMARIES.reduce((s, r) => s + r.target, 0)
  const overall = pct(total, totalTarget)

  return (
    <div className="card-glow p-6 animate-fade-up stagger-5" style={{ opacity: 0 }}>
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="section-title">Regional Targets</h2>
          <p className="text-white/40 text-sm mt-0.5">Progress to annual goal</p>
        </div>
        <div className="text-right">
          <div className="font-display font-bold text-2xl text-white">{overall}%</div>
          <div className="text-[10px] text-white/30 uppercase tracking-widest">Overall</div>
        </div>
      </div>

      {/* Overall ring indicator */}
      <div className="relative h-3 bg-ink-700 rounded-full overflow-hidden mb-6">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000"
          style={{
            width: `${clamp(overall, 0, 100)}%`,
            background: 'linear-gradient(90deg, #38bdf8, #c6f135)',
          }}
        />
      </div>

      <div className="space-y-4">
        {REGION_SUMMARIES.map((r, i) => (
          <RegionRow key={i} {...r} />
        ))}
      </div>
    </div>
  )
}
