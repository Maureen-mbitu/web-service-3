import { NextRequest, NextResponse } from 'next/server';
import { FALLBACK_SURVEYS } from '@/lib/constants';

export async function GET() {
  return NextResponse.json({ surveys: FALLBACK_SURVEYS, total: FALLBACK_SURVEYS.length });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // Simulate survey submission
  const submission = {
    id: Date.now().toString(),
    surveyId: body.surveyId,
    ...body,
    submittedAt: new Date().toISOString()
  };

  return NextResponse.json({ 
    success: true, 
    submission,
    message: 'Survey submitted successfully' 
  });
}