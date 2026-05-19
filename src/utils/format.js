export function fmt(value, style = 'compact') {
  if (style === 'compact') {
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
    if (value >= 1_000)     return `$${(value / 1_000).toFixed(0)}K`
    return `$${value}`
  }
  if (style === 'full') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'USD', maximumFractionDigits: 0,
    }).format(value)
  }
  if (style === 'number') {
    return new Intl.NumberFormat('en-US').format(value)
  }
  return value
}

export function pct(actual, target) {
  if (!target) return 0
  return Math.round((actual / target) * 100)
}

export function deltaColor(actual, target) {
  const p = pct(actual, target)
  if (p >= 100) return 'text-acid'
  if (p >= 85)  return 'text-amber-dash'
  return 'text-coral'
}

export function deltaBg(actual, target) {
  const p = pct(actual, target)
  if (p >= 100) return 'bg-acid/10 text-acid'
  if (p >= 85)  return 'bg-amber-dash/10 text-amber-dash'
  return 'bg-coral/10 text-coral'
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}
