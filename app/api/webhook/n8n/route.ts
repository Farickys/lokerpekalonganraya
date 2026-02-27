import { NextRequest, NextResponse } from 'next/server'

// n8n webhook endpoint untuk menerima loker hasil scraping Apify
// Endpoint: POST /api/webhook/n8n
// Header: x-webhook-secret: YOUR_N8N_WEBHOOK_SECRET

interface ScrapedJob {
  title: string
  description?: string
  salary?: string
  city?: string
  area?: 'KOTA_PEKALONGAN' | 'KAB_PEKALONGAN' | 'BATANG' | 'PEMALANG'
  category?: string
  contactWa?: string
  applyUrl?: string
  source: 'SCRAPED_IG' | 'SCRAPED_FB'
  sourceUrl?: string
  sourceImage?: string
  jobType?: string
}

export async function POST(req: NextRequest) {
  // Validate webhook secret
  const secret = req.headers.get('x-webhook-secret')
  if (secret !== process.env.N8N_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { jobs?: ScrapedJob[] } | ScrapedJob
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const jobs: ScrapedJob[] = Array.isArray((body as any).jobs) 
    ? (body as any).jobs 
    : [body as ScrapedJob]

  const results = { success: 0, failed: 0, ids: [] as number[] }

  for (const job of jobs) {
    try {
      // Validate required fields
      if (!job.title || !job.source) {
        results.failed++
        continue
      }

      // Auto-detect area from city/text if not provided
      const area = job.area || detectArea(job.city || job.description || '')

      // Generate slug
      const slug = generateSlug(job.title)

      // In real app: await prisma.job.create({...})
      // Simulate success
      const id = Math.floor(Math.random() * 10000)
      results.ids.push(id)
      results.success++

      console.log(`[n8n webhook] Created job: ${job.title} (ID: ${id}) from ${job.source}`)
    } catch (err) {
      console.error(`[n8n webhook] Failed to create job:`, err)
      results.failed++
    }
  }

  // Log webhook
  console.log(`[n8n webhook] Processed ${jobs.length} jobs: ${results.success} success, ${results.failed} failed`)

  return NextResponse.json({
    message: `Processed ${jobs.length} jobs`,
    success: results.success,
    failed: results.failed,
    ids: results.ids,
    timestamp: new Date().toISOString(),
  })
}

function detectArea(text: string): string {
  const t = text.toLowerCase()
  if (t.includes('batang')) return 'BATANG'
  if (t.includes('pemalang')) return 'PEMALANG'
  if (t.includes('kabupaten pekalongan') || t.includes('kajen') || t.includes('kedungwuni')) return 'KAB_PEKALONGAN'
  return 'KOTA_PEKALONGAN' // default
}

function generateSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9\s]/g,'').replace(/\s+/g,'-') + '-' + Date.now()
}
