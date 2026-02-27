import { NextRequest, NextResponse } from 'next/server'

// POST /api/admin/jobs - Approve or reject job (admin only)
export async function POST(req: NextRequest) {
  // const session = await auth()
  // if (!session || session.user.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  try {
    const { jobId, action, edits } = await req.json()
    // action: 'approve' | 'reject'

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    // In real app:
    // await prisma.job.update({
    //   where: { id: jobId },
    //   data: { 
    //     status: action === 'approve' ? 'ACTIVE' : 'REJECTED',
    //     ...edits
    //   }
    // })
    
    // If approved AND featured: trigger n8n webhook to post to Instagram
    // if (action === 'approve' && job.featured) {
    //   await triggerInstagramPost(job)
    // }

    // Log webhook
    console.log(`[admin] Job ${jobId} ${action}d`)

    return NextResponse.json({ success: true, message: `Job ${action}d successfully` })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// Trigger n8n to post to Instagram
async function triggerInstagramPost(job: any) {
  const n8nWebhookUrl = process.env.N8N_INSTAGRAM_WEBHOOK_URL
  if (!n8nWebhookUrl) return
  
  await fetch(n8nWebhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: job.title,
      company: job.company?.name || 'Lowongan Kerja',
      area: job.area,
      salary: job.salary,
      category: job.category,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/loker/${job.slug}`,
      featured: job.featured,
    })
  })
}
