'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Briefcase, CheckCircle, XCircle, Clock, Eye, Building2, Instagram, Facebook, TrendingUp, AlertTriangle, RefreshCw, Menu, X } from 'lucide-react'

const pendingJobs = [
  { id:3, title:'Desainer Batik', company:'PT Batik Mahkota', area:'KOTA_PEKALONGAN', category:'Tekstil & Batik', source:'COMPANY', createdAt:'16 Jan 2025 09:15' },
  { id:9, title:'Driver Ojek Online', company:null, area:'PEMALANG', category:'Transportasi', source:'SCRAPED_IG', createdAt:'16 Jan 2025 08:30', sourceImage:'https://picsum.photos/200/300' },
  { id:10, title:'Staff Gudang', company:null, area:'BATANG', category:'Manufaktur & Produksi', source:'SCRAPED_FB', createdAt:'16 Jan 2025 07:45' },
]

const stats = [
  { label:'Pending Review', value:3, icon:<Clock size={18}/>, color:'#FEF3C7', iconColor:'#D97706' },
  { label:'Loker Aktif', value:127, icon:<CheckCircle size={18}/>, color:'#D1FAE5', iconColor:'#059669' },
  { label:'Total Perusahaan', value:34, icon:<Building2 size={18}/>, color:'#EFF6FF', iconColor:'var(--primary)' },
  { label:'Loker hari ini', value:12, icon:<TrendingUp size={18}/>, color:'#F3E8FF', iconColor:'#7C3AED' },
]

const sourceLabel = (s: string) => {
  if (s === 'SCRAPED_IG') return <span className="badge text-xs" style={{background:'#FCE7F3', color:'#9D174D'}}><Instagram size={10} className="inline mr-1"/>Instagram</span>
  if (s === 'SCRAPED_FB') return <span className="badge text-xs" style={{background:'#EFF6FF', color:'#1D4ED8'}}><Facebook size={10} className="inline mr-1"/>Facebook</span>
  return <span className="badge text-xs" style={{background:'#D1FAE5', color:'#065F46'}}>Manual/Perusahaan</span>
}

const sidebarLinks = [
  { label:'Dashboard', icon:<TrendingUp size={16}/>, href:'/admin' },
  { label:'Moderasi Loker', icon:<Clock size={16}/>, href:'/admin', badge:3 },
  { label:'Semua Loker', icon:<Briefcase size={16}/>, href:'/admin/loker' },
  { label:'Perusahaan', icon:<Building2 size={16}/>, href:'/admin/perusahaan' },
  { label:'n8n Webhook Log', icon:<RefreshCw size={16}/>, href:'/admin/webhook' },
  { label:'Scraping Apify', icon:<Instagram size={16}/>, href:'/admin/scraping' },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'pending'|'all'|'companies'>('pending')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex" style={{background:'var(--bg)'}}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)}/>
          <aside className="relative z-50 flex flex-col w-64 bg-gray-900 min-h-screen">
            <div className="p-5 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:'var(--accent)'}}>
                  <Briefcase size={16} color="#0F172A"/>
                </div>
                <div>
                  <div className="font-bold text-white text-sm">LokerPekalonganRaya</div>
                  <div className="text-xs text-gray-400">Admin Panel</div>
                </div>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="p-1 text-gray-400"><X size={18}/></button>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              {sidebarLinks.map(m => (
                <Link key={m.label} href={m.href} onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
                  {m.icon}
                  <span className="flex-1">{m.label}</span>
                  {m.badge && <span className="w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold" style={{background:'var(--accent)', color:'#0F172A'}}>{m.badge}</span>}
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-gray-700">
              <Link href="/" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">← Lihat Website</Link>
            </div>
          </aside>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-gray-900 min-h-screen fixed top-0 left-0 bottom-0">
        <div className="p-5 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:'var(--accent)'}}>
              <Briefcase size={16} color="#0F172A"/>
            </div>
            <div>
              <div className="font-bold text-white text-sm">LokerPekalonganRaya</div>
              <div className="text-xs text-gray-400">Admin Panel</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map(m => (
            <Link key={m.label} href={m.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
              {m.icon}
              <span className="flex-1">{m.label}</span>
              {m.badge && <span className="w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold" style={{background:'var(--accent)', color:'#0F172A'}}>{m.badge}</span>}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <Link href="/" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">← Lihat Website</Link>
        </div>
      </aside>

      <main className="flex-1 lg:ml-64 min-w-0">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 rounded-xl border border-gray-100 text-gray-500 hover:bg-gray-50" onClick={() => setSidebarOpen(true)}>
              <Menu size={18}/>
            </button>
            <h1 className="font-bold text-lg text-gray-900">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              <RefreshCw size={14}/> <span className="hidden sm:inline">Refresh Scraping</span>
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {stats.map(s => (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-3" style={{background:s.color}}>
                  <span style={{color:s.iconColor}}>{s.icon}</span>
                </div>
                <div className="font-bold text-xl sm:text-2xl text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Pending Alert */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
            <AlertTriangle size={18} className="text-amber-600 flex-shrink-0"/>
            <div className="flex-1 text-sm text-amber-800">
              Ada <strong>3 loker</strong> menunggu review — termasuk 2 hasil scraping otomatis dari IG & FB.
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl border border-gray-100">
            <div className="flex border-b border-gray-100 px-2 sm:px-4 overflow-x-auto">
              {[
                { key:'pending', label:'Menunggu Review', count:3 },
                { key:'all', label:'Semua Loker' },
                { key:'companies', label:'Perusahaan' },
              ].map(t => (
                <button key={t.key} onClick={() => setActiveTab(t.key as any)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap
                    ${activeTab === t.key ? 'border-blue-700 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                  {t.label}
                  {t.count && <span className="w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold" style={{background:'var(--accent)', color:'#0F172A'}}>{t.count}</span>}
                </button>
              ))}
            </div>

            {/* Pending Jobs */}
            {activeTab === 'pending' && (
              <div className="divide-y divide-gray-50">
                {pendingJobs.map(job => (
                  <div key={job.id} className="p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                      {/* Preview image for scraped */}
                      {'sourceImage' in job && job.sourceImage ? (
                        <img src={job.sourceImage} alt="preview" className="w-14 h-14 rounded-xl object-cover border border-gray-100 flex-shrink-0"/>
                      ) : (
                        <div className="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-white text-xl" style={{background:'var(--primary)'}}>
                          {(job.company || job.title).charAt(0)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray-500 mt-0.5">{job.company || 'Sumber Eksternal'} • {job.area.replace('_',' ')} • {job.category}</p>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          {sourceLabel(job.source)}
                          <span className="text-xs text-gray-400">{job.createdAt}</span>
                        </div>
                      </div>
                      {/* Actions */}
                      <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-initial flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">
                          <Eye size={14}/> <span className="hidden sm:inline">Preview</span>
                        </button>
                        <button className="flex-1 sm:flex-initial flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90" style={{background:'var(--success)'}}>
                          <CheckCircle size={14}/> <span className="hidden sm:inline">Setujui</span>
                        </button>
                        <button className="flex-1 sm:flex-initial flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90" style={{background:'var(--danger)'}}>
                          <XCircle size={14}/> <span className="hidden sm:inline">Tolak</span>
                        </button>
                      </div>
                    </div>

                    {/* Edit before approve */}
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-500 font-medium block mb-1">Judul (edit jika perlu)</label>
                        <input type="text" defaultValue={job.title}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-400 transition-all"/>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 font-medium block mb-1">Kategori</label>
                        <input type="text" defaultValue={job.category}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-400 transition-all"/>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'all' && (
              <div className="p-6 text-center text-gray-400">
                <Briefcase size={32} className="mx-auto mb-2 opacity-40"/>
                <p className="text-sm">Tampilkan semua loker aktif, tutup, dan ditolak</p>
              </div>
            )}

            {activeTab === 'companies' && (
              <div className="p-6 text-center text-gray-400">
                <Building2 size={32} className="mx-auto mb-2 opacity-40"/>
                <p className="text-sm">Kelola verifikasi dan status perusahaan</p>
              </div>
            )}
          </div>

          {/* n8n Webhook Status */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <RefreshCw size={18} style={{color:'var(--primary)'}}/>
              Status Integrasi n8n & Apify
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {[
                { label:'n8n Webhook', status:'AKTIF', desc:'Endpoint menerima data dari n8n workflow', color:'#D1FAE5', textColor:'#065F46' },
                { label:'Apify Scraper IG', status:'AKTIF', desc:'Scraping #lokerpekalongan setiap 12 jam', color:'#D1FAE5', textColor:'#065F46' },
                { label:'Auto-post Instagram', status:'AKTIF', desc:'Loker approved → auto post ke IG via n8n', color:'#D1FAE5', textColor:'#065F46' },
              ].map(s => (
                <div key={s.label} className="p-4 rounded-xl border border-gray-50" style={{background:'var(--bg)'}}>
                  <div className="flex items-center justify-between mb-2 gap-2">
                    <span className="font-semibold text-sm text-gray-800">{s.label}</span>
                    <span className="badge text-xs flex-shrink-0" style={{background:s.color, color:s.textColor}}>{s.status}</span>
                  </div>
                  <p className="text-xs text-gray-500">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
