'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GetArticleDetailResponse } from '@/app/lib/article/getArticleDetail';
import patchArticle, {
  PatchArticleRequest,
} from '@/app/lib/article/patchArticle';

import useArticleActions from '@/app/hooks/useArticleActions';
import Image from 'next/image';
import useModal from '@/app/hooks/useModal';
import IconMore from '@/app/components/icons/IconMore';
import IconComment from '@/app/components/icons/IconComment';

import Dropdown from '@/app/components/common/dropdown/Dropdown';
import DropdownToggle from '@/app/components/common/dropdown/DropdownToggle';
import DropdownList from '@/app/components/common/dropdown/DropdownList';
import DropdownItem from '@/app/components/common/dropdown/DropdownItem';
import BoardsLikeBox from '@/app/components/boards/BoardsLikeBox';
import DeleteArticleModal from '@/app/components/boarddetail/DeleteArticleModal';
import Button from '@/app/components/common/button/Button';
import useToast from '@/app/hooks/useToast';

interface BoardDetailProps {
  article: GetArticleDetailResponse;
}

export default function BoardDetail({ article }: BoardDetailProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(article.title);
  const [editedContent, setEditedContent] = useState(article.content);

  const { showToast } = useToast();

  const { isAuthor } = useArticleActions(article);

  // 게시글 수정 API
  const editMutation = useMutation({
    mutationFn: (data: PatchArticleRequest) => patchArticle(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['articleDetail', article.id],
      });
      setIsEditing(false);
    },
  });

  const handleEdit = () => {
    setIsEditing(true);
    setIsDropdownOpen(false);
  };

  const handleEditSubmit = () => {
    if (!editedTitle.trim() || !editedContent.trim()) {
      showToast({ message: '제목과 내용을 입력해주세요.😃', type: 'warning' });
      return;
    }

    editMutation.mutate({
      articleId: article.id,
      image: article.image,
      content: editedContent,
      title: editedTitle,
    });
  };

  return (
    <>
      <div className="flex items-center justify-between border-b-[0.063rem] border-text-primary border-opacity-10">
        {isEditing ? (
          <div className="flex w-full items-center gap-2 py-6">
            <input
              type="text"
              className="h-12 w-[90%] resize-none rounded-xl border-[0.063rem] border-text-primary border-opacity-10 bg-background-secondary py-4 pl-4 placeholder:text-md placeholder:font-light placeholder:text-gray-400 focus:border-interaction-focus focus:outline-none placeholder:tablet:text-lg"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </div>
        ) : (
          <h1 className="flex h-16 items-center text-lg text-text-secondary tablet:text-2lg">
            {article.title}
          </h1>
        )}

        {isAuthor && (
          <Dropdown onClose={() => setIsDropdownOpen(false)}>
            <DropdownToggle
              className="p-2"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              <IconMore />
            </DropdownToggle>
            <DropdownList className="right-0 mt-2 w-28" isOpen={isDropdownOpen}>
              <DropdownItem onClick={handleEdit}>수정하기</DropdownItem>
              <DropdownItem onClick={openModal}>삭제하기</DropdownItem>
            </DropdownList>
          </Dropdown>
        )}
      </div>

      <div className="flex h-[4.5rem] items-center justify-between">
        <div className="flex items-center">
          <p className="mr-2 text-xs text-text-primary tablet:text-md">
            {article.writer?.nickname || '알 수 없음'}
          </p>
          <p className="border-l-[0.063rem] border-text-primary border-opacity-10 pl-2 text-xs text-text-disabled tablet:text-md">
            {new Date(article.createdAt)
              .toLocaleDateString()
              .replace(/\.$/, '')}
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-1 text-xs text-text-disabled tablet:text-md">
            <div className="mr-2 flex items-center gap-1">
              <IconComment />
              {article.commentCount}
            </div>

            <BoardsLikeBox
              id={article.id}
              likeCount={article.likeCount}
              isLiked={article.isLiked}
            />
          </div>
        </div>
      </div>

      {article.image && (
        <div className="mb-4">
          <Image
            src={article.image}
            alt="게시글 이미지"
            width={343}
            height={343}
            className="rounded-lg"
            objectFit="cover"
          />
        </div>
      )}

      <div className="mb-20 mt-6 text-md leading-6 text-text-secondary tablet:text-lg tablet:leading-7">
        {isEditing ? (
          <div>
            <textarea
              className="w-full resize-none rounded-xl border-[0.063rem] border-text-primary border-opacity-10 bg-background-secondary py-4 pl-4 placeholder:text-md placeholder:font-light placeholder:text-gray-400 focus:border-interaction-focus focus:outline-none placeholder:tablet:text-lg"
              rows={5}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="mt-2 flex justify-end gap-2">
              <Button
                variant="cancel"
                size="small"
                onClick={() => setIsEditing(false)}
              >
                취소
              </Button>
              <Button variant="primary" size="small" onClick={handleEditSubmit}>
                수정
              </Button>
            </div>
          </div>
        ) : (
          article.content
        )}
      </div>

      {/* 삭제 확인 모달 */}
      <DeleteArticleModal
        isOpen={isOpen}
        onClose={closeModal}
        articleId={article.id}
      />
    </>
  );
}
