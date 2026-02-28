'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Briefcase, Bookmark, FileText, Bell, User, LogOut, Menu, X, Settings, Save, CheckCircle, AlertCircle, Upload } from 'lucide-react'

const sidebarLinks = [
  { href: '/pencari-kerja', icon: <User size={16} />, label: 'Dashboard' },
  { href: '/pencari-kerja/profil', icon: <Settings size={16} />, label: 'Profil Saya' },
  { href: '/pencari-kerja/lamaran', icon: <FileText size={16} />, label: 'Lamaran Saya' },
  { href: '/dashboard/saved-jobs', icon: <Bookmark size={16} />, label: 'Loker Tersimpan' },
  { href: '/pencari-kerja/alerts', icon: <Bell size={16} />, label: 'Alert Lowongan' },
]

const EDUCATION_OPTIONS = ['SMP/Sederajat', 'SMA/SMK/Sederajat', 'D1/D2/D3', 'S1/D4', 'S2/S3']
const EXPERIENCE_OPTIONS = ['Fresh Graduate', '< 1 Tahun', '1-2 Tahun', '3-5 Tahun', '5+ Tahun']

export default function ProfilPencariKerjaPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ type: string; msg: string } | null>(null)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', location: '', bio: '', skills: '',
    experience: '', education: '', cvUrl: null as string | null, cvName: null as string | null,
  })

  useEffect(() => {
    fetch('/api/user/profile')
      .then(r => { if (r.status === 401) { window.location.href = '/login'; return null }; return r.json() })
      .then(data => { if (data) setForm(prev => ({ ...prev, ...data })) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const set = (field: string, val: string) => setForm(prev => ({ ...prev, [field]: val }))

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setToast({ type: 'success', msg: 'Profil berhasil disimpan' })
    } catch {
      setToast({ type: 'error', msg: 'Gagal menyimpan profil' })
    } finally {
      setSaving(false)
      setTimeout(() => setToast(null), 3000)
    }
  }

  const inputStyle = { width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 14, outline: 'none' }
  const labelStyle = { display: 'block' as const, fontSize: 13, fontWeight: 600 as const, color: '#374151', marginBottom: 6 }

  const navLink = (m: typeof sidebarLinks[0], onClick?: () => void) => {
    const active = m.href === '/pencari-kerja/profil'
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
            <h1 style={{ fontWeight: 700, fontSize: 18, color: '#111827', margin: 0 }}>Profil Saya</h1>
          </div>
          <button onClick={handleSave} disabled={saving}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 12, fontSize: 14, fontWeight: 600, color: 'white', border: 'none', background: saving ? '#93C5FD' : 'var(--primary)', cursor: saving ? 'wait' : 'pointer' }}>
            <Save size={16} /> {saving ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>

        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {loading ? (
            <div style={{ padding: 48, textAlign: 'center', color: '#9CA3AF' }}>Memuat profil...</div>
          ) : (
            <>
              {/* Personal Info */}
              <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F3F4F6', padding: 24 }}>
                <h2 style={{ fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 20 }}>Data Pribadi</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }} className="profil-grid">
                  <div>
                    <label htmlFor="pName" style={labelStyle}>Nama Lengkap</label>
                    <input id="pName" type="text" value={form.name} onChange={e => set('name', e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label htmlFor="pEmail" style={labelStyle}>Email</label>
                    <input id="pEmail" type="email" value={form.email} disabled style={{ ...inputStyle, background: '#F9FAFB', color: '#9CA3AF' }} />
                  </div>
                  <div>
                    <label htmlFor="pPhone" style={labelStyle}>Nomor HP</label>
                    <input id="pPhone" type="tel" placeholder="081234567890" value={form.phone} onChange={e => set('phone', e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label htmlFor="pLocation" style={labelStyle}>Lokasi</label>
                    <input id="pLocation" type="text" placeholder="cth: Kota Pekalongan" value={form.location} onChange={e => set('location', e.target.value)} style={inputStyle} />
                  </div>
                  <div className="profil-full">
                    <label htmlFor="pBio" style={labelStyle}>Tentang Saya</label>
                    <textarea id="pBio" rows={3} placeholder="Ceritakan tentang diri Anda secara singkat..." value={form.bio} onChange={e => set('bio', e.target.value)} style={{ ...inputStyle, resize: 'vertical' as const }} />
                  </div>
                </div>
              </div>

              {/* Skills & Experience */}
              <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F3F4F6', padding: 24 }}>
                <h2 style={{ fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 20 }}>Keahlian & Pengalaman</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }} className="profil-grid">
                  <div className="profil-full">
                    <label htmlFor="pSkills" style={labelStyle}>Keahlian</label>
                    <input id="pSkills" type="text" placeholder="cth: Microsoft Office, Photoshop, Menjahit, dll" value={form.skills} onChange={e => set('skills', e.target.value)} style={inputStyle} />
                    <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>Pisahkan dengan koma</p>
                  </div>
                  <div>
                    <label htmlFor="pExp" style={labelStyle}>Pengalaman Kerja</label>
                    <select id="pExp" value={form.experience} onChange={e => set('experience', e.target.value)} style={inputStyle}>
                      <option value="">Pilih...</option>
                      {EXPERIENCE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="pEdu" style={labelStyle}>Pendidikan Terakhir</label>
                    <select id="pEdu" value={form.education} onChange={e => set('education', e.target.value)} style={inputStyle}>
                      <option value="">Pilih...</option>
                      {EDUCATION_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* CV Upload */}
              <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F3F4F6', padding: 24 }}>
                <h2 style={{ fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 20 }}>CV / Resume</h2>
                {form.cvName ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16, background: '#F0FDF4', borderRadius: 12 }}>
                    <FileText size={20} style={{ color: '#10B981' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 14, color: '#1F2937' }}>{form.cvName}</div>
                      <div style={{ fontSize: 12, color: '#6B7280' }}>CV aktif</div>
                    </div>
                    <button style={{ fontSize: 13, fontWeight: 600, color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer' }}>Hapus</button>
                  </div>
                ) : (
                  <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: 32, borderRadius: 12, border: '2px dashed #D1D5DB', cursor: 'pointer', textAlign: 'center' }}>
                    <Upload size={28} style={{ color: '#9CA3AF' }} />
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#374151' }}>Upload CV</div>
                    <div style={{ fontSize: 12, color: '#9CA3AF' }}>PDF atau DOC, maks. 5MB</div>
                    <input type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} />
                  </label>
                )}
              </div>
            </>
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
          .profil-grid { grid-template-columns: 1fr 1fr !important; }
          .profil-full { grid-column: span 2 !important; }
        }
      `}</style>
    </div>
  )
}
