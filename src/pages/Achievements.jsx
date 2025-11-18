import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

function Badge({ level }) {
  const colors = {
    Bronze: 'from-amber-600 to-amber-400',
    Silver: 'from-slate-400 to-slate-200',
    Gold: 'from-yellow-500 to-amber-300',
    Platinum: 'from-sky-400 to-indigo-300',
  }
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-slate-900 bg-gradient-to-br ${colors[level]} shadow`}> 
      <span className="text-sm font-semibold">{level}</span>
    </div>
  )
}

export default function Achievements() {
  const [level, setLevel] = useState('Bronze')
  const [progress, setProgress] = useState({ points: 0, nextLevel: 'Silver', progressPercent: 0 })

  useEffect(() => {
    fetch(`${API}/achievements/level`).then(r=>r.json()).then((d)=>setLevel(d.level)).catch(()=>{})
    fetch(`${API}/achievements/progress`).then(r=>r.json()).then(setProgress).catch(()=>{})
  }, [])

  return (
    <div className="p-6 space-y-6">
      <div className="rounded-2xl border p-6 bg-white dark:bg-slate-900">
        <div className="text-lg font-semibold">Your Level</div>
        <div className="mt-3"><Badge level={level} /></div>
        <div className="mt-6">
          <div className="text-sm text-slate-500">Progress to {progress.nextLevel}</div>
          <div className="mt-2 h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-fuchsia-500 to-sky-500" style={{ width: `${progress.progressPercent}%` }} />
          </div>
          <div className="mt-1 text-sm text-slate-500">{progress.points} points</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['Bronze','Silver','Gold','Platinum'].map((lvl) => (
          <div key={lvl} className="rounded-2xl border p-6 bg-white dark:bg-slate-900 text-center">
            <Badge level={lvl} />
            <div className="mt-2 text-sm text-slate-500">Earn by increasing enrollments, ratings, and watch time</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border p-6 bg-white dark:bg-slate-900">
        <div className="text-lg font-semibold">Next level requirements</div>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 mt-2">
          <li>Reach 2,000 total points</li>
          <li>Maintain rating above 4.5</li>
          <li>Publish 1 new course this month</li>
        </ul>
      </div>
    </div>
  )
}
