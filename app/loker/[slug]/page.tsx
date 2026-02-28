import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BookmarkButton from '@/components/BookmarkButton'
import Link from 'next/link'
import { MapPin, Briefcase, GraduationCap, Clock, Calendar, MessageCircle, ExternalLink, Building2, Star, ChevronLeft, Facebook, Share2 } from 'lucide-react'
import { AREAS, JOB_TYPES } from '@/lib/constants'
import { formatSalary, timeAgo } from '@/lib/utils'

// Mock job detail
const mockJob = {
  id: 1,
  slug: 'operator-produksi-pt-batik-mahkota-1',
  title: 'Operator Produksi Batik',
  city: 'Pekalongan',
  area: 'KOTA_PEKALONGAN',
  jobType: 'FULLTIME',
  salary: 'Rp 2.500.000 – 3.000.000',
  salaryMin: 2500000,
  salaryMax: 3000000,
  category: 'Tekstil & Batik',
  featured: true,
  source: 'COMPANY',
  education: 'SMA/SMK/Sederajat',
  experience: 'Fresh Graduate / Pengalaman diutamakan',
  address: 'Jl. Batik No.12, Pekalongan',
  contactWa: '6281234567890',
  applyUrl: null,
  description: `
PT Batik Mahkota membuka lowongan kerja untuk posisi **Operator Produksi Batik** di pabrik kami yang berlokasi di Pekalongan.

**Tanggung Jawab:**
- Menjalankan mesin produksi batik cap/printing
- Memastikan kualitas output produksi sesuai standar
- Melaporkan kendala mesin kepada supervisor
- Menjaga kebersihan area kerja

**Benefit:**
- Gaji pokok Rp 2.500.000 – 3.000.000
- BPJS Kesehatan & Ketenagakerjaan
- Tunjangan makan & transport
- Bonus kehadiran
- Lembur dibayar sesuai peraturan
  `,
  requirements: `
- Usia 18 – 35 tahun
- Pendidikan minimal SMA/SMK sederajat
- Sehat jasmani dan rohani
- Bersedia bekerja shift
- Diutamakan berpengalaman di bidang tekstil/batik
- Domisili Pekalongan dan sekitarnya
  `,
  tags: 'batik,tekstil,produksi,operator',
  createdAt: new Date('2025-01-15'),
  expiredAt: new Date('2025-02-15'),
  views: 234,
  applyCount: 18,
  company: {
    id: 1,
    name: 'PT Batik Mahkota',
    logo: null,
    description: 'Perusahaan batik terkemuka di Pekalongan, berdiri sejak 1985 dengan pengalaman ekspor ke mancanegara.',
    website: 'https://batik-mahkota.co.id',
    address: 'Jl. Batik No.12, Pekalongan',
    city: 'Pekalongan',
    verified: true,
  }
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const job = mockJob // In real app: fetch from DB by slug

  return (
    <div style={{minHeight:'100vh'}}>
      <Navbar />

      <div className="container-page" style={{maxWidth:1024, paddingTop:24, paddingBottom:48}}>
        <Link href="/loker" style={{display:'inline-flex', alignItems:'center', gap:8, fontSize:14, color:'#6B7280', textDecoration:'none', marginBottom:24}}>
          <ChevronLeft size={16}/> Kembali ke daftar loker
        </Link>

        <div className="job-detail-grid">
          {/* Main Content */}
          <div style={{display:'flex', flexDirection:'column', gap:20}}>
            {/* Job Header Card */}
            <div className={job.featured ? 'featured-glow' : ''} style={{background:'white', borderRadius:16, border: job.featured ? 'none' : '1px solid #F3F4F6', padding:20}}>
              {job.featured && (
                <span className="badge" style={{background:'#FEF3C7', color:'#92400E', marginBottom:12, display:'inline-flex'}}>
                  <Star size={10} style={{marginRight:4}}/> Loker Unggulan
                </span>
              )}
              <div style={{display:'flex', gap:12, alignItems:'flex-start'}}>
                <div style={{width:48, height:48, borderRadius:16, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, color:'white', fontSize:20, background:'var(--primary)', boxShadow:'0 2px 8px rgba(0,0,0,0.1)'}}>
                  {job.company.name.charAt(0)}
                </div>
                <div style={{flex:1, minWidth:0}}>
                  <h1 style={{fontWeight:700, fontSize:18, color:'#111827', marginBottom:4}}>{job.title}</h1>
                  <div style={{display:'flex', alignItems:'center', gap:8, flexWrap:'wrap'}}>
                    <Link href="#" style={{fontWeight:600, fontSize:14, color:'var(--primary)', textDecoration:'none'}}>{job.company.name}</Link>
                    {job.company.verified && (
                      <span className="badge" style={{background:'#D1FAE5', color:'#065F46', fontSize:12}}>✓ Terverifikasi</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Meta */}
              <div className="job-meta-grid" style={{marginTop:20}}>
                {[
                  { icon:<MapPin size={14}/>, label: AREAS[job.area as keyof typeof AREAS] || job.city },
                  { icon:<Briefcase size={14}/>, label: JOB_TYPES[job.jobType as keyof typeof JOB_TYPES] },
                  { icon:<GraduationCap size={14}/>, label: job.education },
                  { icon:<Clock size={14}/>, label: job.experience },
                  { icon:<Calendar size={14}/>, label: `Dipost: ${timeAgo(job.createdAt)}` },
                  { icon:<Calendar size={14}/>, label: `Berlaku hingga: ${new Date(job.expiredAt!).toLocaleDateString('id-ID', {day:'numeric',month:'short',year:'numeric'})}` },
                ].map((m,i) => (
                  <div key={i} style={{display:'flex', alignItems:'center', gap:8, fontSize:14, color:'#4B5563'}}>
                    <span style={{color:'#2563EB', flexShrink:0}}>{m.icon}</span>
                    <span style={{overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{m.label}</span>
                  </div>
                ))}
              </div>

              {/* Salary */}
              <div style={{marginTop:16, padding:16, borderRadius:12, background:'#F0F7FF'}}>
                <span style={{fontSize:14, color:'#6B7280'}}>Gaji / Upah</span>
                <div style={{fontWeight:700, fontSize:18, marginTop:4, color:'var(--primary)'}}>
                  {formatSalary(job.salaryMin, job.salaryMax, job.salary)}
                </div>
              </div>

              {/* Apply Buttons */}
              <div className="apply-buttons" style={{marginTop:20}}>
                {job.contactWa && (
                  <a href={`https://wa.me/${job.contactWa}?text=Halo, saya tertarik melamar posisi ${job.title} di ${job.company.name}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'12px 16px', borderRadius:12, color:'white', fontWeight:600, fontSize:14, textDecoration:'none', background:'#25D366'}}>
                    <MessageCircle size={18}/> Apply via WhatsApp
                  </a>
                )}
                {job.applyUrl && (
                  <a href={job.applyUrl} target="_blank" rel="noopener noreferrer"
                    style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'12px 16px', borderRadius:12, fontWeight:600, fontSize:14, textDecoration:'none', background:'var(--primary)', color:'white'}}>
                    <ExternalLink size={16}/> Apply Online
                  </a>
                )}
                <BookmarkButton jobId={job.id} size={18} variant="button" />
              </div>
            </div>

            {/* Description */}
            <div style={{background:'white', borderRadius:16, border:'1px solid #F3F4F6', padding:20}}>
              <h2 style={{fontWeight:700, fontSize:18, color:'#111827', marginBottom:16}}>Deskripsi Pekerjaan</h2>
              <div style={{fontSize:14, color:'#374151', lineHeight:1.7, whiteSpace:'pre-line'}}>
                {job.description}
              </div>
            </div>

            {/* Requirements */}
            <div style={{background:'white', borderRadius:16, border:'1px solid #F3F4F6', padding:20}}>
              <h2 style={{fontWeight:700, fontSize:18, color:'#111827', marginBottom:16}}>Persyaratan</h2>
              <div style={{fontSize:14, color:'#374151', lineHeight:1.7, whiteSpace:'pre-line'}}>
                {job.requirements}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{display:'flex', flexDirection:'column', gap:20}}>
            {/* Company Card */}
            <div style={{background:'white', borderRadius:16, border:'1px solid #F3F4F6', padding:20}}>
              <h3 style={{fontWeight:600, color:'#111827', marginBottom:16}}>Tentang Perusahaan</h3>
              <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:12}}>
                <div style={{width:48, height:48, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, color:'white', flexShrink:0, background:'var(--primary)'}}>
                  {job.company.name.charAt(0)}
                </div>
                <div style={{minWidth:0}}>
                  <div style={{fontWeight:600, fontSize:14, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{job.company.name}</div>
                  {job.company.verified && <span style={{fontSize:12, color:'var(--success)'}}>✓ Terverifikasi</span>}
                </div>
              </div>
              <p style={{fontSize:12, color:'#6B7280', lineHeight:1.6, marginBottom:12}}>{job.company.description}</p>
              <div style={{display:'flex', alignItems:'center', gap:4, fontSize:12, color:'#6B7280', marginBottom:16}}>
                <MapPin size={11} style={{flexShrink:0}}/> <span style={{overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{job.company.address}</span>
              </div>
              {job.company.website && (
                <a href={job.company.website} target="_blank" rel="noopener noreferrer" style={{display:'flex', alignItems:'center', gap:4, fontSize:12, color:'var(--primary)', textDecoration:'none'}}>
                  <ExternalLink size={11}/> Kunjungi Website
                </a>
              )}
            </div>

            {/* Stats */}
            <div style={{background:'white', borderRadius:16, border:'1px solid #F3F4F6', padding:20}}>
              <h3 style={{fontWeight:600, color:'#111827', marginBottom:16}}>Statistik Loker</h3>
              <div style={{display:'flex', flexDirection:'column', gap:12}}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:14}}>
                  <span style={{color:'#6B7280'}}>Total Dilihat</span>
                  <span style={{fontWeight:600}}>{job.views} kali</span>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:14}}>
                  <span style={{color:'#6B7280'}}>Total Pelamar</span>
                  <span style={{fontWeight:600}}>{job.applyCount} orang</span>
                </div>
              </div>
            </div>

            {/* Share */}
            <div style={{background:'white', borderRadius:16, border:'1px solid #F3F4F6', padding:20}}>
              <h3 style={{fontWeight:600, color:'#111827', marginBottom:12}}>Bagikan Loker</h3>
              <div style={{display:'flex', gap:8}}>
                <a href={`https://wa.me/?text=Loker: ${job.title} di ${job.company.name} - ${process.env.NEXT_PUBLIC_APP_URL || ''}/loker/${job.slug}`}
                  target="_blank" style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:4, padding:'10px 12px', borderRadius:8, color:'white', fontSize:12, fontWeight:500, textDecoration:'none', background:'#25D366'}}>
                  <MessageCircle size={14}/> WA
                </a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_APP_URL || ''}/loker/${job.slug}`}
                  target="_blank" style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:4, padding:'10px 12px', borderRadius:8, color:'white', fontSize:12, fontWeight:500, textDecoration:'none', background:'#1877F2'}}>
                  <Facebook size={14}/> FB
                </a>
              </div>
            </div>

            {/* Pasang Loker CTA */}
            <div style={{borderRadius:16, padding:20, color:'white', textAlign:'center', background:'var(--primary)'}}>
              <Building2 size={28} style={{margin:'0 auto 8px', opacity:0.8}}/>
              <h3 style={{fontWeight:700, marginBottom:4}}>Punya Lowongan?</h3>
              <p style={{fontSize:12, color:'#93C5FD', marginBottom:12}}>Pasang loker gratis & jangkau ribuan pencari kerja</p>
              <Link href="/daftar" style={{display:'block', textAlign:'center', padding:'10px 16px', borderRadius:8, fontSize:14, fontWeight:600, background:'var(--accent)', color:'#0F172A', textDecoration:'none'}}>
                Pasang Loker Gratis
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
