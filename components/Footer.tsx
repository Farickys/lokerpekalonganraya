import Link from 'next/link'
import { Briefcase, Instagram, Facebook, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background:'var(--primary)'}}>
                <Briefcase size={18} color="white"/>
              </div>
              <span className="font-bold text-white text-lg">LokerPekalonganRaya</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Portal lowongan kerja terpercaya untuk masyarakat Pekalongan Raya — Kota Pekalongan, Kabupaten Pekalongan, Batang, dan Pemalang.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors">
                <Instagram size={16}/>
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Facebook size={16}/>
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors">
                <MessageCircle size={16}/>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Cari Loker</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/loker?area=KOTA_PEKALONGAN" className="hover:text-white transition-colors">Kota Pekalongan</Link></li>
              <li><Link href="/loker?area=KAB_PEKALONGAN" className="hover:text-white transition-colors">Kab. Pekalongan</Link></li>
              <li><Link href="/loker?area=BATANG" className="hover:text-white transition-colors">Batang</Link></li>
              <li><Link href="/loker?area=PEMALANG" className="hover:text-white transition-colors">Pemalang</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Untuk Perusahaan</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/daftar" className="hover:text-white transition-colors">Daftar Perusahaan</Link></li>
              <li><Link href="/dashboard/pasang-loker" className="hover:text-white transition-colors">Pasang Lowongan</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-xs text-gray-500 flex flex-col md:flex-row justify-between gap-2">
          <span>© 2025 LokerPekalonganRaya. Bagian dari Pekalongan Info Media.</span>
          <span>Dibuat dengan ❤️ untuk masyarakat Pekalongan Raya</span>
        </div>
      </div>
    </footer>
  )
}
