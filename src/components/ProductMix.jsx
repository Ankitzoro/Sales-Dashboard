import React, { useState } from 'react'
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Sector,
} from 'recharts'
import { PRODUCT_MIX } from '../data/salesData'

const renderActiveShape = (props) => {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, value,
  } = props
  return (
    <g>
      <text x={cx} y={cy - 10} textAnchor="middle" fill="#fff" fontFamily="Syne" fontWeight={700} fontSize={22}>
        {value}%
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontFamily="DM Sans" fontSize={11}>
        {payload.name}
      </text>
      <Sector
        cx={cx} cy={cy}
        innerRadius={innerRadius} outerRadius={outerRadius + 8}
        startAngle={startAngle} endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx} cy={cy}
        innerRadius={outerRadius + 12} outerRadius={outerRadius + 14}
        startAngle={startAngle} endAngle={endAngle}
        fill={fill} opacity={0.4}
      />
    </g>
  )
}

export default function ProductMix() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="card-glow p-6 animate-fade-up stagger-4" style={{ opacity: 0 }}>
      <h2 className="section-title mb-1">Product Mix</h2>
      <p className="text-white/40 text-sm mb-4">Revenue by category</p>

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={PRODUCT_MIX}
            cx="50%" cy="50%"
            innerRadius={60} outerRadius={85}
            dataKey="value"
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            onMouseEnter={(_, index) => setActiveIndex(index)}
          >
            {PRODUCT_MIX.map((entry, i) => (
              <Cell key={i} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 gap-2 mt-2">
        {PRODUCT_MIX.map((item, i) => (
          <button
            key={i}
            className={`flex items-center gap-2 p-2 rounded-lg transition-colors cursor-pointer text-left ${
              activeIndex === i ? 'bg-white/5' : 'hover:bg-white/3'
            }`}
            onClick={() => setActiveIndex(i)}
          >
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: item.color }} />
            <span className="text-xs text-white/60 truncate">{item.name}</span>
            <span className="ml-auto text-xs font-mono text-white/80">{item.value}%</span>
          </button>
        ))}
      </div>
    </div>
  )
}
