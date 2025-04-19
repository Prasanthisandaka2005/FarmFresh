import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../../libs/db';

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id } = await context.params; 

  try {
    const orderRes = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    if (orderRes.rows.length === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const order = orderRes.rows[0];

    const itemsRes = await pool.query(
      `SELECT oi.quantity, p.name, p.price 
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = $1`,
      [id]
    );

    order.items = itemsRes.rows;

    return NextResponse.json(order);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error fetching order details' }, { status: 500 });
  }
}
