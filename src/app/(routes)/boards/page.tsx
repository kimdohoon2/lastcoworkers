'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/app/components/common/button/Button';
import IconPlus from '@/app/components/icons/IconPlus';
import CommonAriticleCard from '@/app/components/boards/CommonAriticleCard';
import useGetArticle from '@/app/hooks/useGetArticle';
import useDebounce from '@/app/hooks/useDebounce';
import BoardsOrderDropDown from '@/app/components/boards/BoardsOrderDropDown';
import BoardsSearchBar from '@/app/components/boards/BoardsSearchBar';

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

  useEffect(() => {
    if (debouncedWidth < 744) setBestPageSize(1);
    else if (debouncedWidth < 1280) setBestPageSize(2);
    else setBestPageSize(3);
  }, [debouncedWidth]);

  const { data: bestPosts, isLoading: isBestLoading } = useGetArticle({
    page: 1,
    pageSize: bestPageSize,
    orderBy: 'like',
    keyword: debouncedSearchKeyword,
  });

  const { data: recentPosts, isLoading: isRecentLoading } = useGetArticle({
    page: 1,
    pageSize: 10,
    orderBy: sortOrder,
    keyword: debouncedSearchKeyword,
  });

  return (
    <>
      <section className="mt-16 px-4 tablet:px-6 xl:mx-auto xl:w-[75rem]">
        <div className="pt-8 tablet:pt-10">
          <div className="flex flex-col gap-6 tablet:gap-8 xl:gap-10">
            <h1 className="text-2lg tablet:text-2xl">자유게시판</h1>
            {/* 검색창 */}
            <BoardsSearchBar
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
            />
            <h2 className="tablet:text-xl">베스트 게시글</h2>
            {/* 베스트 게시글 카드 */}
            {isBestLoading ? (
              <div>베스트 게시글 가져오는 중</div>
            ) : bestPosts && bestPosts.list.length > 0 ? (
              <div className="flex flex-col gap-4 tablet:flex-row tablet:gap-4">
                {bestPosts?.list.map((article) => (
                  <CommonAriticleCard
                    key={article.id}
                    id={article.id}
                    title={article.title}
                    image={article.image}
                    updatedAt={article.updatedAt}
                    writer={article.writer}
                    likeCount={article.likeCount}
                    isBasic={false}
                    isOnlyTablet
                    tabletHidden={false}
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
              {/* 최신순, 좋아요많은순 버튼 */}
              <BoardsOrderDropDown setSortOrder={setSortOrder} />
            </div>
            {/* 게시글 카드 */}
            <div className="flex flex-col gap-4">
              {isRecentLoading ? (
                <div>게시글 가져오는 중</div>
              ) : recentPosts && recentPosts.list.length > 0 ? (
                <div className="flex flex-col gap-4 tablet:gap-6">
                  {recentPosts?.list.map((article) => (
                    <CommonAriticleCard
                      key={article.id}
                      id={article.id}
                      title={article.title}
                      image={article.image}
                      updatedAt={article.updatedAt}
                      writer={article.writer}
                      likeCount={article.likeCount}
                      isBest={false}
                      isOnlyTablet={false}
                      tabletHidden
                      isLiked
                    />
                  ))}
                </div>
              ) : (
                <div>검색 결과에 해당하는 게시글이 없습니다.</div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Link
        className="fixed bottom-5 right-4 block h-[48px] w-[125px] tablet:right-8 xl:bottom-9 xl:right-96"
        href="/addboard"
      >
        <Button variant="plus" size="plus">
          <IconPlus />글 쓰기
        </Button>
      </Link>
    </>
  );
}
