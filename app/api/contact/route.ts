import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = schema.parse(json)

    const resend = new Resend(process.env.RESEND_API_KEY)
    const to = process.env.CONTACT_TO_EMAIL
    const from = process.env.CONTACT_FROM_EMAIL || 'no-reply@hauskersci.com'

    if (!to) throw new Error('Missing CONTACT_TO_EMAIL')

    await resend.emails.send({
      from,
      to,
      subject: `New Inquiry — ${body.company} / ${body.name}`,
      replyTo: body.email,
      text: `Name: ${body.name}\nCompany: ${body.company}\nEmail: ${body.email}\n\nMessage:\n${body.message}`
    })

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    const msg = err?.message || 'Invalid request'
    return NextResponse.json({ error: msg }, { status: 400 })
  }
}
