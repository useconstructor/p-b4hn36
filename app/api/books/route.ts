import { db } from '@/lib/db'

const schema = `CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, author TEXT NOT NULL,
  isbn TEXT, genre TEXT NOT NULL, price REAL NOT NULL, description TEXT,
  cover_image_url TEXT, stock INTEGER NOT NULL DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
)`

export async function GET() {
  await db.execute(schema)
  const { rows } = await db.execute('SELECT * FROM books ORDER BY created_at DESC')
  return Response.json(rows)
}

export async function POST(req: Request) {
  await db.execute(schema)
  const b = await req.json()
  if (!b.title || !b.author || !b.genre || !Number.isFinite(Number(b.price)))
    return Response.json({ error: 'Title, author, genre, and a valid price are required' }, { status: 400 })
  const result = await db.execute({
    sql: 'INSERT INTO books (title,author,isbn,genre,price,description,cover_image_url,stock) VALUES (?,?,?,?,?,?,?,?)',
    args: [b.title,b.author,b.isbn??null,b.genre,Number(b.price),b.description??null,b.cover_image_url??null,Math.max(0,Number(b.stock)||0)]
  })
  return Response.json({ ok: true, id: Number(result.lastInsertRowid) }, { status: 201 })
}
