import type { Metadata } from 'next';
import '@/app/styles/globals.css';

export const metadata: Metadata = {
  title: 'Coworkers',
  description:
    '업무 배정과 현황 공유를 효율적으로 관리하며, 최적화된 To-do 리스트와 성과 지표 시각화로 사용자가 업무를 쉽게 생성하고 진행 상황을 확인할 수 있는 서비스입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/fonts-archive/Pretendard/subsets/Pretendard-dynamic-subset.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
