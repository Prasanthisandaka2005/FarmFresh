import { NextResponse } from 'next/server';
import pool from '../../../../../libs/db';

export async function GET() {
  try {
    const res = await pool.query('SELECT * FROM orders');
    return NextResponse.json(res.rows);
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
