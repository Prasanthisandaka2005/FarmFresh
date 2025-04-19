import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../libs/db';

export async function GET(req: NextRequest) {
  try {
    const userEmail = req.headers.get('user-email');
    if (!userEmail) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const res = await pool.query('SELECT * FROM orders WHERE user_email = $1', [userEmail]);
    return NextResponse.json(res.rows);
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
