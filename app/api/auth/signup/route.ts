import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, role, password } = body;

    if (!firstName || !lastName || !email || !phone || !role || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const user = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      phone,
      role,
      createdAt: new Date().toISOString(),
    };

    const token = `token_${user.id}_${Date.now()}`;

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
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