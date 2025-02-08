'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import getArticleDetail from '@/app/lib/article/getArticleDetail';
import patchArticle, {
  PatchArticleRequest,
} from '@/app/lib/article/patchArticle';
import Button from '@/app/components/common/button/Button';
import ImageChanger from '@/app/components/editboard/ImageChanger';
import ArticleChanger from '@/app/components/editboard/ArticleChanger';

export default function EditBoardPage() {
  const { boardid } = useParams();
  const router = useRouter();

  const articleQuery = useQuery({
    queryKey: ['articleDetail', boardid],
    queryFn: () => getArticleDetail({ articleId: Number(boardid) }),
    enabled: !!boardid,
  });

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (articleQuery.data) {
      setTitle(articleQuery.data.title || '');
      setContent(articleQuery.data.content || '');
      setImage(articleQuery.data.image || null);
    }
  }, [articleQuery.data]);

  const patchArticleMutation = useMutation({
    mutationFn: (updatedData: PatchArticleRequest) => patchArticle(updatedData),
    onSuccess: () => {
      alert('게시글이 수정되었습니다.');
      router.push(`/boards/${boardid}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    patchArticleMutation.mutate({
      articleId: Number(boardid),
      image,
      content,
      title,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center pt-[6.25rem]">
      <div className="flex w-[92%] max-w-[75rem] flex-col">
        <div className="flex items-center justify-between border-b border-text-primary border-opacity-10 pb-6 tablet:pb-8">
          <h1 className="text-2lg tablet:text-xl">게시글 수정하기</h1>
          <div className="flex gap-4">
            <Button
              variant="inverse"
              size="large"
              className="hidden tablet:flex tablet:w-36"
              type="button"
              onClick={() => router.back()}
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
        <ArticleChanger
          initialTitle={title}
          initialContent={content}
          onTitleChange={setTitle}
          onContentChange={setContent}
        />
        <ImageChanger initialImage={image} onImageChange={setImage} />
        <div className="flex gap-4">
          <Button
            variant="inverse"
            size="large"
            className="mt-10 w-full tablet:hidden"
            type="button"
            onClick={() => router.back()}
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
