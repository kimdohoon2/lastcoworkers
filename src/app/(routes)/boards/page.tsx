import BoardsSearchIcon from '@/app/components/icons/BoardsSearchIcon';
import BoardsLikeIcon from '@/app/components/icons/BoardsLikeIcon';
import Image from 'next/image';
import Button from '@/app/components/common/button/Button';
import IconPlus from '@/app/components/icons/IconPlus';
import Link from 'next/link';

export default function BoardsPage() {
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
    {
      updatedAt: '2025-01-29T12:00:00.000Z',
      createdAt: '2025-01-29T12:00:00.000Z',
      likeCount: 12,
      writer: {
        nickname: '영희',
        id: 3,
      },
      image: '/icons/BoardsBestIcon.png',
      title: '임시 게시글 제목 2',
      id: 11,
    },
    {
      updatedAt: '2025-01-28T12:00:00.000Z',
      createdAt: '2025-01-28T12:00:00.000Z',
      likeCount: 7,
      writer: {
        nickname: '철수',
        id: 4,
      },
      image: '/icons/BoardsBestIcon.png',
      title: '임시 게시글 제목 3',
      id: 12,
    },
  ];

  return (
    <>
      <section className="mt-16 px-4">
        <div className="flex flex-col gap-6 pt-8">
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
          <div>
            <div className="my-8 h-[1px] w-full bg-[#F8FAFC1A]" />
            <div className="mb-6 flex w-full items-center justify-between">
              <h3>게시글</h3>
              {/* 드랍다운공통컴퍼넌트사용하기 */}
              <button>최신순</button>
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
        href="/boards/write"
      >
        <Button variant="plus" size="plus">
          <IconPlus />글 쓰기
        </Button>
      </Link>
    </>
  );
}
