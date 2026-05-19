// ─── Regions & Teams ────────────────────────────────────────────────────────

export const REGIONS = ['All Regions', 'North America', 'Europe', 'Asia Pacific', 'Latin America']

export const TEAMS = {
  'North America': ['Alpha Squad', 'Beta Force'],
  'Europe':        ['Euro Hawks', 'Nordic Wolves'],
  'Asia Pacific':  ['APAC Tigers', 'Pacific Rim'],
  'Latin America': ['Condor Unit', 'Jaguar Team'],
}

export const SALESPEOPLE = {
  'Alpha Squad':  ['James Carter', 'Priya Nair', 'Marcus Webb'],
  'Beta Force':   ['Samantha Liu', 'Derek Horn', 'Tina Patel'],
  'Euro Hawks':   ['Lena Müller', 'Pierre Dubois', 'Sofia Rossi'],
  'Nordic Wolves':['Erik Lindqvist', 'Astrid Hansen', 'Björn Larsen'],
  'APAC Tigers':  ['Yuki Tanaka', 'Chen Wei', 'Arjun Singh'],
  'Pacific Rim':  ['Mei Lin', 'Hiro Yamamoto', 'Soo-Jin Park'],
  'Condor Unit':  ['Carlos Mendez', 'Valentina Cruz', 'Diego Ramos'],
  'Jaguar Team':  ['Lucia Ferreira', 'Rafael Lima', 'Isabel Torres'],
}

export const PRODUCT_CATEGORIES = ['All Products', 'Enterprise', 'SMB', 'Consumer', 'Government']

// ─── Time helpers ────────────────────────────────────────────────────────────

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function seeded(seed) {
  let s = seed
  return function () {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

// ─── Monthly trend data (per region) ─────────────────────────────────────────

function buildMonthlyTrend(regionIndex) {
  const rng = seeded(regionIndex * 777 + 42)
  let base = 800000 + regionIndex * 200000
  return MONTHS.map((month, i) => {
    const seasonality = 1 + 0.15 * Math.sin((i / 11) * Math.PI)
    const noise = 0.85 + rng() * 0.3
    const actual = Math.round(base * seasonality * noise)
    const target = Math.round(base * seasonality * (0.9 + regionIndex * 0.02))
    base *= 1.015 // slight growth trend
    return { month, actual, target }
  })
}

export const MONTHLY_TRENDS = {
  'All Regions':   buildMonthlyTrend(0),
  'North America': buildMonthlyTrend(1),
  'Europe':        buildMonthlyTrend(2),
  'Asia Pacific':  buildMonthlyTrend(3),
  'Latin America': buildMonthlyTrend(4),
}

// ─── Region summary cards ─────────────────────────────────────────────────────

export const REGION_SUMMARIES = [
  { region: 'North America', actual: 12_400_000, target: 11_800_000, color: '#c6f135' },
  { region: 'Europe',        actual:  9_200_000, target: 10_000_000, color: '#38bdf8' },
  { region: 'Asia Pacific',  actual:  7_800_000, target:  7_500_000, color: '#fb923c' },
  { region: 'Latin America', actual:  4_100_000, target:  5_000_000, color: '#f472b6' },
]

// ─── Team performance ─────────────────────────────────────────────────────────

export const TEAM_PERFORMANCE = {
  'All Regions': [
    { team: 'Alpha Squad',   actual: 6_800_000, target: 6_200_000, region: 'North America' },
    { team: 'Beta Force',    actual: 5_600_000, target: 5_600_000, region: 'North America' },
    { team: 'Euro Hawks',    actual: 4_900_000, target: 5_200_000, region: 'Europe' },
    { team: 'Nordic Wolves', actual: 4_300_000, target: 4_800_000, region: 'Europe' },
    { team: 'APAC Tigers',   actual: 4_200_000, target: 4_000_000, region: 'Asia Pacific' },
    { team: 'Pacific Rim',   actual: 3_600_000, target: 3_500_000, region: 'Asia Pacific' },
    { team: 'Condor Unit',   actual: 2_300_000, target: 2_800_000, region: 'Latin America' },
    { team: 'Jaguar Team',   actual: 1_800_000, target: 2_200_000, region: 'Latin America' },
  ],
  'North America': [
    { team: 'Alpha Squad', actual: 6_800_000, target: 6_200_000, region: 'North America' },
    { team: 'Beta Force',  actual: 5_600_000, target: 5_600_000, region: 'North America' },
  ],
  'Europe': [
    { team: 'Euro Hawks',    actual: 4_900_000, target: 5_200_000, region: 'Europe' },
    { team: 'Nordic Wolves', actual: 4_300_000, target: 4_800_000, region: 'Europe' },
  ],
  'Asia Pacific': [
    { team: 'APAC Tigers', actual: 4_200_000, target: 4_000_000, region: 'Asia Pacific' },
    { team: 'Pacific Rim', actual: 3_600_000, target: 3_500_000, region: 'Asia Pacific' },
  ],
  'Latin America': [
    { team: 'Condor Unit', actual: 2_300_000, target: 2_800_000, region: 'Latin America' },
    { team: 'Jaguar Team', actual: 1_800_000, target: 2_200_000, region: 'Latin America' },
  ],
}

// ─── Individual rep data ──────────────────────────────────────────────────────

function buildReps() {
  const reps = []
  let id = 1
  const rng = seeded(9999)

  Object.entries(SALESPEOPLE).forEach(([team, names]) => {
    const region = Object.entries(TEAMS).find(([, ts]) => ts.includes(team))?.[0] || ''
    names.forEach(name => {
      const target = 500_000 + Math.round(rng() * 800_000)
      const pct = 0.65 + rng() * 0.7
      const actual = Math.round(target * pct)
      const deals = rand(8, 45)
      const winRate = Math.round((0.3 + rng() * 0.5) * 100)
      reps.push({ id: id++, name, team, region, actual, target, deals, winRate })
    })
  })
  return reps
}

export const REPS = buildReps()

// ─── Product mix (pie chart) ──────────────────────────────────────────────────

export const PRODUCT_MIX = [
  { name: 'Enterprise', value: 38, color: '#c6f135' },
  { name: 'SMB',        value: 28, color: '#38bdf8' },
  { name: 'Consumer',   value: 20, color: '#fb923c' },
  { name: 'Government', value: 14, color: '#f472b6' },
]

// ─── KPI summary ─────────────────────────────────────────────────────────────

export const KPI_DATA = {
  'All Regions':   { revenue: 33_500_000, target: 34_300_000, deals: 1248, winRate: 47, avgDeal: 26_800, growth: 12.4 },
  'North America': { revenue: 12_400_000, target: 11_800_000, deals: 492,  winRate: 51, avgDeal: 25_200, growth: 18.2 },
  'Europe':        { revenue:  9_200_000, target: 10_000_000, deals: 374,  winRate: 44, avgDeal: 24_600, growth:  6.3 },
  'Asia Pacific':  { revenue:  7_800_000, target:  7_500_000, deals: 268,  winRate: 49, avgDeal: 29_100, growth: 14.7 },
  'Latin America': { revenue:  4_100_000, target:  5_000_000, deals: 114,  winRate: 38, avgDeal: 35_900, growth:  4.1 },
}
