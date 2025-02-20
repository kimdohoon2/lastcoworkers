import { v4 as uuidv4 } from 'uuid';

export default function BoardDetailSkeleton() {
  const commentKeys = Array.from({ length: 3 }, () => uuidv4());

  return (
    <div className="flex justify-center py-[6.25rem]">
      <div className="w-[90%] max-w-[75rem]">
        {/* 게시글 제목 */}
        <div className="mb-5 h-8 w-48 animate-pulse rounded-lg bg-background-tertiary" />

        {/* 작성자 및 날짜 */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 animate-pulse rounded-full bg-background-tertiary" />
            <div className="h-6 w-32 animate-pulse rounded-lg bg-background-tertiary" />
          </div>
          <div className="h-6 w-28 animate-pulse rounded-lg bg-background-tertiary" />
        </div>

        {/* 게시글 본문 */}
        <div className="h-32 w-full animate-pulse rounded-lg bg-background-secondary tablet:h-48" />

        {/* 댓글 입력창 */}
        <div className="mb-10 mt-10 flex flex-col gap-4 tablet:mb-16">
          <div className="h-8 w-20 animate-pulse rounded-lg bg-background-tertiary" />
          <div className="h-24 w-full animate-pulse rounded-lg bg-background-secondary" />
          <div className="flex justify-end">
            <div className="h-7 w-16 animate-pulse rounded-lg bg-background-tertiary tablet:h-10 tablet:w-40" />
          </div>
        </div>

        {/* 댓글 목록 */}
        <div className="flex flex-col gap-4">
          {commentKeys.map((key) => (
            <div
              key={key}
              className="flex flex-col gap-2 rounded-lg bg-background-secondary p-4"
            >
              <div className="h-10 w-full animate-pulse rounded-lg bg-background-tertiary" />
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 animate-pulse rounded-full bg-background-tertiary" />
                <div className="h-6 w-32 animate-pulse rounded-lg bg-background-tertiary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
