import Image from 'next/image';
import BoardsLikeIcon from '@/app/components/icons/BoardsLikeIcon';

interface BoardsCardsProps {
  updatedAt: string;
  likeCount: number;
  writer: {
    nickname: string;
    id: number;
  };
  image: string;
  id: number;
  title: string;
  isBest?: boolean;
  isBasic?: boolean;
  tabletHidden?: boolean;
}

export default function CommonAriticleCard({
  id,
  title,
  image,
  updatedAt,
  writer,
  likeCount,
  isBest = true,
  isBasic = true,
  tabletHidden = false,
}: BoardsCardsProps) {
  return (
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
          <p className="text-md text-text-secondary tablet:text-2lg">{title}</p>
          <p
            className={`mt-4 text-xs text-text-disabled tablet:text-md ${tabletHidden ? 'hidden' : ''}`}
          >
            {new Date(updatedAt).toLocaleDateString()}
          </p>
        </div>
        <div className="h-[64px] w-[64px] tablet:h-[72px] tablet:w-[72px]">
          <Image
            className="h-full w-full rounded-[12px] object-cover"
            src={image}
            alt="게시글 이미지"
            width={72}
            height={72}
          />
        </div>
        {isBasic && (
          <div className="relative ml-4 hidden h-[3px] w-[3px] tablet:top-[5px] tablet:block">
            <div className="absolute -top-1 h-full w-full rounded-full bg-icon-primary" />
            <div className="absolute h-full w-full rounded-full bg-icon-primary" />
            <div className="absolute top-1 h-full w-full rounded-full bg-icon-primary" />
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
          <div
            className={`mx-4 h-3 w-[1px] bg-background-tertiary ${isBest ? 'hidden' : ''}`}
          />
          <p
            className={`text-xs text-text-disabled tablet:text-md ${isBest ? 'hidden' : ''}`}
          >
            {new Date(updatedAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <BoardsLikeIcon />
          <span className="text-xs text-text-disabled tablet:text-md">
            {likeCount}
          </span>
          {isBasic && (
            <div className="relative ml-4 h-[3px] w-[3px] tablet:hidden">
              <div className="absolute -top-1 h-full w-full rounded-full bg-icon-primary" />
              <div className="absolute h-full w-full rounded-full bg-icon-primary" />
              <div className="absolute top-1 h-full w-full rounded-full bg-icon-primary" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
