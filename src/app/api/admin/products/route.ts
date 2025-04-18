import { NextRequest, NextResponse } from 'next/server'
import pool from '../../../../../libs/db'

export async function GET() {
  const res = await pool.query('SELECT * FROM products ORDER BY id DESC')
  return NextResponse.json(res.rows)
}

export async function POST(req: NextRequest) {
  const { name, price, image_url } = await req.json()
  await pool.query(
    'INSERT INTO products (name, price, image_url) VALUES ($1, $2, $3)',
    [name, price, image_url]
  )
  return NextResponse.json({ message: 'Product added' })
}
