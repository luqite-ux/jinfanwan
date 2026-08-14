import { NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase'

type InquiryPayload = Record<string, FormDataEntryValue | string | null | undefined>

function text(value: InquiryPayload[string]) {
  return String(value ?? '').trim()
}

async function readPayload(request: Request): Promise<InquiryPayload> {
  const contentType = request.headers.get('content-type') ?? ''
  if (contentType.includes('application/json')) {
    return await request.json()
  }

  const formData = await request.formData()
  return Object.fromEntries(formData.entries())
}

export async function POST(request: Request) {
  const payload = await readPayload(request)
  const tenantId = process.env['TENANT_ID'] ?? process.env['NEXT_PUBLIC_TENANT_ID']
  const supabase = getSupabaseClient()
  if (!tenantId || !supabase) {
    return NextResponse.json({ error: 'Inquiry service is not configured.' }, { status: 500 })
  }

  const name = text(payload.name)
  const email = text(payload.email)
  const message = text(payload.message)
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
  }

  const productInterest = text(payload.product)
  const requirements = text(payload.requirements)
  const estimatedQuantity = text(payload.quantity)
  const country = text(payload.country)
  const subject = productInterest || 'JINFANWAN food storage container inquiry'
  const composedMessage = [
    message,
    requirements && `Custom Requirements: ${requirements}`,
    estimatedQuantity && `Estimated Quantity: ${estimatedQuantity}`,
    country && `Country / Region: ${country}`,
  ].filter(Boolean).join('\n\n')

  const { error } = await supabase.from('inquiries').insert({
    tenant_id: tenantId,
    name,
    email,
    phone: text(payload.phone),
    company: text(payload.company),
    subject,
    message: composedMessage,
    status: 'unread',
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
