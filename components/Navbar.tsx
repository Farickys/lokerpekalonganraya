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
        <div className="md:hidden" style={{background:'white', borderTop:'1px solid #F3F4F6', padding:'12px 16px 16px'}}>
          <div style={{display:'flex', flexDirection:'column', gap:4}}>
            <Link href="/loker" style={{fontSize:14, fontWeight:500, color:'#374151', padding:'10px 12px', borderRadius:8, textDecoration:'none'}} onClick={() => setOpen(false)}>Cari Loker</Link>
            <Link href="/loker?area=KOTA_PEKALONGAN" style={{fontSize:14, fontWeight:500, color:'#374151', padding:'10px 12px', borderRadius:8, textDecoration:'none'}} onClick={() => setOpen(false)}>Kota Pekalongan</Link>
            <Link href="/loker?area=BATANG" style={{fontSize:14, fontWeight:500, color:'#374151', padding:'10px 12px', borderRadius:8, textDecoration:'none'}} onClick={() => setOpen(false)}>Batang</Link>
            <Link href="/loker?area=PEMALANG" style={{fontSize:14, fontWeight:500, color:'#374151', padding:'10px 12px', borderRadius:8, textDecoration:'none'}} onClick={() => setOpen(false)}>Pemalang</Link>
            <hr style={{border:'none', borderTop:'1px solid #F3F4F6', margin:'4px 0'}}/>
            <Link href="/login" style={{fontSize:14, fontWeight:600, color:'#374151', padding:'10px 12px', borderRadius:8, textDecoration:'none'}} onClick={() => setOpen(false)}>Masuk</Link>
            <Link href="/daftar" className="btn-primary" style={{justifyContent:'center', fontSize:14, marginTop:4}} onClick={() => setOpen(false)}>Pasang Loker Gratis</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
