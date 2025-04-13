import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const { refreshToken } = await req.json();

    if (!refreshToken) {
      return NextResponse.json(
        { error: '리프레시 토큰이 제공되지 않았습니다.' },
        { status: 400 },
      );
    }

    // 토큰 만료 시간 계산 (예: 7일)
    const expiresIn = 60 * 60 * 24 * 7; // 7일 (초 단위)

    // HTTP-only 쿠키에 리프레시 토큰 저장
    const cookieStore = await cookies();
    cookieStore.set({
      name: 'refresh_token',
      value: refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // 프로덕션에서만 secure 설정
      maxAge: expiresIn,
      path: '/',
    });

    return NextResponse.json(
      { success: true, message: '리프레시 토큰이 쿠키에 저장되었습니다.' },
      { status: 200 },
    );
  } catch (error) {
    console.error('쿠키 설정 중 오류:', error);
    return NextResponse.json(
      { error: '쿠키 설정 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
