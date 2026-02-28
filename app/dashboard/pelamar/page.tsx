'use client'
import { useState } from 'react'
import { Users, Search, Mail, Phone, Download, ChevronDown, Eye, Check, X as XIcon } from 'lucide-react'
import DashboardShell from '@/components/DashboardShell'

const mockApplicants = [
  { id: 1, name: 'Ahmad Rizky', email: 'ahmad@gmail.com', phone: '081234567890', job: 'Operator Produksi Batik', status: 'NEW', appliedAt: '18 Jan 2025' },
  { id: 2, name: 'Siti Nurhaliza', email: 'siti.n@gmail.com', phone: '085612345678', job: 'Staff Admin & Keuangan', status: 'REVIEWED', appliedAt: '17 Jan 2025' },
  { id: 3, name: 'Budi Santoso', email: 'budi.s@yahoo.com', phone: '087812345678', job: 'Operator Produksi Batik', status: 'ACCEPTED', appliedAt: '16 Jan 2025' },
  { id: 4, name: 'Dewi Lestari', email: 'dewi.l@gmail.com', phone: '082112345678', job: 'Staff Admin & Keuangan', status: 'REJECTED', appliedAt: '15 Jan 2025' },
  { id: 5, name: 'Rudi Hermawan', email: 'rudi.h@gmail.com', phone: '089912345678', job: 'Kasir Toko Batik', status: 'NEW', appliedAt: '18 Jan 2025' },
  { id: 6, name: 'Anisa Putri', email: 'anisa.p@gmail.com', phone: '081398765432', job: 'Marketing Online', status: 'REVIEWED', appliedAt: '14 Jan 2025' },
]

const statusConfig: Record<string, { label: string; bg: string; color: string }> = {
  NEW: { label: 'Baru', bg: '#DBEAFE', color: '#1E40AF' },
  REVIEWED: { label: 'Ditinjau', bg: '#FEF3C7', color: '#92400E' },
  ACCEPTED: { label: 'Diterima', bg: '#D1FAE5', color: '#065F46' },
  REJECTED: { label: 'Ditolak', bg: '#FEE2E2', color: '#991B1B' },
}

export default function PelamarPage() {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('ALL')

  const filtered = mockApplicants.filter(a => {
    if (filterStatus !== 'ALL' && a.status !== filterStatus) return false
    if (search && !a.name.toLowerCase().includes(search.toLowerCase()) && !a.job.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <DashboardShell
      title="Data Pelamar"
      subtitle={`${mockApplicants.length} pelamar total`}
      activePath="/dashboard/pelamar"
      actions={
        <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 12, fontSize: 14, fontWeight: 600, color: '#4B5563', border: '1px solid #E5E7EB', background: 'white', cursor: 'pointer' }}>
          <Download size={16} /> Export CSV
        </button>
      }
    >
      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {(['ALL', 'NEW', 'REVIEWED', 'ACCEPTED', 'REJECTED'] as const).map(s => (
          <button key={s} onClick={() => setFilterStatus(s)}
            style={{
              padding: '8px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer',
              background: filterStatus === s ? 'var(--primary)' : 'white',
              color: filterStatus === s ? 'white' : '#6B7280',
            }}>
            {s === 'ALL' ? 'Semua' : statusConfig[s]?.label || s}
          </button>
        ))}
      </div>

      {/* Search */}
      <div style={{ marginBottom: 16, position: 'relative' }}>
        <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
        <input
          type="text" placeholder="Cari nama pelamar atau posisi..."
          value={search} onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 14, outline: 'none' }}
        />
      </div>

      {/* Applicant List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.length === 0 ? (
          <div style={{ background: 'white', borderRadius: 16, padding: 48, textAlign: 'center' }}>
            <Users size={40} style={{ color: '#D1D5DB', margin: '0 auto 12px' }} />
            <p style={{ fontWeight: 600, color: '#6B7280' }}>Tidak ada pelamar ditemukan</p>
          </div>
        ) : (
          filtered.map(a => {
            const st = statusConfig[a.status] || statusConfig.NEW
            return (
              <div key={a.id} style={{ background: 'white', borderRadius: 16, border: '1px solid #F3F4F6', padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', flex: 1, minWidth: 0 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 20, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--primary)', fontSize: 16, flexShrink: 0 }}>
                      {a.name.charAt(0)}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 14, color: '#1F2937' }}>{a.name}</div>
                      <div style={{ fontSize: 12, color: '#6B7280' }}>Melamar: {a.job}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, padding: '2px 10px', borderRadius: 20, background: st.bg, color: st.color, flexShrink: 0 }}>{st.label}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 12, color: '#6B7280', marginBottom: 12, paddingLeft: 52 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Mail size={11} /> {a.email}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Phone size={11} /> {a.phone}</span>
                  <span>Dilamar: {a.appliedAt}</span>
                </div>
                <div style={{ display: 'flex', gap: 8, paddingLeft: 52 }}>
                  <button style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid #E5E7EB', background: 'white', fontSize: 12, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: '#4B5563' }}>
                    <Eye size={12} /> Lihat Detail
                  </button>
                  {a.status === 'NEW' && (
                    <>
                      <button style={{ padding: '6px 12px', borderRadius: 8, border: 'none', background: '#D1FAE5', fontSize: 12, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: '#065F46' }}>
                        <Check size={12} /> Terima
                      </button>
                      <button style={{ padding: '6px 12px', borderRadius: 8, border: 'none', background: '#FEE2E2', fontSize: 12, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: '#991B1B' }}>
                        <XIcon size={12} /> Tolak
                      </button>
                    </>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>
    </DashboardShell>
  )
}
