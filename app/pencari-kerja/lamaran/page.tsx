'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Briefcase, Bookmark, FileText, Bell, User, LogOut, Menu, X, Settings, MapPin, Clock } from 'lucide-react'
import { AREAS, JOB_TYPES } from '@/lib/constants'
import { formatSalary, timeAgo } from '@/lib/utils'

const sidebarLinks = [
  { href: '/pencari-kerja', icon: <User size={16} />, label: 'Dashboard' },
  { href: '/pencari-kerja/profil', icon: <Settings size={16} />, label: 'Profil Saya' },
  { href: '/pencari-kerja/lamaran', icon: <FileText size={16} />, label: 'Lamaran Saya' },
  { href: '/dashboard/saved-jobs', icon: <Bookmark size={16} />, label: 'Loker Tersimpan' },
  { href: '/pencari-kerja/alerts', icon: <Bell size={16} />, label: 'Alert Lowongan' },
]

const statusConfig: Record<string, { label: string; bg: string; color: string }> = {
  SUBMITTED: { label: 'Terkirim', bg: '#DBEAFE', color: '#1E40AF' },
  REVIEWED: { label: 'Ditinjau', bg: '#FEF3C7', color: '#92400E' },
  ACCEPTED: { label: 'Diterima', bg: '#D1FAE5', color: '#065F46' },
  REJECTED: { label: 'Ditolak', bg: '#FEE2E2', color: '#991B1B' },
}

export default function LamaranPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [apps, setApps] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('ALL')

  useEffect(() => {
    const params = filterStatus !== 'ALL' ? `?status=${filterStatus}` : ''
    fetch(`/api/user/applications${params}`)
      .then(r => { if (r.status === 401) { window.location.href = '/login'; return null }; return r.json() })
      .then(data => { if (data) setApps(data.applications || []) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [filterStatus])

  const navLink = (m: typeof sidebarLinks[0], onClick?: () => void) => {
    const active = m.href === '/pencari-kerja/lamaran'
    return (
      <Link key={m.href} href={m.href} onClick={onClick}
        style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 12, fontSize: 14, fontWeight: 500, textDecoration: 'none', color: active ? 'var(--primary)' : '#4B5563', background: active ? '#EFF6FF' : 'transparent' }}>
        <span style={{ color: active ? 'var(--primary)' : '#9CA3AF' }}>{m.icon}</span>
        {m.label}
      </Link>
    )
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg)' }}>
      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setSidebarOpen(false)} />
          <aside style={{ position: 'relative', zIndex: 50, display: 'flex', flexDirection: 'column', width: 256, background: 'white', minHeight: '100vh' }}>
            <div style={{ padding: 20, borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--primary)' }}><Briefcase size={16} color="white" /></div>
                <span style={{ fontWeight: 700, fontSize: 14 }}><span style={{ color: 'var(--primary)' }}>Loker</span><span style={{ color: 'var(--accent)' }}>PekalonganRaya</span></span>
              </Link>
              <button onClick={() => setSidebarOpen(false)} style={{ padding: 4, color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <nav style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>{sidebarLinks.map(m => navLink(m, () => setSidebarOpen(false)))}</nav>
            <div style={{ padding: 16, borderTop: '1px solid #F3F4F6' }}><button style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 12, fontSize: 14, fontWeight: 500, color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer', width: '100%' }}><LogOut size={16} /> Keluar</button></div>
          </aside>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="dash-sidebar" style={{ display: 'none', flexDirection: 'column', width: 256, background: 'white', borderRight: '1px solid #F3F4F6', minHeight: '100vh', position: 'fixed', top: 0, left: 0, bottom: 0 }}>
        <div style={{ padding: 20, borderBottom: '1px solid #F3F4F6' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--primary)' }}><Briefcase size={16} color="white" /></div>
            <span style={{ fontWeight: 700, fontSize: 14 }}><span style={{ color: 'var(--primary)' }}>Loker</span><span style={{ color: 'var(--accent)' }}>PekalonganRaya</span></span>
          </Link>
        </div>
        <nav style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>{sidebarLinks.map(m => navLink(m))}</nav>
        <div style={{ padding: 16, borderTop: '1px solid #F3F4F6' }}><button style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 12, fontSize: 14, fontWeight: 500, color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer', width: '100%' }}><LogOut size={16} /> Keluar</button></div>
      </aside>

      {/* Main */}
      <main className="dash-main" style={{ flex: 1, minWidth: 0, marginLeft: 0 }}>
        <div style={{ background: 'white', borderBottom: '1px solid #F3F4F6', padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button className="dash-mobile-btn" onClick={() => setSidebarOpen(true)} style={{ padding: 8, borderRadius: 12, border: '1px solid #F3F4F6', color: '#6B7280', background: 'white', cursor: 'pointer' }}><Menu size={18} /></button>
            <h1 style={{ fontWeight: 700, fontSize: 18, color: '#111827', margin: 0 }}>Lamaran Saya</h1>
          </div>
        </div>

        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Filter */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['ALL', 'SUBMITTED', 'REVIEWED', 'ACCEPTED', 'REJECTED'].map(s => (
              <button key={s} onClick={() => { setFilterStatus(s); setLoading(true) }}
                style={{ padding: '8px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', background: filterStatus === s ? 'var(--primary)' : 'white', color: filterStatus === s ? 'white' : '#6B7280' }}>
                {s === 'ALL' ? 'Semua' : statusConfig[s]?.label || s}
              </button>
            ))}
          </div>

          {/* List */}
          {loading ? (
            <div style={{ padding: 48, textAlign: 'center', color: '#9CA3AF' }}>Memuat lamaran...</div>
          ) : apps.length === 0 ? (
            <div style={{ background: 'white', borderRadius: 16, padding: 48, textAlign: 'center' }}>
              <FileText size={40} style={{ color: '#D1D5DB', margin: '0 auto 12px' }} />
              <p style={{ fontWeight: 600, color: '#6B7280', marginBottom: 8 }}>Belum ada lamaran</p>
              <Link href="/loker" style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)', textDecoration: 'none' }}>Cari lowongan sekarang →</Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {apps.map(app => {
                const st = statusConfig[app.status] || statusConfig.SUBMITTED
                return (
                  <div key={app.id} style={{ background: 'white', borderRadius: 16, border: '1px solid #F3F4F6', padding: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <Link href={`/loker/${app.job.slug}`} style={{ fontWeight: 700, fontSize: 14, color: '#1F2937', textDecoration: 'none' }}>{app.job.title}</Link>
                        <div style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>{app.job.company?.name || 'Anonim'}</div>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 10px', borderRadius: 20, background: st.bg, color: st.color, flexShrink: 0 }}>{st.label}</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 12, color: '#6B7280' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={11} /> {AREAS[app.job.area as keyof typeof AREAS] || app.job.city}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Briefcase size={11} /> {JOB_TYPES[app.job.jobType as keyof typeof JOB_TYPES]}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={11} /> Dilamar {timeAgo(new Date(app.appliedAt))}</span>
                    </div>
                    <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600, color: 'var(--primary)' }}>
                      {formatSalary(app.job.salaryMin, app.job.salaryMax, app.job.salary)}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>

      <style>{`
        .dash-sidebar { display: none !important; }
        .dash-main { margin-left: 0 !important; }
        .dash-mobile-btn { display: flex; }
        @media (min-width: 1024px) {
          .dash-sidebar { display: flex !important; }
          .dash-main { margin-left: 256px !important; }
          .dash-mobile-btn { display: none !important; }
        }
      `}</style>
    </div>
  )
}
