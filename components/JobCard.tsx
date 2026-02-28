import Link from 'next/link'
import { MapPin, Clock, Briefcase, Star, Instagram, Facebook } from 'lucide-react'
import { AREAS, JOB_TYPES } from '@/lib/constants'
import { formatSalary, timeAgo } from '@/lib/utils'
import BookmarkButton from './BookmarkButton'

interface JobCardProps {
  job: {
    id: number
    slug: string
    title: string
    city: string
    area: string
    jobType: string
    salary?: string | null
    salaryMin?: number | null
    salaryMax?: number | null
    category: string
    featured: boolean
    source: string
    createdAt: Date
    company?: { name: string; logo?: string | null } | null
    sourceImage?: string | null
  }
}

const sourceIcon = (source: string) => {
  if (source === 'SCRAPED_IG') return <Instagram size={12} className="inline mr-1"/>
  if (source === 'SCRAPED_FB') return <Facebook size={12} className="inline mr-1"/>
  return null
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/loker/${job.slug}`} className={`job-card block bg-white rounded-xl border p-5 ${job.featured ? 'featured-glow' : 'border-gray-100'}`}>
      {job.featured && (
        <div className="flex items-center gap-1 mb-3">
          <span className="badge" style={{background:'#FEF3C7', color:'#92400E'}}>
            <Star size={10} className="inline mr-1 fill-yellow-600"/> Unggulan
          </span>
        </div>
      )}
      <div className="flex gap-3">
        {/* Logo */}
        <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-white text-lg" 
          style={{background:'var(--primary)'}}>
          {job.company?.logo 
            ? <img src={job.company.logo} alt={job.company.name} className="w-12 h-12 rounded-xl object-cover"/>
            : (job.company?.name || job.title).charAt(0).toUpperCase()
          }
        </div>
        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 leading-tight mb-1 line-clamp-2">{job.title}</h3>
          <p className="text-sm text-gray-600 mb-2 font-medium">
            {job.company?.name || (
              <span className="text-xs text-gray-400 flex items-center gap-1">
                {sourceIcon(job.source)}
                Dari {job.source === 'SCRAPED_IG' ? 'Instagram' : job.source === 'SCRAPED_FB' ? 'Facebook' : 'Anonim'}
              </span>
            )}
          </p>
          <div className="flex flex-wrap gap-2 text-xs text-gray-500">
            <span className="flex items-center gap-1"><MapPin size={11}/>{AREAS[job.area as keyof typeof AREAS] || job.city}</span>
            <span className="flex items-center gap-1"><Briefcase size={11}/>{JOB_TYPES[job.jobType as keyof typeof JOB_TYPES]}</span>
            <span className="flex items-center gap-1"><Clock size={11}/>{timeAgo(job.createdAt)}</span>
          </div>
        </div>
      </div>
      {/* Bottom */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
        <div className="text-sm font-semibold" style={{color:'var(--primary)'}}>
          {formatSalary(job.salaryMin, job.salaryMax, job.salary)}
        </div>
        <div style={{display:'flex', alignItems:'center', gap:8}}>
          <span className="badge" style={{background:'#EFF6FF', color:'#1D4ED8'}}>{job.category}</span>
          <BookmarkButton jobId={job.id} size={16} />
        </div>
      </div>
    </Link>
  )
}
