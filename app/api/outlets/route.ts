import { NextRequest, NextResponse } from 'next/server';
import { FALLBACK_OUTLETS } from '@/lib/constants';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const region = searchParams.get('region');
  const type = searchParams.get('type');
  const limit = searchParams.get('limit');

  let outlets = FALLBACK_OUTLETS;

  if (region && region !== 'All') {
    outlets = outlets.filter(outlet => outlet.region === region);
  }

  if (type && type !== 'All') {
    outlets = outlets.filter(outlet => outlet.type === type);
  }

  if (limit) {
    outlets = outlets.slice(0, parseInt(limit));
  }

  return NextResponse.json({ outlets, total: outlets.length });
}