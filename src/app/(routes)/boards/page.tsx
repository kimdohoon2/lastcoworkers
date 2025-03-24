'use client';

import { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Button from '@/app/components/common/button/Button';
import IconPlus from '@/app/components/icons/IconPlus';
import CommonAriticleCard from '@/app/components/boards/CommonAriticleCard';
import useGetArticle from '@/app/hooks/useGetArticle';
import useDebounce from '@/app/hooks/useDebounce';
import BoardsOrderDropDown from '@/app/components/boards/BoardsOrderDropDown';
import BoardsSearchBar from '@/app/components/boards/BoardsSearchBar';
import useGetArticleInfinite from '@/app/hooks/useGetArticleInfinite';
import BoardsSkeleton from '@/app/components/boards/BoardsSkeleton';
import useAuthRedirect from '@/app/hooks/useAuthRedirect';
import AuthCheckLoading from '@/app/components/common/auth/AuthCheckLoading';

interface SizeMap {
  mobile: number;
  tablet: number;
  pc: number;
}

export default function BoardsPage() {
  const { isLoading: isAuthLoading } = useAuthRedirect();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  );

  const [bestPageSize, setBestPageSize] = useState(3);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('recent');

  // 디바운싱된 검색어 상태
  const debouncedSearchKeyword = useDebounce(searchKeyword, 300);

  const debouncedWidth = useDebounce(windowWidth, 300);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sizeMap: SizeMap = { mobile: 1, tablet: 2, pc: 3 };

  const getPageSize = (width: number): number =>
    width < 744 ? sizeMap.mobile : width < 1280 ? sizeMap.tablet : sizeMap.pc;

  useEffect(() => {
    setBestPageSize(getPageSize(debouncedWidth));
  }, [debouncedWidth]);

  // 베스트 게시글 데이터 가져오기
  const { data: bestPosts, isLoading: isBestLoading } = useGetArticle({
    page: 1,
    pageSize: bestPageSize,
    orderBy: 'like',
    keyword: debouncedSearchKeyword, // 디바운싱된 검색어 사용
  });

  // 최신 게시글 데이터 가져오기 (무한 스크롤)
  const {
    data: recentPosts,
    isLoading: isRecentLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetArticleInfinite({
    pageSize: 4,
    orderBy: sortOrder,
    keyword: debouncedSearchKeyword, // 디바운싱된 검색어 사용
  });

  const allArticles = recentPosts?.pages.flatMap((page) => page.list) || [];

  // 리엑트 인터섹션 옵저버 활용한 무한스크롤
  const [ref, inView] = useInView();

  const fetchMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (inView) {
      fetchMore();
    }
  }, [inView, fetchMore]);

  if (isAuthLoading) {
    return <AuthCheckLoading />;
  }

  return (
    <>
      <section className="mt-16 px-4 tablet:px-6 xl:mx-auto xl:w-[75rem]">
        <div className="pt-8 tablet:pt-10">
          <div className="flex flex-col gap-6 tablet:gap-8 xl:gap-10">
            <h1 className="text-2lg font-bold tablet:text-2xl">자유게시판</h1>
            {/* 검색 바 */}
            <BoardsSearchBar
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
            />
            <h2 className="font-bold tablet:text-xl">베스트 게시글</h2>
            <div className="flex flex-col gap-4 tablet:flex-row tablet:gap-4">
              {isBestLoading ? (
                Array.from({ length: bestPageSize }).map(() => (
                  <BoardsSkeleton
                    className="h-40 tablet:h-56"
                    key={`skeleton-${crypto.randomUUID()}`}
                  />
                ))
              ) : bestPosts && bestPosts.list.length > 0 ? (
                bestPosts.list.map((article) => (
                  <CommonAriticleCard
                    key={article.id}
                    {...article}
                    isBasic={false}
                    tabletHidden={false}
                    isOnlyTablet
                    isLiked
                  />
                ))
              ) : (
                <div>검색 결과에 해당하는 베스트 게시글이 없습니다.</div>
              )}
            </div>
          </div>
          <div>
            <div className="my-8 h-[1px] w-full bg-[#F8FAFC1A] tablet:my-10" />
            <div className="mb-6 flex w-full items-center justify-between">
              <h3 className="font-bold tablet:text-xl">게시글</h3>
              <BoardsOrderDropDown setSortOrder={setSortOrder} />
            </div>
            {isRecentLoading ? (
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {Array.from({ length: 4 }).map(() => (
                  <BoardsSkeleton
                    className="h-[8.5rem] tablet:h-44"
                    key={crypto.randomUUID()}
                  />
                ))}
              </div>
            ) : allArticles.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {allArticles.map((article) => (
                  <CommonAriticleCard
                    key={article.id}
                    {...article}
                    isBest={false}
                    isOnlyTablet={false}
                    tabletHidden
                    isLiked
                  />
                ))}

                {/* 무한 스크롤 시 UI 추가 */}
                {isFetchingNextPage && (
                  <>
                    <BoardsSkeleton className="h-[8.5rem] tablet:h-44" />
                    <BoardsSkeleton className="hidden h-[8.5rem] tablet:h-44 xl:block" />
                  </>
                )}

                <div ref={ref} className="h-10" />
              </div>
            ) : (
              <div>검색 결과에 해당하는 게시글이 없습니다.</div>
            )}
          </div>
          {!hasNextPage && allArticles.length > 0 && (
            <div className="py-4 text-center">더 이상 게시글이 없습니다.</div>
          )}
        </div>
      </section>

      {/* 글쓰기 버튼 */}
      <Link
        className="fixed bottom-5 right-4 block h-12 w-[6.5rem] tablet:right-8 xl:left-[50%] xl:top-[95%] xl:-translate-y-1/2 xl:translate-x-[29rem]"
        href="/addboard"
      >
        <Button className="w-full !rounded-[2.5rem]">
          <IconPlus />
          글쓰기
        </Button>
      </Link>
    </>
  );
}
