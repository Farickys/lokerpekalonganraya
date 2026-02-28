import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { query, queryOne } from '@/lib/prisma'

// GET /api/jobs/[jobId]/bookmark - Check if job is bookmarked
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ bookmarked: false })
    }

    const { jobId } = await params
    const userId = (session.user as any).id

    const saved = await queryOne<{ id: number }>(
      'SELECT id FROM SavedJob WHERE userId = ? AND jobId = ?',
      [userId, parseInt(jobId)]
    )

    return NextResponse.json({ bookmarked: !!saved })
  } catch {
    return NextResponse.json({ bookmarked: false })
  }
}

// POST /api/jobs/[jobId]/bookmark - Toggle bookmark
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { jobId } = await params
    const userId = (session.user as any).id
    const jobIdNum = parseInt(jobId)

    if (isNaN(jobIdNum)) {
      return NextResponse.json({ error: 'Invalid job ID' }, { status: 400 })
    }

    // Check if already bookmarked
    const existing = await queryOne<{ id: number }>(
      'SELECT id FROM SavedJob WHERE userId = ? AND jobId = ?',
      [userId, jobIdNum]
    )

    if (existing) {
      // Remove bookmark
      await query('DELETE FROM SavedJob WHERE userId = ? AND jobId = ?', [userId, jobIdNum])
      return NextResponse.json({ bookmarked: false, message: 'Bookmark dihapus' })
    } else {
      // Add bookmark
      await query('INSERT INTO SavedJob (userId, jobId) VALUES (?, ?)', [userId, jobIdNum])
      return NextResponse.json({ bookmarked: true, message: 'Loker disimpan' })
    }
  } catch (error) {
    console.error('Bookmark error:', error)
    return NextResponse.json({ error: 'Gagal menyimpan bookmark' }, { status: 500 })
  }
}
