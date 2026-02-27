'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Briefcase, ChevronLeft, Info } from 'lucide-react'
import { AREAS, JOB_TYPES, CATEGORIES, EDUCATION } from '@/lib/constants'

export default function PasangLokerPage() {
  const [featured, setFeatured] = useState(false)

  return (
    <div className="min-h-screen" style={{background:'var(--bg)'}}>
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/dashboard" className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors">
            <ChevronLeft size={18}/>
          </Link>
          <div>
            <h1 className="font-bold text-lg text-gray-900">Pasang Lowongan Baru</h1>
            <p className="text-xs text-gray-500">Isi form berikut dengan lengkap dan benar</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <form className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full text-xs flex items-center justify-center text-white font-bold" style={{background:'var(--primary)'}}>1</span>
              Informasi Dasar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Posisi / Jabatan <span className="text-red-500">*</span></label>
                <input type="text" required placeholder="cth: Operator Produksi, Staff Admin, Desainer Grafis"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Kategori <span className="text-red-500">*</span></label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-all">
                  <option value="">Pilih kategori...</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Tipe Kerja <span className="text-red-500">*</span></label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-all">
                  {Object.entries(JOB_TYPES).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Wilayah <span className="text-red-500">*</span></label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-all">
                  {Object.entries(AREAS).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Kota/Kecamatan</label>
                <input type="text" placeholder="cth: Kajen, Batang Kota, Pemalang Kota"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-all"/>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Alamat Lengkap</label>
                <input type="text" placeholder="cth: Jl. Tentara Pelajar No.5, Pekalongan"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-all"/>
              </div>
            </div>
          </div>

          {/* Salary & Requirements */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full text-xs flex items-center justify-center text-white font-bold" style={{background:'var(--primary)'}}>2</span>
              Gaji & Persyaratan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Gaji Minimum (Rp)</label>
                <input type="number" placeholder="cth: 2500000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-all"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Gaji Maksimum (Rp)</label>
                <input type="number" placeholder="cth: 4000000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-all"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">atau Teks Gaji</label>
                <input type="text" placeholder="cth: Negosiasi, UMR+Tunjangan, Rp 3jt-4jt"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-all"/>
                <p className="text-xs text-gray-400 mt-1">Jika diisi, mengabaikan range gaji di atas</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Pendidikan Minimum</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-all">
                  {EDUCATION.map(e => <option key={e}>{e}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Pengalaman</label>
                <input type="text" placeholder="cth: Fresh Graduate / 1-2 Tahun / Tidak Diutamakan"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-all"/>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full text-xs flex items-center justify-center text-white font-bold" style={{background:'var(--primary)'}}>3</span>
              Deskripsi & Persyaratan
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi Pekerjaan <span className="text-red-500">*</span></label>
                <textarea rows={6} required placeholder="Jelaskan tanggung jawab, benefit, dan informasi lengkap posisi ini..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-all resize-none"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Persyaratan Khusus</label>
                <textarea rows={4} placeholder="Usia, keahlian khusus, lokasi domisili, dll..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-all resize-none"/>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full text-xs flex items-center justify-center text-white font-bold" style={{background:'var(--primary)'}}>4</span>
              Cara Melamar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nomor WhatsApp</label>
                <input type="text" placeholder="cth: 081234567890"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-all"/>
                <p className="text-xs text-gray-400 mt-1">Pelamar akan direct apply via WA</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Link Apply / Email</label>
                <input type="text" placeholder="https://form.example.com atau email@perusahaan.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-all"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Loker Berlaku Hingga</label>
                <input type="date"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-all"/>
              </div>
            </div>
          </div>

          {/* Featured Option */}
          <div className={`rounded-2xl border-2 p-6 transition-all cursor-pointer ${featured ? 'border-yellow-400' : 'border-gray-100 bg-white'}`}
            style={featured ? {background:'#FFFBEB'} : {background:'white'}}
            onClick={() => setFeatured(!featured)}>
            <div className="flex items-start gap-4">
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${featured ? 'border-yellow-400' : 'border-gray-300'}`}
                style={featured ? {background:'var(--accent)'} : {}}>
                {featured && <span className="text-xs text-gray-900 font-bold">✓</span>}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-900">⭐ Featured Listing</span>
                  <span className="badge text-xs" style={{background:'#FEF3C7', color:'#92400E'}}>Rp 50.000 / 30 hari</span>
                </div>
                <p className="text-sm text-gray-600">Loker tampil di posisi teratas, badge khusus, dan otomatis diposting ke Instagram LokerPekalonganRaya (jangkauan lebih luas).</p>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-3">
            <Link href="/dashboard" className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 text-center hover:bg-gray-50 transition-colors">
              Batal
            </Link>
            <button type="submit" className="flex-2 flex-1 py-3 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity" style={{background:'var(--primary)'}}>
              {featured ? '✨ Kirim & Upgrade Featured' : 'Kirim untuk Review'}
            </button>
          </div>

          <div className="flex items-start gap-2 p-4 rounded-xl bg-blue-50">
            <Info size={16} className="text-blue-500 flex-shrink-0 mt-0.5"/>
            <p className="text-xs text-blue-700">Loker Anda akan ditinjau oleh tim admin sebelum ditampilkan ke publik (biasanya dalam 2-6 jam). Anda akan mendapat notifikasi email setelah disetujui.</p>
          </div>
        </form>
      </div>
    </div>
  )
}
