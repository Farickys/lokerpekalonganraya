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
    <div className="min-h-screen" style={{background:'var(--bg)'}}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="hero-gradient hero-section">
        <div className="container-page" style={{maxWidth:672, textAlign:'center'}}>
          <span style={{display:'inline-block', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:20, padding:'6px 14px', borderRadius:999, background:'rgba(245,158,11,0.2)', color:'#FCD34D', border:'1px solid rgba(245,158,11,0.3)'}}>
            ✦ Portal Loker #1 Pekalongan Raya
          </span>

          <h1 className="font-display" style={{fontSize:'clamp(1.75rem, 5vw, 3rem)', color:'white', lineHeight:1.2, marginBottom:16}}>
            Temukan Karir<br/>
            <em>Impianmu</em> di Pekalongan Raya
          </h1>

          <p style={{color:'#93C5FD', fontSize:14, marginBottom:32, lineHeight:1.7, maxWidth:440, marginLeft:'auto', marginRight:'auto'}}>
            Ribuan lowongan dari Kota Pekalongan, Kab. Pekalongan, Batang &amp; Pemalang — diperbarui setiap hari.
          </p>

          {/* Search */}
          <form action="/loker" method="GET" className="search-form">
            <div className="search-input-wrap">
              <Search size={16} style={{color:'#9CA3AF', flexShrink:0}}/>
              <input name="q" type="text" placeholder="Posisi, perusahaan, kata kunci..."
                style={{flex:1, color:'#111827', outline:'none', fontSize:14, padding:'16px 0', background:'transparent', border:'none', minWidth:0}}/>
            </div>
            <div className="search-select-wrap">
              <MapPin size={16} style={{color:'#9CA3AF', flexShrink:0}}/>
              <select name="area" style={{flex:1, color:'#374151', outline:'none', fontSize:14, padding:'16px 0', background:'transparent', border:'none', minWidth:0}}>
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
          <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center', gap:8}}>
            {['Tekstil & Batik','Teknologi & IT','Kuliner & F&B','Retail & Sales','Administrasi'].map(cat => (
              <Link key={cat} href={`/loker?category=${encodeURIComponent(cat)}`}
                style={{fontSize:12, padding:'6px 14px', borderRadius:999, fontWeight:600, color:'white', textDecoration:'none', background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)'}}>
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{background:'white', borderBottom:'1px solid #f1f5f9', padding:'16px 0'}}>
        <div className="container-page" style={{maxWidth:768}}>
          <div className="stats-bar">
            {[
              {label:'Loker Aktif', value:'1.200+'},
              {label:'Perusahaan', value:'340+'},
              {label:'Kota/Kabupaten', value:'4'},
              {label:'Pelamar Terbantu', value:'8.500+'},
            ].map((s) => (
              <div key={s.label} className="stats-item">
                <div style={{fontWeight:900, fontSize:'clamp(1.25rem, 3vw, 1.875rem)', color:'var(--primary)'}}>{s.value}</div>
                <div style={{fontSize:12, color:'#6B7280', marginTop:4, fontWeight:500}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOKER TERBARU ── */}
      <section className="section-xl">
        <div className="container-page">
          <div className="section-title-row">
            <div>
              <h2>Loker Terbaru</h2>
              <p>Diperbarui dari berbagai sumber setiap hari</p>
            </div>
            <Link href="/loker" style={{display:'none', alignItems:'center', gap:4, fontSize:14, fontWeight:700, textDecoration:'none', color:'var(--primary)'}} className="sm-show-flex">
              Lihat semua <ChevronRight size={15}/>
            </Link>
          </div>

          <div className="jobs-grid">
            {mockJobs.map(job => <JobCard key={job.id} job={job as any}/>)}
          </div>

          <div style={{textAlign:'center', marginTop:40}}>
            <Link href="/loker" className="btn-primary" style={{display:'inline-flex', fontSize:14, background:'var(--primary)', color:'white'}}>
              <Briefcase size={16}/> Lihat Semua Lowongan
            </Link>
          </div>
        </div>
      </section>

      {/* ── AREA ── */}
      <section className="section-xl" style={{background:'#EFF6FF'}}>
        <div className="container-page">
          <div className="section-header">
            <h2>Cari Loker per Wilayah</h2>
            <p>Pilih wilayah terdekat Anda</p>
          </div>
          <div className="area-grid">
            {[
              {key:'KOTA_PEKALONGAN', name:'Kota Pekalongan', count:'420+'},
              {key:'KAB_PEKALONGAN', name:'Kab. Pekalongan', count:'280+'},
              {key:'BATANG', name:'Batang', count:'310+'},
              {key:'PEMALANG', name:'Pemalang', count:'190+'},
            ].map(area => (
              <Link key={area.key} href={`/loker?area=${area.key}`}
                style={{background:'white', borderRadius:16, padding:'20px 16px', textAlign:'center', border:'1px solid #BFDBFE', textDecoration:'none', display:'block', transition:'box-shadow 0.2s'}}>
                <div style={{width:48, height:48, borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px', background:'var(--primary)', boxShadow:'0 4px 12px rgba(15,76,129,0.2)'}}>
                  <MapPin size={22} color="white"/>
                </div>
                <div style={{fontWeight:700, fontSize:14, color:'#1F2937', marginBottom:4}}>{area.name}</div>
                <div style={{fontSize:12, fontWeight:700, marginBottom:4, color:'var(--primary)'}}>{area.count} loker</div>
                <div style={{fontSize:12, color:'#9CA3AF'}}>Lihat Loker →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── KATEGORI ── */}
      <section className="section-xl" style={{background:'white'}}>
        <div className="container-page">
          <div className="section-header">
            <h2>Kategori Pekerjaan</h2>
            <p>Temukan loker sesuai bidang Anda</p>
          </div>
          <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center', gap:12}}>
            {CATEGORIES.map(cat => (
              <Link key={cat} href={`/loker?category=${encodeURIComponent(cat)}`}
                style={{padding:'12px 20px', background:'#F9FAFB', border:'1px solid #E5E7EB', borderRadius:12, fontSize:14, fontWeight:600, color:'#374151', textDecoration:'none'}}>
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="hero-gradient section-xl">
        <div className="container-page" style={{maxWidth:672, textAlign:'center'}}>
          <Building2 size={44} color="white" style={{margin:'0 auto 24px', opacity:0.7}}/>
          <h2 className="font-display" style={{fontSize:'clamp(1.5rem, 4vw, 2.25rem)', color:'white', marginBottom:20}}>
            Anda Punya Lowongan?
          </h2>
          <p style={{color:'#93C5FD', marginBottom:40, lineHeight:1.7, fontSize:14, maxWidth:440, marginLeft:'auto', marginRight:'auto'}}>
            Pasang lowongan gratis, jangkau ribuan pencari kerja di Pekalongan Raya. Upgrade ke Featured untuk tampil di posisi teratas &amp; otomatis dipost ke Instagram.
          </p>
          <div style={{display:'flex', flexDirection:'column', gap:12, justifyContent:'center', alignItems:'center'}}>
            <Link href="/daftar" className="btn-primary" style={{fontSize:14}}>
              <Zap size={16}/> Pasang Loker Gratis
            </Link>
            <Link href="/daftar" className="btn-secondary" style={{fontSize:14}}>
              Daftar Perusahaan
            </Link>
          </div>
        </div>
      </section>

      {/* ── FITUR ── */}
      <section className="section-xl" style={{background:'white'}}>
        <div className="container-page">
          <div className="section-header" style={{marginBottom:40}}>
            <h2>Kenapa LokerPekalonganRaya?</h2>
          </div>
          <div className="feature-grid">
            {[
              {icon:<Zap size={26} color="white"/>, title:'Diperbarui Setiap Hari', desc:'Loker dari Instagram, Facebook grup, dan perusahaan langsung — semua dikurasi oleh tim kami.', bg:'var(--primary)'},
              {icon:<Shield size={26} color="white"/>, title:'Loker Terverifikasi', desc:'Setiap lowongan dari perusahaan melewati proses verifikasi akun. Aman dari penipuan.', bg:'#10B981'},
              {icon:<Bell size={26} color="white"/>, title:'Notifikasi Loker Baru', desc:'Subscribe Telegram & WA untuk mendapat notifikasi loker sesuai kategori dan area pilihanmu.', bg:'#8B5CF6'},
            ].map(f => (
              <div key={f.title} style={{display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', padding:'24px 20px', borderRadius:16, border:'1px solid #F3F4F6'}}>
                <div style={{width:56, height:56, borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:20, boxShadow:'0 4px 12px rgba(0,0,0,0.1)', background:f.bg}}>
                  {f.icon}
                </div>
                <h3 style={{fontWeight:700, color:'#111827', marginBottom:8, fontSize:15}}>{f.title}</h3>
                <p style={{fontSize:14, color:'#6B7280', lineHeight:1.6}}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
