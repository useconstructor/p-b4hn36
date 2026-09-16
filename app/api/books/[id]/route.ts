import { db } from '@/lib/db'

const allowed = ['title','author','isbn','genre','price','description','cover_image_url','stock'] as const

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const keys = allowed.filter(k => body[k] !== undefined)
  if (!keys.length) return Response.json({ error: 'No valid fields supplied' }, { status: 400 })
  await db.execute({ sql: `UPDATE books SET ${keys.map(k=>`${k}=?`).join(',')} WHERE id=?`, args: [...keys.map(k=>body[k]),id] })
  const { rows } = await db.execute({ sql: 'SELECT * FROM books WHERE id=?', args: [id] })
  return rows[0] ? Response.json(rows[0]) : Response.json({ error: 'Book not found' }, { status: 404 })
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await db.execute({ sql: 'DELETE FROM books WHERE id=?', args: [id] })
  return Response.json({ ok: true })
}
