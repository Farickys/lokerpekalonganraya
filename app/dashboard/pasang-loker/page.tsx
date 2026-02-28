'use client'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, Info, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { AREAS, JOB_TYPES, CATEGORIES, EDUCATION } from '@/lib/constants'

const STORAGE_KEY = 'loker-draft'
const DESC_MAX = 5000
const REQ_MAX = 2000

interface FormData {
  title: string
  category: string
  jobType: string
  area: string
  city: string
  address: string
  salaryMin: string
  salaryMax: string
  salaryText: string
  education: string
  experience: string
  description: string
  requirements: string
  whatsapp: string
  applyLink: string
  expiredAt: string
  featured: boolean
}

interface FormErrors {
  [key: string]: string
}

const initial: FormData = {
  title: '', category: '', jobType: 'FULLTIME', area: '', city: '', address: '',
  salaryMin: '', salaryMax: '', salaryText: '', education: 'SMA/SMK/Sederajat',
  experience: '', description: '', requirements: '', whatsapp: '', applyLink: '',
  expiredAt: '', featured: false,
}

const steps = [
  { num: 1, label: 'Informasi Dasar' },
  { num: 2, label: 'Gaji & Persyaratan' },
  { num: 3, label: 'Deskripsi' },
  { num: 4, label: 'Cara Melamar' },
]

function validateWA(val: string): boolean {
  if (!val) return true
  return /^(\+62|62|0)8[1-9][0-9]{7,11}$/.test(val.replace(/[\s-]/g, ''))
}

function validateURL(val: string): boolean {
  if (!val) return true
  if (val.includes('@')) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
  try { new URL(val.startsWith('http') ? val : `https://${val}`); return true } catch { return false }
}

export default function PasangLokerPage() {
  const [form, setForm] = useState<FormData>(initial)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Set<string>>(new Set())
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [draftLoaded, setDraftLoaded] = useState(false)

  // Load draft from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setForm(JSON.parse(saved))
        setDraftLoaded(true)
        setTimeout(() => setDraftLoaded(false), 3000)
      }
    } catch {}
  }, [])

  // Auto-save to localStorage
  const saveDraft = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form))
    } catch {}
  }, [form])

  useEffect(() => {
    const timer = setTimeout(saveDraft, 1000)
    return () => clearTimeout(timer)
  }, [saveDraft])

  const set = (field: keyof FormData, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setTouched(prev => new Set(prev).add(field))
  }

  const blur = (field: string) => {
    setTouched(prev => new Set(prev).add(field))
    validate()
  }

  const validate = useCallback((): FormErrors => {
    const e: FormErrors = {}
    if (!form.title.trim()) e.title = 'Posisi wajib diisi'
    else if (form.title.trim().length < 3) e.title = 'Minimal 3 karakter'
    else if (form.title.trim().length > 100) e.title = 'Maksimal 100 karakter'
    if (!form.category) e.category = 'Pilih kategori'
    if (!form.area) e.area = 'Pilih wilayah'
    if (!form.description.trim()) e.description = 'Deskripsi wajib diisi'
    else if (form.description.length > DESC_MAX) e.description = `Maksimal ${DESC_MAX} karakter`
    if (form.requirements.length > REQ_MAX) e.requirements = `Maksimal ${REQ_MAX} karakter`
    if (form.salaryMin && form.salaryMax && Number(form.salaryMin) > Number(form.salaryMax)) {
      e.salaryMax = 'Gaji maks harus lebih besar dari gaji min'
    }
    if (form.whatsapp && !validateWA(form.whatsapp)) e.whatsapp = 'Format nomor tidak valid (cth: 081234567890)'
    if (form.applyLink && !validateURL(form.applyLink)) e.applyLink = 'Format link/email tidak valid'
    if (!form.whatsapp && !form.applyLink) e.whatsapp = 'Isi minimal salah satu: WhatsApp atau Link Apply'
    setErrors(e)
    return e
  }, [form])

  // Calculate progress
  const filledSteps = [
    form.title && form.category && form.area,
    true, // salary is optional
    form.description,
    form.whatsapp || form.applyLink,
  ].filter(Boolean).length

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    setTouched(new Set(Object.keys(form)))
    if (Object.keys(errs).length > 0) {
      setToast({ type: 'error', msg: 'Mohon perbaiki kesalahan pada form' })
      setTimeout(() => setToast(null), 4000)
      return
    }
    setShowConfirm(true)
  }

  const confirmSubmit = async () => {
    setShowConfirm(false)
    setSubmitting(true)
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      localStorage.removeItem(STORAGE_KEY)
      setToast({ type: 'success', msg: 'Loker berhasil dikirim untuk review!' })
      setForm(initial)
      setTouched(new Set())
    } catch {
      setToast({ type: 'error', msg: 'Gagal mengirim. Silakan coba lagi.' })
    } finally {
      setSubmitting(false)
      setTimeout(() => setToast(null), 5000)
    }
  }

  const clearDraft = () => {
    localStorage.removeItem(STORAGE_KEY)
    setForm(initial)
    setTouched(new Set())
    setErrors({})
    setDraftLoaded(false)
  }

  const inputStyle = (field: string) => ({
    width: '100%', padding: '12px 14px', borderRadius: 12, fontSize: 14, outline: 'none',
    border: `1px solid ${touched.has(field) && errors[field] ? '#FCA5A5' : '#E5E7EB'}`,
    background: touched.has(field) && errors[field] ? '#FEF2F2' : 'white',
  })

  const errorMsg = (field: string) => {
    if (!touched.has(field) || !errors[field]) return null
    return (
      <p role="alert" id={`${field}-error`} style={{ fontSize: 12, color: '#EF4444', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
        <AlertCircle size={12} /> {errors[field]}
      </p>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: 20, right: 20, zIndex: 100, padding: '14px 20px', borderRadius: 12,
          display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 500,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)', maxWidth: 400,
          background: toast.type === 'success' ? '#065F46' : '#991B1B', color: 'white',
        }}>
          {toast.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          {toast.msg}
        </div>
      )}

      {/* Draft restored notification */}
      {draftLoaded && (
        <div style={{
          position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 100,
          padding: '10px 20px', borderRadius: 12, background: '#1E40AF', color: 'white',
          fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}>
          <Info size={14} /> Draft sebelumnya dikembalikan
          <button onClick={clearDraft} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '2px 10px', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>
            Hapus draft
          </button>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setShowConfirm(false)} />
          <div style={{ position: 'relative', background: 'white', borderRadius: 20, padding: 28, maxWidth: 420, width: '100%' }}>
            <h3 style={{ fontWeight: 700, fontSize: 18, color: '#111827', marginBottom: 8 }}>Konfirmasi Kirim Loker</h3>
            <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 20 }}>
              Loker <strong>{form.title}</strong> akan dikirim untuk ditinjau oleh tim admin. Proses review biasanya memakan waktu 2-6 jam.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setShowConfirm(false)} style={{ flex: 1, padding: '12px', borderRadius: 12, border: '1px solid #E5E7EB', background: 'white', fontSize: 14, fontWeight: 600, color: '#6B7280', cursor: 'pointer' }}>
                Batal
              </button>
              <button onClick={confirmSubmit} style={{ flex: 1, padding: '12px', borderRadius: 12, border: 'none', background: 'var(--primary)', fontSize: 14, fontWeight: 600, color: 'white', cursor: 'pointer' }}>
                {form.featured ? 'Kirim & Upgrade' : 'Ya, Kirim'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header style={{ background: 'white', borderBottom: '1px solid #F3F4F6', padding: '16px 24px' }}>
        <div style={{ maxWidth: 768, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/dashboard" aria-label="Kembali ke dashboard" style={{ padding: 8, borderRadius: 12, color: '#6B7280', textDecoration: 'none' }}>
            <ChevronLeft size={18} />
          </Link>
          <div>
            <h1 style={{ fontWeight: 700, fontSize: 18, color: '#111827', margin: 0 }}>Pasang Lowongan Baru</h1>
            <p style={{ fontSize: 12, color: '#6B7280', margin: 0 }}>Isi form berikut dengan lengkap dan benar</p>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div style={{ background: 'white', borderBottom: '1px solid #F3F4F6', padding: '12px 24px' }}>
        <div style={{ maxWidth: 768, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#6B7280' }}>Progress</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary)' }}>{filledSteps}/4 bagian terisi</span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: '#E5E7EB', overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: 3, background: 'var(--primary)', width: `${(filledSteps / 4) * 100}%`, transition: 'width 0.3s' }} />
          </div>
          <div style={{ display: 'flex', gap: 4, marginTop: 8 }} className="progress-steps">
            {steps.map(s => (
              <div key={s.num} style={{ flex: 1, textAlign: 'center', fontSize: 11, color: filledSteps >= s.num ? 'var(--primary)' : '#9CA3AF', fontWeight: filledSteps >= s.num ? 600 : 400 }}>
                {s.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 768, margin: '0 auto', padding: '24px 16px' }}>
        <form onSubmit={handleSubmit} noValidate>
          <fieldset style={{ border: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <legend style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>Form Pasang Lowongan</legend>

            {/* Section 1: Basic Info */}
            <section style={{ background: 'white', borderRadius: 16, border: '1px solid #F3F4F6', padding: 24 }} aria-labelledby="section-1">
              <h2 id="section-1" style={{ fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 24, height: 24, borderRadius: 12, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, background: 'var(--primary)' }}>1</span>
                Informasi Dasar
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }} className="form-grid-2">
                <div className="form-full">
                  <label htmlFor="title" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                    Posisi / Jabatan <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input id="title" type="text" required maxLength={100} placeholder="cth: Operator Produksi, Staff Admin, Desainer Grafis"
                    value={form.title} onChange={e => set('title', e.target.value)} onBlur={() => blur('title')}
                    aria-describedby={errors.title ? 'title-error' : undefined} aria-invalid={!!errors.title}
                    style={inputStyle('title')} />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {errorMsg('title')}
                    <span style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4, marginLeft: 'auto' }}>{form.title.length}/100</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="category" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                    Kategori <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <select id="category" value={form.category} onChange={e => set('category', e.target.value)} onBlur={() => blur('category')}
                    aria-describedby={errors.category ? 'category-error' : undefined} aria-invalid={!!errors.category}
                    style={inputStyle('category')}>
                    <option value="">Pilih kategori...</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errorMsg('category')}
                </div>
                <div>
                  <label htmlFor="jobType" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                    Tipe Kerja <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <select id="jobType" value={form.jobType} onChange={e => set('jobType', e.target.value)} style={inputStyle('jobType')}>
                    {Object.entries(JOB_TYPES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="area" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                    Wilayah <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <select id="area" value={form.area} onChange={e => set('area', e.target.value)} onBlur={() => blur('area')}
                    aria-describedby={errors.area ? 'area-error' : undefined} aria-invalid={!!errors.area}
                    style={inputStyle('area')}>
                    <option value="">Pilih wilayah...</option>
                    {Object.entries(AREAS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                  {errorMsg('area')}
                </div>
                <div>
                  <label htmlFor="city" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Kota/Kecamatan</label>
                  <input id="city" type="text" placeholder="cth: Kajen, Batang Kota" value={form.city} onChange={e => set('city', e.target.value)} style={inputStyle('city')} />
                </div>
                <div className="form-full">
                  <label htmlFor="address" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Alamat Lengkap</label>
                  <input id="address" type="text" placeholder="cth: Jl. Tentara Pelajar No.5, Pekalongan" value={form.address} onChange={e => set('address', e.target.value)} style={inputStyle('address')} />
                </div>
              </div>
            </section>

            {/* Section 2: Salary */}
            <section style={{ background: 'white', borderRadius: 16, border: '1px solid #F3F4F6', padding: 24 }} aria-labelledby="section-2">
              <h2 id="section-2" style={{ fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 24, height: 24, borderRadius: 12, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, background: 'var(--primary)' }}>2</span>
                Gaji & Persyaratan
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }} className="form-grid-2">
                <div>
                  <label htmlFor="salaryMin" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Gaji Minimum (Rp)</label>
                  <input id="salaryMin" type="number" min="0" placeholder="cth: 2500000" value={form.salaryMin} onChange={e => set('salaryMin', e.target.value)} style={inputStyle('salaryMin')} />
                </div>
                <div>
                  <label htmlFor="salaryMax" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Gaji Maksimum (Rp)</label>
                  <input id="salaryMax" type="number" min="0" placeholder="cth: 4000000" value={form.salaryMax} onChange={e => set('salaryMax', e.target.value)} onBlur={() => blur('salaryMax')}
                    aria-describedby={errors.salaryMax ? 'salaryMax-error' : undefined} style={inputStyle('salaryMax')} />
                  {errorMsg('salaryMax')}
                </div>
                <div>
                  <label htmlFor="salaryText" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>atau Teks Gaji</label>
                  <input id="salaryText" type="text" placeholder="cth: Negosiasi, UMR+Tunjangan" value={form.salaryText} onChange={e => set('salaryText', e.target.value)} style={inputStyle('salaryText')} />
                  <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>Jika diisi, mengabaikan range gaji di atas</p>
                </div>
                <div>
                  <label htmlFor="education" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Pendidikan Minimum</label>
                  <select id="education" value={form.education} onChange={e => set('education', e.target.value)} style={inputStyle('education')}>
                    {EDUCATION.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>
                <div className="form-full">
                  <label htmlFor="experience" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Pengalaman</label>
                  <input id="experience" type="text" placeholder="cth: Fresh Graduate / 1-2 Tahun / Tidak Diutamakan" value={form.experience} onChange={e => set('experience', e.target.value)} style={inputStyle('experience')} />
                </div>
              </div>
            </section>

            {/* Section 3: Description */}
            <section style={{ background: 'white', borderRadius: 16, border: '1px solid #F3F4F6', padding: 24 }} aria-labelledby="section-3">
              <h2 id="section-3" style={{ fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 24, height: 24, borderRadius: 12, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, background: 'var(--primary)' }}>3</span>
                Deskripsi & Persyaratan
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label htmlFor="description" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                    Deskripsi Pekerjaan <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <textarea id="description" rows={6} required maxLength={DESC_MAX} placeholder="Jelaskan tanggung jawab, benefit, dan informasi lengkap posisi ini..."
                    value={form.description} onChange={e => set('description', e.target.value)} onBlur={() => blur('description')}
                    aria-describedby={errors.description ? 'description-error' : 'description-hint'} aria-invalid={!!errors.description}
                    style={{ ...inputStyle('description'), resize: 'vertical' as const }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {errorMsg('description')}
                    <span id="description-hint" style={{ fontSize: 11, color: form.description.length > DESC_MAX * 0.9 ? '#EF4444' : '#9CA3AF', marginTop: 4, marginLeft: 'auto' }}>
                      {form.description.length}/{DESC_MAX}
                    </span>
                  </div>
                </div>
                <div>
                  <label htmlFor="requirements" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Persyaratan Khusus</label>
                  <textarea id="requirements" rows={4} maxLength={REQ_MAX} placeholder="Usia, keahlian khusus, lokasi domisili, dll..."
                    value={form.requirements} onChange={e => set('requirements', e.target.value)}
                    style={{ ...inputStyle('requirements'), resize: 'vertical' as const }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {errorMsg('requirements')}
                    <span style={{ fontSize: 11, color: form.requirements.length > REQ_MAX * 0.9 ? '#EF4444' : '#9CA3AF', marginTop: 4, marginLeft: 'auto' }}>
                      {form.requirements.length}/{REQ_MAX}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Contact */}
            <section style={{ background: 'white', borderRadius: 16, border: '1px solid #F3F4F6', padding: 24 }} aria-labelledby="section-4">
              <h2 id="section-4" style={{ fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 24, height: 24, borderRadius: 12, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, background: 'var(--primary)' }}>4</span>
                Cara Melamar
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }} className="form-grid-2">
                <div>
                  <label htmlFor="whatsapp" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Nomor WhatsApp</label>
                  <input id="whatsapp" type="tel" placeholder="cth: 081234567890"
                    value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)} onBlur={() => blur('whatsapp')}
                    aria-describedby={errors.whatsapp ? 'whatsapp-error' : 'whatsapp-hint'}
                    style={inputStyle('whatsapp')} />
                  <p id="whatsapp-hint" style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>Pelamar akan direct apply via WA</p>
                  {errorMsg('whatsapp')}
                </div>
                <div>
                  <label htmlFor="applyLink" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Link Apply / Email</label>
                  <input id="applyLink" type="text" placeholder="https://form.example.com atau email@perusahaan.com"
                    value={form.applyLink} onChange={e => set('applyLink', e.target.value)} onBlur={() => blur('applyLink')}
                    aria-describedby={errors.applyLink ? 'applyLink-error' : undefined}
                    style={inputStyle('applyLink')} />
                  {errorMsg('applyLink')}
                </div>
                <div>
                  <label htmlFor="expiredAt" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Loker Berlaku Hingga</label>
                  <input id="expiredAt" type="date" value={form.expiredAt} onChange={e => set('expiredAt', e.target.value)} style={inputStyle('expiredAt')} />
                </div>
              </div>
            </section>

            {/* Featured Option */}
            <div
              role="checkbox" aria-checked={form.featured} tabIndex={0}
              onClick={() => set('featured', !form.featured)}
              onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); set('featured', !form.featured) } }}
              style={{
                borderRadius: 16, border: `2px solid ${form.featured ? '#FBBF24' : '#F3F4F6'}`, padding: 24, cursor: 'pointer',
                background: form.featured ? '#FFFBEB' : 'white',
              }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{
                  width: 20, height: 20, borderRadius: 4, border: `2px solid ${form.featured ? '#FBBF24' : '#D1D5DB'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2,
                  background: form.featured ? 'var(--accent)' : 'transparent',
                }}>
                  {form.featured && <span style={{ fontSize: 12, color: '#1F2937', fontWeight: 700 }}>✓</span>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: '#1F2937' }}>Featured Listing</span>
                    <span style={{ fontSize: 12, fontWeight: 600, padding: '2px 10px', borderRadius: 20, background: '#FEF3C7', color: '#92400E' }}>Rp 50.000 / 30 hari</span>
                  </div>
                  <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>Loker tampil di posisi teratas, badge khusus, dan otomatis diposting ke Instagram LokerPekalonganRaya (jangkauan lebih luas).</p>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div style={{ display: 'flex', gap: 12 }}>
              <Link href="/dashboard" style={{ flex: 1, padding: '14px', borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 14, fontWeight: 600, color: '#6B7280', textAlign: 'center', textDecoration: 'none', background: 'white' }}>
                Batal
              </Link>
              <button type="submit" disabled={submitting}
                style={{
                  flex: 2, padding: '14px', borderRadius: 12, border: 'none', fontSize: 14, fontWeight: 600, color: 'white',
                  background: submitting ? '#93C5FD' : 'var(--primary)', cursor: submitting ? 'wait' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>
                {submitting && <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />}
                {form.featured ? 'Kirim & Upgrade Featured' : 'Kirim untuk Review'}
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: 16, borderRadius: 12, background: '#EFF6FF' }} role="note">
              <Info size={16} style={{ color: '#3B82F6', flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 12, color: '#1E40AF', margin: 0 }}>Loker Anda akan ditinjau oleh tim admin sebelum ditampilkan ke publik (biasanya dalam 2-6 jam). Anda akan mendapat notifikasi email setelah disetujui.</p>
            </div>
          </fieldset>
        </form>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (min-width: 640px) {
          .form-grid-2 { grid-template-columns: 1fr 1fr !important; }
          .form-full { grid-column: span 2 !important; }
        }
        @media (max-width: 480px) {
          .progress-steps { display: none !important; }
        }
      `}</style>
    </div>
  )
}
