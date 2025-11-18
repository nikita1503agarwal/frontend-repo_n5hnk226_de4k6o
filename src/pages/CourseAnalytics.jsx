import { useEffect, useMemo, useState } from 'react'
import { DropOffHeatmap, LineChart, BarChart } from '../components/Charts'

const API = import.meta.env.VITE_BACKEND_URL || ''

const tabs = ['daily','weekly','monthly']

export default function CourseAnalytics() {
  const [courses, setCourses] = useState([])
  const [selected, setSelected] = useState(null)
  const [period, setPeriod] = useState('daily')
  const [enrollSeries, setEnrollSeries] = useState([])
  const [drop, setDrop] = useState({ points: [] })
  const [reviews, setReviews] = useState({ rating: 0, count: 0, reviews: [] })

  useEffect(() => {
    fetch(`${API}/courses`).then(r=>r.json()).then((list)=>{ setCourses(list); setSelected(list[0]?.id) }).catch(()=>{})
  }, [])

  useEffect(() => {
    if (!selected) return
    fetch(`${API}/courses/${selected}/enrollments?period=${period}`).then(r=>r.json()).then(setEnrollSeries).catch(()=>{})
    fetch(`${API}/courses/${selected}/dropoff`).then(r=>r.json()).then(setDrop).catch(()=>{})
    fetch(`${API}/courses/${selected}/reviews`).then(r=>r.json()).then(setReviews).catch(()=>{})
  }, [selected, period])

  const completion = 82
  const watch = 37
  const assignments = 68

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {tabs.map(t => (
          <button key={t} onClick={() => setPeriod(t)} className={`px-3 py-1.5 rounded-lg border text-sm ${period===t?'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900':'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>{t}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500">Enrollments</div>
            <select value={selected||''} onChange={(e)=>setSelected(e.target.value)} className="px-2 py-1 rounded border bg-transparent">
              {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
          </div>
          <LineChart data={enrollSeries} color="#64748b" />
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <div className="text-sm text-slate-500">Completion Rate</div>
          <div className="mt-2 text-3xl font-semibold">{completion}%</div>
          <div className="mt-4 text-sm text-slate-500">Average Watch Time</div>
          <div className="text-xl">{watch}m</div>
          <div className="mt-4 text-sm text-slate-500">Assignment Submission</div>
          <div className="text-xl">{assignments}%</div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <div className="text-sm text-slate-500 mb-2">Drop-off Heatmap</div>
        <DropOffHeatmap points={drop.points} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <div className="text-sm text-slate-500">Engagement Graphs</div>
          <BarChart data={enrollSeries} color="#22c55e" />
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <div className="text-lg font-semibold">Ratings & Reviews</div>
          <div className="mt-1 text-slate-500">Average Rating: {reviews.rating} ({reviews.count})</div>
          <div className="mt-3 space-y-3 max-h-64 overflow-auto pr-2">
            {reviews.reviews?.map((r,i)=> (
              <div key={i} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                <div className="text-sm font-medium">{r.learnerId}</div>
                <div className="text-xs text-slate-500">{r.createdAt}</div>
                <div className="mt-1">{r.reviewText}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <div className="text-lg font-semibold">Course List</div>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500">
                <th className="py-2">Title</th>
                <th>Category</th>
                <th>Enrollments</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(c => (
                <tr key={c.id} className="border-t border-slate-100 dark:border-slate-800">
                  <td className="py-2">{c.title}</td>
                  <td>{c.category}</td>
                  <td>{Math.round(Math.random()*500)+100}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
