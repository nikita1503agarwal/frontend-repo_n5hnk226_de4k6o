import { useEffect, useState } from 'react'
import Spline from '@splinetool/react-spline'
import AIInsightCard from '../components/AIInsightCard'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function AIInsights() {
  const [topic, setTopic] = useState('')
  const [tips, setTips] = useState('')
  const [summary, setSummary] = useState('')

  useEffect(() => {
    fetch(`${API}/ai/next-topic`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) }).then(r=>r.json()).then((d)=>setTopic(d.text)).catch(()=>{})
    fetch(`${API}/ai/improvement-tips`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ courseId: 'c1' }) }).then(r=>r.json()).then((d)=>setTips(d.text)).catch(()=>{})
    fetch(`${API}/ai/summarize-reviews`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ courseId: 'c1' }) }).then(r=>r.json()).then((d)=>setSummary(d.text)).catch(()=>{})
  }, [])

  return (
    <div className="relative p-6 space-y-6">
      <div className="relative h-72 rounded-2xl overflow-hidden">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/60 pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xs uppercase tracking-wider text-slate-300">AI Insights</div>
            <div className="text-3xl md:text-4xl font-semibold text-white">Futuristic Recommendations</div>
            <div className="mt-2 text-slate-300">Data-driven guidance to improve your courses</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AIInsightCard title="Recommended next course topic" text={topic} />
        <AIInsightCard title="Improve module X for better retention" text={tips} />
        <AIInsightCard title="Students love your examples" text={summary} />
      </div>
    </div>
  )
}
