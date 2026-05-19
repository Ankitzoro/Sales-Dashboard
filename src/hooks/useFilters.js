import { useState, useMemo } from 'react'
import {
  REGIONS, PRODUCT_CATEGORIES,
  MONTHLY_TRENDS, TEAM_PERFORMANCE, KPI_DATA, REPS,
} from '../data/salesData'

const DATE_RANGES = ['Monthly', 'Quarterly', 'Yearly']

export function useFilters() {
  const [region, setRegion]           = useState('All Regions')
  const [dateRange, setDateRange]     = useState('Monthly')
  const [category, setCategory]       = useState('All Products')
  const [selectedTeam, setSelectedTeam] = useState(null)

  const monthlyData = useMemo(() => {
    const raw = MONTHLY_TRENDS[region] || MONTHLY_TRENDS['All Regions']
    if (dateRange === 'Monthly')   return raw
    if (dateRange === 'Quarterly') {
      return [
        { month: 'Q1', actual: raw.slice(0,3).reduce((s,r) => s+r.actual,0), target: raw.slice(0,3).reduce((s,r) => s+r.target,0) },
        { month: 'Q2', actual: raw.slice(3,6).reduce((s,r) => s+r.actual,0), target: raw.slice(3,6).reduce((s,r) => s+r.target,0) },
        { month: 'Q3', actual: raw.slice(6,9).reduce((s,r) => s+r.actual,0), target: raw.slice(6,9).reduce((s,r) => s+r.target,0) },
        { month: 'Q4', actual: raw.slice(9,12).reduce((s,r) => s+r.actual,0), target: raw.slice(9,12).reduce((s,r) => s+r.target,0) },
      ]
    }
    // Yearly
    const actual = raw.reduce((s,r) => s+r.actual,0)
    const target = raw.reduce((s,r) => s+r.target,0)
    return [{ month: 'Year', actual, target }]
  }, [region, dateRange])

  const teamData = useMemo(() => {
    return (TEAM_PERFORMANCE[region] || TEAM_PERFORMANCE['All Regions'])
  }, [region])

  const kpi = useMemo(() => KPI_DATA[region] || KPI_DATA['All Regions'], [region])

  const reps = useMemo(() => {
    let list = REPS
    if (region !== 'All Regions') list = list.filter(r => r.region === region)
    if (selectedTeam)             list = list.filter(r => r.team === selectedTeam)
    return list.sort((a, b) => b.actual - a.actual)
  }, [region, selectedTeam])

  return {
    // filter state
    region, setRegion,
    dateRange, setDateRange,
    category, setCategory,
    selectedTeam, setSelectedTeam,
    // derived data
    monthlyData, teamData, kpi, reps,
    // option lists
    regions: REGIONS,
    dateRanges: DATE_RANGES,
    categories: PRODUCT_CATEGORIES,
  }
}
