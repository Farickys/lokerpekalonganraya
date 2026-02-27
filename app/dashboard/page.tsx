'use client'
import Link from 'next/link'
import { Briefcase, Plus, Eye, TrendingUp, Users, CheckCircle, Clock, Edit, Trash2, Star, Building2, LogOut, Settings, Bell, Menu, X } from 'lucide-react'
import { useState } from 'react'

const mockStats = { total: 8, active: 5, pending: 2, closed: 1, totalViews: 1245, totalApply: 87 }

const mockJobs = [
  { id:1, title:'Operator Produksi Batik', status:'ACTIVE', featured:true, views:234, apply:18, createdAt:'15 Jan 2025', expiredAt:'15 Feb 2025' },
  { id:2, title:'Staff Admin & Keuangan', status:'ACTIVE', featured:false, views:189, apply:24, createdAt:'12 Jan 2025', expiredAt:'12 Feb 2025' },
  { id:3, title:'Desainer Batik', status:'PENDING', featured:false, views:0, apply:0, createdAt:'16 Jan 2025', expiredAt:'16 Feb 2025' },
  { id:4, title:'Sopir Pengiriman', status:'CLOSED', featured:false, views:312, apply:45, createdAt:'01 Jan 2025', expiredAt:'01 Feb 2025' },
]

const statusBadge = (status: string) => {
  const map: Record<string, {label:string, bg:string, color:string}> = {
    ACTIVE: { label:'Aktif', bg:'#D1FAE5', color:'#065F46' },
    PENDING: { label:'Menunggu Review', bg:'#FEF3C7', color:'#92400E' },
    CLOSED: { label:'Ditutup', bg:'#F3F4F6', color:'#6B7280' },
    REJECTED: { label:'Ditolak', bg:'#FEE2E2', color:'#991B1B' },
  }
  const s = map[status] || map['PENDING']
  return <span className="badge text-xs" style={{background:s.bg, color:s.color}}>{s.label}</span>
}

const sidebarLinks = [
  { href:'/dashboard', icon:<TrendingUp size={16}/>, label:'Overview' },
  { href:'/dashboard/loker', icon:<Briefcase size={16}/>, label:'Kelola Loker' },
  { href:'/dashboard/pasang-loker', icon:<Plus size={16}/>, label:'Pasang Loker' },
  { href:'/dashboard/pelamar', icon:<Users size={16}/>, label:'Data Pelamar' },
  { href:'/dashboard/profil', icon:<Building2 size={16}/>, label:'Profil Perusahaan' },
  { href:'/dashboard/settings', icon:<Settings size={16}/>, label:'Pengaturan' },
]

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex" style={{background:'var(--bg)'}}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)}/>
          <aside className="relative z-50 flex flex-col w-64 bg-white min-h-screen">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:'var(--primary)'}}>
                  <Briefcase size={16} color="white"/>
                </div>
                <span className="font-bold text-sm">
                  <span style={{color:'var(--primary)'}}>Loker</span>
                  <span style={{color:'var(--accent)'}}>PekalonganRaya</span>
                </span>
              </Link>
              <button onClick={() => setSidebarOpen(false)} className="p-1 text-gray-400"><X size={18}/></button>
            </div>
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-lg" style={{background:'var(--primary)'}}>B</div>
                <div>
                  <div className="font-semibold text-sm text-gray-800">PT Batik Mahkota</div>
                  <div className="text-xs text-green-600 flex items-center gap-1"><CheckCircle size={10}/> Terverifikasi</div>
                </div>
              </div>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              {sidebarLinks.map(m => (
                <Link key={m.href} href={m.href} onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors group">
                  <span className="text-gray-400 group-hover:text-blue-600">{m.icon}</span>
                  {m.label}
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-gray-100">
              <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors w-full">
                <LogOut size={16}/> Keluar
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-100 min-h-screen fixed top-0 left-0 bottom-0">
        <div className="p-5 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:'var(--primary)'}}>
              <Briefcase size={16} color="white"/>
            </div>
            <span className="font-bold text-sm">
              <span style={{color:'var(--primary)'}}>Loker</span>
              <span style={{color:'var(--accent)'}}>PekalonganRaya</span>
            </span>
          </Link>
        </div>
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-lg" style={{background:'var(--primary)'}}>B</div>
            <div>
              <div className="font-semibold text-sm text-gray-800">PT Batik Mahkota</div>
              <div className="text-xs text-green-600 flex items-center gap-1"><CheckCircle size={10}/> Terverifikasi</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map(m => (
            <Link key={m.href} href={m.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors group">
              <span className="text-gray-400 group-hover:text-blue-600">{m.icon}</span>
              {m.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors w-full">
            <LogOut size={16}/> Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 min-w-0">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button className="lg:hidden p-2 rounded-xl border border-gray-100 text-gray-500 hover:bg-gray-50 flex-shrink-0" onClick={() => setSidebarOpen(true)}>
              <Menu size={18}/>
            </button>
            <div className="min-w-0">
              <h1 className="font-bold text-lg text-gray-900">Dashboard</h1>
              <p className="text-xs text-gray-500 truncate">Selamat datang, PT Batik Mahkota</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button className="relative p-2 rounded-xl border border-gray-100 text-gray-500 hover:bg-gray-50">
              <Bell size={18}/>
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center" style={{background:'var(--accent)', color:'#0F172A'}}>2</span>
            </button>
            <Link href="/dashboard/pasang-loker" className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{background:'var(--primary)'}}>
              <Plus size={16}/> Pasang Loker
            </Link>
            <Link href="/dashboard/pasang-loker" className="sm:hidden p-2 rounded-xl text-white" style={{background:'var(--primary)'}}>
              <Plus size={18}/>
            </Link>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { label:'Total Loker', value: mockStats.total, icon:<Briefcase size={20}/>, color:'#EFF6FF', iconColor:'var(--primary)' },
              { label:'Loker Aktif', value: mockStats.active, icon:<CheckCircle size={20}/>, color:'#D1FAE5', iconColor:'var(--success)' },
              { label:'Total Dilihat', value: mockStats.totalViews, icon:<Eye size={20}/>, color:'#F3E8FF', iconColor:'#7C3AED' },
              { label:'Total Pelamar', value: mockStats.totalApply, icon:<Users size={20}/>, color:'#FEF3C7', iconColor:'#D97706' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center" style={{background:s.color}}>
                    <span style={{color:s.iconColor}}>{s.icon}</span>
                  </div>
                </div>
                <div className="font-bold text-xl sm:text-2xl text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Pending Alert */}
          {mockStats.pending > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
              <Clock size={18} className="text-amber-600 flex-shrink-0"/>
              <div className="flex-1 text-sm">
                <span className="font-semibold text-amber-800">{mockStats.pending} loker</span>
                <span className="text-amber-700"> sedang menunggu review admin.</span>
              </div>
            </div>
          )}

          {/* Job List */}
          <div className="bg-white rounded-2xl border border-gray-100">
            <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-gray-900">Lowongan Saya</h2>
              <Link href="/dashboard/loker" className="text-sm font-medium hover:underline" style={{color:'var(--primary)'}}>
                Lihat semua →
              </Link>
            </div>

            {/* Mobile Card View */}
            <div className="sm:hidden divide-y divide-gray-50">
              {mockJobs.map(job => (
                <div key={job.id} className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-medium text-sm text-gray-800 flex items-center gap-1.5 min-w-0">
                      {job.featured && <Star size={12} className="text-yellow-500 fill-yellow-500 flex-shrink-0"/>}
                      <span className="truncate">{job.title}</span>
                    </div>
                    {statusBadge(job.status)}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Eye size={11}/> {job.views}</span>
                    <span className="flex items-center gap-1"><Users size={11}/> {job.apply}</span>
                    <span>Berakhir: {job.expiredAt}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"><Edit size={14}/></button>
                    <button className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={14}/></button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-gray-400 font-medium border-b border-gray-50">
                    <th className="px-5 py-3">Posisi</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Dilihat</th>
                    <th className="px-5 py-3">Pelamar</th>
                    <th className="px-5 py-3">Berakhir</th>
                    <th className="px-5 py-3">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {mockJobs.map(job => (
                    <tr key={job.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-medium text-sm text-gray-800 flex items-center gap-2">
                          {job.featured && <Star size={12} className="text-yellow-500 fill-yellow-500"/>}
                          {job.title}
                        </div>
                      </td>
                      <td className="px-5 py-4">{statusBadge(job.status)}</td>
                      <td className="px-5 py-4 text-sm text-gray-600">{job.views}</td>
                      <td className="px-5 py-4 text-sm text-gray-600">{job.apply}</td>
                      <td className="px-5 py-4 text-xs text-gray-500">{job.expiredAt}</td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"><Edit size={14}/></button>
                          <button className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={14}/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Featured Upgrade CTA */}
          <div className="rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-5" style={{background:'linear-gradient(135deg, var(--primary), #1a6ab5)'}}>
            <div className="flex-1 text-white text-center sm:text-left">
              <div className="flex items-center gap-2 mb-2 justify-center sm:justify-start">
                <Star size={18} className="fill-yellow-400 text-yellow-400"/>
                <span className="font-bold">Upgrade ke Featured Listing!</span>
              </div>
              <p className="text-sm text-blue-100">Loker Anda tampil di posisi teratas & otomatis dipost ke Instagram LokerPekalonganRaya. Jangkau lebih banyak pelamar!</p>
            </div>
            <Link href="/dashboard/upgrade" className="flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm whitespace-nowrap" style={{background:'var(--accent)', color:'#0F172A'}}>
              <ZapIcon size={16}/> Upgrade Sekarang
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

function ZapIcon({ size, className }: { size: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  )
}
