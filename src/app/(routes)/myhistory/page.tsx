import HistoryList from '@/app/components/myhistory/HistoryList';

export default function MyHistory() {
  return (
    <div className="flex min-h-screen justify-center">
      <div className="flex w-[90%] flex-col justify-items-center pt-[3.75rem] xl:max-w-[75rem]">
        <div className="mb-6 mt-10 text-2lg font-bold tablet:text-xl">
          마이 히스토리
        </div>
        <HistoryList />
      </div>
    </div>
  );
}
