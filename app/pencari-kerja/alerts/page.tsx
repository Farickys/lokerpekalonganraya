'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Briefcase, Bookmark, FileText, Bell, User, LogOut, Menu, X, Settings, Plus, Trash2, CheckCircle, AlertCircle } from 'lucide-react'
import { AREAS, JOB_TYPES, CATEGORIES } from '@/lib/constants'

const sidebarLinks = [
  { href: '/pencari-kerja', icon: <User size={16} />, label: 'Dashboard' },
  { href: '/pencari-kerja/profil', icon: <Settings size={16} />, label: 'Profil Saya' },
  { href: '/pencari-kerja/lamaran', icon: <FileText size={16} />, label: 'Lamaran Saya' },
  { href: '/dashboard/saved-jobs', icon: <Bookmark size={16} />, label: 'Loker Tersimpan' },
  { href: '/pencari-kerja/alerts', icon: <Bell size={16} />, label: 'Alert Lowongan' },
]

export default function AlertsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [alerts, setAlerts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ type: string; msg: string } | null>(null)
  const [form, setForm] = useState({ keyword: '', area: '', category: '', jobType: '', frequency: 'DAILY' })

  const set = (field: string, val: string) => setForm(prev => ({ ...prev, [field]: val }))

  const fetchAlerts = () => {
    fetch('/api/user/alerts')
      .then(r => { if (r.status === 401) { window.location.href = '/login'; return null }; return r.json() })
      .then(data => { if (data) setAlerts(data.alerts || []) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchAlerts() }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/user/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setToast({ type: 'success', msg: 'Alert berhasil dibuat' })
      setShowForm(false)
      setForm({ keyword: '', area: '', category: '', jobType: '', frequency: 'DAILY' })
      fetchAlerts()
    } catch (err: any) {
      setToast({ type: 'error', msg: err.message || 'Gagal membuat alert' })
    } finally {
      setSaving(false)
      setTimeout(() => setToast(null), 3000)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/user/alerts?id=${id}`, { method: 'DELETE' })
      setAlerts(prev => prev.filter(a => a.id !== id))
      setToast({ type: 'success', msg: 'Alert dihapus' })
      setTimeout(() => setToast(null), 3000)
    } catch {
      setToast({ type: 'error', msg: 'Gagal menghapus alert' })
      setTimeout(() => setToast(null), 3000)
    }
  }

  const inputStyle = { width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 14, outline: 'none' }
  const labelStyle = { display: 'block' as const, fontSize: 13, fontWeight: 600 as const, color: '#374151', marginBottom: 6 }

  const navLink = (m: typeof sidebarLinks[0], onClick?: () => void) => {
    const active = m.href === '/pencari-kerja/alerts'
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
      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 100, padding: '12px 20px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 500, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', background: toast.type === 'success' ? '#065F46' : '#991B1B', color: 'white' }}>
          {toast.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />} {toast.msg}
        </div>
      )}

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
            <div>
              <h1 style={{ fontWeight: 700, fontSize: 18, color: '#111827', margin: 0 }}>Alert Lowongan</h1>
              <p style={{ fontSize: 12, color: '#6B7280', margin: 0 }}>Dapatkan notifikasi loker terbaru</p>
            </div>
          </div>
          <button onClick={() => setShowForm(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 12, fontSize: 14, fontWeight: 600, color: 'white', border: 'none', background: 'var(--primary)', cursor: 'pointer' }}>
            <Plus size={16} /> Buat Alert
          </button>
        </div>

        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Create Alert Form */}
          {showForm && (
            <div style={{ background: 'white', borderRadius: 16, border: '2px solid var(--primary)', padding: 24 }}>
              <h2 style={{ fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 16 }}>Buat Alert Baru</h2>
              <form onSubmit={handleCreate} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }} className="alert-form-grid">
                <div>
                  <label htmlFor="aKeyword" style={labelStyle}>Kata Kunci</label>
                  <input id="aKeyword" type="text" placeholder="cth: Admin, Batik, Marketing" value={form.keyword} onChange={e => set('keyword', e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label htmlFor="aArea" style={labelStyle}>Wilayah</label>
                  <select id="aArea" value={form.area} onChange={e => set('area', e.target.value)} style={inputStyle}>
                    <option value="">Semua wilayah</option>
                    {Object.entries(AREAS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="aCategory" style={labelStyle}>Kategori</label>
                  <select id="aCategory" value={form.category} onChange={e => set('category', e.target.value)} style={inputStyle}>
                    <option value="">Semua kategori</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="aJobType" style={labelStyle}>Tipe Kerja</label>
                  <select id="aJobType" value={form.jobType} onChange={e => set('jobType', e.target.value)} style={inputStyle}>
                    <option value="">Semua tipe</option>
                    {Object.entries(JOB_TYPES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="aFreq" style={labelStyle}>Frekuensi</label>
                  <select id="aFreq" value={form.frequency} onChange={e => set('frequency', e.target.value)} style={inputStyle}>
                    <option value="DAILY">Harian</option>
                    <option value="WEEKLY">Mingguan</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
                  <button type="button" onClick={() => setShowForm(false)}
                    style={{ flex: 1, padding: '12px', borderRadius: 12, border: '1px solid #E5E7EB', background: 'white', fontSize: 14, fontWeight: 600, color: '#6B7280', cursor: 'pointer' }}>
                    Batal
                  </button>
                  <button type="submit" disabled={saving}
                    style={{ flex: 1, padding: '12px', borderRadius: 12, border: 'none', background: saving ? '#93C5FD' : 'var(--primary)', fontSize: 14, fontWeight: 600, color: 'white', cursor: saving ? 'wait' : 'pointer' }}>
                    {saving ? 'Menyimpan...' : 'Simpan Alert'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Info */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: 16, borderRadius: 12, background: '#EFF6FF' }}>
            <Bell size={16} style={{ color: '#3B82F6', flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: 13, color: '#1E40AF', margin: 0 }}>
              Buat alert berdasarkan kata kunci, wilayah, atau kategori. Anda akan mendapat notifikasi email saat ada lowongan baru yang cocok. Maksimal 10 alert per akun.
            </p>
          </div>

          {/* Alert List */}
          {loading ? (
            <div style={{ padding: 48, textAlign: 'center', color: '#9CA3AF' }}>Memuat alert...</div>
          ) : alerts.length === 0 && !showForm ? (
            <div style={{ background: 'white', borderRadius: 16, padding: 48, textAlign: 'center' }}>
              <Bell size={40} style={{ color: '#D1D5DB', margin: '0 auto 12px' }} />
              <p style={{ fontWeight: 600, color: '#6B7280', marginBottom: 8 }}>Belum ada alert</p>
              <p style={{ fontSize: 13, color: '#9CA3AF' }}>Buat alert untuk mendapat notifikasi lowongan baru.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {alerts.map(alert => (
                <div key={alert.id} style={{ background: 'white', borderRadius: 16, border: '1px solid #F3F4F6', padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 6 }}>
                      {alert.keyword && <span style={{ fontSize: 12, fontWeight: 600, padding: '2px 10px', borderRadius: 20, background: '#EFF6FF', color: 'var(--primary)' }}>{alert.keyword}</span>}
                      {alert.area && <span style={{ fontSize: 12, fontWeight: 600, padding: '2px 10px', borderRadius: 20, background: '#F3E8FF', color: '#7C3AED' }}>{AREAS[alert.area as keyof typeof AREAS] || alert.area}</span>}
                      {alert.category && <span style={{ fontSize: 12, fontWeight: 600, padding: '2px 10px', borderRadius: 20, background: '#FEF3C7', color: '#92400E' }}>{alert.category}</span>}
                      {alert.jobType && <span style={{ fontSize: 12, fontWeight: 600, padding: '2px 10px', borderRadius: 20, background: '#D1FAE5', color: '#065F46' }}>{JOB_TYPES[alert.jobType as keyof typeof JOB_TYPES] || alert.jobType}</span>}
                    </div>
                    <div style={{ fontSize: 12, color: '#9CA3AF' }}>
                      Frekuensi: {alert.frequency === 'DAILY' ? 'Harian' : 'Mingguan'}
                    </div>
                  </div>
                  <button onClick={() => handleDelete(alert.id)}
                    style={{ padding: 8, borderRadius: 8, border: 'none', background: 'transparent', color: '#EF4444', cursor: 'pointer' }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
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
        @media (min-width: 640px) {
          .alert-form-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  )
}
