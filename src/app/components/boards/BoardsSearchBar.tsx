import { useRef } from 'react';
import BoardsSearchIcon from '@/app/components/icons/BoardsSearchIcon';

interface BoardsSearchBarProps {
  onSearch: (keyword: string) => void;
}

export default function BoardsSearchBar({ onSearch }: BoardsSearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const keyword = e.currentTarget.value.trim();
      onSearch(keyword);
    }
  };

  const handleIconClick = () => {
    if (inputRef.current) {
      const keyword = inputRef.current.value.trim();
      if (keyword) {
        onSearch(keyword);
      }
      inputRef.current.focus();
    }
  };

  return (
    <div className="flex w-full overflow-hidden rounded-[12px] border border-[#F8FAFC1A] bg-background-secondary py-3 focus-within:border-transparent">
      <label htmlFor="search" className="ml-4 w-full">
        <div className="flex w-full gap-2">
          <button onClick={handleIconClick}>
            <BoardsSearchIcon />
          </button>
          <input
            id="search"
            ref={inputRef}
            className="w-full bg-background-secondary focus:placeholder-transparent focus:outline-none"
            type="text"
            placeholder="검색어를 입력해주세요"
            onKeyDown={handleKeyDown} // 엔터 키 이벤트 처리
          />
        </div>
      </label>
    </div>
  );
}
