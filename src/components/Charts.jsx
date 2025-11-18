import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

function useMiniChart(data, color = '#6366f1', type = 'line') {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height
    ctx.clearRect(0, 0, w, h)
    ctx.lineWidth = 2
    ctx.strokeStyle = color
    ctx.fillStyle = color

    const values = data.map(d => d.value)
    const max = Math.max(...values)
    const min = Math.min(...values)
    const scaleX = (i) => (i / (values.length - 1)) * (w - 8) + 4
    const scaleY = (v) => h - ((v - min) / (max - min || 1)) * (h - 8) - 4

    if (type === 'line') {
      ctx.beginPath()
      values.forEach((v, i) => {
        const x = scaleX(i)
        const y = scaleY(v)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      })
      ctx.stroke()
    } else if (type === 'bar') {
      const barW = Math.max(2, (w - 16) / values.length)
      values.forEach((v, i) => {
        const x = scaleX(i) - barW / 2
        const y = scaleY(v)
        ctx.globalAlpha = 0.9
        ctx.fillRect(x, y, barW, h - y - 4)
        ctx.globalAlpha = 1
      })
    } else if (type === 'pie') {
      const sum = values.reduce((a, b) => a + b, 0)
      let start = -Math.PI / 2
      values.forEach((v, i) => {
        const slice = (v / (sum || 1)) * Math.PI * 2
        ctx.beginPath()
        ctx.moveTo(w / 2, h / 2)
        ctx.arc(w / 2, h / 2, Math.min(w, h) / 2 - 4, start, start + slice)
        ctx.closePath()
        ctx.globalAlpha = 0.7 + 0.3 * (i / values.length)
        ctx.fill()
        start += slice
      })
      ctx.globalAlpha = 1
    }
  }, [data, color, type])
  return ref
}

export function LineChart({ data, color }) {
  const ref = useMiniChart(data, color, 'line')
  return <canvas ref={ref} width={480} height={160} className="w-full h-40" />
}

export function BarChart({ data, color }) {
  const ref = useMiniChart(data, color, 'bar')
  return <canvas ref={ref} width={480} height={160} className="w-full h-40" />
}

export function PieChart({ data, color }) {
  const ref = useMiniChart(data, color, 'pie')
  return <canvas ref={ref} width={240} height={240} className="w-full h-60" />
}

export function DropOffHeatmap({ points }) {
  return (
    <div className="w-full h-24 rounded-lg overflow-hidden bg-gradient-to-r from-rose-500/20 via-amber-500/20 to-emerald-500/20">
      <div className="h-full flex">
        {points.map((p, i) => (
          <div key={i} className="flex-1" style={{ backgroundColor: `rgba(99,102,241,${Math.max(0.1, p.v/100)})` }} />
        ))}
      </div>
    </div>
  )
}
