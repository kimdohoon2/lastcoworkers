import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    // 쿠키 저장소 가져오기
    const cookieStore = await cookies();

    // 리프레시 토큰 쿠키 삭제
    cookieStore.delete('refresh_token');

    return NextResponse.json(
      { success: true, message: '리프레시 토큰 쿠키가 삭제되었습니다.' },
      { status: 200 },
    );
  } catch (error) {
    console.error('쿠키 삭제 중 오류:', error);
    return NextResponse.json(
      { error: '쿠키 삭제 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
