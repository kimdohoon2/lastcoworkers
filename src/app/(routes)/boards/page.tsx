'use client';

import Image from 'next/image';
import Link from 'next/link';
import BoardsSearchIcon from '@/app/components/icons/BoardsSearchIcon';
import BoardsLikeIcon from '@/app/components/icons/BoardsLikeIcon';
import Button from '@/app/components/common/button/Button';
import IconPlus from '@/app/components/icons/IconPlus';
import Dropdown from '@/app/components/common/dropdown/Dropdown';
import DropdownItem from '@/app/components/common/dropdown/DropdownItem';
import DropdownList from '@/app/components/common/dropdown/DropdownList';
import DropdownToggle from '@/app/components/common/dropdown/DropdownToggle';
import IconToggle from '@/app/components/icons/IconToggle';
import useDropdown from '@/app/hooks/useDropdown';
import clsx from 'clsx';

export default function BoardsPage() {
  const { isOpen, toggleDropdown, closeDropdown, currentItem, selectItem } =
    useDropdown();

  const handleItemClick = (item: string) => {
    selectItem(item);
  };
  const bestPosts = [
    {
      updatedAt: '2025-01-30T12:00:00.000Z',
      createdAt: '2025-01-30T12:00:00.000Z',
      likeCount: 5,
      writer: {
        nickname: '도훈',
        id: 2,
      },
      image: '/icons/BoardsBestIcon.png',
      title: '임시 게시글 제목 1',
      id: 10,
    },
  ];

  return (
    <>
      <section className="mt-16 px-4">
        <div className="pt-8">
          <div className="flex flex-col gap-6">
            <h1 className="text-2lg">자유게시판</h1>
            {/* 검색창 */}
            <div className='className="flex w-full rounded-[12px] border border-[#F8FAFC1A] bg-background-secondary py-3'>
              <label className="w-full" htmlFor="search">
                <div className="ml-4 flex w-full gap-2">
                  <BoardsSearchIcon />
                  <input
                    className="w-full bg-transparent"
                    type="text"
                    placeholder="검색어를 입력해주세요"
                  />
                </div>
              </label>
            </div>
            <h2>베스트 게시글</h2>
            {/* 베스트 게시글 카드 */}
            {bestPosts.map((post) => (
              <div
                key={post.id}
                className="w-full rounded-[12px] border border-[#F8FAFC1A] bg-background-secondary px-4 pb-4 pt-2"
              >
                <div className="mb-3 flex items-center gap-2">
                  <div className="w-full max-w-[14px]">
                    <Image
                      className="w-full"
                      src="/icons/BoardsBestIcon.png"
                      width={14}
                      height={16}
                      alt="베스트 아이콘"
                    />
                  </div>
                  <span className="text-md">Best</span>
                </div>
                <div className="flex justify-between">
                  <p className="text-md text-text-secondary">{post.title}</p>
                  <div className="h-[64px] w-[64px]">
                    <Image
                      className="h-full w-full rounded-[12px] object-cover"
                      src={post.image}
                      alt="게시글 이미지"
                      width={72}
                      height={72}
                    />
                  </div>
                </div>
                <p className="mb-4 text-xs text-text-disabled">
                  {new Date(post.updatedAt).toLocaleDateString()}
                </p>
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/icons/BoardsProfile.png"
                      width={32}
                      height={32}
                      alt="프로필 이미지"
                    />
                    <span className="text-xs">{post.writer.nickname}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BoardsLikeIcon />
                    <span className="text-xs text-text-disabled">
                      {post.likeCount}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="my-8 h-[1px] w-full bg-[#F8FAFC1A]" />
            <div className="mb-6 flex w-full items-center justify-between">
              <h3>게시글</h3>
              {/* 드랍다운공통컴퍼넌트사용하기 */}

              <Dropdown className="w-24" onClose={closeDropdown}>
                <DropdownToggle className="w-full" onClick={toggleDropdown}>
                  <div className="flex w-full items-center justify-between rounded-xl bg-background-secondary px-2 py-[13.5px] text-center text-xs text-text-primary hover:bg-background-tertiary">
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
                    className="pl-2 text-start text-xs"
                    onClick={() => handleItemClick('최신순')}
                    onClose={closeDropdown}
                  >
                    최신순
                  </DropdownItem>
                  <DropdownItem
                    className="pl-2 text-start text-xs"
                    onClick={() => handleItemClick('좋아요 많은순')}
                    onClose={closeDropdown}
                  >
                    좋아요 많은순
                  </DropdownItem>
                </DropdownList>
              </Dropdown>
            </div>
            {/* 게시글 카드 */}
            <div className="flex flex-col gap-4">
              {bestPosts.map((post) => (
                <div
                  key={post.id}
                  className="w-full rounded-[12px] border border-[#F8FAFC1A] bg-background-secondary px-4 pb-4 pt-2"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <div className="w-full max-w-[14px]">
                      <Image
                        className="w-full"
                        src="/icons/BoardsBestIcon.png"
                        width={14}
                        height={16}
                        alt="베스트 아이콘"
                      />
                    </div>
                    <span className="text-md">Best</span>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-md text-text-secondary">{post.title}</p>
                    <div className="h-[64px] w-[64px]">
                      <Image
                        className="h-full w-full rounded-[12px] object-cover"
                        src={post.image}
                        alt="게시글 이미지"
                        width={72}
                        height={72}
                      />
                    </div>
                  </div>
                  <p className="mb-4 text-xs text-text-disabled">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </p>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/icons/BoardsProfile.png"
                        width={32}
                        height={32}
                        alt="프로필 이미지"
                      />
                      <span className="text-xs">{post.writer.nickname}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BoardsLikeIcon />
                      <span className="text-xs text-text-disabled">
                        {post.likeCount}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Link
        className="fixed bottom-5 right-4 block h-[48px] w-[125px]"
        href="/addboard"
      >
        <Button variant="plus" size="plus">
          <IconPlus />글 쓰기
        </Button>
      </Link>
    </>
  );
}
