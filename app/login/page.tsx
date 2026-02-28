'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Briefcase, Eye, EyeOff, LogIn } from 'lucide-react'

export default function LoginPage() {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center" style={{background:'var(--bg)'}}>
      <div className="w-full max-w-md px-4">
        {/* Logo */}
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

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h1 className="font-bold text-2xl text-gray-900 mb-1">Masuk ke Akun</h1>
          <p className="text-sm text-gray-500 mb-6">Masuk sebagai perusahaan atau pencari kerja</p>

          <form className="space-y-4" action="/api/auth/signin/credentials" method="POST">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input type="email" name="email" required placeholder="email@perusahaan.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input type={show ? 'text' : 'password'} name="password" required placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all pr-10"/>
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {show ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-60"
              style={{background:'var(--primary)'}}>
              <LogIn size={16}/> {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500 space-y-2">
            <p>Belum punya akun?</p>
            <div className="flex gap-3 justify-center">
              <Link href="/daftar-pencari-kerja" className="font-semibold hover:underline" style={{color:'var(--primary)'}}>
                Daftar Pencari Kerja
              </Link>
              <span className="text-gray-300">|</span>
              <Link href="/daftar" className="font-semibold hover:underline" style={{color:'var(--primary)'}}>
                Daftar Perusahaan
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-600">← Kembali ke Beranda</Link>
        </div>
      </div>
    </div>
  )
}
