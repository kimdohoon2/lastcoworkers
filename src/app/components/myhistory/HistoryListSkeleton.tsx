import { v4 as uuidv4 } from 'uuid';

export default function HistoryListSkeleton() {
  // UUID를 미리 배열에 저장
  const dateKeys = Array.from({ length: 3 }, () => uuidv4());
  const itemKeys = Array.from({ length: 3 }, () => uuidv4());

  return (
    <div className="flex flex-col gap-10">
      {/* 날짜 제목 스켈레톤 */}
      {dateKeys.map((dateKey) => (
        <div key={dateKey}>
          <div className="mb-4 h-5 w-40 animate-pulse rounded bg-background-tertiary" />
          <ul className="flex flex-col gap-5">
            {/* 리스트 아이템 스켈레톤 */}
            {itemKeys.map((itemKey) => (
              <li
                key={itemKey}
                className="h-12 w-full animate-pulse rounded-lg bg-background-tertiary"
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
