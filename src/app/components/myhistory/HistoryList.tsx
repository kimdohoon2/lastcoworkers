'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import getHistory, { Task } from '@/app/lib/user/getHistory';
import formatDate from '@/app/utils/formatDate';
import IconCheckBox from '../icons/IconCheckBox';

export default function HistoryList() {
  // React Query를 사용해 데이터를 fetching
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['history'], // 쿼리 키 설정
    queryFn: getHistory, // 데이터 패칭 함수
  });

  const history: Task[] = data?.tasksDone || [];

  // task.date 기준으로 데이터 그룹화
  const groupByDate = (tasks: Task[]) => {
    return tasks.reduce<Record<string, Task[]>>(
      (groups, task) => {
        const { date } = task;
        const sameDate = groups;
        if (!groups[date]) {
          sameDate[date] = [];
        }
        groups[date].push(task);
        return groups;
      },
      {} as Record<string, Task[]>,
    );
  };

  const groupedHistory = groupByDate(history);

  if (isError) {
    return (
      <p>
        오류 발생: {error instanceof Error ? error.message : '알 수 없는 오류'}
      </p>
    );
  }

  return (
    <div>
      {isLoading ? (
        <p>로딩 중...</p>
      ) : (
        <div>
          {Object.entries(groupedHistory).map(([date, tasks]) => (
            <div key={date}>
              <h2 className="mb-4 text-lg font-medium">{formatDate(date)}</h2>
              <ul>
                {tasks.map((task) => (
                  <li
                    className="mb-4 flex h-[2.75rem] items-center rounded-lg bg-background-secondary pl-3.5"
                    key={task.id}
                  >
                    <IconCheckBox />
                    <p className="ml-[0.4375rem] text-md">{task.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
