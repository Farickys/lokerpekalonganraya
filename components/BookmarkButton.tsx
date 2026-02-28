'use client'
import { useState, useEffect } from 'react'
import { Bookmark } from 'lucide-react'

interface BookmarkButtonProps {
  jobId: number
  size?: number
  variant?: 'icon' | 'button'
}

export default function BookmarkButton({ jobId, size = 18, variant = 'icon' }: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`/api/jobs/${jobId}/bookmark`)
      .then(res => res.json())
      .then(data => setBookmarked(data.bookmarked))
      .catch(() => {})
  }, [jobId])

  const toggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (loading) return

    setLoading(true)
    try {
      const res = await fetch(`/api/jobs/${jobId}/bookmark`, { method: 'POST' })
      if (res.status === 401) {
        window.location.href = '/login'
        return
      }
      const data = await res.json()
      setBookmarked(data.bookmarked)
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }

  if (variant === 'button') {
    return (
      <button
        onClick={toggle}
        disabled={loading}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          padding: '12px 16px',
          borderRadius: 12,
          border: '1px solid #E5E7EB',
          background: bookmarked ? '#EFF6FF' : 'white',
          color: bookmarked ? 'var(--primary)' : '#6B7280',
          cursor: loading ? 'wait' : 'pointer',
          fontWeight: 600,
          fontSize: 14,
          transition: 'all 0.2s',
        }}
      >
        <Bookmark size={size} fill={bookmarked ? 'var(--primary)' : 'none'} />
        {bookmarked ? 'Tersimpan' : 'Simpan'}
      </button>
    )
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      title={bookmarked ? 'Hapus dari tersimpan' : 'Simpan loker'}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        borderRadius: 8,
        border: 'none',
        background: bookmarked ? '#EFF6FF' : 'transparent',
        color: bookmarked ? 'var(--primary)' : '#9CA3AF',
        cursor: loading ? 'wait' : 'pointer',
        transition: 'all 0.2s',
        flexShrink: 0,
      }}
    >
      <Bookmark size={size} fill={bookmarked ? 'var(--primary)' : 'none'} />
    </button>
  )
}
