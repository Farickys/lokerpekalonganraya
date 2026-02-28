import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { query } from '@/lib/prisma'

interface ApplicationRow {
  appId: number
  status: string
  coverLetter: string | null
  appliedAt: Date
  updatedAt: Date
  jobId: number
  jobSlug: string
  jobTitle: string
  jobCity: string
  jobArea: string
  jobType: string
  salary: string | null
  salaryMin: number | null
  salaryMax: number | null
  category: string
  companyName: string | null
  companyLogo: string | null
}

// GET /api/user/applications - List user's applications
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
    const status = searchParams.get('status') || ''
    const offset = (page - 1) * limit

    let whereClause = 'WHERE a.userId = ?'
    const params: any[] = [userId]

    if (status) {
      whereClause += ' AND a.status = ?'
      params.push(status)
    }

    const apps = await query<ApplicationRow>(
      `SELECT
        a.id as appId, a.status, a.coverLetter, a.createdAt as appliedAt, a.updatedAt,
        j.id as jobId, j.slug as jobSlug, j.title as jobTitle, j.city as jobCity,
        j.area as jobArea, j.jobType, j.salary, j.salaryMin, j.salaryMax, j.category,
        c.name as companyName, c.logo as companyLogo
      FROM Application a
      JOIN Job j ON j.id = a.jobId
      LEFT JOIN Company c ON c.id = j.companyId
      ${whereClause}
      ORDER BY a.createdAt DESC
      LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    )

    const countResult = await query<{ total: number }>(
      `SELECT COUNT(*) as total FROM Application a ${whereClause}`,
      params
    )
    const total = countResult[0]?.total || 0

    return NextResponse.json({
      applications: apps.map(a => ({
        id: a.appId,
        status: a.status,
        coverLetter: a.coverLetter,
        appliedAt: a.appliedAt,
        updatedAt: a.updatedAt,
        job: {
          id: a.jobId,
          slug: a.jobSlug,
          title: a.jobTitle,
          city: a.jobCity,
          area: a.jobArea,
          jobType: a.jobType,
          salary: a.salary,
          salaryMin: a.salaryMin,
          salaryMax: a.salaryMax,
          category: a.category,
          company: a.companyName ? { name: a.companyName, logo: a.companyLogo } : null,
        },
      })),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error('Applications error:', error)
    return NextResponse.json({ error: 'Gagal memuat data lamaran' }, { status: 500 })
  }
}
