'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import BoardsSearchIcon from '@/app/components/icons/BoardsSearchIcon';
import Button from '@/app/components/common/button/Button';
import IconPlus from '@/app/components/icons/IconPlus';
import Dropdown from '@/app/components/common/dropdown/Dropdown';
import DropdownItem from '@/app/components/common/dropdown/DropdownItem';
import DropdownList from '@/app/components/common/dropdown/DropdownList';
import DropdownToggle from '@/app/components/common/dropdown/DropdownToggle';
import IconToggle from '@/app/components/icons/IconToggle';
import useDropdown from '@/app/hooks/useDropdown';
import clsx from 'clsx';
import CommonAriticleCard from '@/app/components/boards/CommonAriticleCard';
import useGetArticle from '@/app/hooks/useGetArticle';
import useDebounce from '@/app/hooks/useDebounce';

export default function BoardsPage() {
  const { isOpen, toggleDropdown, closeDropdown, currentItem, selectItem } =
    useDropdown();

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  );
  const debouncedWidth = useDebounce(windowWidth, 300);
  const [bestPageSize, setBestPageSize] = useState(3);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('recent');

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
  });

  const { data: recentPosts, isLoading: isRecentLoading } = useGetArticle({
    page: 1,
    pageSize: 10,
    orderBy: sortOrder,
  });

  const handleItemClick = (item: string) => {
    selectItem(item);
    if (item === '최신순') {
      setSortOrder('recent');
    } else if (item === '좋아요 많은순') {
      setSortOrder('like');
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <>
      <section className="mt-16 px-4 tablet:px-6 xl:mx-auto xl:w-[75rem]">
        <div className="pt-8 tablet:pt-10">
          <div className="flex flex-col gap-6 tablet:gap-8 xl:gap-10">
            <h1 className="text-2lg tablet:text-2xl">자유게시판</h1>
            {/* 검색창 */}
            <div className='className="flex w-full overflow-hidden rounded-[12px] border border-[#F8FAFC1A] bg-background-secondary py-3 focus-within:border-transparent'>
              <label htmlFor="search" className="w-full">
                <div className="ml-4 flex w-full gap-2">
                  <BoardsSearchIcon />
                  <input
                    id="search"
                    className="w-full bg-transparent focus:placeholder-transparent focus:outline-none"
                    type="text"
                    placeholder="검색어를 입력해주세요"
                    value={searchKeyword}
                    onChange={handleSearchChange}
                  />
                </div>
              </label>
            </div>
            <h2 className="tablet:text-xl">베스트 게시글</h2>
            {/* 베스트 게시글 카드 */}
            {isBestLoading ? (
              <div>베스트 게시글 가져오는 중</div>
            ) : (
              <div className="flex flex-col gap-4 tablet:flex-row tablet:gap-4">
                {bestPosts?.list.map((post) => (
                  <CommonAriticleCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    image={post.image}
                    updatedAt={post.updatedAt}
                    writer={post.writer}
                    likeCount={post.likeCount}
                    isBasic={false}
                    isOnlyTablet
                    tabletHidden={false}
                  />
                ))}
              </div>
            )}
          </div>
          <div>
            <div className="my-8 h-[1px] w-full bg-[#F8FAFC1A] tablet:my-10" />
            <div className="mb-6 flex w-full items-center justify-between">
              <h3 className="tablet:text-xl">게시글</h3>
              {/* 드랍다운공통컴퍼넌트사용하기 */}
              <div className="w-28 tablet:w-36">
                <Dropdown className="w-full" onClose={closeDropdown}>
                  <DropdownToggle className="w-full" onClick={toggleDropdown}>
                    <div className="flex w-full items-center justify-between gap-2 rounded-xl bg-background-secondary px-2 py-[13.5px] text-xs text-text-primary hover:bg-background-tertiary tablet:px-4 tablet:text-md">
                      {currentItem || '최신순'}
                      <IconToggle
                        className={clsx('transition-transform', {
                          'rotate-180': isOpen,
                          'rotate-0': !isOpen,
                        })}
                      />
                    </div>
                  </DropdownToggle>

                  <DropdownList className="mt-[6px] w-full" isOpen={isOpen}>
                    <DropdownItem
                      className="pl-2 text-start text-xs tablet:pl-4 tablet:text-md"
                      onClick={() => handleItemClick('최신순')}
                      onClose={closeDropdown}
                    >
                      최신순
                    </DropdownItem>
                    <DropdownItem
                      className="pl-2 text-start text-xs tablet:pl-4 tablet:text-md"
                      onClick={() => handleItemClick('좋아요 많은순')}
                      onClose={closeDropdown}
                    >
                      좋아요 많은순
                    </DropdownItem>
                  </DropdownList>
                </Dropdown>
              </div>
            </div>
            {/* 게시글 카드 */}
            <div className="flex flex-col gap-4">
              {isRecentLoading ? (
                <div>게시글 가져오는 중</div>
              ) : (
                <div className="flex flex-col gap-4 tablet:gap-6">
                  {recentPosts?.list.map((post) => (
                    <CommonAriticleCard
                      key={post.id}
                      id={post.id}
                      title={post.title}
                      image={post.image}
                      updatedAt={post.updatedAt}
                      writer={post.writer}
                      likeCount={post.likeCount}
                      isBest={false}
                      isOnlyTablet={false}
                      tabletHidden
                    />
                  ))}
                </div>
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
