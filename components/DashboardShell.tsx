'use client'
import Link from 'next/link'
import { useState, ReactNode } from 'react'
import { Briefcase, Plus, TrendingUp, Users, Building2, LogOut, Settings, Menu, X, CheckCircle, Bell, Bookmark } from 'lucide-react'

const sidebarLinks = [
  { href: '/dashboard', icon: <TrendingUp size={16} />, label: 'Overview' },
  { href: '/dashboard/loker', icon: <Briefcase size={16} />, label: 'Kelola Loker' },
  { href: '/dashboard/pasang-loker', icon: <Plus size={16} />, label: 'Pasang Loker' },
  { href: '/dashboard/saved-jobs', icon: <Bookmark size={16} />, label: 'Loker Tersimpan' },
  { href: '/dashboard/pelamar', icon: <Users size={16} />, label: 'Data Pelamar' },
  { href: '/dashboard/profil', icon: <Building2 size={16} />, label: 'Profil Perusahaan' },
  { href: '/dashboard/settings', icon: <Settings size={16} />, label: 'Pengaturan' },
]

interface DashboardShellProps {
  children: ReactNode
  title: string
  subtitle?: string
  activePath: string
  actions?: ReactNode
}

export default function DashboardShell({ children, title, subtitle, activePath, actions }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navLink = (m: typeof sidebarLinks[0], onClick?: () => void) => {
    const active = m.href === activePath
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
      {/* Mobile Sidebar Overlay */}
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
              <button onClick={() => setSidebarOpen(false)} style={{ padding: 4, color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>
            <div style={{ padding: 20, borderBottom: '1px solid #F3F4F6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white', fontSize: 18, background: 'var(--primary)' }}>B</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#1F2937' }}>PT Batik Mahkota</div>
                  <div style={{ fontSize: 12, color: '#10B981', display: 'flex', alignItems: 'center', gap: 4 }}><CheckCircle size={10} /> Terverifikasi</div>
                </div>
              </div>
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
        <div style={{ padding: 20, borderBottom: '1px solid #F3F4F6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white', fontSize: 18, background: 'var(--primary)' }}>B</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#1F2937' }}>PT Batik Mahkota</div>
              <div style={{ fontSize: 12, color: '#10B981', display: 'flex', alignItems: 'center', gap: 4 }}><CheckCircle size={10} /> Terverifikasi</div>
            </div>
          </div>
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

      {/* Main Content */}
      <main className="dash-main" style={{ flex: 1, minWidth: 0, marginLeft: 0 }}>
        {/* Top Bar */}
        <div style={{ background: 'white', borderBottom: '1px solid #F3F4F6', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
            <button className="dash-mobile-btn" onClick={() => setSidebarOpen(true)} style={{ padding: 8, borderRadius: 12, border: '1px solid #F3F4F6', color: '#6B7280', background: 'white', cursor: 'pointer', flexShrink: 0 }}>
              <Menu size={18} />
            </button>
            <div style={{ minWidth: 0 }}>
              <h1 style={{ fontWeight: 700, fontSize: 18, color: '#111827', margin: 0 }}>{title}</h1>
              {subtitle && <p style={{ fontSize: 12, color: '#6B7280', margin: 0 }}>{subtitle}</p>}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <button style={{ position: 'relative', padding: 8, borderRadius: 12, border: '1px solid #F3F4F6', color: '#6B7280', background: 'white', cursor: 'pointer' }}>
              <Bell size={18} />
            </button>
            {actions}
          </div>
        </div>

        <div style={{ padding: 16 }}>
          {children}
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
