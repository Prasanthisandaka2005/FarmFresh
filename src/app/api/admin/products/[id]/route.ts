import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../../../libs/db';

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const { id } = await context.params;
  const { name, price, image_url } = await req.json();
  
  await pool.query(
    'UPDATE products SET name = $1, price = $2, image_url = $3 WHERE id = $4',
    [name, price, image_url, id]
  );

  return NextResponse.json({ message: 'Product updated' });
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const { id } = await context.params;

  try {
    const res = await pool.query(
      'SELECT 1 FROM order_items WHERE product_id = $1 LIMIT 1',
      [id]
    );

    if (res.rowCount > 0) {
      return NextResponse.json(
        { error: 'Cannot delete. Product is part of an existing order.' },
        { status: 400 }
      );
    }

    await pool.query('DELETE FROM products WHERE id = $1', [id]);

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
