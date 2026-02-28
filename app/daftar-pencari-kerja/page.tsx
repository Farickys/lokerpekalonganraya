'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Briefcase, CheckCircle2, Eye, EyeOff, AlertCircle, Loader2, User } from 'lucide-react'

export default function DaftarPencariKerjaPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' })

  const set = (field: string, val: string) => setForm(prev => ({ ...prev, [field]: val }))

  const inputStyle = {
    width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 14, outline: 'none',
  }
  const labelStyle = { display: 'block' as const, fontSize: 13, fontWeight: 600 as const, color: '#374151', marginBottom: 6 }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (form.password.length < 8) {
      setError('Password minimal 8 karakter')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, role: 'JOBSEEKER' }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Gagal mendaftar')
        return
      }
      setStep(2)
    } catch {
      setError('Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 16px', background: 'var(--bg)' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--primary)' }}>
              <Briefcase size={20} color="white" />
            </div>
            <span style={{ fontWeight: 700, fontSize: 20 }}>
              <span style={{ color: 'var(--primary)' }}>Loker</span>
              <span style={{ color: 'var(--accent)' }}>PekalonganRaya</span>
            </span>
          </Link>
        </div>

        <div style={{ background: 'white', borderRadius: 20, border: '1px solid #F3F4F6', padding: 32 }}>
          {step === 1 && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={18} style={{ color: 'var(--primary)' }} />
                </div>
                <h1 style={{ fontWeight: 700, fontSize: 20, color: '#111827', margin: 0 }}>Daftar Pencari Kerja</h1>
              </div>
              <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 24, paddingLeft: 46 }}>Buat akun untuk melamar lowongan</p>

              {error && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 10, background: '#FEF2F2', marginBottom: 16 }}>
                  <AlertCircle size={14} style={{ color: '#EF4444', flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: '#991B1B' }}>{error}</span>
                </div>
              )}

              <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label htmlFor="name" style={labelStyle}>Nama Lengkap <span style={{ color: '#EF4444' }}>*</span></label>
                  <input id="name" type="text" required placeholder="Nama lengkap Anda"
                    value={form.name} onChange={e => set('name', e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label htmlFor="email" style={labelStyle}>Email <span style={{ color: '#EF4444' }}>*</span></label>
                  <input id="email" type="email" required placeholder="email@example.com"
                    value={form.email} onChange={e => set('email', e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label htmlFor="phone" style={labelStyle}>Nomor HP</label>
                  <input id="phone" type="tel" placeholder="081234567890"
                    value={form.phone} onChange={e => set('phone', e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label htmlFor="password" style={labelStyle}>Password <span style={{ color: '#EF4444' }}>*</span></label>
                  <div style={{ position: 'relative' }}>
                    <input id="password" type={showPw ? 'text' : 'password'} required placeholder="Minimal 8 karakter" minLength={8}
                      value={form.password} onChange={e => set('password', e.target.value)}
                      style={{ ...inputStyle, paddingRight: 40 }} />
                    <button type="button" onClick={() => setShowPw(!showPw)}
                      style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: 4 }}>
                      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>Gunakan kombinasi huruf, angka, dan simbol</p>
                </div>
                <button type="submit" disabled={loading}
                  style={{
                    width: '100%', padding: '14px', borderRadius: 12, border: 'none', fontSize: 15, fontWeight: 700,
                    background: loading ? '#93C5FD' : 'var(--primary)', color: 'white',
                    cursor: loading ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}>
                  {loading && <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />}
                  {loading ? 'Mendaftar...' : 'Daftar Sekarang'}
                </button>
              </form>
            </>
          )}

          {step === 2 && (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ width: 64, height: 64, borderRadius: 32, background: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <CheckCircle2 size={32} style={{ color: 'var(--success)' }} />
              </div>
              <h2 style={{ fontWeight: 700, fontSize: 20, color: '#111827', marginBottom: 8 }}>Pendaftaran Berhasil!</h2>
              <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 24 }}>
                Akun Anda sudah aktif. Silakan login untuk mulai mencari dan melamar lowongan kerja.
              </p>
              <Link href="/login" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 32px', borderRadius: 12,
                background: 'var(--primary)', color: 'white', textDecoration: 'none', fontWeight: 600, fontSize: 15,
              }}>
                Masuk ke Akun
              </Link>
            </div>
          )}
        </div>

        {step === 1 && (
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <p style={{ fontSize: 14, color: '#6B7280' }}>
              Sudah punya akun?{' '}
              <Link href="/login" style={{ fontWeight: 600, color: 'var(--primary)', textDecoration: 'none' }}>Masuk</Link>
            </p>
            <p style={{ fontSize: 13, color: '#9CA3AF', marginTop: 8 }}>
              Ingin pasang lowongan?{' '}
              <Link href="/daftar" style={{ fontWeight: 600, color: 'var(--primary)', textDecoration: 'none' }}>Daftar Perusahaan</Link>
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
