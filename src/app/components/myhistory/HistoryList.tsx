'use client';

import React, { useState, useEffect } from 'react';
import getHistory, { Task } from '@/app/lib/user/getHistory';
import formatDate from '@/app/utils/formatDate';
import IconCheckBox from '../icons/IconCheckBox';

export default function HistoryList() {
  const [history, setHistory] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const response = await getHistory();
      console.log(response); // API에서 반환된 데이터 구조 확인
      setHistory(response.tasksDone || []);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('히스토리를 불러오는 중 오류 발생:', error.message);
      } else {
        console.error('알 수 없는 오류 발생:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

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
