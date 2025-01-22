import HistoryList from '@/app/components/myhistory/HistoryList';

export default function MyHistory() {
  return (
    <div className="flex min-h-screen justify-center">
      <div className="flex w-[75rem] flex-col justify-items-center pt-[3.75rem]">
        <div className="mb-6 mt-10 text-xl font-bold">마이 히스토리</div>
        <HistoryList />
      </div>
    </div>
  );
}
