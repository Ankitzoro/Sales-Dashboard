import React from 'react'
import { Activity } from 'lucide-react'
import { useFilters } from './hooks/useFilters'
import FilterBar from './components/FilterBar'
import KpiCards from './components/KpiCards'
import RevenueTrend from './components/RevenueTrend'
import TeamPerformance from './components/TeamPerformance'
import ProductMix from './components/ProductMix'
import RegionTargets from './components/RegionTargets'
import RepLeaderboard from './components/RepLeaderboard'

export default function App() {
  const filters = useFilters()

  return (
    <div className="min-h-screen">
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 border-b border-ink-700 bg-ink-950/80 backdrop-blur-md">
        <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-acid flex items-center justify-center">
              <Activity size={16} className="text-ink-950" />
            </div>
            <span className="font-display font-extrabold text-white text-lg tracking-tight">
              Sales<span className="text-acid">Pulse</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-acid animate-pulse-slow" />
            <span className="text-xs text-white/40 font-mono">LIVE · Q2 2026</span>
          </div>
        </div>
      </header>

      {/* ── Main ───────────────────────────────────────────── */}
      <main className="max-w-screen-2xl mx-auto px-6 py-8 space-y-8">

        {/* Filters */}
        <FilterBar
          region={filters.region}         setRegion={filters.setRegion}
          regions={filters.regions}
          dateRange={filters.dateRange}   setDateRange={filters.setDateRange}
          dateRanges={filters.dateRanges}
          category={filters.category}     setCategory={filters.setCategory}
          categories={filters.categories}
        />

        {/* KPIs */}
        <KpiCards kpi={filters.kpi} />

        {/* Row 1: Trend + Targets */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <RevenueTrend data={filters.monthlyData} />
          </div>
          <div>
            <RegionTargets />
          </div>
        </div>

        {/* Row 2: Teams + Product Mix */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <TeamPerformance
              data={filters.teamData}
              selectedTeam={filters.selectedTeam}
              onSelectTeam={filters.setSelectedTeam}
            />
          </div>
          <div>
            <ProductMix />
          </div>
        </div>

        {/* Row 3: Rep Leaderboard */}
        <RepLeaderboard
          reps={filters.reps}
          selectedTeam={filters.selectedTeam}
        />
      </main>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="border-t border-ink-700 mt-16 py-6">
        <div className="max-w-screen-2xl mx-auto px-6 flex items-center justify-between">
          <span className="text-xs text-white/20 font-mono">SalesPulse v1.0</span>
          <span className="text-xs text-white/20">Data refreshed · live simulation</span>
        </div>
      </footer>
    </div>
  )
}
