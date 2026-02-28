'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Plus, Eye, Users, Edit, Trash2, Star, Search, Filter, MoreVertical, RefreshCw } from 'lucide-react'
import DashboardShell from '@/components/DashboardShell'

const mockJobs = [
  { id: 1, title: 'Operator Produksi Batik', status: 'ACTIVE', featured: true, views: 234, apply: 18, createdAt: '15 Jan 2025', expiredAt: '15 Feb 2025' },
  { id: 2, title: 'Staff Admin & Keuangan', status: 'ACTIVE', featured: false, views: 189, apply: 24, createdAt: '12 Jan 2025', expiredAt: '12 Feb 2025' },
  { id: 3, title: 'Desainer Batik', status: 'PENDING', featured: false, views: 0, apply: 0, createdAt: '16 Jan 2025', expiredAt: '16 Feb 2025' },
  { id: 4, title: 'Sopir Pengiriman', status: 'CLOSED', featured: false, views: 312, apply: 45, createdAt: '01 Jan 2025', expiredAt: '01 Feb 2025' },
  { id: 5, title: 'Kasir Toko Batik', status: 'ACTIVE', featured: false, views: 98, apply: 7, createdAt: '18 Jan 2025', expiredAt: '18 Feb 2025' },
  { id: 6, title: 'Marketing Online', status: 'EXPIRED', featured: false, views: 456, apply: 32, createdAt: '01 Dec 2024', expiredAt: '01 Jan 2025' },
]

const statusConfig: Record<string, { label: string; bg: string; color: string }> = {
  ACTIVE: { label: 'Aktif', bg: '#D1FAE5', color: '#065F46' },
  PENDING: { label: 'Menunggu Review', bg: '#FEF3C7', color: '#92400E' },
  CLOSED: { label: 'Ditutup', bg: '#F3F4F6', color: '#6B7280' },
  EXPIRED: { label: 'Kedaluwarsa', bg: '#FEE2E2', color: '#991B1B' },
  REJECTED: { label: 'Ditolak', bg: '#FEE2E2', color: '#991B1B' },
}

export default function KelolaLokerPage() {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [menuOpen, setMenuOpen] = useState<number | null>(null)

  const filtered = mockJobs.filter(j => {
    if (filterStatus !== 'ALL' && j.status !== filterStatus) return false
    if (search && !j.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const counts = {
    ALL: mockJobs.length,
    ACTIVE: mockJobs.filter(j => j.status === 'ACTIVE').length,
    PENDING: mockJobs.filter(j => j.status === 'PENDING').length,
    CLOSED: mockJobs.filter(j => j.status === 'CLOSED').length,
    EXPIRED: mockJobs.filter(j => j.status === 'EXPIRED').length,
  }

  return (
    <DashboardShell
      title="Kelola Loker"
      subtitle={`${mockJobs.length} lowongan total`}
      activePath="/dashboard/loker"
      actions={
        <Link href="/dashboard/pasang-loker" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 12, fontSize: 14, fontWeight: 600, color: 'white', textDecoration: 'none', background: 'var(--primary)' }}>
          <Plus size={16} /> Pasang Loker
        </Link>
      }
    >
      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {(['ALL', 'ACTIVE', 'PENDING', 'CLOSED', 'EXPIRED'] as const).map(s => (
          <button key={s} onClick={() => setFilterStatus(s)}
            style={{
              padding: '8px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer',
              background: filterStatus === s ? 'var(--primary)' : 'white',
              color: filterStatus === s ? 'white' : '#6B7280',
            }}>
            {s === 'ALL' ? 'Semua' : statusConfig[s]?.label || s} ({counts[s] || 0})
          </button>
        ))}
      </div>

      {/* Search */}
      <div style={{ marginBottom: 16, position: 'relative' }}>
        <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
        <input
          type="text" placeholder="Cari lowongan..."
          value={search} onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 14, outline: 'none' }}
        />
      </div>

      {/* Job List */}
      <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F3F4F6', overflow: 'hidden' }}>
        {filtered.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', color: '#9CA3AF' }}>
            <Filter size={40} style={{ margin: '0 auto 12px', color: '#D1D5DB' }} />
            <p style={{ fontWeight: 600, color: '#6B7280' }}>Tidak ada lowongan ditemukan</p>
            <p style={{ fontSize: 13 }}>Ubah filter atau kata kunci pencarian</p>
          </div>
        ) : (
          <>
            {/* Mobile Card View */}
            <div className="dash-mobile-view">
              {filtered.map(job => {
                const st = statusConfig[job.status] || statusConfig.PENDING
                return (
                  <div key={job.id} style={{ padding: 16, borderBottom: '1px solid #F9FAFB' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 0 }}>
                        {job.featured && <Star size={12} style={{ color: '#EAB308', fill: '#EAB308', flexShrink: 0 }} />}
                        <span style={{ fontWeight: 600, fontSize: 14, color: '#1F2937', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{job.title}</span>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, padding: '2px 10px', borderRadius: 20, background: st.bg, color: st.color, flexShrink: 0 }}>{st.label}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#6B7280', marginBottom: 8 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Eye size={11} /> {job.views}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Users size={11} /> {job.apply}</span>
                      <span>Berakhir: {job.expiredAt}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid #E5E7EB', background: 'white', fontSize: 12, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: '#4B5563' }}>
                        <Edit size={12} /> Edit
                      </button>
                      {job.status === 'EXPIRED' && (
                        <button style={{ padding: '6px 12px', borderRadius: 8, border: 'none', background: '#EFF6FF', fontSize: 12, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: 'var(--primary)' }}>
                          <RefreshCw size={12} /> Perpanjang
                        </button>
                      )}
                      <button style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid #FEE2E2', background: '#FEF2F2', fontSize: 12, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: '#EF4444' }}>
                        <Trash2 size={12} /> Hapus
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Desktop Table View */}
            <div className="dash-desktop-view" style={{ display: 'none', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', fontSize: 12, color: '#9CA3AF', fontWeight: 500, borderBottom: '1px solid #F3F4F6' }}>
                    <th style={{ padding: '12px 20px' }}>Posisi</th>
                    <th style={{ padding: '12px 20px' }}>Status</th>
                    <th style={{ padding: '12px 20px' }}>Dilihat</th>
                    <th style={{ padding: '12px 20px' }}>Pelamar</th>
                    <th style={{ padding: '12px 20px' }}>Berakhir</th>
                    <th style={{ padding: '12px 20px' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(job => {
                    const st = statusConfig[job.status] || statusConfig.PENDING
                    return (
                      <tr key={job.id} style={{ borderBottom: '1px solid #F9FAFB' }}>
                        <td style={{ padding: '14px 20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, fontSize: 14, color: '#1F2937' }}>
                            {job.featured && <Star size={12} style={{ color: '#EAB308', fill: '#EAB308' }} />}
                            {job.title}
                          </div>
                        </td>
                        <td style={{ padding: '14px 20px' }}>
                          <span style={{ fontSize: 12, fontWeight: 600, padding: '2px 10px', borderRadius: 20, background: st.bg, color: st.color }}>{st.label}</span>
                        </td>
                        <td style={{ padding: '14px 20px', fontSize: 14, color: '#4B5563' }}>{job.views}</td>
                        <td style={{ padding: '14px 20px', fontSize: 14, color: '#4B5563' }}>{job.apply}</td>
                        <td style={{ padding: '14px 20px', fontSize: 13, color: '#6B7280' }}>{job.expiredAt}</td>
                        <td style={{ padding: '14px 20px' }}>
                          <div style={{ display: 'flex', gap: 4, position: 'relative' }}>
                            <button style={{ padding: 6, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', color: '#6B7280' }} title="Edit">
                              <Edit size={15} />
                            </button>
                            <button onClick={() => setMenuOpen(menuOpen === job.id ? null : job.id)}
                              style={{ padding: 6, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', color: '#6B7280' }}>
                              <MoreVertical size={15} />
                            </button>
                            {menuOpen === job.id && (
                              <div style={{ position: 'absolute', right: 0, top: 36, background: 'white', borderRadius: 12, boxShadow: '0 4px 24px rgba(0,0,0,0.12)', zIndex: 10, padding: 6, minWidth: 160 }}>
                                {job.status === 'EXPIRED' && (
                                  <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', width: '100%', fontSize: 13, color: 'var(--primary)' }}>
                                    <RefreshCw size={14} /> Perpanjang
                                  </button>
                                )}
                                {!job.featured && job.status === 'ACTIVE' && (
                                  <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', width: '100%', fontSize: 13, color: '#EAB308' }}>
                                    <Star size={14} /> Upgrade Featured
                                  </button>
                                )}
                                <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', width: '100%', fontSize: 13, color: '#EF4444' }}>
                                  <Trash2 size={14} /> Hapus
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <style>{`
        .dash-mobile-view { display: block; }
        .dash-desktop-view { display: none !important; }
        @media (min-width: 640px) {
          .dash-mobile-view { display: none !important; }
          .dash-desktop-view { display: block !important; }
        }
      `}</style>
    </DashboardShell>
  )
}
