import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function POST() {
  try {
    // 쿠키에서 리프레시 토큰 가져오기
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh_token')?.value;

    if (!refreshToken) {
      console.error('리프레시 토큰이 없습니다.');
      return NextResponse.json(
        { error: '리프레시 토큰이 없습니다.' },
        { status: 401 },
      );
    }

    // 백엔드 서버에 리프레시 요청
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh-token`,
      { refreshToken },
    );

    return NextResponse.json(
      { accessToken: response.data.accessToken },
      { status: 200 },
    );
  } catch (error) {
    console.error('리프레시 토큰 갱신 중 오류:', error);
    return NextResponse.json(
      { error: '토큰 갱신에 실패했습니다.' },
      { status: 401 },
    );
  }
}
