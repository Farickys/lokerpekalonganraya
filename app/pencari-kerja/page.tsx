'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Briefcase, Bookmark, FileText, Bell, User, MapPin, Clock, LogOut, Menu, X, Settings } from 'lucide-react'
import { formatSalary, timeAgo } from '@/lib/utils'
import { AREAS, JOB_TYPES } from '@/lib/constants'

const sidebarLinks = [
  { href: '/pencari-kerja', icon: <User size={16} />, label: 'Dashboard' },
  { href: '/pencari-kerja/profil', icon: <Settings size={16} />, label: 'Profil Saya' },
  { href: '/pencari-kerja/lamaran', icon: <FileText size={16} />, label: 'Lamaran Saya' },
  { href: '/dashboard/saved-jobs', icon: <Bookmark size={16} />, label: 'Loker Tersimpan' },
  { href: '/pencari-kerja/alerts', icon: <Bell size={16} />, label: 'Alert Lowongan' },
]

interface Stats {
  totalApplications: number
  totalSaved: number
  totalAlerts: number
}

export default function PencariKerjaDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stats] = useState<Stats>({ totalApplications: 0, totalSaved: 0, totalAlerts: 0 })
  const [recentApps, setRecentApps] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/user/applications?limit=5')
      .then(r => r.json())
      .then(data => setRecentApps(data.applications || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const statusConfig: Record<string, { label: string; bg: string; color: string }> = {
    SUBMITTED: { label: 'Terkirim', bg: '#DBEAFE', color: '#1E40AF' },
    REVIEWED: { label: 'Ditinjau', bg: '#FEF3C7', color: '#92400E' },
    ACCEPTED: { label: 'Diterima', bg: '#D1FAE5', color: '#065F46' },
    REJECTED: { label: 'Ditolak', bg: '#FEE2E2', color: '#991B1B' },
  }

  const navLink = (m: typeof sidebarLinks[0], onClick?: () => void) => {
    const active = m.href === '/pencari-kerja'
    return (
      <Link key={m.href} href={m.href} onClick={onClick}
        style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 12,
          fontSize: 14, fontWeight: 500, textDecoration: 'none',
          color: active ? 'var(--primary)' : '#4B5563',
          background: active ? '#EFF6FF' : 'transparent',
        }}>
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
                <div style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--primary)' }}>
                  <Briefcase size={16} color="white" />
                </div>
                <span style={{ fontWeight: 700, fontSize: 14 }}>
                  <span style={{ color: 'var(--primary)' }}>Loker</span>
                  <span style={{ color: 'var(--accent)' }}>PekalonganRaya</span>
                </span>
              </Link>
              <button onClick={() => setSidebarOpen(false)} style={{ padding: 4, color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <nav style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {sidebarLinks.map(m => navLink(m, () => setSidebarOpen(false)))}
            </nav>
            <div style={{ padding: 16, borderTop: '1px solid #F3F4F6' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 12, fontSize: 14, fontWeight: 500, color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer', width: '100%' }}>
                <LogOut size={16} /> Keluar
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="dash-sidebar" style={{ display: 'none', flexDirection: 'column', width: 256, background: 'white', borderRight: '1px solid #F3F4F6', minHeight: '100vh', position: 'fixed', top: 0, left: 0, bottom: 0 }}>
        <div style={{ padding: 20, borderBottom: '1px solid #F3F4F6' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--primary)' }}>
              <Briefcase size={16} color="white" />
            </div>
            <span style={{ fontWeight: 700, fontSize: 14 }}>
              <span style={{ color: 'var(--primary)' }}>Loker</span>
              <span style={{ color: 'var(--accent)' }}>PekalonganRaya</span>
            </span>
          </Link>
        </div>
        <nav style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {sidebarLinks.map(m => navLink(m))}
        </nav>
        <div style={{ padding: 16, borderTop: '1px solid #F3F4F6' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 12, fontSize: 14, fontWeight: 500, color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer', width: '100%' }}>
            <LogOut size={16} /> Keluar
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="dash-main" style={{ flex: 1, minWidth: 0, marginLeft: 0 }}>
        <div style={{ background: 'white', borderBottom: '1px solid #F3F4F6', padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button className="dash-mobile-btn" onClick={() => setSidebarOpen(true)} style={{ padding: 8, borderRadius: 12, border: '1px solid #F3F4F6', color: '#6B7280', background: 'white', cursor: 'pointer' }}>
              <Menu size={18} />
            </button>
            <div>
              <h1 style={{ fontWeight: 700, fontSize: 18, color: '#111827', margin: 0 }}>Dashboard Pencari Kerja</h1>
              <p style={{ fontSize: 12, color: '#6B7280', margin: 0 }}>Selamat datang kembali!</p>
            </div>
          </div>
          <Link href="/loker" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 12, fontSize: 14, fontWeight: 600, color: 'white', background: 'var(--primary)', textDecoration: 'none' }}>
            <Briefcase size={16} /> Cari Loker
          </Link>
        </div>

        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { label: 'Lamaran Terkirim', value: recentApps.length, icon: <FileText size={20} />, color: '#EFF6FF', iconColor: 'var(--primary)' },
              { label: 'Loker Tersimpan', value: stats.totalSaved, icon: <Bookmark size={20} />, color: '#FEF3C7', iconColor: '#D97706' },
              { label: 'Alert Aktif', value: stats.totalAlerts, icon: <Bell size={20} />, color: '#F3E8FF', iconColor: '#7C3AED' },
            ].map(s => (
              <div key={s.label} style={{ background: 'white', borderRadius: 16, border: '1px solid #F3F4F6', padding: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: s.color, marginBottom: 10 }}>
                  <span style={{ color: s.iconColor }}>{s.icon}</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: 22, color: '#111827' }}>{s.value}</div>
                <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Link href="/pencari-kerja/profil" style={{ background: 'white', borderRadius: 16, border: '1px solid #F3F4F6', padding: 20, textDecoration: 'none', textAlign: 'center' }}>
              <User size={24} style={{ color: 'var(--primary)', margin: '0 auto 8px' }} />
              <div style={{ fontWeight: 600, fontSize: 14, color: '#1F2937' }}>Lengkapi Profil</div>
              <div style={{ fontSize: 12, color: '#9CA3AF' }}>Isi data diri & upload CV</div>
            </Link>
            <Link href="/pencari-kerja/alerts" style={{ background: 'white', borderRadius: 16, border: '1px solid #F3F4F6', padding: 20, textDecoration: 'none', textAlign: 'center' }}>
              <Bell size={24} style={{ color: '#7C3AED', margin: '0 auto 8px' }} />
              <div style={{ fontWeight: 600, fontSize: 14, color: '#1F2937' }}>Buat Alert</div>
              <div style={{ fontSize: 12, color: '#9CA3AF' }}>Notifikasi loker baru</div>
            </Link>
          </div>

          {/* Recent Applications */}
          <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F3F4F6' }}>
            <div style={{ padding: 16, borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontWeight: 700, fontSize: 15, color: '#111827', margin: 0 }}>Lamaran Terbaru</h2>
              <Link href="/pencari-kerja/lamaran" style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary)', textDecoration: 'none' }}>Lihat semua →</Link>
            </div>
            {loading ? (
              <div style={{ padding: 32, textAlign: 'center', color: '#9CA3AF' }}>Memuat...</div>
            ) : recentApps.length === 0 ? (
              <div style={{ padding: 32, textAlign: 'center' }}>
                <FileText size={36} style={{ color: '#D1D5DB', margin: '0 auto 8px' }} />
                <p style={{ fontSize: 14, color: '#6B7280', fontWeight: 500 }}>Belum ada lamaran</p>
                <Link href="/loker" style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Cari lowongan sekarang →</Link>
              </div>
            ) : (
              <div>
                {recentApps.map(app => {
                  const st = statusConfig[app.status] || statusConfig.SUBMITTED
                  return (
                    <div key={app.id} style={{ padding: 16, borderBottom: '1px solid #F9FAFB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                      <div style={{ minWidth: 0 }}>
                        <Link href={`/loker/${app.job.slug}`} style={{ fontWeight: 600, fontSize: 14, color: '#1F2937', textDecoration: 'none' }}>{app.job.title}</Link>
                        <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>{app.job.company?.name || 'Anonim'}</div>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 10px', borderRadius: 20, background: st.bg, color: st.color, flexShrink: 0 }}>{st.label}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
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
