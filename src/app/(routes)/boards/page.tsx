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

interface SizeMap {
  mobile: number;
  tablet: number;
  pc: number;
}

export default function BoardsPage() {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  );

  const [bestPageSize, setBestPageSize] = useState(3);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('recent');

  const debouncedWidth = useDebounce(windowWidth, 300);
  const debouncedSearchKeyword = useDebounce(searchKeyword, 100);

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

  const { data: bestPosts, isLoading: isBestLoading } = useGetArticle({
    page: 1,
    pageSize: bestPageSize,
    orderBy: 'like',
    keyword: debouncedSearchKeyword,
  });

  const {
    data: recentPosts,
    isLoading: isRecentLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetArticleInfinite({
    pageSize: 3,
    orderBy: sortOrder,
    keyword: debouncedSearchKeyword,
  });
  const allArticles = recentPosts?.pages.flatMap((page) => page.list) || [];

  // 리엑트 인터셉션 옵저버 활용한 무한스크롤
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

  return (
    <>
      <section className="mt-16 px-4 tablet:px-6 xl:mx-auto xl:w-[75rem]">
        <div className="pt-8 tablet:pt-10">
          <div className="flex flex-col gap-6 tablet:gap-8 xl:gap-10">
            <h1 className="text-2lg tablet:text-2xl">자유게시판</h1>
            <BoardsSearchBar
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
            />
            <h2 className="tablet:text-xl">베스트 게시글</h2>
            {isBestLoading ? (
              <div>베스트 게시글 가져오는 중</div>
            ) : bestPosts && bestPosts.list.length > 0 ? (
              <div className="flex flex-col gap-4 tablet:flex-row tablet:gap-4">
                {bestPosts?.list.map((article) => (
                  <CommonAriticleCard
                    key={article.id}
                    {...article}
                    isBasic={false}
                    tabletHidden={false}
                    isOnlyTablet
                    isLiked
                  />
                ))}
              </div>
            ) : (
              <div>검색 결과에 해당하는 베스트 게시글이 없습니다.</div>
            )}
          </div>
          <div>
            <div className="my-8 h-[1px] w-full bg-[#F8FAFC1A] tablet:my-10" />
            <div className="mb-6 flex w-full items-center justify-between">
              <h3 className="tablet:text-xl">게시글</h3>
              <BoardsOrderDropDown setSortOrder={setSortOrder} />
            </div>
            {isRecentLoading ? (
              <div>게시글 가져오는 중</div>
            ) : allArticles.length > 0 ? (
              <div className="flex flex-col">
                {allArticles.map((article) => (
                  <div key={article.id} className="mb-4 tablet:mb-6">
                    <CommonAriticleCard
                      {...article}
                      isBest={false}
                      isOnlyTablet={false}
                      tabletHidden
                      isLiked
                    />
                  </div>
                ))}

                {/* 모든 게시글을 가져왔을 때 메시지 표시 */}
                {!hasNextPage && allArticles.length > 0 && (
                  <div className="py-4 text-center">
                    더 이상 게시글이 없습니다.
                  </div>
                )}

                {/* 무한 스크롤 시 UI 추가 */}
                {isFetchingNextPage && (
                  <div className="py-4 text-center">게시글 가져오는 중</div>
                )}

                <div ref={ref} className="h-10">
                  {hasNextPage && !isFetchingNextPage && '스크롤하여 더 보기'}
                </div>
              </div>
            ) : (
              <div>검색 결과에 해당하는 게시글이 없습니다.</div>
            )}
          </div>
        </div>
      </section>

      <Link
        className="fixed bottom-5 right-4 block h-[48px] w-[125px] tablet:right-8 xl:bottom-9 xl:right-96"
        href="/addboard"
      >
        <Button variant="plus" size="plus">
          <IconPlus />
          글쓰기
        </Button>
      </Link>
    </>
  );
}
