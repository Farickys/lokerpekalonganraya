'use client'
import { useState } from 'react'
import { Star, Check, Zap, TrendingUp, Eye, Instagram, Clock, CreditCard, Shield } from 'lucide-react'
import DashboardShell from '@/components/DashboardShell'

const benefits = [
  { icon: <TrendingUp size={18} />, title: 'Posisi Teratas', desc: 'Loker Anda tampil di urutan paling atas di halaman pencarian' },
  { icon: <Star size={18} />, title: 'Badge Unggulan', desc: 'Badge khusus yang membuat loker Anda lebih menonjol' },
  { icon: <Instagram size={18} />, title: 'Post ke Instagram', desc: 'Otomatis dipost ke akun @LokerPekalonganRaya (10K+ followers)' },
  { icon: <Eye size={18} />, title: '3x Lebih Banyak Views', desc: 'Rata-rata featured listing mendapat 3x lebih banyak dilihat' },
  { icon: <Clock size={18} />, title: '30 Hari Tayang', desc: 'Loker featured tampil selama 30 hari penuh' },
]

const mockTransactions = [
  { id: 'TRX-001', job: 'Operator Produksi Batik', amount: 50000, date: '15 Jan 2025', status: 'SUCCESS' },
  { id: 'TRX-002', job: 'Staff Admin & Keuangan', amount: 50000, date: '20 Dec 2024', status: 'SUCCESS' },
]

export default function UpgradePage() {
  const [selectedJob, setSelectedJob] = useState('')

  const mockJobs = [
    { id: 1, title: 'Kasir Toko Batik' },
    { id: 2, title: 'Staff Admin & Keuangan' },
    { id: 3, title: 'Desainer Batik' },
  ]

  return (
    <DashboardShell
      title="Featured Listing"
      subtitle="Tingkatkan jangkauan lowongan Anda"
      activePath="/dashboard/upgrade"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Pricing Card */}
        <div style={{ background: 'linear-gradient(135deg, var(--primary), #1a6ab5)', borderRadius: 20, padding: 28, color: 'white', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, borderRadius: 60, background: 'rgba(255,255,255,0.08)' }} />
          <div style={{ position: 'absolute', bottom: -20, left: -20, width: 80, height: 80, borderRadius: 40, background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Star size={20} style={{ fill: '#FCD34D', color: '#FCD34D' }} />
              <span style={{ fontWeight: 700, fontSize: 18 }}>Featured Listing</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
              <span style={{ fontSize: 36, fontWeight: 800 }}>Rp 50.000</span>
              <span style={{ fontSize: 14, opacity: 0.8 }}>/ 30 hari</span>
            </div>
            <p style={{ fontSize: 14, opacity: 0.9, marginBottom: 0 }}>Per lowongan. Pembayaran via transfer bank atau e-wallet.</p>
          </div>
        </div>

        {/* Benefits */}
        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F3F4F6', padding: 24 }}>
          <h2 style={{ fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 20 }}>Keuntungan Featured Listing</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {benefits.map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                  {b.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#1F2937', marginBottom: 2 }}>{b.title}</div>
                  <div style={{ fontSize: 13, color: '#6B7280' }}>{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade Form */}
        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F3F4F6', padding: 24 }}>
          <h2 style={{ fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 20 }}>Upgrade Lowongan</h2>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Pilih Lowongan</label>
            <select value={selectedJob} onChange={e => setSelectedJob(e.target.value)}
              style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 14, outline: 'none' }}>
              <option value="">Pilih lowongan yang ingin di-upgrade...</option>
              {mockJobs.map(j => (
                <option key={j.id} value={j.id}>{j.title}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Metode Pembayaran</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { label: 'Transfer Bank', desc: 'BCA / BRI / Mandiri' },
                { label: 'E-Wallet', desc: 'GoPay / OVO / DANA' },
              ].map((m, i) => (
                <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, borderRadius: 12, border: '2px solid #E5E7EB', cursor: 'pointer' }}>
                  <input type="radio" name="payment" style={{ accentColor: 'var(--primary)' }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13, color: '#1F2937' }}>{m.label}</div>
                    <div style={{ fontSize: 11, color: '#9CA3AF' }}>{m.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div style={{ background: '#F9FAFB', borderRadius: 12, padding: 16, marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: '#6B7280' }}>Featured Listing (30 hari)</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#1F2937' }}>Rp 50.000</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid #E5E7EB' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#1F2937' }}>Total</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)' }}>Rp 50.000</span>
            </div>
          </div>

          <button disabled={!selectedJob}
            style={{
              width: '100%', padding: '14px 24px', borderRadius: 12, border: 'none', fontSize: 15, fontWeight: 700, cursor: selectedJob ? 'pointer' : 'not-allowed',
              background: selectedJob ? 'var(--primary)' : '#D1D5DB', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
            <Zap size={18} /> Bayar & Upgrade Sekarang
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', marginTop: 12 }}>
            <Shield size={12} style={{ color: '#10B981' }} />
            <span style={{ fontSize: 11, color: '#9CA3AF' }}>Pembayaran aman & terenkripsi</span>
          </div>
        </div>

        {/* Transaction History */}
        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F3F4F6', padding: 24 }}>
          <h2 style={{ fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 20 }}>Riwayat Transaksi</h2>
          {mockTransactions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 32, color: '#9CA3AF' }}>
              <CreditCard size={32} style={{ margin: '0 auto 8px', color: '#D1D5DB' }} />
              <p>Belum ada transaksi</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {mockTransactions.map(t => (
                <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #F9FAFB', flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#1F2937' }}>{t.job}</div>
                    <div style={{ fontSize: 12, color: '#9CA3AF' }}>{t.id} · {t.date}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#1F2937' }}>Rp {t.amount.toLocaleString('id-ID')}</div>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 20, background: '#D1FAE5', color: '#065F46' }}>Berhasil</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  )
}
