import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Article } from '@/app/types/ArticleType';
import BoardsLikeBox from '@/app/components/boards/BoardsLikeBox';
import ConfirmModal from '@/app/components/common/modal/ConfirmModal';
import Dropdown from '@/app/components/common/dropdown/Dropdown';
import DropdownItem from '@/app/components/common/dropdown/DropdownItem';
import DropdownList from '@/app/components/common/dropdown/DropdownList';
import useArticleActions from '@/app/hooks/useArticleActions';
import TaskCardDropdown from '@/app/components/icons/TaskCardDropdown';

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
  isBest = true,
  isBasic = true,
  tabletHidden = false,
  isOnlyTablet = false,
  isLiked,
  likeCount,
}: CommonArticleCardProps) {
  const {
    isOpen,
    closeDropdown,
    isDeleteModalOpen,
    closeDeleteModal,
    handleEditClick,
    handleDelete,
    confirmDelete,
    handleKeyDown,
    handleDropdownToggle,
    isAuthor,
  } = useArticleActions({
    id,
    title,
    image,
    updatedAt,
    writer,
    likeCount,
  });
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/boards/${id}`);
  };

  return (
    <>
      <div
        className="w-full"
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => handleKeyDown(e, handleCardClick)}
      >
        <div
          key={id}
          className="w-full rounded-[0.75rem] border border-[#F8FAFC1A] bg-background-secondary px-4 pb-4 pt-2 transition-all duration-300 hover:scale-[1.02] tablet:px-8 tablet:pb-6 tablet:pt-6"
        >
          {isBest && (
            <div className="mb-3 flex items-center gap-2">
              <div className="w-full max-w-[0.875rem]">
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
                {new Date(updatedAt).toLocaleDateString().replace(/\.$/, '')}
              </p>
              {/* 베스트 게시글 태블릿에서 조건부로 보이는 날짜 */}
              <p
                className={`mb-4 mt-12 hidden text-xs text-text-disabled tablet:block tablet:text-md ${tabletHidden ? 'tablet:hidden' : ''}`}
              >
                {new Date(updatedAt).toLocaleDateString().replace(/\.$/, '')}
              </p>
            </div>
            <div className="h-16 w-16 tablet:h-[4.5rem] tablet:w-[4.5rem]">
              <Image
                className="h-full w-full rounded-[0.75rem] object-cover"
                src={image || '/contents/UndefinedImg.png'}
                alt="게시글 이미지"
                width={72}
                height={72}
              />
            </div>
            {isBasic && isAuthor && (
              <div
                className="relative ml-4 hidden h-5 w-5 tablet:block"
                onClick={handleDropdownToggle}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  handleKeyDown(e, () => handleDropdownToggle(e))
                }
                aria-label="Toggle dropdown"
              >
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <TaskCardDropdown />
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
                <span className="text-xs tablet:text-md">
                  {writer.nickname}
                </span>
              </div>
              {/* 게시글에서만 테블릿부터 조건부로 보이는 날짜 */}
              <div
                className={`mx-4 hidden h-3 w-[1px] bg-background-tertiary tablet:block ${isOnlyTablet ? 'tablet:hidden' : ''}`}
              />
              <p
                className={`hidden text-xs text-text-disabled tablet:block tablet:text-md ${isOnlyTablet ? 'tablet:hidden' : ''}`}
              >
                {new Date(updatedAt).toLocaleDateString().replace(/\.$/, '')}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <BoardsLikeBox id={id} likeCount={likeCount} isLiked={isLiked} />
              {isBasic && isAuthor && (
                <>
                  <div
                    className="relative ml-4 h-5 w-5 rounded-full tablet:hidden"
                    onClick={handleDropdownToggle}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      handleKeyDown(e, () => handleDropdownToggle(e))
                    }
                    aria-label="Toggle dropdown"
                  >
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <TaskCardDropdown />
                    </div>
                  </div>
                  <Dropdown
                    className="right-28 top-4 tablet:-top-20 xl:right-[8rem]"
                    onClose={closeDropdown}
                  >
                    <DropdownList
                      className="w-28 xl:w-[8.4375rem]"
                      isOpen={isOpen}
                    >
                      <DropdownItem
                        className="xl:text-base"
                        onClick={() => {
                          handleEditClick();
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

      <ConfirmModal
        title="정말로 삭제하시겠습니까?"
        cancelLabel="취소"
        confirmLabel="삭제"
        isModalOpen={isDeleteModalOpen}
        handleCancel={closeDeleteModal}
        handleConfirm={confirmDelete}
      />
    </>
  );
}
