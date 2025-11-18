import { useEffect, useState } from 'react'
import { useMemo } from 'react'
import { BarChart as BarIcon, LineChart as LineIcon, Smartphone } from 'lucide-react'
import DashboardSummaryCard from '../components/DashboardSummaryCard'
import { LineChart, BarChart, PieChart } from '../components/Charts'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Dashboard() {
  const [summary, setSummary] = useState({ totalCourses: 0, totalEnrollments: 0, activeLearners: 0 })
  const [trend, setTrend] = useState([])

  useEffect(() => {
    fetch(`${API}/dashboard/summary`).then(r => r.json()).then(setSummary).catch(() => {})
    fetch(`${API}/dashboard/activity`).then(r => r.json()).then(setTrend).catch(() => {})
  }, [])

  const lineData = useMemo(() => trend.map((d) => ({ label: d.date, value: d.enrollments })), [trend])
  const barData = useMemo(() => [
    { label: 'Python', value: 320 },
    { label: 'Data Viz', value: 220 },
    { label: 'AI Teaching', value: 180 },
    { label: 'Web Dev', value: 140 },
  ], [])
  const pieData = useMemo(() => [
    { label: 'Desktop', value: 45 },
    { label: 'Mobile', value: 42 },
    { label: 'Tablet', value: 13 },
  ], [])

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <DashboardSummaryCard title="Total Courses Published" metric={summary.totalCourses} icon={BarIcon} />
        <DashboardSummaryCard title="Total Enrollments" metric={summary.totalEnrollments} icon={LineIcon} accent="from-emerald-500 to-teal-500" />
        <DashboardSummaryCard title="Total Active Learners" metric={summary.activeLearners} icon={Smartphone} accent="from-fuchsia-500 to-pink-500" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <div className="xl:col-span-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <div className="text-sm text-slate-500">Enrollment Trends</div>
          <LineChart data={lineData} color="#6366f1" />
        </div>
        <div className="xl:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <div className="text-sm text-slate-500">Learners per Course</div>
          <BarChart data={barData} color="#10b981" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <div className="text-sm text-slate-500">User Device Distribution</div>
          <PieChart data={pieData} color="#f43f5e" />
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <div className="text-2xl font-semibold">Welcome back 👋</div>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Here’s a quick look at your courses’ performance. Use the sidebar to dive deeper into analytics, AI insights, and more.</p>
        </div>
      </div>
    </div>
  )
}
