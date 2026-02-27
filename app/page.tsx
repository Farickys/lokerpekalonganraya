import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import JobCard from '@/components/JobCard'
import { Search, MapPin, Briefcase, TrendingUp, Building2, ChevronRight, Zap, Shield, Bell } from 'lucide-react'
import { CATEGORIES, AREAS } from '@/lib/constants'

// Mock data for demo (real data comes from prisma)
const mockJobs = [
  { id:1, slug:'operator-produksi-pt-batik-mahkota-1', title:'Operator Produksi Batik', city:'Pekalongan', area:'KOTA_PEKALONGAN', jobType:'FULLTIME', salary:'Rp 2.500.000 – 3.000.000', salaryMin:2500000, salaryMax:3000000, category:'Tekstil & Batik', featured:true, source:'COMPANY', createdAt: new Date('2025-01-15'), company:{name:'PT Batik Mahkota', logo:null}},
  { id:2, slug:'staff-admin-kantor-2', title:'Staff Administrasi & Keuangan', city:'Batang', area:'BATANG', jobType:'FULLTIME', salary:null, salaryMin:null, salaryMax:null, category:'Admin & Sekretaris', featured:false, source:'COMPANY', createdAt: new Date('2025-01-14'), company:{name:'CV Maju Jaya Batang', logo:null}},
  { id:3, slug:'driver-kurir-ojek-online-3', title:'Driver / Kurir Pengiriman', city:'Pemalang', area:'PEMALANG', jobType:'PARTTIME', salary:'Rp 150.000/hari', salaryMin:null, salaryMax:null, category:'Transportasi & Logistik', featured:false, source:'SCRAPED_IG', createdAt: new Date('2025-01-13'), company:null, sourceImage:null},
  { id:4, slug:'kasir-minimarket-4', title:'Kasir & SPG Minimarket', city:'Pekalongan', area:'KOTA_PEKALONGAN', jobType:'FULLTIME', salary:'UMR + Tunjangan', salaryMin:null, salaryMax:null, category:'Retail & Sales', featured:false, source:'SCRAPED_FB', createdAt: new Date('2025-01-12'), company:null, sourceImage:null},
  { id:5, slug:'teknisi-it-support-5', title:'Teknisi IT Support', city:'Pekalongan', area:'KOTA_PEKALONGAN', jobType:'FULLTIME', salary:'Rp 3.000.000 – 4.500.000', salaryMin:3000000, salaryMax:4500000, category:'Teknologi & IT', featured:false, source:'COMPANY', createdAt: new Date('2025-01-11'), company:{name:'Pekalongan Info Media', logo:null}},
  { id:6, slug:'barista-coffee-shop-6', title:'Barista & Staff Cafe', city:'Kabupaten Pekalongan', area:'KAB_PEKALONGAN', jobType:'PARTTIME', salary:'Rp 100.000/hari', salaryMin:null, salaryMax:null, category:'Kuliner & F&B', featured:false, source:'SCRAPED_IG', createdAt: new Date('2025-01-10'), company:null, sourceImage:null},
]

const stats = [
  { label: 'Loker Aktif', value: '1.200+' },
  { label: 'Perusahaan', value: '340+' },
  { label: 'Kota/Kabupaten', value: '4' },
  { label: 'Pelamar Terbantu', value: '8.500+' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="hero-gradient text-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="animate-fade-in-up">
            <span className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full" style={{background:'rgba(245,158,11,0.2)', color:'#FCD34D', border:'1px solid rgba(245,158,11,0.3)'}}>
              ✦ Portal Loker #1 Pekalongan Raya
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-normal mb-4 leading-tight">
              Temukan Karir<br />
              <em>Impianmu</em> di Pekalongan Raya
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Ribuan lowongan dari Kota Pekalongan, Kab. Pekalongan, Batang & Pemalang — diperbarui setiap hari dari perusahaan, Instagram & Facebook.
            </p>
          </div>

          {/* Search Box */}
          <div className="animate-fade-in-up animation-delay-200 max-w-2xl mx-auto">
            <form action="/loker" method="GET" className="flex flex-col sm:flex-row gap-3 bg-white rounded-2xl p-2 shadow-2xl">
              <div className="flex-1 flex items-center gap-2 px-3">
                <Search size={18} className="text-gray-400 flex-shrink-0"/>
                <input name="q" type="text" placeholder="Posisi, perusahaan, atau kata kunci..." className="w-full text-gray-800 outline-none text-sm py-2" />
              </div>
              <div className="flex items-center gap-2 px-3 border-l border-gray-200 min-w-32">
                <MapPin size={18} className="text-gray-400 flex-shrink-0"/>
                <select name="area" className="text-gray-700 outline-none text-sm py-2 bg-transparent w-full">
                  <option value="">Semua Area</option>
                  {Object.entries(AREAS).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
              <button type="submit" className="btn-primary text-sm whitespace-nowrap">
                <Search size={16}/> Cari Loker
              </button>
            </form>
          </div>

          {/* Quick filters */}
          <div className="animate-fade-in-up animation-delay-300 flex flex-wrap justify-center gap-2 mt-5">
            {['Tekstil & Batik','Teknologi & IT','Kuliner & F&B','Retail & Sales'].map(cat => (
              <Link key={cat} href={`/loker?category=${encodeURIComponent(cat)}`}
                className="text-xs px-3 py-1.5 rounded-full font-medium transition-all hover:opacity-80"
                style={{background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.2)', color:'white'}}>
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {stats.map(s => (
              <div key={s.label} className="py-6 text-center">
                <div className="font-bold text-2xl md:text-3xl" style={{color:'var(--primary)'}}>{s.value}</div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured & Latest Jobs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-bold text-2xl text-gray-900">Loker Terbaru</h2>
            <p className="text-sm text-gray-500 mt-1">Diperbarui dari berbagai sumber setiap hari</p>
          </div>
          <Link href="/loker" className="flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all" style={{color:'var(--primary)'}}>
            Lihat semua <ChevronRight size={16}/>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockJobs.map(job => <JobCard key={job.id} job={job as any}/>)}
        </div>

        <div className="text-center mt-8">
          <Link href="/loker" className="btn-primary inline-flex" style={{background:'var(--primary)', color:'white'}}>
            <Briefcase size={16}/> Lihat Semua Lowongan
          </Link>
        </div>
      </section>

      {/* Browse by Area */}
      <section className="py-14" style={{background:'#F0F7FF'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-bold text-2xl text-gray-900 mb-2 text-center">Cari Loker per Wilayah</h2>
          <p className="text-gray-500 text-sm text-center mb-8">Pilih wilayah terdekat Anda</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(AREAS).map(([key, name]) => (
              <Link key={key} href={`/loker?area=${key}`}
                className="bg-white rounded-xl p-5 text-center border border-blue-50 hover:border-blue-200 hover:shadow-md transition-all group">
                <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{background:'var(--primary)'}}>
                  <MapPin size={20} color="white"/>
                </div>
                <div className="font-semibold text-gray-800 group-hover:text-blue-700">{name}</div>
                <div className="text-xs text-gray-400 mt-1">Lihat Loker →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-bold text-2xl text-gray-900 mb-2 text-center">Kategori Pekerjaan</h2>
          <p className="text-gray-500 text-sm text-center mb-8">Temukan loker sesuai bidang Anda</p>
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map(cat => (
              <Link key={cat} href={`/loker?category=${encodeURIComponent(cat)}`}
                className="px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-700 hover:shadow-sm transition-all">
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* For Companies CTA */}
      <section className="hero-gradient text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Building2 size={40} className="mx-auto mb-4 opacity-80"/>
          <h2 className="font-display text-3xl md:text-4xl mb-4">Anda Punya Lowongan?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Pasang lowongan gratis, jangkau ribuan pencari kerja di Pekalongan Raya. Bisa upgrade ke Featured untuk tampil di posisi teratas & otomatis dipost ke Instagram.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/daftar" className="btn-primary">
              <Zap size={16}/> Pasang Loker Gratis
            </Link>
            <Link href="/daftar" className="btn-secondary">
              Daftar Perusahaan
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-bold text-2xl text-gray-900 mb-10">Kenapa LokerPekalonganRaya?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Zap size={24} color="white"/>, title:'Diperbarui Setiap Hari', desc:'Loker dari Instagram, Facebook grup, dan perusahaan langsung — semua dikurasi oleh tim kami.', bg:'var(--primary)'},
              { icon: <Shield size={24} color="white"/>, title:'Loker Terverifikasi', desc:'Setiap lowongan dari perusahaan melewati proses verifikasi akun. Aman dari penipuan.', bg:'var(--success)'},
              { icon: <Bell size={24} color="white"/>, title:'Notifikasi Loker Baru', desc:'Subscribe Telegram & WA untuk mendapat notifikasi loker sesuai kategori dan area pilihanmu.', bg:'#8B5CF6'},
            ].map(f => (
              <div key={f.title} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-md" style={{background:f.bg}}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
