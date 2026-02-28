import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { query } from '@/lib/prisma'

interface SavedJobRow {
  savedJobId: number
  savedAt: Date
  id: number
  slug: string
  title: string
  city: string
  area: string
  jobType: string
  salary: string | null
  salaryMin: number | null
  salaryMax: number | null
  category: string
  featured: number
  source: string
  createdAt: Date
  companyName: string | null
  companyLogo: string | null
}

// GET /api/user/saved-jobs - List all saved/bookmarked jobs
export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    const jobs = await query<SavedJobRow>(
      `SELECT
        s.id as savedJobId,
        s.createdAt as savedAt,
        j.id, j.slug, j.title, j.city, j.area, j.jobType,
        j.salary, j.salaryMin, j.salaryMax, j.category,
        j.featured, j.source, j.createdAt,
        c.name as companyName, c.logo as companyLogo
      FROM SavedJob s
      JOIN Job j ON j.id = s.jobId
      LEFT JOIN Company c ON c.id = j.companyId
      WHERE s.userId = ?
      ORDER BY s.createdAt DESC
      LIMIT ? OFFSET ?`,
      [userId, limit, offset]
    )

    const countResult = await query<{ total: number }>(
      'SELECT COUNT(*) as total FROM SavedJob WHERE userId = ?',
      [userId]
    )
    const total = countResult[0]?.total || 0

    return NextResponse.json({
      jobs: jobs.map(j => ({
        savedJobId: j.savedJobId,
        savedAt: j.savedAt,
        id: j.id,
        slug: j.slug,
        title: j.title,
        city: j.city,
        area: j.area,
        jobType: j.jobType,
        salary: j.salary,
        salaryMin: j.salaryMin,
        salaryMax: j.salaryMax,
        category: j.category,
        featured: !!j.featured,
        source: j.source,
        createdAt: j.createdAt,
        company: j.companyName ? { name: j.companyName, logo: j.companyLogo } : null,
      })),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error('Saved jobs error:', error)
    return NextResponse.json({ error: 'Gagal memuat loker tersimpan' }, { status: 500 })
  }
}
