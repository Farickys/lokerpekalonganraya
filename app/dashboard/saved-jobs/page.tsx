'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Briefcase, Plus, TrendingUp, Users, Building2, LogOut, Settings, Menu, X, CheckCircle, Bell, Bookmark, MapPin, Clock, Trash2 } from 'lucide-react'
import { AREAS, JOB_TYPES } from '@/lib/constants'
import { formatSalary, timeAgo } from '@/lib/utils'

interface SavedJob {
  savedJobId: number
  savedAt: string
  id: number
  slug: string
  title: string
  city: string
  area: string
  jobType: string
  salary: string | null
  salaryMin: number | null
  salaryMax: number | null
  category: string
  featured: boolean
  source: string
  createdAt: string
  company: { name: string; logo: string | null } | null
}

const sidebarLinks = [
  { href: '/dashboard', icon: <TrendingUp size={16} />, label: 'Overview' },
  { href: '/dashboard/loker', icon: <Briefcase size={16} />, label: 'Kelola Loker' },
  { href: '/dashboard/pasang-loker', icon: <Plus size={16} />, label: 'Pasang Loker' },
  { href: '/dashboard/saved-jobs', icon: <Bookmark size={16} />, label: 'Loker Tersimpan' },
  { href: '/dashboard/pelamar', icon: <Users size={16} />, label: 'Data Pelamar' },
  { href: '/dashboard/profil', icon: <Building2 size={16} />, label: 'Profil Perusahaan' },
  { href: '/dashboard/settings', icon: <Settings size={16} />, label: 'Pengaturan' },
]

export default function SavedJobsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [jobs, setJobs] = useState<SavedJob[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  const fetchSavedJobs = async () => {
    try {
      const res = await fetch('/api/user/saved-jobs')
      if (res.status === 401) {
        window.location.href = '/login'
        return
      }
      const data = await res.json()
      setJobs(data.jobs || [])
      setTotal(data.total || 0)
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSavedJobs()
  }, [])

  const removeBookmark = async (jobId: number) => {
    try {
      await fetch(`/api/jobs/${jobId}/bookmark`, { method: 'POST' })
      setJobs(prev => prev.filter(j => j.id !== jobId))
      setTotal(prev => prev - 1)
    } catch {
      // silently fail
    }
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
              <button onClick={() => setSidebarOpen(false)} style={{ padding: 4, color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <nav style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {sidebarLinks.map(m => (
                <Link key={m.href} href={m.href} onClick={() => setSidebarOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 12,
                    fontSize: 14, fontWeight: 500, color: m.href === '/dashboard/saved-jobs' ? 'var(--primary)' : '#4B5563',
                    background: m.href === '/dashboard/saved-jobs' ? '#EFF6FF' : 'transparent',
                    textDecoration: 'none',
                  }}>
                  <span style={{ color: m.href === '/dashboard/saved-jobs' ? 'var(--primary)' : '#9CA3AF' }}>{m.icon}</span>
                  {m.label}
                </Link>
              ))}
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
      <aside style={{ display: 'none', flexDirection: 'column', width: 256, background: 'white', borderRight: '1px solid #F3F4F6', minHeight: '100vh', position: 'fixed', top: 0, left: 0, bottom: 0 }} className="sidebar-desktop">
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
          {sidebarLinks.map(m => (
            <Link key={m.href} href={m.href}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 12,
                fontSize: 14, fontWeight: 500, color: m.href === '/dashboard/saved-jobs' ? 'var(--primary)' : '#4B5563',
                background: m.href === '/dashboard/saved-jobs' ? '#EFF6FF' : 'transparent',
                textDecoration: 'none',
              }}>
              <span style={{ color: m.href === '/dashboard/saved-jobs' ? 'var(--primary)' : '#9CA3AF' }}>{m.icon}</span>
              {m.label}
            </Link>
          ))}
        </nav>
        <div style={{ padding: 16, borderTop: '1px solid #F3F4F6' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 12, fontSize: 14, fontWeight: 500, color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer', width: '100%' }}>
            <LogOut size={16} /> Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, minWidth: 0 }} className="main-with-sidebar">
        {/* Top Bar */}
        <div style={{ background: 'white', borderBottom: '1px solid #F3F4F6', padding: '16px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
            <button className="mobile-only" onClick={() => setSidebarOpen(true)} style={{ padding: 8, borderRadius: 12, border: '1px solid #F3F4F6', color: '#6B7280', background: 'white', cursor: 'pointer', flexShrink: 0 }}>
              <Menu size={18} />
            </button>
            <div style={{ minWidth: 0 }}>
              <h1 style={{ fontWeight: 700, fontSize: 18, color: '#111827' }}>Loker Tersimpan</h1>
              <p style={{ fontSize: 12, color: '#6B7280' }}>{total} loker disimpan</p>
            </div>
          </div>
          <Link href="/loker" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 12, fontSize: 14, fontWeight: 600, color: 'white', textDecoration: 'none', background: 'var(--primary)' }}>
            <Briefcase size={16} /> Cari Loker
          </Link>
        </div>

        <div style={{ padding: 16 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 48, color: '#9CA3AF' }}>
              <p>Memuat loker tersimpan...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 48 }}>
              <Bookmark size={48} style={{ color: '#D1D5DB', margin: '0 auto 16px' }} />
              <h3 style={{ fontWeight: 600, fontSize: 16, color: '#374151', marginBottom: 8 }}>Belum ada loker tersimpan</h3>
              <p style={{ fontSize: 14, color: '#9CA3AF', marginBottom: 20 }}>Simpan loker yang menarik agar mudah ditemukan lagi nanti.</p>
              <Link href="/loker" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 24px', borderRadius: 12, fontSize: 14, fontWeight: 600, color: 'white', textDecoration: 'none', background: 'var(--primary)' }}>
                Cari Loker Sekarang
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {jobs.map(job => (
                <div key={job.savedJobId} style={{ background: 'white', borderRadius: 16, border: '1px solid #F3F4F6', padding: 16, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  {/* Logo */}
                  <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white', fontSize: 18, background: 'var(--primary)' }}>
                    {job.company?.logo
                      ? <img src={job.company.logo} alt={job.company.name} style={{ width: 44, height: 44, borderRadius: 12, objectFit: 'cover' }} />
                      : (job.company?.name || job.title).charAt(0).toUpperCase()
                    }
                  </div>
                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Link href={`/loker/${job.slug}`} style={{ fontWeight: 700, fontSize: 14, color: '#111827', textDecoration: 'none', display: 'block', marginBottom: 4 }}>
                      {job.title}
                    </Link>
                    <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 8 }}>
                      {job.company?.name || 'Anonim'}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 12, color: '#6B7280' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <MapPin size={11} /> {AREAS[job.area as keyof typeof AREAS] || job.city}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Briefcase size={11} /> {JOB_TYPES[job.jobType as keyof typeof JOB_TYPES]}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={11} /> {timeAgo(new Date(job.createdAt))}
                      </span>
                    </div>
                    <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600, color: 'var(--primary)' }}>
                      {formatSalary(job.salaryMin, job.salaryMax, job.salary)}
                    </div>
                  </div>
                  {/* Remove button */}
                  <button
                    onClick={() => removeBookmark(job.id)}
                    title="Hapus dari tersimpan"
                    style={{ padding: 8, borderRadius: 8, border: 'none', background: 'transparent', color: '#EF4444', cursor: 'pointer', flexShrink: 0 }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <style>{`
        .sidebar-desktop { display: none !important; }
        .main-with-sidebar { margin-left: 0; }
        .mobile-only { display: flex; }
        @media (min-width: 1024px) {
          .sidebar-desktop { display: flex !important; }
          .main-with-sidebar { margin-left: 256px; }
          .mobile-only { display: none !important; }
        }
      `}</style>
    </div>
  )
}
