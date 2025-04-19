import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../../../libs/db';

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const { status } = await req.json();
  const id = await context.params;

  const validStatuses = ['Pending', 'Shipped', 'Delivered'];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
  }

  try {
    const result = await pool.query('UPDATE orders SET status = $1 WHERE id = $2 RETURNING *', [status, id]);

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Order status updated', order: result.rows[0] });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
