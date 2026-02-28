'use client'
import { useState } from 'react'
import { Camera, Globe, MapPin, Phone as PhoneIcon, Mail, Instagram, Facebook, CheckCircle, Save } from 'lucide-react'
import DashboardShell from '@/components/DashboardShell'

export default function ProfilPage() {
  const [saved, setSaved] = useState(false)

  const inputStyle = {
    width: '100%', padding: '12px 14px', borderRadius: 12,
    border: '1px solid #E5E7EB', fontSize: 14, outline: 'none',
  } as const

  const labelStyle = {
    display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6,
  } as const

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <DashboardShell
      title="Profil Perusahaan"
      subtitle="Kelola informasi perusahaan Anda"
      activePath="/dashboard/profil"
      actions={
        <button onClick={handleSave}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 12, fontSize: 14, fontWeight: 600, color: 'white', border: 'none', background: 'var(--primary)', cursor: 'pointer' }}>
          <Save size={16} /> Simpan
        </button>
      }
    >
      {/* Toast */}
      {saved && (
        <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 100, background: '#065F46', color: 'white', padding: '12px 20px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 500, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
          <CheckCircle size={16} /> Profil berhasil disimpan
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Logo & Basic */}
        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F3F4F6', padding: 24 }}>
          <h2 style={{ fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 20 }}>Informasi Dasar</h2>

          {/* Logo Upload */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ width: 72, height: 72, borderRadius: 16, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 28, fontWeight: 700, position: 'relative', flexShrink: 0 }}>
              B
              <label style={{ position: 'absolute', bottom: -4, right: -4, width: 28, height: 28, borderRadius: 14, background: 'white', border: '2px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Camera size={13} style={{ color: '#6B7280' }} />
                <input type="file" accept="image/*" style={{ display: 'none' }} />
              </label>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#1F2937' }}>Logo Perusahaan</div>
              <div style={{ fontSize: 12, color: '#9CA3AF' }}>JPG, PNG maks. 2MB. Disarankan 200x200px.</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }} className="profil-grid">
            <div>
              <label style={labelStyle}>Nama Perusahaan <span style={{ color: '#EF4444' }}>*</span></label>
              <input type="text" defaultValue="PT Batik Mahkota" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Deskripsi Perusahaan</label>
              <textarea rows={4} defaultValue="Perusahaan batik terkemuka di Pekalongan yang bergerak di bidang produksi dan pemasaran batik tulis premium sejak 1985."
                style={{ ...inputStyle, resize: 'vertical' as const }} />
            </div>
            <div>
              <label style={labelStyle}>Industri</label>
              <select style={inputStyle} defaultValue="Tekstil & Batik">
                <option>Tekstil & Batik</option>
                <option>Teknologi & IT</option>
                <option>Kuliner & F&B</option>
                <option>Retail & Sales</option>
                <option>Manufaktur</option>
                <option>Lainnya</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Jumlah Karyawan</label>
              <select style={inputStyle} defaultValue="50-100">
                <option>1-10</option>
                <option>11-50</option>
                <option>50-100</option>
                <option>100-500</option>
                <option>500+</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F3F4F6', padding: 24 }}>
          <h2 style={{ fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 20 }}>Kontak & Lokasi</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }} className="profil-grid">
            <div>
              <label style={labelStyle}><MapPin size={12} style={{ display: 'inline', marginRight: 4 }} /> Alamat</label>
              <input type="text" defaultValue="Jl. Teratai No. 15, Pekalongan" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}><PhoneIcon size={12} style={{ display: 'inline', marginRight: 4 }} /> Nomor Telepon</label>
              <input type="text" defaultValue="0285-123456" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}><Mail size={12} style={{ display: 'inline', marginRight: 4 }} /> Email Perusahaan</label>
              <input type="email" defaultValue="hrd@batikmahkota.co.id" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}><Globe size={12} style={{ display: 'inline', marginRight: 4 }} /> Website</label>
              <input type="url" placeholder="https://perusahaan.com" style={inputStyle} />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F3F4F6', padding: 24 }}>
          <h2 style={{ fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 20 }}>Media Sosial</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }} className="profil-grid">
            <div>
              <label style={labelStyle}><Instagram size={12} style={{ display: 'inline', marginRight: 4 }} /> Instagram</label>
              <input type="text" placeholder="@perusahaan" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}><Facebook size={12} style={{ display: 'inline', marginRight: 4 }} /> Facebook</label>
              <input type="text" placeholder="facebook.com/perusahaan" style={inputStyle} />
            </div>
          </div>
        </div>

        {/* Verification Status */}
        <div style={{ background: '#F0FDF4', borderRadius: 16, border: '1px solid #BBF7D0', padding: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
          <CheckCircle size={20} style={{ color: '#10B981', flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: '#065F46' }}>Perusahaan Terverifikasi</div>
            <div style={{ fontSize: 12, color: '#6B7280' }}>Profil Anda sudah diverifikasi oleh tim admin LokerPekalonganRaya.</div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .profil-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </DashboardShell>
  )
}
