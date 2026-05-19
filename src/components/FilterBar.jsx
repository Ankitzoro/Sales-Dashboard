import React from 'react'
import { Filter, ChevronDown } from 'lucide-react'

function Select({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="appearance-none bg-ink-700 border border-ink-500 text-white text-sm rounded-xl
                   pl-3 pr-8 py-2 cursor-pointer hover:border-acid/40 transition-colors
                   focus:outline-none focus:border-acid/60 font-body"
      >
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
      />
    </div>
  )
}

export default function FilterBar({
  region, setRegion, regions,
  dateRange, setDateRange, dateRanges,
  category, setCategory, categories,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 animate-fade-up stagger-1" style={{ opacity: 0 }}>
      <div className="flex items-center gap-1.5 text-white/30">
        <Filter size={14} />
        <span className="text-xs uppercase tracking-widest">Filters</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <Select value={region}    onChange={setRegion}    options={regions} />
        <Select value={dateRange} onChange={setDateRange} options={dateRanges} />
        <Select value={category}  onChange={setCategory}  options={categories} />
      </div>
    </div>
  )
}
