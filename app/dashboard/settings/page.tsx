'use client'
import { useState } from 'react'
import { Lock, Bell, Shield, LogOut, Eye, EyeOff, CheckCircle, AlertTriangle } from 'lucide-react'
import DashboardShell from '@/components/DashboardShell'

export default function SettingsPage() {
  const [showOldPw, setShowOldPw] = useState(false)
  const [showNewPw, setShowNewPw] = useState(false)
  const [saved, setSaved] = useState(false)
  const [emailNotif, setEmailNotif] = useState(true)
  const [waNotif, setWaNotif] = useState(false)
  const [weeklyReport, setWeeklyReport] = useState(true)

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
      title="Pengaturan"
      subtitle="Kelola akun dan preferensi"
      activePath="/dashboard/settings"
    >
      {/* Toast */}
      {saved && (
        <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 100, background: '#065F46', color: 'white', padding: '12px 20px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 500, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
          <CheckCircle size={16} /> Pengaturan disimpan
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Change Password */}
        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F3F4F6', padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Lock size={18} style={{ color: 'var(--primary)' }} />
            </div>
            <div>
              <h2 style={{ fontWeight: 700, fontSize: 16, color: '#111827', margin: 0 }}>Ubah Password</h2>
              <p style={{ fontSize: 12, color: '#6B7280', margin: 0 }}>Pastikan password baru Anda aman</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
            <div>
              <label style={labelStyle}>Password Lama</label>
              <div style={{ position: 'relative' }}>
                <input type={showOldPw ? 'text' : 'password'} placeholder="Masukkan password lama" style={inputStyle} />
                <button onClick={() => setShowOldPw(!showOldPw)} type="button"
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: 4 }}>
                  {showOldPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Password Baru</label>
              <div style={{ position: 'relative' }}>
                <input type={showNewPw ? 'text' : 'password'} placeholder="Minimal 8 karakter" style={inputStyle} />
                <button onClick={() => setShowNewPw(!showNewPw)} type="button"
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: 4 }}>
                  {showNewPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>Gunakan kombinasi huruf besar, huruf kecil, angka, dan simbol</p>
            </div>
            <div>
              <label style={labelStyle}>Konfirmasi Password Baru</label>
              <input type="password" placeholder="Ulangi password baru" style={inputStyle} />
            </div>
            <button onClick={handleSave}
              style={{ padding: '12px 24px', borderRadius: 12, border: 'none', background: 'var(--primary)', color: 'white', fontSize: 14, fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start' }}>
              Ubah Password
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F3F4F6', padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bell size={18} style={{ color: '#D97706' }} />
            </div>
            <div>
              <h2 style={{ fontWeight: 700, fontSize: 16, color: '#111827', margin: 0 }}>Notifikasi</h2>
              <p style={{ fontSize: 12, color: '#6B7280', margin: 0 }}>Atur preferensi notifikasi</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: 'Notifikasi Email', desc: 'Terima email saat ada pelamar baru', state: emailNotif, setter: setEmailNotif },
              { label: 'Notifikasi WhatsApp', desc: 'Terima notifikasi via WhatsApp', state: waNotif, setter: setWaNotif },
              { label: 'Laporan Mingguan', desc: 'Kirim laporan performa loker setiap minggu', state: weeklyReport, setter: setWeeklyReport },
            ].map(n => (
              <div key={n.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #F9FAFB' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#1F2937' }}>{n.label}</div>
                  <div style={{ fontSize: 12, color: '#9CA3AF' }}>{n.desc}</div>
                </div>
                <button onClick={() => n.setter(!n.state)}
                  style={{
                    width: 48, height: 28, borderRadius: 14, border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s',
                    background: n.state ? 'var(--primary)' : '#D1D5DB',
                  }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: 11, background: 'white', position: 'absolute', top: 3, transition: 'left 0.2s',
                    left: n.state ? 23 : 3, boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  }} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F3F4F6', padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={18} style={{ color: '#7C3AED' }} />
            </div>
            <div>
              <h2 style={{ fontWeight: 700, fontSize: 16, color: '#111827', margin: 0 }}>Keamanan</h2>
              <p style={{ fontSize: 12, color: '#6B7280', margin: 0 }}>Pengaturan keamanan akun</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, background: '#F9FAFB', borderRadius: 12 }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#1F2937' }}>Two-Factor Authentication</div>
                <div style={{ fontSize: 12, color: '#9CA3AF' }}>Tambahkan lapisan keamanan ekstra</div>
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 20, background: '#FEF3C7', color: '#92400E' }}>Segera Hadir</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, background: '#F9FAFB', borderRadius: 12 }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#1F2937' }}>Sesi Login Aktif</div>
                <div style={{ fontSize: 12, color: '#9CA3AF' }}>1 perangkat aktif</div>
              </div>
              <button style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer' }}>Lihat</button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #FEE2E2', padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <AlertTriangle size={18} style={{ color: '#EF4444' }} />
            <h2 style={{ fontWeight: 700, fontSize: 16, color: '#991B1B', margin: 0 }}>Zona Berbahaya</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#1F2937' }}>Logout dari semua perangkat</div>
                <div style={{ fontSize: 12, color: '#9CA3AF' }}>Keluar dari semua sesi yang aktif</div>
              </div>
              <button style={{ padding: '8px 16px', borderRadius: 10, border: '1px solid #FCA5A5', background: '#FEF2F2', fontSize: 13, fontWeight: 600, color: '#EF4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                <LogOut size={14} /> Logout Semua
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#1F2937' }}>Hapus Akun</div>
                <div style={{ fontSize: 12, color: '#9CA3AF' }}>Hapus akun dan semua data Anda secara permanen</div>
              </div>
              <button style={{ padding: '8px 16px', borderRadius: 10, border: 'none', background: '#EF4444', fontSize: 13, fontWeight: 600, color: 'white', cursor: 'pointer' }}>
                Hapus Akun
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
