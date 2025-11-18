import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Dashboard from './pages/Dashboard'
import CourseAnalytics from './pages/CourseAnalytics'
import AIInsights from './pages/AIInsights'
import Portfolio from './pages/Portfolio'
import Achievements from './pages/Achievements'
import Settings from './pages/Settings'

function MobileDrawer({ open, onClose }){
  return (
    <div className={`fixed inset-0 z-30 md:hidden ${open?'':'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/40 transition-opacity ${open?'opacity-100':'opacity-0'}`} onClick={onClose} />
      <div className={`absolute left-0 top-0 h-full w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform ${open?'translate-x-0':'-translate-x-full'}`}>
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 text-lg font-semibold">Creator Insight</div>
        <nav className="p-2 space-y-1">
          {[
            { to: '/', label: 'Dashboard' },
            { to: '/analytics', label: 'Course Analytics' },
            { to: '/ai', label: 'AI Insights' },
            { to: '/portfolio', label: 'Portfolio Generator' },
            { to: '/achievements', label: 'Achievements' },
            { to: '/settings', label: 'Settings' },
          ].map(i => (
            <Link key={i.to} to={i.to} onClick={onClose} className="block px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">{i.label}</Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

function App() {
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-h-screen">
          <Topbar onMenu={() => setOpen(true)} />
          <main>
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="/analytics" element={<CourseAnalytics />} />
              <Route path="/ai" element={<AIInsights />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
      <MobileDrawer open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

export default App
