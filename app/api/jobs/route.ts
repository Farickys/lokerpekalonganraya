import { NextRequest, NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'
// import { auth } from '@/lib/auth'

// GET /api/jobs - Public job listing API
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') || ''
  const area = searchParams.get('area') || ''
  const category = searchParams.get('category') || ''
  const jobType = searchParams.get('jobType') || ''
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')

  // In real app:
  // const where = {
  //   status: 'ACTIVE',
  //   ...(q && { OR: [{ title: { contains: q } }, { description: { contains: q } }] }),
  //   ...(area && { area }),
  //   ...(category && { category }),
  //   ...(jobType && { jobType }),
  // }
  // const [jobs, total] = await Promise.all([
  //   prisma.job.findMany({ where, include: { company: true }, orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }], skip: (page-1)*limit, take: limit }),
  //   prisma.job.count({ where }),
  // ])

  return NextResponse.json({
    jobs: [],
    total: 0,
    page,
    totalPages: 0,
    message: 'Connect to database to see real data'
  })
}

// POST /api/jobs - Create job (requires auth)
export async function POST(req: NextRequest) {
  // const session = await auth()
  // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    // Validate, create job with status: PENDING
    return NextResponse.json({ success: true, message: 'Job submitted for review' }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
