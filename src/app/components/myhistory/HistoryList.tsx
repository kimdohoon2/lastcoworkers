import getHistory, { Task } from '@/app/lib/user/getHistory';
import formatDate from '@/app/utils/formatDate';
import IconCheckBox from '../icons/IconCheckBox';

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

export default async function HistoryList() {
  try {
    // 서버에서 데이터를 가져옴
    const data = await getHistory();
    const history: Task[] = data.tasksDone || [];
    const groupedHistory = groupByDate(history);

    return (
      <div>
        {Object.entries(groupedHistory).length === 0 ? (
          <p className="text-md font-medium">아직 히스토리가 없습니다.</p>
        ) : (
          Object.entries(groupedHistory).map(([date, tasks]) => (
            <div key={date}>
              <h2 className="mb-4 text-lg font-medium">{formatDate(date)}</h2>
              <ul>
                {tasks.map((task) => (
                  <li
                    className="mb-4 flex items-center rounded-lg bg-background-secondary py-2.5 pl-3.5"
                    key={task.id}
                  >
                    <IconCheckBox />
                    <p className="ml-[0.4375rem] text-md line-through">
                      {task.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    );
  } catch (error) {
    return (
      <p>
        오류 발생: {error instanceof Error ? error.message : '알 수 없는 오류'}
      </p>
    );
  }
}
