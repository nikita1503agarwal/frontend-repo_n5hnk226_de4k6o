import { motion } from 'framer-motion'

export default function AIInsightCard({ title, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-5 text-slate-100 shadow-lg"
    >
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-fuchsia-500/30 via-sky-500/30 to-amber-400/30 blur-xl pointer-events-none" />
      <div className="relative">
        <div className="text-sm uppercase tracking-wider text-slate-400">{title}</div>
        <div className="mt-2 text-lg leading-relaxed whitespace-pre-line">{text}</div>
      </div>
    </motion.div>
  )
}
