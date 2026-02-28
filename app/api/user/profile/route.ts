import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { query, queryOne } from '@/lib/prisma'

interface ProfileRow {
  id: number
  phone: string | null
  location: string | null
  bio: string | null
  skills: string | null
  experience: string | null
  education: string | null
  cvUrl: string | null
  cvName: string | null
  userName: string
  userEmail: string
}

// GET /api/user/profile - Get job seeker profile
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const profile = await queryOne<ProfileRow>(
      `SELECT p.*, u.name as userName, u.email as userEmail
       FROM JobSeekerProfile p
       JOIN User u ON u.id = p.userId
       WHERE p.userId = ?`,
      [userId]
    )

    if (!profile) {
      return NextResponse.json({
        name: session.user.name,
        email: session.user.email,
        phone: '', location: '', bio: '', skills: '',
        experience: '', education: '', cvUrl: null, cvName: null,
      })
    }

    return NextResponse.json({
      name: profile.userName,
      email: profile.userEmail,
      phone: profile.phone || '',
      location: profile.location || '',
      bio: profile.bio || '',
      skills: profile.skills || '',
      experience: profile.experience || '',
      education: profile.education || '',
      cvUrl: profile.cvUrl,
      cvName: profile.cvName,
    })
  } catch (error) {
    console.error('Profile error:', error)
    return NextResponse.json({ error: 'Gagal memuat profil' }, { status: 500 })
  }
}

// PUT /api/user/profile - Update job seeker profile
export async function PUT(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const body = await req.json()
    const { name, phone, location, bio, skills, experience, education } = body

    // Update user name
    if (name) {
      await query('UPDATE User SET name = ? WHERE id = ?', [name.trim(), userId])
    }

    // Upsert profile
    const existing = await queryOne<{ id: number }>('SELECT id FROM JobSeekerProfile WHERE userId = ?', [userId])
    if (existing) {
      await query(
        `UPDATE JobSeekerProfile SET phone = ?, location = ?, bio = ?, skills = ?, experience = ?, education = ? WHERE userId = ?`,
        [phone || '', location || '', bio || '', skills || '', experience || '', education || '', userId]
      )
    } else {
      await query(
        `INSERT INTO JobSeekerProfile (userId, phone, location, bio, skills, experience, education) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [userId, phone || '', location || '', bio || '', skills || '', experience || '', education || '']
      )
    }

    return NextResponse.json({ success: true, message: 'Profil berhasil diperbarui' })
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json({ error: 'Gagal memperbarui profil' }, { status: 500 })
  }
}
