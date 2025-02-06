'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import getArticleDetail from '@/app/lib/article/getArticleDetail';
import Button from '@/app/components/common/button/Button';
import Image from 'next/image';

export default function EditBoardPage() {
  const { boardid } = useParams();

  // 게시글 데이터 불러오기
  const { data, isLoading, isError } = useQuery({
    queryKey: ['articleDetail', boardid],
    queryFn: () => getArticleDetail({ articleId: Number(boardid) }),
    enabled: !!boardid,
  });

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      setTitle(data?.title || '');
      setContent(data?.content || '');
      setImage(data?.image || null);
    }
  }, [data]);

  if (isLoading) return <p className="pt-20 text-center">Loading...</p>;
  if (isError)
    return (
      <p className="pt-20 text-center text-red-500">Error loading post.</p>
    );

  return (
    <form className="flex justify-center pt-[6.25rem]">
      <div className="flex w-[92%] max-w-[75rem] flex-col">
        <div className="flex items-center justify-between border-b border-text-primary border-opacity-10 pb-6 tablet:pb-8">
          <h1 className="text-2lg tablet:text-xl">게시글 수정하기</h1>
          <div className="flex gap-4">
            <Button
              variant="inverse"
              size="large"
              className="hidden tablet:flex tablet:w-36"
            >
              취소
            </Button>
            <Button
              variant="primary"
              size="large"
              className="hidden tablet:flex tablet:w-36"
              type="submit"
            >
              수정
            </Button>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-8">
          {/* 제목 입력 */}
          <div>
            <h2 className="mb-4 flex gap-1.5 text-md tablet:text-lg">
              <span className="text-brand-tertiary">*</span>제목
            </h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력해주세요."
              className="w-full rounded-xl border-[0.063rem] border-text-primary border-opacity-10 bg-background-secondary py-3 pl-4 placeholder:text-md placeholder:font-light placeholder:text-gray-400"
            />
          </div>

          {/* 내용 입력 */}
          <div>
            <h3 className="mb-4 flex gap-1.5 text-md tablet:text-lg">
              <span className="text-brand-tertiary">*</span>내용
            </h3>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력해주세요."
              className="h-[15rem] w-full resize-none rounded-xl border-[0.063rem] border-text-primary border-opacity-10 bg-background-secondary py-4 pl-4 placeholder:text-md placeholder:font-light placeholder:text-gray-400"
            />
          </div>

          {/* 이미지 업로더 */}
          <div>
            <h4 className="mb-4 flex gap-1.5 text-md tablet:text-lg">이미지</h4>
            {image ? (
              <Image
                src={image}
                width={240}
                height={240}
                alt="게시글 이미지"
                className="h-auto max-w-full rounded-md"
              />
            ) : (
              <p className="text-gray-500">이미지가 없습니다.</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            variant="inverse"
            size="large"
            className="mt-10 w-full tablet:hidden"
          >
            취소
          </Button>
          <Button
            variant="primary"
            size="large"
            className="mt-10 w-full tablet:hidden"
            type="submit"
          >
            수정
          </Button>
        </div>
      </div>
    </form>
  );
}
