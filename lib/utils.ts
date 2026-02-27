import slugify from 'slugify'

export function generateSlug(title: string, id?: number): string {
  const base = slugify(title, { lower: true, strict: true, locale: 'id' })
  return id ? `${base}-${id}` : `${base}-${Date.now()}`
}

export function formatSalary(min?: number | null, max?: number | null, text?: string | null): string {
  if (text) return text
  if (!min && !max) return 'Negosiasi'
  const fmt = (n: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)
  if (min && max) return `${fmt(min)} - ${fmt(max)}`
  if (min) return `Mulai ${fmt(min)}`
  if (max) return `Maks. ${fmt(max)}`
  return 'Negosiasi'
}

export function timeAgo(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - new Date(date).getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (mins < 60) return `${mins} menit lalu`
  if (hours < 24) return `${hours} jam lalu`
  if (days < 30) return `${days} hari lalu`
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(date))
}
