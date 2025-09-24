import { NextRequest, NextResponse } from 'next/server';
import { FALLBACK_PRODUCTS } from '@/lib/constants';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const limit = searchParams.get('limit');

  let products = FALLBACK_PRODUCTS;

  if (category && category !== 'All') {
    products = products.filter(product => product.category === category);
  }

  if (search) {
    products = products.filter(product => 
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (limit) {
    products = products.slice(0, parseInt(limit));
  }

  return NextResponse.json({ products, total: products.length });
}