import type { Metadata } from 'next';
import '@/app/styles/globals.css';
import Header from '@/app/components/common/header/Header';
import TanStackProvider from '@/app/providers/TanStackProvider';
import ReduxProvider from '@/app/providers/ReduxProvider';
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  title: 'Coworkers',
  description:
    '업무 배정과 현황 공유를 효율적으로 관리하며, 최적화된 To-do 리스트와 성과 지표 시각화로 사용자가 업무를 쉽게 생성하고 진행 상황을 확인할 수 있는 서비스입니다.',
  keywords: 'Coworkers, 일정관리 사이트, 업무관리 사이트, 코드잇',
  openGraph: {
    siteName: 'Coworkers',
    title: 'Coworkers',
    type: 'website',
    description:
      '업무 배정과 현황 공유를 효율적으로 관리하며, 최적화된 To-do 리스트와 성과 지표 시각화로 사용자가 업무를 쉽게 생성하고 진행 상황을 확인할 수 있는 서비스입니다.',
    images: [
      {
        url: 'https://team8-coworkers.vercel.app/meta/SumMeta.png',
        alt: 'Coworkers 대표 이미지',
      },
    ],
    url: 'https://team8-coworkers.vercel.app/',
  },
  icons: {
    icon: '/favicon.ico',
  },
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
        <meta
          name="copyright"
          content="Image by Icons8: https://icons8.com/icon/a_HIsIu2fM19/no-image"
        />
      </head>
      <body>
        <ReduxProvider>
          <TanStackProvider>
            <Header />
            {children}
            <ToastContainer />
          </TanStackProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
