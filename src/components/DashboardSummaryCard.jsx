export default function DashboardSummaryCard({ title, metric, icon: Icon, accent = 'from-indigo-500 to-blue-500' }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br ${accent}`} />
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-slate-500 dark:text-slate-400">{title}</div>
          <div className="text-3xl font-semibold mt-1">{metric}</div>
        </div>
        {Icon && <Icon className="h-8 w-8 text-slate-400" />}
      </div>
    </div>
  )
}
