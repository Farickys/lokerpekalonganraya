import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
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
    <div className="min-h-screen">
      <Navbar />

      <div className="container-page max-w-5xl py-6 sm:py-8">
        <Link href="/loker" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors">
          <ChevronLeft size={16}/> Kembali ke daftar loker
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-5">
            {/* Job Header Card */}
            <div className={`bg-white rounded-2xl border p-5 sm:p-6 ${job.featured ? 'featured-glow' : 'border-gray-100'}`}>
              {job.featured && (
                <span className="badge mb-3 inline-flex" style={{background:'#FEF3C7', color:'#92400E'}}>
                  <Star size={10} className="inline mr-1 fill-yellow-600"/> Loker Unggulan
                </span>
              )}
              <div className="flex gap-3 sm:gap-4 items-start">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex-shrink-0 flex items-center justify-center font-bold text-white text-xl sm:text-2xl shadow-md" style={{background:'var(--primary)'}}>
                  {job.company.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="font-bold text-lg sm:text-2xl text-gray-900 mb-1">{job.title}</h1>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Link href="#" className="font-semibold text-sm hover:underline" style={{color:'var(--primary)'}}>{job.company.name}</Link>
                    {job.company.verified && (
                      <span className="badge text-xs" style={{background:'#D1FAE5', color:'#065F46'}}>✓ Terverifikasi</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                {[
                  { icon:<MapPin size={14}/>, label: AREAS[job.area as keyof typeof AREAS] || job.city },
                  { icon:<Briefcase size={14}/>, label: JOB_TYPES[job.jobType as keyof typeof JOB_TYPES] },
                  { icon:<GraduationCap size={14}/>, label: job.education },
                  { icon:<Clock size={14}/>, label: job.experience },
                  { icon:<Calendar size={14}/>, label: `Dipost: ${timeAgo(job.createdAt)}` },
                  { icon:<Calendar size={14}/>, label: `Berlaku hingga: ${new Date(job.expiredAt!).toLocaleDateString('id-ID', {day:'numeric',month:'short',year:'numeric'})}` },
                ].map((m,i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-blue-600 flex-shrink-0">{m.icon}</span>
                    <span className="truncate">{m.label}</span>
                  </div>
                ))}
              </div>

              {/* Salary */}
              <div className="mt-4 p-4 rounded-xl" style={{background:'#F0F7FF'}}>
                <span className="text-sm text-gray-500">Gaji / Upah</span>
                <div className="font-bold text-lg sm:text-xl mt-1" style={{color:'var(--primary)'}}>
                  {formatSalary(job.salaryMin, job.salaryMax, job.salary)}
                </div>
              </div>

              {/* Apply Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-5">
                {job.contactWa && (
                  <a href={`https://wa.me/${job.contactWa}?text=Halo, saya tertarik melamar posisi ${job.title} di ${job.company.name}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90"
                    style={{background:'#25D366'}}>
                    <MessageCircle size={18}/> Apply via WhatsApp
                  </a>
                )}
                {job.applyUrl && (
                  <a href={job.applyUrl} target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                    style={{background:'var(--primary)', color:'white'}}>
                    <ExternalLink size={16}/> Apply Online
                  </a>
                )}
                <button className="px-4 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors flex-shrink-0">
                  <Share2 size={18}/>
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
              <h2 className="font-bold text-lg text-gray-900 mb-4">Deskripsi Pekerjaan</h2>
              <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-line text-sm">
                {job.description}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
              <h2 className="font-bold text-lg text-gray-900 mb-4">Persyaratan</h2>
              <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-line text-sm">
                {job.requirements}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Company Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Tentang Perusahaan</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white flex-shrink-0" style={{background:'var(--primary)'}}>
                  {job.company.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm truncate">{job.company.name}</div>
                  {job.company.verified && <span className="text-xs" style={{color:'var(--success)'}}>✓ Terverifikasi</span>}
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">{job.company.description}</p>
              <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                <MapPin size={11} className="flex-shrink-0"/> <span className="truncate">{job.company.address}</span>
              </div>
              {job.company.website && (
                <a href={job.company.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs hover:underline" style={{color:'var(--primary)'}}>
                  <ExternalLink size={11}/> Kunjungi Website
                </a>
              )}
            </div>

            {/* Stats */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Statistik Loker</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Dilihat</span>
                  <span className="font-semibold">{job.views} kali</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Pelamar</span>
                  <span className="font-semibold">{job.applyCount} orang</span>
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-3">Bagikan Loker</h3>
              <div className="flex gap-2">
                <a href={`https://wa.me/?text=Loker: ${job.title} di ${job.company.name} - ${process.env.NEXT_PUBLIC_APP_URL || ''}/loker/${job.slug}`}
                  target="_blank" className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-white text-xs font-medium" style={{background:'#25D366'}}>
                  <MessageCircle size={14}/> WA
                </a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_APP_URL || ''}/loker/${job.slug}`}
                  target="_blank" className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-white text-xs font-medium" style={{background:'#1877F2'}}>
                  <Facebook size={14}/> FB
                </a>
              </div>
            </div>

            {/* Pasang Loker CTA */}
            <div className="rounded-2xl p-5 text-white text-center" style={{background:'var(--primary)'}}>
              <Building2 size={28} className="mx-auto mb-2 opacity-80"/>
              <h3 className="font-bold mb-1">Punya Lowongan?</h3>
              <p className="text-xs text-blue-100 mb-3">Pasang loker gratis & jangkau ribuan pencari kerja</p>
              <Link href="/daftar" className="block text-center py-2 px-4 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90" style={{background:'var(--accent)', color:'#0F172A'}}>
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
