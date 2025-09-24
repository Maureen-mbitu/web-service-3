import { NextRequest, NextResponse } from 'next/server';
import { FALLBACK_EVENTS } from '@/lib/constants';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');
  const limit = searchParams.get('limit');

  let events = FALLBACK_EVENTS;

  if (category && category !== 'All') {
    events = events.filter(event => event.category === category);
  }

  if (featured === 'true') {
    events = events.filter(event => event.featured);
  }

  if (limit) {
    events = events.slice(0, parseInt(limit));
  }

  return NextResponse.json({ events, total: events.length });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // Simulate event registration
  const registration = {
    id: Date.now().toString(),
    eventId: body.eventId,
    ...body,
    registeredAt: new Date().toISOString()
  };

  return NextResponse.json({ 
    success: true, 
    registration,
    message: 'Registration successful' 
  });
}