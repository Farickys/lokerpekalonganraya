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

const C = {
  wrap: { width:'100%', maxWidth:'1100px', marginLeft:'auto', marginRight:'auto', paddingLeft:'20px', paddingRight:'20px' } as React.CSSProperties,
  wrapNarrow: { width:'100%', maxWidth:'680px', marginLeft:'auto', marginRight:'auto', paddingLeft:'20px', paddingRight:'20px' } as React.CSSProperties,
}

export default function HomePage() {
  return (
    <div style={{minHeight:'100vh', background:'#F8FAFC'}}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{background:'linear-gradient(135deg,#0F4C81 0%,#1a4f8a 50%,#0d3d6e 100%)', padding:'72px 0 56px'}}>
        <div style={{...C.wrapNarrow, textAlign:'center'}}>
          <span style={{display:'inline-block', fontSize:'11px', fontWeight:700, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'20px', padding:'5px 14px', borderRadius:'999px', background:'rgba(245,158,11,0.2)', color:'#FCD34D', border:'1px solid rgba(245,158,11,0.3)'}}>
            ✦ Portal Loker #1 Pekalongan Raya
          </span>

          <h1 style={{fontFamily:'"DM Serif Display", serif', fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:400, color:'white', lineHeight:1.15, marginBottom:'16px'}}>
            Temukan Karir<br/>
            <em>Impianmu</em> di Pekalongan Raya
          </h1>

          <p style={{color:'#BFDBFE', fontSize:'clamp(0.9rem,2vw,1.05rem)', marginBottom:'36px', lineHeight:1.7, maxWidth:'480px', marginLeft:'auto', marginRight:'auto'}}>
            Ribuan lowongan dari Kota Pekalongan, Kab. Pekalongan, Batang &amp; Pemalang — diperbarui setiap hari.
          </p>

          {/* Search */}
          <form action="/loker" method="GET" style={{background:'white', borderRadius:'14px', overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,0.25)', display:'flex', flexWrap:'wrap' as const, marginBottom:'20px'}}>
            <div style={{flex:'1 1 200px', display:'flex', alignItems:'center', gap:'10px', padding:'0 16px', borderBottom:'1px solid #F1F5F9'}}>
              <Search size={16} color="#9CA3AF" style={{flexShrink:0}}/>
              <input name="q" type="text" placeholder="Posisi, perusahaan, kata kunci..."
                style={{flex:1, color:'#1F2937', outline:'none', fontSize:'14px', padding:'16px 0', background:'transparent', border:'none', minWidth:0}}/>
            </div>
            <div style={{flex:'0 1 180px', display:'flex', alignItems:'center', gap:'8px', padding:'0 16px', borderBottom:'1px solid #F1F5F9'}}>
              <MapPin size={16} color="#9CA3AF" style={{flexShrink:0}}/>
              <select name="area" style={{flex:1, color:'#374151', outline:'none', fontSize:'14px', padding:'16px 0', background:'transparent', border:'none', minWidth:0}}>
                <option value="">Semua Area</option>
                {Object.entries(AREAS).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div style={{flex:'0 0 auto', padding:'8px'}}>
              <button type="submit" style={{background:'#F59E0B', color:'#0F172A', fontWeight:700, padding:'12px 24px', borderRadius:'10px', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:'8px', fontSize:'14px', whiteSpace:'nowrap' as const}}>
                <Search size={15}/> Cari Loker
              </button>
            </div>
          </form>

          {/* Quick filters */}
          <div style={{display:'flex', flexWrap:'wrap' as const, justifyContent:'center', gap:'8px'}}>
            {['Tekstil & Batik','Teknologi & IT','Kuliner & F&B','Retail & Sales','Administrasi'].map(cat => (
              <Link key={cat} href={`/loker?category=${encodeURIComponent(cat)}`}
                style={{fontSize:'12px', padding:'6px 14px', borderRadius:'999px', fontWeight:600, color:'white', textDecoration:'none', background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.2)'}}>
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{background:'white', borderBottom:'1px solid #F1F5F9'}}>
        <div style={{...C.wrap, maxWidth:'800px'}}>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)'}}>
            {[
              {label:'Loker Aktif', value:'1.200+'},
              {label:'Perusahaan', value:'340+'},
              {label:'Kota/Kabupaten', value:'4'},
              {label:'Pelamar Terbantu', value:'8.500+'},
            ].map((s,i) => (
              <div key={s.label} style={{padding:'24px 8px', textAlign:'center', borderRight: i < 3 ? '1px solid #F1F5F9' : 'none'}}>
                <div style={{fontWeight:900, fontSize:'clamp(1.3rem,2.5vw,1.9rem)', color:'#0F4C81'}}>{s.value}</div>
                <div style={{fontSize:'11px', color:'#64748B', marginTop:'4px', fontWeight:500}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOKER TERBARU ── */}
      <section style={{padding:'56px 0'}}>
        <div style={C.wrap}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'24px'}}>
            <div>
              <h2 style={{fontWeight:800, fontSize:'1.3rem', color:'#0F172A'}}>Loker Terbaru</h2>
              <p style={{fontSize:'13px', color:'#64748B', marginTop:'4px'}}>Diperbarui dari berbagai sumber setiap hari</p>
            </div>
            <Link href="/loker" style={{display:'flex', alignItems:'center', gap:'4px', fontSize:'13px', fontWeight:700, color:'#0F4C81', textDecoration:'none'}}>
              Lihat semua <ChevronRight size={15}/>
            </Link>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:'16px'}}>
            {mockJobs.map(job => <JobCard key={job.id} job={job as any}/>)}
          </div>

          <div style={{textAlign:'center', marginTop:'32px'}}>
            <Link href="/loker" style={{background:'#0F4C81', color:'white', fontWeight:700, padding:'12px 32px', borderRadius:'10px', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:'8px', fontSize:'14px'}}>
              <Briefcase size={16}/> Lihat Semua Lowongan
            </Link>
          </div>
        </div>
      </section>

      {/* ── AREA ── */}
      <section style={{padding:'56px 0', background:'#EFF6FF'}}>
        <div style={C.wrap}>
          <div style={{textAlign:'center', marginBottom:'32px'}}>
            <h2 style={{fontWeight:800, fontSize:'1.3rem', color:'#0F172A', marginBottom:'8px'}}>Cari Loker per Wilayah</h2>
            <p style={{fontSize:'13px', color:'#64748B'}}>Pilih wilayah terdekat Anda</p>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px'}}>
            {[
              {key:'KOTA_PEKALONGAN', name:'Kota Pekalongan', count:'420+'},
              {key:'KAB_PEKALONGAN', name:'Kab. Pekalongan', count:'280+'},
              {key:'BATANG', name:'Batang', count:'310+'},
              {key:'PEMALANG', name:'Pemalang', count:'190+'},
            ].map(area => (
              <Link key={area.key} href={`/loker?area=${area.key}`} style={{background:'white', borderRadius:'14px', padding:'24px 16px', textAlign:'center', border:'1px solid #DBEAFE', textDecoration:'none', display:'block'}}>
                <div style={{width:'50px', height:'50px', borderRadius:'14px', background:'#0F4C81', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px', boxShadow:'0 4px 12px rgba(15,76,129,0.2)'}}>
                  <MapPin size={22} color="white"/>
                </div>
                <div style={{fontWeight:700, color:'#1E3A5F', fontSize:'14px', marginBottom:'4px'}}>{area.name}</div>
                <div style={{fontSize:'12px', fontWeight:700, color:'#0F4C81', marginBottom:'4px'}}>{area.count} loker</div>
                <div style={{fontSize:'11px', color:'#94A3B8'}}>Lihat Loker →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── KATEGORI ── */}
      <section style={{padding:'56px 0', background:'white'}}>
        <div style={C.wrap}>
          <div style={{textAlign:'center', marginBottom:'32px'}}>
            <h2 style={{fontWeight:800, fontSize:'1.3rem', color:'#0F172A', marginBottom:'8px'}}>Kategori Pekerjaan</h2>
            <p style={{fontSize:'13px', color:'#64748B'}}>Temukan loker sesuai bidang Anda</p>
          </div>
          <div style={{display:'flex', flexWrap:'wrap' as const, justifyContent:'center', gap:'10px'}}>
            {CATEGORIES.map(cat => (
              <Link key={cat} href={`/loker?category=${encodeURIComponent(cat)}`} style={{padding:'10px 20px', background:'#F8FAFC', border:'1px solid #E2E8F0', borderRadius:'12px', fontSize:'13px', fontWeight:600, color:'#374151', textDecoration:'none'}}>
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{background:'linear-gradient(135deg,#0F4C81 0%,#1a4f8a 50%,#0d3d6e 100%)', padding:'64px 0'}}>
        <div style={{...C.wrapNarrow, textAlign:'center'}}>
          <Building2 size={44} color="white" style={{margin:'0 auto 20px', opacity:0.7}}/>
          <h2 style={{fontFamily:'"DM Serif Display",serif', fontSize:'clamp(1.8rem,4vw,2.5rem)', color:'white', marginBottom:'16px', fontWeight:400}}>
            Anda Punya Lowongan?
          </h2>
          <p style={{color:'#BFDBFE', marginBottom:'32px', lineHeight:1.7, fontSize:'15px', maxWidth:'480px', marginLeft:'auto', marginRight:'auto'}}>
            Pasang lowongan gratis, jangkau ribuan pencari kerja di Pekalongan Raya. Upgrade ke Featured untuk tampil di posisi teratas &amp; otomatis dipost ke Instagram.
          </p>
          <div style={{display:'flex', flexWrap:'wrap' as const, gap:'12px', justifyContent:'center'}}>
            <Link href="/daftar" style={{background:'#F59E0B', color:'#0F172A', fontWeight:700, padding:'12px 28px', borderRadius:'10px', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:'8px', fontSize:'14px'}}>
              <Zap size={16}/> Pasang Loker Gratis
            </Link>
            <Link href="/daftar" style={{background:'transparent', color:'white', fontWeight:600, padding:'12px 28px', borderRadius:'10px', border:'2px solid rgba(255,255,255,0.4)', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:'8px', fontSize:'14px'}}>
              Daftar Perusahaan
            </Link>
          </div>
        </div>
      </section>

      {/* ── FITUR ── */}
      <section style={{padding:'64px 0', background:'white'}}>
        <div style={C.wrap}>
          <h2 style={{fontWeight:800, fontSize:'1.3rem', color:'#0F172A', textAlign:'center', marginBottom:'48px'}}>
            Kenapa LokerPekalonganRaya?
          </h2>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'24px'}}>
            {[
              {icon:<Zap size={26} color="white"/>, title:'Diperbarui Setiap Hari', desc:'Loker dari Instagram, Facebook grup, dan perusahaan langsung — semua dikurasi oleh tim kami.', bg:'#0F4C81'},
              {icon:<Shield size={26} color="white"/>, title:'Loker Terverifikasi', desc:'Setiap lowongan dari perusahaan melewati proses verifikasi akun. Aman dari penipuan.', bg:'#10B981'},
              {icon:<Bell size={26} color="white"/>, title:'Notifikasi Loker Baru', desc:'Subscribe Telegram & WA untuk mendapat notifikasi loker sesuai kategori dan area pilihanmu.', bg:'#8B5CF6'},
            ].map(f => (
              <div key={f.title} style={{display:'flex', flexDirection:'column' as const, alignItems:'center', textAlign:'center', padding:'32px 24px', borderRadius:'16px', border:'1px solid #F1F5F9'}}>
                <div style={{width:'60px', height:'60px', borderRadius:'16px', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'20px', boxShadow:'0 4px 16px rgba(0,0,0,0.12)', background:f.bg}}>
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
