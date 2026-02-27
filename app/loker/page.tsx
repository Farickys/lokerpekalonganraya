import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import JobCard from '@/components/JobCard'
import { AREAS, JOB_TYPES, CATEGORIES } from '@/lib/constants'
import { Search } from 'lucide-react'

// Mock jobs for all pages
const allJobs = [
  { id:1, slug:'operator-produksi-pt-batik-mahkota-1', title:'Operator Produksi Batik', city:'Pekalongan', area:'KOTA_PEKALONGAN', jobType:'FULLTIME', salary:'Rp 2.500.000 – 3.000.000', salaryMin:2500000, salaryMax:3000000, category:'Tekstil & Batik', featured:true, source:'COMPANY', createdAt: new Date('2025-01-15'), company:{name:'PT Batik Mahkota', logo:null}},
  { id:2, slug:'staff-admin-kantor-2', title:'Staff Administrasi & Keuangan', city:'Batang', area:'BATANG', jobType:'FULLTIME', salary:null, salaryMin:null, salaryMax:null, category:'Admin & Sekretaris', featured:false, source:'COMPANY', createdAt: new Date('2025-01-14'), company:{name:'CV Maju Jaya Batang', logo:null}},
  { id:3, slug:'driver-kurir-ojek-online-3', title:'Driver / Kurir Pengiriman', city:'Pemalang', area:'PEMALANG', jobType:'PARTTIME', salary:'Rp 150.000/hari', salaryMin:null, salaryMax:null, category:'Transportasi & Logistik', featured:false, source:'SCRAPED_IG', createdAt: new Date('2025-01-13'), company:null, sourceImage:null},
  { id:4, slug:'kasir-minimarket-4', title:'Kasir & SPG Minimarket', city:'Pekalongan', area:'KOTA_PEKALONGAN', jobType:'FULLTIME', salary:'UMR + Tunjangan', salaryMin:null, salaryMax:null, category:'Retail & Sales', featured:false, source:'SCRAPED_FB', createdAt: new Date('2025-01-12'), company:null, sourceImage:null},
  { id:5, slug:'teknisi-it-support-5', title:'Teknisi IT Support', city:'Pekalongan', area:'KOTA_PEKALONGAN', jobType:'FULLTIME', salary:'Rp 3.000.000 – 4.500.000', salaryMin:3000000, salaryMax:4500000, category:'Teknologi & IT', featured:false, source:'COMPANY', createdAt: new Date('2025-01-11'), company:{name:'Pekalongan Info Media', logo:null}},
  { id:6, slug:'barista-coffee-shop-6', title:'Barista & Staff Cafe', city:'Kabupaten Pekalongan', area:'KAB_PEKALONGAN', jobType:'PARTTIME', salary:'Rp 100.000/hari', salaryMin:null, salaryMax:null, category:'Kuliner & F&B', featured:false, source:'SCRAPED_IG', createdAt: new Date('2025-01-10'), company:null, sourceImage:null},
  { id:7, slug:'guru-les-privat-7', title:'Guru Les Privat SD-SMP', city:'Pemalang', area:'PEMALANG', jobType:'FREELANCE', salary:'Rp 50.000/jam', salaryMin:null, salaryMax:null, category:'Pendidikan', featured:false, source:'SCRAPED_FB', createdAt: new Date('2025-01-09'), company:null, sourceImage:null},
  { id:8, slug:'sales-marketing-8', title:'Sales & Marketing Officer', city:'Batang', area:'BATANG', jobType:'FULLTIME', salary:'Gaji Pokok + Komisi', salaryMin:null, salaryMax:null, category:'Marketing & Kreatif', featured:false, source:'COMPANY', createdAt: new Date('2025-01-08'), company:{name:'PT Sinar Batang', logo:null}},
]

export default async function LokerPage({ searchParams }: { searchParams: Promise<Record<string,string>> }) {
  const sp = await searchParams
  const q = sp.q || ''
  const area = sp.area || ''
  const category = sp.category || ''
  const jobType = sp.jobType || ''

  const filtered = allJobs.filter(j => {
    if (q && !j.title.toLowerCase().includes(q.toLowerCase()) && !j.company?.name?.toLowerCase().includes(q.toLowerCase())) return false
    if (area && j.area !== area) return false
    if (category && j.category !== category) return false
    if (jobType && j.jobType !== jobType) return false
    return true
  })

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="hero-gradient text-white py-8 sm:py-10">
        <div className="container-page">
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl mb-4">
            {q ? `Hasil pencarian: "${q}"` : area ? `Loker di ${AREAS[area as keyof typeof AREAS] || area}` : 'Semua Lowongan Kerja'}
          </h1>
          <form method="GET" action="/loker" className="flex gap-2 max-w-2xl">
            <div className="flex-1 bg-white/10 backdrop-blur rounded-xl flex items-center gap-2 px-4 border border-white/20">
              <Search size={16} className="text-white/60 flex-shrink-0"/>
              <input name="q" defaultValue={q} placeholder="Cari posisi atau perusahaan..." className="flex-1 bg-transparent text-white placeholder-white/50 outline-none text-sm py-3 min-w-0"/>
            </div>
            <button type="submit" className="btn-primary text-sm px-5">Cari</button>
          </form>
        </div>
      </div>

      <div className="container-page py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Mobile Filters */}
          <div className="lg:hidden">
            <form method="GET" action="/loker" className="flex flex-wrap gap-2">
              {q && <input type="hidden" name="q" value={q}/>}
              <select name="area" defaultValue={area} className="flex-1 min-w-[140px] text-sm border border-gray-200 rounded-lg px-3 py-2.5 outline-none bg-white">
                <option value="">Semua Area</option>
                {Object.entries(AREAS).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
              </select>
              <select name="jobType" defaultValue={jobType} className="flex-1 min-w-[140px] text-sm border border-gray-200 rounded-lg px-3 py-2.5 outline-none bg-white">
                <option value="">Semua Tipe</option>
                {Object.entries(JOB_TYPES).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
              </select>
              <select name="category" defaultValue={category} className="flex-1 min-w-[140px] text-sm border border-gray-200 rounded-lg px-3 py-2.5 outline-none bg-white">
                <option value="">Semua Kategori</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <button type="submit" className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{background:'var(--primary)'}}>
                Filter
              </button>
            </form>
          </div>

          {/* Desktop Sidebar Filter */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <form method="GET" action="/loker">
              {q && <input type="hidden" name="q" value={q}/>}
              <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-6 sticky top-20">
                <div>
                  <label className="font-semibold text-sm text-gray-700 block mb-3">Area</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="radio" name="area" value="" defaultChecked={!area} className="accent-blue-700"/> Semua Area
                    </label>
                    {Object.entries(AREAS).map(([k,v]) => (
                      <label key={k} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="radio" name="area" value={k} defaultChecked={area===k} className="accent-blue-700"/> {v}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="font-semibold text-sm text-gray-700 block mb-3">Tipe Kerja</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="radio" name="jobType" value="" defaultChecked={!jobType} className="accent-blue-700"/> Semua Tipe
                    </label>
                    {Object.entries(JOB_TYPES).map(([k,v]) => (
                      <label key={k} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="radio" name="jobType" value={k} defaultChecked={jobType===k} className="accent-blue-700"/> {v}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="font-semibold text-sm text-gray-700 block mb-3">Kategori</label>
                  <select name="category" defaultValue={category} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none">
                    <option value="">Semua Kategori</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <button type="submit" className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{background:'var(--primary)'}}>
                  Terapkan Filter
                </button>
              </div>
            </form>
          </aside>

          {/* Job List */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">{filtered.length} lowongan ditemukan</p>
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none text-gray-600">
                <option>Terbaru</option>
                <option>Featured</option>
              </select>
            </div>
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <Search size={40} className="mx-auto mb-3 opacity-40"/>
                <p className="font-medium">Tidak ada lowongan ditemukan</p>
                <p className="text-sm mt-1">Coba ubah filter pencarian Anda</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map(job => <JobCard key={job.id} job={job as any}/>)}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
