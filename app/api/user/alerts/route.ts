import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { query, queryOne } from '@/lib/prisma'

// GET /api/user/alerts - List user's job alerts
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const alerts = await query<any>(
      'SELECT * FROM JobAlert WHERE userId = ? ORDER BY createdAt DESC',
      [userId]
    )

    return NextResponse.json({ alerts })
  } catch (error) {
    console.error('Alerts error:', error)
    return NextResponse.json({ error: 'Gagal memuat alert' }, { status: 500 })
  }
}

// POST /api/user/alerts - Create a new job alert
export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const body = await req.json()
    const { keyword, area, category, jobType, frequency } = body

    if (!keyword && !area && !category && !jobType) {
      return NextResponse.json({ error: 'Isi minimal satu kriteria pencarian' }, { status: 400 })
    }

    // Limit alerts per user
    const countResult = await query<{ total: number }>(
      'SELECT COUNT(*) as total FROM JobAlert WHERE userId = ?',
      [userId]
    )
    if ((countResult[0]?.total || 0) >= 10) {
      return NextResponse.json({ error: 'Maksimal 10 alert per akun' }, { status: 400 })
    }

    await query(
      'INSERT INTO JobAlert (userId, keyword, area, category, jobType, frequency) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, keyword || '', area || '', category || '', jobType || '', frequency || 'DAILY']
    )

    return NextResponse.json({ success: true, message: 'Alert berhasil dibuat' }, { status: 201 })
  } catch (error) {
    console.error('Alert create error:', error)
    return NextResponse.json({ error: 'Gagal membuat alert' }, { status: 500 })
  }
}

// DELETE /api/user/alerts - Delete a job alert
export async function DELETE(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const { searchParams } = new URL(req.url)
    const alertId = searchParams.get('id')

    if (!alertId) {
      return NextResponse.json({ error: 'ID alert tidak ditemukan' }, { status: 400 })
    }

    await query('DELETE FROM JobAlert WHERE id = ? AND userId = ?', [parseInt(alertId), userId])

    return NextResponse.json({ success: true, message: 'Alert dihapus' })
  } catch (error) {
    console.error('Alert delete error:', error)
    return NextResponse.json({ error: 'Gagal menghapus alert' }, { status: 500 })
  }
}
