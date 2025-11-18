import { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Portfolio() {
  const [name, setName] = useState('Avery Lee')
  const [bio, setBio] = useState('Educator crafting practical, project-based learning experiences.')
  const [skills, setSkills] = useState('Python, Data Viz, Curriculum Design, Video Editing')
  const [highlights, setHighlights] = useState('10k+ learners taught; Top-rated course; 95% positive reviews')
  const [doc, setDoc] = useState(null)
  const [resume, setResume] = useState(null)

  const generatePortfolio = async () => {
    const res = await fetch(`${API}/portfolio/generate`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, bio, skills: skills.split(',').map(s=>s.trim()), highlights: highlights.split(';').map(s=>s.trim()) }) })
    setDoc(await res.json())
  }

  const generateResume = async () => {
    const res = await fetch(`${API}/resume/generate`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email: 'creator@example.com', summary: bio, skills: skills.split(',').map(s=>s.trim()) }) })
    setResume(await res.json())
  }

  const exportPDF = () => {
    window.print()
  }

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-slate-500">Name</label>
          <input value={name} onChange={(e)=>setName(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-lg border bg-white dark:bg-slate-900" />
        </div>
        <div>
          <label className="block text-sm text-slate-500">Bio</label>
          <textarea value={bio} onChange={(e)=>setBio(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-lg border bg-white dark:bg-slate-900" rows={4} />
        </div>
        <div>
          <label className="block text-sm text-slate-500">Skills (comma separated)</label>
          <input value={skills} onChange={(e)=>setSkills(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-lg border bg-white dark:bg-slate-900" />
        </div>
        <div>
          <label className="block text-sm text-slate-500">Highlights (semicolon separated)</label>
          <input value={highlights} onChange={(e)=>setHighlights(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-lg border bg-white dark:bg-slate-900" />
        </div>
        <div className="flex gap-3">
          <button onClick={generatePortfolio} className="px-4 py-2 rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">Generate Portfolio</button>
          <button onClick={generateResume} className="px-4 py-2 rounded-lg border">Generate Teaching Resume</button>
          <button onClick={exportPDF} className="px-4 py-2 rounded-lg border">Export to PDF</button>
        </div>
      </div>

      <div className="space-y-6 print:block">
        {doc && (
          <div className="rounded-2xl border p-6 bg-white dark:bg-slate-900">
            <div className="text-2xl font-semibold">{doc.title}</div>
            <div className="mt-1 text-slate-500">{doc.bio}</div>
            <div className="mt-4">
              <div className="text-sm font-medium">Skills</div>
              <div className="mt-1 flex flex-wrap gap-2">
                {doc.skills?.map((s,i)=>(<span key={i} className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-xs">{s}</span>))}
              </div>
            </div>
            <div className="mt-4">
              <div className="text-sm font-medium">Highlights</div>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 mt-1">
                {doc.highlights?.map((h,i)=>(<li key={i}>{h}</li>))}
              </ul>
            </div>
          </div>
        )}
        {resume && (
          <div className="rounded-2xl border p-6 bg-white dark:bg-slate-900">
            <div className="text-2xl font-semibold">{resume.name}</div>
            <div className="text-sm text-slate-500">{resume.email}</div>
            <div className="mt-3">{resume.summary}</div>
            <div className="mt-4">
              <div className="text-sm font-medium">Experience</div>
              <ul className="list-disc list-inside">
                {resume.experience?.map((e,i)=>(<li key={i}><span className="font-medium">{e.role}</span> — {e.company} ({e.period})</li>))}
              </ul>
            </div>
            <div className="mt-4">
              <div className="text-sm font-medium">Education</div>
              <ul className="list-disc list-inside">
                {resume.education?.map((e,i)=>(<li key={i}>{e.degree} — {e.institution}</li>))}
              </ul>
            </div>
            <div className="mt-4">
              <div className="text-sm font-medium">Skills</div>
              <div className="mt-1 flex flex-wrap gap-2">
                {resume.skills?.map((s,i)=>(<span key={i} className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-xs">{s}</span>))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
