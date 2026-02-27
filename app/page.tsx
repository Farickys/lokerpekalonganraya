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

const stats = [
  { label: 'Loker Aktif', value: '1.200+' },
  { label: 'Perusahaan', value: '340+' },
  { label: 'Kota/Kabupaten', value: '4' },
  { label: 'Pelamar Terbantu', value: '8.500+' },
]

const areaData = [
  { key: 'KOTA_PEKALONGAN', name: 'Kota Pekalongan', count: '420+' },
  { key: 'KAB_PEKALONGAN', name: 'Kab. Pekalongan', count: '280+' },
  { key: 'BATANG', name: 'Batang', count: '310+' },
  { key: 'PEMALANG', name: 'Pemalang', count: '190+' },
]

export default function HomePage() {
  return (
    <div style={{minHeight:'100vh', background:'var(--bg)'}}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="hero-gradient" style={{padding:'64px 0'}}>
        <div className="container-page" style={{textAlign:'center'}}>
          
          <span style={{
            display:'inline-block', fontSize:'11px', fontWeight:700,
            textTransform:'uppercase', letterSpacing:'0.1em',
            marginBottom:'20px', padding:'6px 14px', borderRadius:'999px',
            background:'rgba(245,158,11,0.2)', color:'#FCD34D',
            border:'1px solid rgba(245,158,11,0.3)'
          }}>
            ✦ Portal Loker #1 Pekalongan Raya
          </span>

          <h1 className="font-display" style={{
            fontSize:'clamp(2rem, 5vw, 3.5rem)', fontWeight:400,
            color:'white', lineHeight:1.2, marginBottom:'16px'
          }}>
            Temukan Karir<br/>
            <em>Impianmu</em> di Pekalongan Raya
          </h1>

          <p style={{
            color:'#BFDBFE', fontSize:'clamp(0.9rem, 2vw, 1.1rem)',
            marginBottom:'40px', maxWidth:'520px',
            marginLeft:'auto', marginRight:'auto', lineHeight:1.6
          }}>
            Ribuan lowongan dari Kota Pekalongan, Kab. Pekalongan, Batang &amp; Pemalang — diperbarui setiap hari.
          </p>

          {/* Search Box */}
          <div style={{maxWidth:'620px', marginLeft:'auto', marginRight:'auto', marginBottom:'20px'}}>
            <form action="/loker" method="GET" className="search-form">
              <div className="search-input-wrap">
                <Search size={17} color="#9CA3AF" style={{flexShrink:0}}/>
                <input name="q" type="text" placeholder="Posisi, perusahaan, kata kunci..."
                  style={{width:'100%', color:'#1F2937', outline:'none', fontSize:'14px', padding:'16px 0', background:'transparent'}} />
              </div>
              <div className="search-select-wrap">
                <MapPin size={17} color="#9CA3AF" style={{flexShrink:0}}/>
                <select name="area" style={{color:'#374151', outline:'none', fontSize:'14px', padding:'16px 0', background:'transparent', width:'100%'}}>
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
          </div>

          {/* Quick filters */}
          <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'8px'}}>
            {['Tekstil & Batik','Teknologi & IT','Kuliner & F&B','Retail & Sales','Administrasi'].map(cat => (
              <Link key={cat} href={`/loker?category=${encodeURIComponent(cat)}`}
                style={{
                  fontSize:'12px', padding:'6px 14px', borderRadius:'999px',
                  fontWeight:600, color:'white', textDecoration:'none',
                  background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.2)',
                  transition:'opacity 0.2s'
                }}>
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="stats-bar" style={{maxWidth:'800px', margin:'0 auto'}}>
        {stats.map((s, i) => (
          <div key={s.label} className="stats-item">
            <div style={{fontWeight:900, fontSize:'clamp(1.4rem, 3vw, 2rem)', color:'var(--primary)'}}>{s.value}</div>
            <div style={{fontSize:'12px', color:'#64748B', marginTop:'4px', fontWeight:500}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── LOKER TERBARU ── */}
      <section style={{padding:'56px 0'}}>
        <div className="container-page">
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'28px'}}>
            <div>
              <h2 style={{fontWeight:800, fontSize:'1.4rem', color:'#0F172A'}}>Loker Terbaru</h2>
              <p style={{fontSize:'13px', color:'#64748B', marginTop:'4px'}}>Diperbarui dari berbagai sumber setiap hari</p>
            </div>
            <Link href="/loker" style={{
              display:'flex', alignItems:'center', gap:'4px',
              fontSize:'13px', fontWeight:700, color:'var(--primary)', textDecoration:'none'
            }}>
              Lihat semua <ChevronRight size={15}/>
            </Link>
          </div>

          <div className="jobs-grid">
            {mockJobs.map(job => <JobCard key={job.id} job={job as any}/>)}
          </div>

          <div style={{textAlign:'center', marginTop:'36px'}}>
            <Link href="/loker" className="btn-primary" style={{background:'var(--primary)', color:'white', padding:'12px 32px'}}>
              <Briefcase size={16}/> Lihat Semua Lowongan
            </Link>
          </div>
        </div>
      </section>

      {/* ── BROWSE BY AREA ── */}
      <section style={{padding:'56px 0', background:'#EFF6FF'}}>
        <div className="container-page">
          <div style={{textAlign:'center', marginBottom:'36px'}}>
            <h2 style={{fontWeight:800, fontSize:'1.4rem', color:'#0F172A', marginBottom:'8px'}}>Cari Loker per Wilayah</h2>
            <p style={{fontSize:'13px', color:'#64748B'}}>Pilih wilayah terdekat Anda</p>
          </div>
          <div className="area-grid">
            {areaData.map(area => (
              <Link key={area.key} href={`/loker?area=${area.key}`} style={{
                background:'white', borderRadius:'16px', padding:'24px 16px',
                textAlign:'center', border:'1px solid #DBEAFE', textDecoration:'none',
                display:'block', transition:'all 0.2s'
              }}>
                <div style={{
                  width:'52px', height:'52px', borderRadius:'14px',
                  background:'var(--primary)', display:'flex', alignItems:'center',
                  justifyContent:'center', margin:'0 auto 12px', boxShadow:'0 4px 12px rgba(15,76,129,0.2)'
                }}>
                  <MapPin size={22} color="white"/>
                </div>
                <div style={{fontWeight:700, color:'#1E3A5F', fontSize:'14px', marginBottom:'4px'}}>{area.name}</div>
                <div style={{fontSize:'12px', fontWeight:700, color:'var(--primary)', marginBottom:'4px'}}>{area.count} loker</div>
                <div style={{fontSize:'11px', color:'#94A3B8'}}>Lihat Loker →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── KATEGORI ── */}
      <section style={{padding:'56px 0', background:'white'}}>
        <div className="container-page">
          <div style={{textAlign:'center', marginBottom:'36px'}}>
            <h2 style={{fontWeight:800, fontSize:'1.4rem', color:'#0F172A', marginBottom:'8px'}}>Kategori Pekerjaan</h2>
            <p style={{fontSize:'13px', color:'#64748B'}}>Temukan loker sesuai bidang Anda</p>
          </div>
          <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'10px'}}>
            {CATEGORIES.map(cat => (
              <Link key={cat} href={`/loker?category=${encodeURIComponent(cat)}`} style={{
                padding:'10px 20px', background:'#F8FAFC',
                border:'1px solid #E2E8F0', borderRadius:'12px',
                fontSize:'13px', fontWeight:600, color:'#374151',
                textDecoration:'none', transition:'all 0.2s'
              }}>
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA PERUSAHAAN ── */}
      <section className="hero-gradient" style={{padding:'64px 0'}}>
        <div className="container-page" style={{textAlign:'center', maxWidth:'640px'}}>
          <Building2 size={44} color="white" style={{margin:'0 auto 20px', opacity:0.7}}/>
          <h2 className="font-display" style={{fontSize:'clamp(1.8rem, 4vw, 2.5rem)', color:'white', marginBottom:'16px', fontWeight:400}}>
            Anda Punya Lowongan?
          </h2>
          <p style={{color:'#BFDBFE', marginBottom:'32px', lineHeight:1.6, fontSize:'15px'}}>
            Pasang lowongan gratis, jangkau ribuan pencari kerja di Pekalongan Raya.
            Upgrade ke Featured untuk tampil di posisi teratas &amp; otomatis dipost ke Instagram.
          </p>
          <div style={{display:'flex', flexWrap:'wrap', gap:'12px', justifyContent:'center'}}>
            <Link href="/daftar" className="btn-primary" style={{padding:'12px 28px'}}>
              <Zap size={16}/> Pasang Loker Gratis
            </Link>
            <Link href="/daftar" className="btn-secondary" style={{padding:'12px 28px'}}>
              Daftar Perusahaan
            </Link>
          </div>
        </div>
      </section>

      {/* ── FITUR ── */}
      <section style={{padding:'64px 0', background:'white'}}>
        <div className="container-page">
          <h2 style={{fontWeight:800, fontSize:'1.4rem', color:'#0F172A', textAlign:'center', marginBottom:'48px'}}>
            Kenapa LokerPekalonganRaya?
          </h2>
          <div className="feature-grid">
            {[
              { icon: <Zap size={26} color="white"/>, title:'Diperbarui Setiap Hari', desc:'Loker dari Instagram, Facebook grup, dan perusahaan langsung — semua dikurasi oleh tim kami.', bg:'var(--primary)'},
              { icon: <Shield size={26} color="white"/>, title:'Loker Terverifikasi', desc:'Setiap lowongan dari perusahaan melewati proses verifikasi akun. Aman dari penipuan.', bg:'var(--success)'},
              { icon: <Bell size={26} color="white"/>, title:'Notifikasi Loker Baru', desc:'Subscribe Telegram & WA untuk mendapat notifikasi loker sesuai kategori dan area pilihanmu.', bg:'#8B5CF6'},
            ].map(f => (
              <div key={f.title} style={{
                display:'flex', flexDirection:'column', alignItems:'center',
                textAlign:'center', padding:'32px 24px',
                borderRadius:'16px', border:'1px solid #F1F5F9'
              }}>
                <div style={{
                  width:'60px', height:'60px', borderRadius:'16px',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  marginBottom:'20px', boxShadow:'0 4px 16px rgba(0,0,0,0.15)',
                  background:f.bg
                }}>
                  {f.icon}
                </div>
                <h3 style={{fontWeight:700, color:'#0F172A', marginBottom:'8px', fontSize:'15px'}}>{f.title}</h3>
                <p style={{fontSize:'13px', color:'#64748B', lineHeight:1.6}}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
