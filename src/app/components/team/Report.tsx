import groupTaskReport from '@/app/utils/groupTaskReport';
import { GroupTask } from '@/app/types/grouptask';
import { Pie, PieChart } from 'recharts';
import IconReportTodo from '../icons/IconReportTodo';
import IconReportDone from '../icons/IconReportDone';

interface ReportProps {
  taskLists?: GroupTask[];
}

export default function Report({ taskLists }: ReportProps) {
  const { totalTasks, completedTasks } = groupTaskReport(taskLists ?? []);

  const completionPercentage =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="mx-auto my-12 flex max-w-[75rem] flex-col gap-4 xl:my-16">
      <h2 className="text-lg font-semibold text-white">리포트</h2>
      <div className="h-56 w-full rounded-xl bg-background-secondary p-6 xl:h-[13.5625rem]">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-10 xl:gap-16">
            <PieChart width={140} height={140}>
              <svg>
                <defs>
                  <linearGradient
                    id="progressGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#A3E635" />
                  </linearGradient>
                </defs>
              </svg>
              <Pie
                data={[{ name: 'Background', value: 100 }]}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                startAngle={90}
                endAngle={-270}
                fill="#334155"
                stroke="none"
              />
              <Pie
                data={[{ name: 'Completed', value: completionPercentage }]}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                startAngle={270}
                endAngle={270 + (completionPercentage * 360) / 100}
                fill="url(#progressGradient)" // SVG 그라디언트 적용
                stroke="none"
                cornerRadius={24}
              />
            </PieChart>
            <div className="flex flex-col gap-1">
              <span className="text-md font-medium text-text-primary">
                오늘의
                <br />
                진행상황
              </span>
              <div className="bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to bg-clip-text text-4xl font-bold text-transparent">
                {completionPercentage.toFixed(0)}%
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-4">
              <div className="h-20 w-[8.875rem] rounded-xl bg-background-tertiary tablet:w-[17.5rem] xl:w-[25rem]">
                <span className="text-xs font-medium text-text-secondary">
                  오늘의 할 일
                </span>
                <span>{totalTasks}개</span>
                <IconReportTodo />
              </div>
              <div className="h-20 w-[8.875rem] rounded-xl bg-background-tertiary tablet:w-[17.5rem] xl:w-[25rem]">
                <span className="text-xs font-medium text-text-secondary">
                  한 일
                </span>
                <span>{completedTasks}개</span>
                <IconReportDone />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
