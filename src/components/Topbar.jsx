import { Menu, Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Topbar({ onMenu }) {
  const [dark, setDark] = useState(() => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <header className="h-16 w-full flex items-center justify-between px-4 md:px-6 border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/60 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-slate-900/40 sticky top-0 z-20">
      <button className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" onClick={onMenu}>
        <Menu className="h-5 w-5" />
      </button>
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        <button
          aria-label="Toggle theme"
          onClick={() => setDark((d) => !d)}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <img className="h-8 w-8 rounded-full ring-2 ring-slate-200 dark:ring-slate-700" src={`https://api.dicebear.com/9.x/identicon/svg?seed=creator`} />
      </div>
    </header>
  )
}
