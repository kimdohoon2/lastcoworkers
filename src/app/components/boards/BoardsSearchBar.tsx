import BoardsSearchIcon from '@/app/components/icons/BoardsSearchIcon';

interface BoardsSearchBarProps {
  searchKeyword: string;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
}

export default function BoardsSearchBar({
  searchKeyword,
  setSearchKeyword,
}: BoardsSearchBarProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };
  return (
    <div className='className="flex w-full overflow-hidden rounded-[12px] border border-[#F8FAFC1A] bg-background-secondary py-3 focus-within:border-transparent'>
      <label htmlFor="search" className="w-full">
        <div className="ml-4 flex w-full gap-2">
          <BoardsSearchIcon />
          <input
            id="search"
            className="w-full bg-transparent focus:placeholder-transparent focus:outline-none"
            type="text"
            placeholder="검색어를 입력해주세요"
            value={searchKeyword}
            onChange={handleSearchChange}
          />
        </div>
      </label>
    </div>
  );
}
