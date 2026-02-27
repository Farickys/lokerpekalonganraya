'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Briefcase, ChevronDown } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background:'var(--primary)'}}>
              <Briefcase size={18} color="white" />
            </div>
            <div>
              <span className="font-bold text-lg" style={{color:'var(--primary)'}}>Loker</span>
              <span className="font-bold text-lg" style={{color:'var(--accent)'}}>PekalonganRaya</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/loker" className="text-sm font-medium text-gray-600 hover:text-blue-700 transition-colors">Cari Loker</Link>
            <Link href="/loker?area=KOTA_PEKALONGAN" className="text-sm font-medium text-gray-600 hover:text-blue-700 transition-colors">Kota Pekalongan</Link>
            <Link href="/loker?area=BATANG" className="text-sm font-medium text-gray-600 hover:text-blue-700 transition-colors">Batang</Link>
            <Link href="/loker?area=PEMALANG" className="text-sm font-medium text-gray-600 hover:text-blue-700 transition-colors">Pemalang</Link>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-sm font-semibold px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
              Masuk
            </Link>
            <Link href="/daftar" className="text-sm font-semibold px-4 py-2 rounded-lg text-white transition-all hover:opacity-90" style={{background:'var(--primary)'}}>
              Pasang Loker
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
          <div className="flex flex-col gap-3 pt-3">
            <Link href="/loker" className="text-sm font-medium text-gray-700 py-2" onClick={() => setOpen(false)}>Cari Loker</Link>
            <Link href="/loker?area=KOTA_PEKALONGAN" className="text-sm font-medium text-gray-700 py-2" onClick={() => setOpen(false)}>Kota Pekalongan</Link>
            <Link href="/loker?area=BATANG" className="text-sm font-medium text-gray-700 py-2" onClick={() => setOpen(false)}>Batang</Link>
            <Link href="/loker?area=PEMALANG" className="text-sm font-medium text-gray-700 py-2" onClick={() => setOpen(false)}>Pemalang</Link>
            <hr />
            <Link href="/login" className="text-sm font-semibold text-gray-700 py-2" onClick={() => setOpen(false)}>Masuk</Link>
            <Link href="/daftar" className="btn-primary justify-center text-sm" onClick={() => setOpen(false)}>Pasang Loker Gratis</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
