import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // In production, you would:
    // 1. Validate credentials against database
    // 2. Check if user exists and is active
    // 3. Verify password hash
    // 4. Generate JWT token

    // Mock validation for demo
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Mock successful login
    const mockUser = {
      id: 'user_123',
      email,
      name: 'Demo User',
      role: 'user'
    };

    // Create session cookie (in production, use HttpOnly secure cookies)
    const response = NextResponse.json({
      success: true,
      user: mockUser,
      token: 'mock_jwt_token_here'
    });

    // Set cookie for demo (use proper security in production)
    response.cookies.set('auth_token', 'mock_jwt_token_here', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}