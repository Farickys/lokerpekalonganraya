import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import JobCard from '@/components/JobCard'
import { Search, MapPin, Briefcase, ChevronRight, Zap, Shield, Bell, Building2 } from 'lucide-react'
import { CATEGORIES, AREAS } from '@/lib/constants'

const mockJobs = [
  { id:1, slug:'operator-produksi-pt-batik-mahkota-1', title:'Operator Produksi Batik', city:'Pekalongan', area:'KOTA_PEKALONGAN', jobType:'FULLTIME', salary:'Rp 2.500.000 – 3.000.000', salaryMin:2500000, salaryMax:3000000, category:'Tekstil & Batik', featured:true, source:'COMPANY', createdAt: new Date('2025-01-15'), company:{name:'PT Batik Mahkota', logo:null}},
  { id:2, slug:'staff-admin-kantor-2', title:'Staff Administrasi & Keuangan', city:'Batang', area:'BATANG', jobType:'FULLTIME', salary:null, salaryMin:null, salaryMax:null, category:'Admin & Sekretaris', featured:false, source:'COMPANY', createdAt: new Date('2025-01-14'), company:{name:'CV Maju Jaya Batang', logo:null}},
  { id:3, slug:'driver-kurir-ojek-online-3', title:'Driver / Kurir Pengiriman', city:'Pemalang', area:'PEMALANG', jobType:'PARTTIME', salary:'Rp 150.000/hari', salaryMin:null, salaryMax:null, category:'Transportasi & Logistik', featured:false, source:'SCRAPED_IG', createdAt: new Date('2025-01-13'), company:null, sourceImage:null},
  { id:4, slug:'kasir-minimarket-4', title:'Kasir & SPG Minimarket', city:'Pekalongan', area:'KOTA_PEKALONGAN', jobType:'FULLTIME', salary:'UMR + Tunjangan', salaryMin:null, salaryMax:null, category:'Retail & Sales', featured:false, source:'SCRAPED_FB', createdAt: new Date('2025-01-12'), company:null, sourceImage:null},
  { id:5, slug:'teknisi-it-support-5', title:'Teknisi IT Support', city:'Pekalongan', area:'KOTA_PEKALONGAN', jobType:'FULLTIME', salary:'Rp 3.000.000 – 4.500.000', salaryMin:3000000, salaryMax:4500000, category:'Teknologi & IT', featured:false, source:'COMPANY', createdAt: new Date('2025-01-11'), company:{name:'Pekalongan Info Media', logo:null}},
  { id:6, slug:'barista-coffee-shop-6', title:'Barista & Staff Cafe', city:'Kab. Pekalongan', area:'KAB_PEKALONGAN', jobType:'PARTTIME', salary:'Rp 100.000/hari', salaryMin:null, salaryMax:null, category:'Kuliner & F&B', featured:false, source:'SCRAPED_IG', createdAt: new Date('2025-01-10'), company:null, sourceImage:null},
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* ── HERO ── */}
      <section className="hero-gradient py-16 sm:py-20">
        <div className="container-page max-w-2xl text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest mb-5 px-3.5 py-1.5 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
            ✦ Portal Loker #1 Pekalongan Raya
          </span>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-4">
            Temukan Karir<br/>
            <em>Impianmu</em> di Pekalongan Raya
          </h1>

          <p className="text-blue-200 text-sm sm:text-base mb-8 leading-relaxed max-w-md mx-auto">
            Ribuan lowongan dari Kota Pekalongan, Kab. Pekalongan, Batang &amp; Pemalang — diperbarui setiap hari.
          </p>

          {/* Search */}
          <form action="/loker" method="GET" className="search-form mb-5">
            <div className="search-input-wrap">
              <Search size={16} className="text-gray-400 flex-shrink-0"/>
              <input name="q" type="text" placeholder="Posisi, perusahaan, kata kunci..."
                className="flex-1 text-gray-900 outline-none text-sm py-4 bg-transparent border-none min-w-0"/>
            </div>
            <div className="search-select-wrap">
              <MapPin size={16} className="text-gray-400 flex-shrink-0"/>
              <select name="area" className="flex-1 text-gray-700 outline-none text-sm py-4 bg-transparent border-none min-w-0">
                <option value="">Semua Area</option>
                {Object.entries(AREAS).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div className="search-btn-wrap">
              <button type="submit" className="btn-primary">
                <Search size={15}/> Cari Loker
              </button>
            </div>
          </form>

          {/* Quick filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {['Tekstil & Batik','Teknologi & IT','Kuliner & F&B','Retail & Sales','Administrasi'].map(cat => (
              <Link key={cat} href={`/loker?category=${encodeURIComponent(cat)}`}
                className="text-xs px-3.5 py-1.5 rounded-full font-semibold text-white no-underline bg-white/10 border border-white/20 hover:bg-white/20 transition-colors">
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-white border-b border-gray-100 py-4 sm:py-6">
        <div className="container-page max-w-3xl">
          <div className="stats-bar">
            {[
              {label:'Loker Aktif', value:'1.200+'},
              {label:'Perusahaan', value:'340+'},
              {label:'Kota/Kabupaten', value:'4'},
              {label:'Pelamar Terbantu', value:'8.500+'},
            ].map((s,i) => (
              <div key={s.label} className="stats-item">
                <div className="font-black text-xl sm:text-2xl md:text-3xl" style={{color:'var(--primary)'}}>{s.value}</div>
                <div className="text-xs text-gray-500 mt-1 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOKER TERBARU ── */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-extrabold text-xl text-gray-900">Loker Terbaru</h2>
              <p className="text-sm text-gray-500 mt-1.5">Diperbarui dari berbagai sumber setiap hari</p>
            </div>
            <Link href="/loker" className="hidden sm:flex items-center gap-1 text-sm font-bold no-underline" style={{color:'var(--primary)'}}>
              Lihat semua <ChevronRight size={15}/>
            </Link>
          </div>

          <div className="jobs-grid">
            {mockJobs.map(job => <JobCard key={job.id} job={job as any}/>)}
          </div>

          <div className="text-center mt-10">
            <Link href="/loker" className="btn-primary inline-flex text-sm" style={{background:'var(--primary)', color:'white'}}>
              <Briefcase size={16}/> Lihat Semua Lowongan
            </Link>
          </div>
        </div>
      </section>

      {/* ── AREA ── */}
      <section className="py-16 sm:py-20" style={{background:'#EFF6FF'}}>
        <div className="container-page">
          <div className="text-center mb-10">
            <h2 className="font-extrabold text-xl text-gray-900 mb-2">Cari Loker per Wilayah</h2>
            <p className="text-sm text-gray-500 mt-2">Pilih wilayah terdekat Anda</p>
          </div>
          <div className="area-grid">
            {[
              {key:'KOTA_PEKALONGAN', name:'Kota Pekalongan', count:'420+'},
              {key:'KAB_PEKALONGAN', name:'Kab. Pekalongan', count:'280+'},
              {key:'BATANG', name:'Batang', count:'310+'},
              {key:'PEMALANG', name:'Pemalang', count:'190+'},
            ].map(area => (
              <Link key={area.key} href={`/loker?area=${area.key}`}
                className="bg-white rounded-2xl p-5 sm:p-6 text-center border border-blue-100 no-underline block hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{background:'var(--primary)', boxShadow:'0 4px 12px rgba(15,76,129,0.2)'}}>
                  <MapPin size={22} color="white"/>
                </div>
                <div className="font-bold text-sm text-gray-800 mb-1">{area.name}</div>
                <div className="text-xs font-bold mb-1" style={{color:'var(--primary)'}}>{area.count} loker</div>
                <div className="text-xs text-gray-400">Lihat Loker →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── KATEGORI ── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container-page">
          <div className="text-center mb-10">
            <h2 className="font-extrabold text-xl text-gray-900 mb-2">Kategori Pekerjaan</h2>
            <p className="text-sm text-gray-500 mt-2">Temukan loker sesuai bidang Anda</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map(cat => (
              <Link key={cat} href={`/loker?category=${encodeURIComponent(cat)}`}
                className="px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 no-underline hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors">
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="hero-gradient py-16 sm:py-20">
        <div className="container-page max-w-2xl text-center">
          <Building2 size={44} color="white" className="mx-auto mb-6 opacity-70"/>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white mb-5">
            Anda Punya Lowongan?
          </h2>
          <p className="text-blue-200 mb-10 leading-relaxed text-sm sm:text-base max-w-md mx-auto">
            Pasang lowongan gratis, jangkau ribuan pencari kerja di Pekalongan Raya. Upgrade ke Featured untuk tampil di posisi teratas &amp; otomatis dipost ke Instagram.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/daftar" className="btn-primary text-sm">
              <Zap size={16}/> Pasang Loker Gratis
            </Link>
            <Link href="/daftar" className="btn-secondary text-sm">
              Daftar Perusahaan
            </Link>
          </div>
        </div>
      </section>

      {/* ── FITUR ── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container-page">
          <h2 className="font-extrabold text-xl text-gray-900 text-center mb-12">
            Kenapa LokerPekalonganRaya?
          </h2>
          <div className="feature-grid">
            {[
              {icon:<Zap size={26} color="white"/>, title:'Diperbarui Setiap Hari', desc:'Loker dari Instagram, Facebook grup, dan perusahaan langsung — semua dikurasi oleh tim kami.', bg:'var(--primary)'},
              {icon:<Shield size={26} color="white"/>, title:'Loker Terverifikasi', desc:'Setiap lowongan dari perusahaan melewati proses verifikasi akun. Aman dari penipuan.', bg:'#10B981'},
              {icon:<Bell size={26} color="white"/>, title:'Notifikasi Loker Baru', desc:'Subscribe Telegram & WA untuk mendapat notifikasi loker sesuai kategori dan area pilihanmu.', bg:'#8B5CF6'},
            ].map(f => (
              <div key={f.title} className="flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl border border-gray-100">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-lg" style={{background:f.bg}}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">{f.title}</h3>
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
