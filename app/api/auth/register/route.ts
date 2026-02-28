import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { query, queryOne } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, password, role, phone, companyName, companyCity, companyDesc, companyWebsite } = body

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Nama, email, dan password wajib diisi' }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password minimal 8 karakter' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Format email tidak valid' }, { status: 400 })
    }

    // Check existing
    const existing = await queryOne<{ id: number }>('SELECT id FROM User WHERE email = ? LIMIT 1', [email])
    if (existing) {
      return NextResponse.json({ error: 'Email sudah terdaftar' }, { status: 409 })
    }

    const hashed = await bcrypt.hash(password, 12)
    const userRole = role === 'JOBSEEKER' ? 'JOBSEEKER' : 'COMPANY'

    // Insert user
    const [result] = await query<any>(
      'INSERT INTO User (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name.trim(), email.toLowerCase().trim(), hashed, userRole]
    )
    const userId = (result as any).insertId

    if (userRole === 'COMPANY' && companyName) {
      await query(
        'INSERT INTO Company (userId, name, city, description, website) VALUES (?, ?, ?, ?, ?)',
        [userId, companyName.trim(), companyCity || '', companyDesc || '', companyWebsite || '']
      )
    }

    if (userRole === 'JOBSEEKER') {
      await query(
        'INSERT INTO JobSeekerProfile (userId, phone) VALUES (?, ?)',
        [userId, phone || '']
      )
    }

    return NextResponse.json({ success: true, message: 'Pendaftaran berhasil' }, { status: 201 })
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json({ error: 'Gagal mendaftar. Silakan coba lagi.' }, { status: 500 })
  }
}
