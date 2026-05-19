import React, { useState } from 'react'
import { ChevronUp, ChevronDown, Medal } from 'lucide-react'
import { fmt, pct, deltaBg } from '../utils/format'

const COLS = [
  { key: 'name',    label: 'Rep',       sortable: true },
  { key: 'team',    label: 'Team',      sortable: true },
  { key: 'actual',  label: 'Revenue',   sortable: true },
  { key: 'target',  label: 'Target',    sortable: false },
  { key: 'pct',     label: 'Attainment',sortable: true },
  { key: 'deals',   label: 'Deals',     sortable: true },
  { key: 'winRate', label: 'Win Rate',  sortable: true },
]

function medalColor(i) {
  if (i === 0) return 'text-amber-dash'
  if (i === 1) return 'text-white/50'
  if (i === 2) return 'text-orange-400/70'
  return null
}

export default function RepLeaderboard({ reps, selectedTeam }) {
  const [sortKey, setSortKey]   = useState('actual')
  const [sortDir, setSortDir]   = useState('desc')
  const [page, setPage]         = useState(0)
  const PAGE_SIZE = 8

  function handleSort(key) {
    if (sortKey === key) setSortDir(d => d === 'desc' ? 'asc' : 'desc')
    else { setSortKey(key); setSortDir('desc') }
    setPage(0)
  }

  const sorted = [...reps].sort((a, b) => {
    const va = sortKey === 'pct' ? pct(a.actual, a.target) : a[sortKey]
    const vb = sortKey === 'pct' ? pct(b.actual, b.target) : b[sortKey]
    if (typeof va === 'string') return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va)
    return sortDir === 'asc' ? va - vb : vb - va
  })

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE)
  const visible    = sorted.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  return (
    <div className="card-glow p-6 animate-fade-up stagger-6" style={{ opacity: 0 }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="section-title">Rep Leaderboard</h2>
          <p className="text-white/40 text-sm mt-0.5">
            {selectedTeam ? `Filtered: ${selectedTeam}` : 'All salespeople'} — {reps.length} reps
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-600">
              <th className="pb-3 pr-3 text-left label w-6">#</th>
              {COLS.map(col => (
                <th
                  key={col.key}
                  className={`pb-3 px-2 text-left label ${col.sortable ? 'cursor-pointer select-none hover:text-white/60 transition-colors' : ''}`}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <span className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && (
                      <span className="text-white/20">
                        {sortKey === col.key
                          ? sortDir === 'desc' ? <ChevronDown size={12} className="text-acid" /> : <ChevronUp size={12} className="text-acid" />
                          : <ChevronDown size={12} />}
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((rep, i) => {
              const globalRank = page * PAGE_SIZE + i
              const p = pct(rep.actual, rep.target)
              const mc = medalColor(globalRank)
              return (
                <tr
                  key={rep.id}
                  className="border-b border-ink-700/50 hover:bg-white/2 transition-colors"
                >
                  <td className="py-3 pr-3">
                    {mc
                      ? <Medal size={14} className={mc} />
                      : <span className="font-mono text-xs text-white/25">{globalRank + 1}</span>
                    }
                  </td>
                  <td className="py-3 px-2 font-medium text-white">{rep.name}</td>
                  <td className="py-3 px-2 text-white/50">{rep.team}</td>
                  <td className="py-3 px-2 font-mono text-acid">{fmt(rep.actual)}</td>
                  <td className="py-3 px-2 font-mono text-white/40">{fmt(rep.target)}</td>
                  <td className="py-3 px-2">
                    <span className={`badge ${deltaBg(rep.actual, rep.target)}`}>{p}%</span>
                  </td>
                  <td className="py-3 px-2 font-mono text-white/60">{rep.deals}</td>
                  <td className="py-3 px-2 font-mono text-white/60">{rep.winRate}%</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-ink-600">
          <span className="text-xs text-white/30">
            Page {page + 1} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="btn-ghost text-xs px-3 py-1.5 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="btn-ghost text-xs px-3 py-1.5 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
