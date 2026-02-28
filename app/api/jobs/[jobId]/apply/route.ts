import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { query, queryOne } from '@/lib/prisma'

// GET /api/jobs/[jobId]/apply - Check if already applied
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ applied: false })
    }

    const { jobId } = await params
    const userId = (session.user as any).id

    const app = await queryOne<{ id: number; status: string }>(
      'SELECT id, status FROM Application WHERE userId = ? AND jobId = ?',
      [userId, parseInt(jobId)]
    )

    return NextResponse.json({ applied: !!app, status: app?.status || null })
  } catch {
    return NextResponse.json({ applied: false })
  }
}

// POST /api/jobs/[jobId]/apply - Submit application
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Silakan login terlebih dahulu' }, { status: 401 })
    }

    const { jobId } = await params
    const userId = (session.user as any).id
    const jobIdNum = parseInt(jobId)

    if (isNaN(jobIdNum)) {
      return NextResponse.json({ error: 'ID lowongan tidak valid' }, { status: 400 })
    }

    // Check if job exists and is active
    const job = await queryOne<{ id: number; status: string }>(
      'SELECT id, status FROM Job WHERE id = ? LIMIT 1',
      [jobIdNum]
    )
    if (!job) {
      return NextResponse.json({ error: 'Lowongan tidak ditemukan' }, { status: 404 })
    }
    if (job.status !== 'ACTIVE') {
      return NextResponse.json({ error: 'Lowongan sudah ditutup' }, { status: 400 })
    }

    // Check existing application
    const existing = await queryOne<{ id: number }>(
      'SELECT id FROM Application WHERE userId = ? AND jobId = ?',
      [userId, jobIdNum]
    )
    if (existing) {
      return NextResponse.json({ error: 'Anda sudah melamar lowongan ini' }, { status: 409 })
    }

    const body = await req.json().catch(() => ({}))
    const coverLetter = body.coverLetter || ''

    await query(
      'INSERT INTO Application (userId, jobId, coverLetter) VALUES (?, ?, ?)',
      [userId, jobIdNum, coverLetter]
    )

    // Increment apply count
    await query('UPDATE Job SET applyCount = applyCount + 1 WHERE id = ?', [jobIdNum])

    return NextResponse.json({ success: true, message: 'Lamaran berhasil dikirim' }, { status: 201 })
  } catch (error) {
    console.error('Apply error:', error)
    return NextResponse.json({ error: 'Gagal mengirim lamaran' }, { status: 500 })
  }
}
