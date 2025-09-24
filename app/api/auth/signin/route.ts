import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Simulate user authentication (replace with actual database logic)
    const user = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email,
      role: 'farmer',
    };

    const token = `token_${user.id}_${Date.now()}`;

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user,
      token,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}