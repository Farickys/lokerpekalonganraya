'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Briefcase, Building2, CheckCircle2 } from 'lucide-react'

export default function DaftarPage() {
  const [step, setStep] = useState(1)

  return (
    <div className="min-h-screen flex items-center justify-center py-12" style={{background:'var(--bg)'}}>
      <div className="w-full max-w-lg px-4">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:'var(--primary)'}}>
              <Briefcase size={20} color="white"/>
            </div>
            <span className="font-bold text-xl">
              <span style={{color:'var(--primary)'}}>Loker</span>
              <span style={{color:'var(--accent)'}}>PekalonganRaya</span>
            </span>
          </Link>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {[1,2,3].map(s => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all
                ${step >= s ? 'text-white' : 'bg-gray-200 text-gray-500'}`}
                style={step >= s ? {background:'var(--primary)'} : {}}>
                {step > s ? <CheckCircle2 size={16}/> : s}
              </div>
              {s < 3 && <div className={`w-12 h-0.5 transition-all ${step > s ? 'bg-blue-700' : 'bg-gray-200'}`}/>}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          {step === 1 && (
            <>
              <h1 className="font-bold text-xl text-gray-900 mb-1">Akun Perusahaan</h1>
              <p className="text-sm text-gray-500 mb-6">Buat akun untuk mengelola lowongan Anda</p>
              <form className="space-y-4" onSubmit={e => { e.preventDefault(); setStep(2) }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap</label>
                  <input type="text" required placeholder="Nama PIC / HRD"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-all"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input type="email" required placeholder="email@perusahaan.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-all"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                  <input type="password" required placeholder="Min. 8 karakter"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-all"/>
                </div>
                <button type="submit" className="w-full py-3 rounded-xl text-white font-semibold text-sm hover:opacity-90" style={{background:'var(--primary)'}}>
                  Lanjut →
                </button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="font-bold text-xl text-gray-900 mb-1">Profil Perusahaan</h1>
              <p className="text-sm text-gray-500 mb-6">Informasi tentang perusahaan Anda</p>
              <form className="space-y-4" onSubmit={e => { e.preventDefault(); setStep(3) }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Perusahaan</label>
                  <input type="text" required placeholder="PT / CV / UD..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-all"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Kota / Area</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-all">
                    <option>Kota Pekalongan</option>
                    <option>Kab. Pekalongan</option>
                    <option>Batang</option>
                    <option>Pemalang</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi Singkat</label>
                  <textarea rows={3} placeholder="Jelaskan bidang usaha perusahaan Anda..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-all resize-none"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Website (opsional)</label>
                  <input type="url" placeholder="https://perusahaan.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-all"/>
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600">← Kembali</button>
                  <button type="submit" className="flex-1 py-3 rounded-xl text-white font-semibold text-sm hover:opacity-90" style={{background:'var(--primary)'}}>Daftar →</button>
                </div>
              </form>
            </>
          )}

          {step === 3 && (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{background:'#D1FAE5'}}>
                <CheckCircle2 size={32} color="var(--success)"/>
              </div>
              <h2 className="font-bold text-xl text-gray-900 mb-2">Pendaftaran Berhasil!</h2>
              <p className="text-sm text-gray-500 mb-6">Akun Anda sedang diverifikasi oleh tim kami. Anda akan mendapat email konfirmasi dalam 1x24 jam.</p>
              <Link href="/dashboard" className="btn-primary inline-flex" style={{background:'var(--primary)', color:'white'}}>
                <Building2 size={16}/> Masuk ke Dashboard
              </Link>
            </div>
          )}
        </div>

        {step === 1 && (
          <p className="text-center mt-4 text-sm text-gray-500">
            Sudah punya akun?{' '}
            <Link href="/login" className="font-semibold hover:underline" style={{color:'var(--primary)'}}>Masuk</Link>
          </p>
        )}
      </div>
    </div>
  )
}
