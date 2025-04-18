import { NextResponse } from 'next/server'
import pool from '../../../../libs/db'

export async function POST(req: Request) {
  const client = await pool.connect();
  try {
    const { user_email, contact_name, contact_phone, address, items } = await req.json();

    await client.query('BEGIN');

    const orderRes = await client.query(
      `INSERT INTO orders (user_email, contact_name, contact_phone, address, status)
       VALUES ($1, $2, $3, $4, 'Pending') RETURNING id`,
      [user_email, contact_name, contact_phone, address]
    );

    const orderId = orderRes.rows[0].id;

    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity)
         VALUES ($1, $2, $3)`,
        [orderId, item.product_id, item.quantity]
      );
    }

    await client.query('COMMIT');
    return NextResponse.json({ success: true, orderId });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Order Insert Error:', err);
    return NextResponse.json({ error: 'Order failed' }, { status: 500 });
  } finally {
    client.release();
  }
}
