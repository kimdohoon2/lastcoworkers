'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import BoardsLikeIcon from '@/app/components/icons/BoardsLikeIcon';
import { Article } from '@/app/types/ArticleType';
import Dropdown from '@/app/components/common/dropdown/Dropdown';
import DropdownItem from '@/app/components/common/dropdown/DropdownItem';
import DropdownList from '@/app/components/common/dropdown/DropdownList';
import useDropdown from '@/app/hooks/useDropdown';
import IconPlus from '@/app/components/icons/IconPlus';
import useDeleteArticle from '@/app/hooks/useDeleteArticle';
import postArticleLike from '@/app/lib/article/postArticleLike';
import deleteArticleLike from '@/app/lib/article/deleteArticleLike';
import instance from '@/app/lib/instance';

interface CommonArticleCardProps extends Article {
  isBest?: boolean;
  isBasic?: boolean;
  tabletHidden?: boolean;
  isOnlyTablet?: boolean;
  isLiked: boolean;
}

export default function CommonAriticleCard({
  id,
  title,
  image,
  updatedAt,
  writer,
  likeCount: initialLikeCount,
  isLiked: initialIsLiked,
  isBest = true,
  isBasic = true,
  tabletHidden = false,
  isOnlyTablet = false,
}: CommonArticleCardProps) {
  const { isOpen, toggleDropdown, closeDropdown } = useDropdown();
  const deleteArticleMutation = useDeleteArticle();
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/boards/${id}`);
  };

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleDropdown(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      toggleDropdown(e);
    }
  };

  const handleDelete = () => {
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      deleteArticleMutation.mutate(id);
    }
    closeDropdown();
  };

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const response = await instance.get(`/articles/${id}`);
        setIsLiked(response.data.isLiked);
        setLikeCount(response.data.likeCount);
      } catch (error) {
        console.error('좋아요 상태 불러오기 오류:', error);
      }
    };

    fetchLikeStatus();
  }, [id]);

  const handleLike = async (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      setIsLiked((prev) => !prev);
      setLikeCount((prev) => (isLiked ? Math.max(prev - 1, 0) : prev + 1));

      if (isLiked) {
        await deleteArticleLike(id);
      } else {
        await postArticleLike(id);
      }
    } catch (error) {
      console.error('좋아요 처리 중 오류 발생:', error);
      setIsLiked((prev) => !prev);
      setLikeCount((prev) => (isLiked ? prev + 1 : Math.max(prev - 1, 0)));
    }
  };

  return (
    <div
      className="w-full"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCardClick();
        }
      }}
    >
      <div
        key={id}
        className="w-full rounded-[12px] border border-[#F8FAFC1A] bg-background-secondary px-4 pb-4 pt-2 tablet:px-8 tablet:pb-6 tablet:pt-6"
      >
        {isBest && (
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
            <span className="text-md tablet:text-lg">Best</span>
          </div>
        )}
        <div className="flex justify-between tablet:mb-6">
          <div className="flex-1">
            <p className="text-md text-text-secondary tablet:text-2lg">
              {title}
            </p>
            {/* 모바일에서만 보이는 날짜 */}
            <p className="mb-4 mt-12 text-xs text-text-disabled tablet:hidden">
              {new Date(updatedAt).toLocaleDateString()}
            </p>
            {/* 태블릿에서 조건부로 보이는 날짜 */}
            <p
              className={`mb-4 mt-12 hidden text-xs text-text-disabled tablet:block tablet:text-md ${tabletHidden ? 'tablet:hidden' : ''}`}
            >
              {new Date(updatedAt).toLocaleDateString()}
            </p>
          </div>
          <div className="h-[64px] w-[64px] tablet:h-[72px] tablet:w-[72px]">
            <Image
              className="h-full w-full rounded-[12px] object-cover"
              src={image || '/contents/UndefinedImg.png'}
              alt="게시글 이미지"
              width={72}
              height={72}
            />
          </div>
          {isBasic && (
            <div
              className="relative ml-4 hidden h-5 w-5 rounded-full border border-border-primary tablet:block"
              onClick={handleDropdownToggle}
              role="button"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              aria-label="Toggle dropdown"
            >
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <IconPlus />
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="flex items-center gap-3">
              <Image
                src="/icons/BoardsProfile.png"
                width={32}
                height={32}
                alt="프로필 이미지"
              />
              <span className="text-xs tablet:text-md">{writer.nickname}</span>
            </div>
            {/* 게시글에서만 테블릿부터 조건부로 보이는 날짜 */}
            <div
              className={`mx-4 h-3 w-[1px] bg-background-tertiary ${isOnlyTablet ? 'hidden' : ''}`}
            />
            <p
              className={`text-xs text-text-disabled tablet:text-md ${isOnlyTablet ? 'hidden' : ''}`}
            >
              {new Date(updatedAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <div
              onClick={handleLike}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleLike(e);
                }
              }}
            >
              <BoardsLikeIcon isLiked={isLiked} />
            </div>
            <span className="text-xs text-text-disabled tablet:text-md">
              {likeCount}
            </span>
            {isBasic && (
              <>
                <div
                  className="relative ml-4 h-5 w-5 rounded-full border border-border-primary tablet:hidden"
                  onClick={handleDropdownToggle}
                  role="button"
                  tabIndex={0}
                  onKeyDown={handleKeyDown}
                  aria-label="Toggle dropdown"
                >
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <IconPlus />
                  </div>
                </div>
                <Dropdown
                  className="right-28 top-4 tablet:-top-20 xl:right-[8rem]"
                  onClose={closeDropdown}
                >
                  <DropdownList className="w-28 xl:w-[135px]" isOpen={isOpen}>
                    <DropdownItem
                      className="xl:text-base"
                      onClick={() => {
                        closeDropdown();
                      }}
                    >
                      수정하기
                    </DropdownItem>
                    <DropdownItem
                      className="xl:text-base"
                      onClick={() => handleDelete()}
                    >
                      삭제하기
                    </DropdownItem>
                  </DropdownList>
                </Dropdown>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
