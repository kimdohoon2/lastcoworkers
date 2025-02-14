'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import useModal from '@/app/hooks/useModal';
import useSaveScroll from '@/app/hooks/useSaveScroll';
import useAuthRedirect from '@/app/hooks/useAuthRedirect';
import useRedirectIfNotFound from '@/app/hooks/useRedirectIfNotFound';
import { useTasksQuery } from '@/app/lib/task/getTask';
import getGroupById from '@/app/lib/group/getGroupById';
import { formatDateISO } from '@/app/utils/formatDate';
import Button from '@/app/components/common/button/Button';
import Loading from '@/app/components/common/loading/Loading';
import AuthCheckLoading from '@/app/components/common/auth/AuthCheckLoading';
import DatePicker from '@/app/components/tasklist/DatePicker';
import TaskCardList from '@/app/components/tasklist/TaskCardList';
import CreateTaskModal from '@/app/components/tasklist/CreateTaskModal';
import CreateListModal from '@/app/components/tasklist/CreateListModal';
import TaskCardSkeleton from '@/app/components/tasklist/TaskCardSkeleton';

function TaskListPage() {
  const { isLoading: isAuthLoading } = useAuthRedirect();
  const { teamid, tasklist } = useParams();
  const { isOpen, openModal, closeModal } = useModal();
  const [modalType, setModalType] = useState<'list' | 'task' | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    formatDateISO(new Date()),
  );

  const scrollRef = useSaveScroll('taskListScrollPosition');

  const {
    data: groupData,
    isLoading: isTeamLoading,
    error,
  } = useQuery({
    queryKey: ['tasklists', Number(teamid)],
    queryFn: () => getGroupById(Number(teamid)),
  });

  const {
    data: taskListData,
    isLoading: isTaskListLoading,
    error: taskError,
  } = useTasksQuery(Number(teamid), Number(tasklist), selectedDate);

  const handleOpenModal = (type: 'task' | 'list') => {
    setModalType(type);
    openModal();
  };

  const isLoading =
    isTeamLoading || (!groupData && !taskListData && !isTaskListLoading);

  const isNotFound =
    error?.message === 'not_found' ||
    taskError?.message === 'not_found' ||
    Number.isNaN(Number(teamid)) ||
    Number.isNaN(Number(tasklist));

  const { isRedirecting } = useRedirectIfNotFound(isNotFound);

  if (isAuthLoading) return <AuthCheckLoading />;

  if (isLoading || isRedirecting) return <Loading />;

  return (
    <div className="mx-auto mt-24 flex w-full max-w-[75rem] flex-col gap-6 px-3.5 tablet:px-6">
      <p className="text-xl">할 일</p>
      <div className="flex justify-between">
        <DatePicker
          selectedDate={selectedDate}
          onDateChange={(date: Date) => {
            const localDate = new Date(
              date.getTime() - date.getTimezoneOffset() * 60000,
            );
            setSelectedDate(localDate.toISOString().split('T')[0]);
          }}
        />
        <button
          className="text-md text-brand-primary hover:text-interaction-hover"
          onClick={() => handleOpenModal('list')}
        >
          + 새로운 목록 추가하기
        </button>
      </div>
      <div
        ref={scrollRef}
        className="custom-scrollbar flex max-w-full gap-3 overflow-x-auto whitespace-nowrap px-2 py-3"
      >
        {groupData?.taskLists &&
          groupData?.taskLists.map((list) => {
            const isActive = tasklist === String(list.id);

            return (
              <Link
                key={list.id}
                href={`/${teamid}/${list.id}`}
                className={`whitespace-nowrap transition ${
                  isActive
                    ? 'text-text-tertiary underline underline-offset-8'
                    : 'text-text-default'
                } hover:text-text-tertiary`}
              >
                {list.name}
              </Link>
            );
          })}
      </div>
      {isTaskListLoading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 6 }, (_, i) => (
            <TaskCardSkeleton key={`skeleton-${i}`} />
          ))}
        </div>
      ) : (
        <TaskCardList
          groupId={Number(teamid)}
          taskListId={Number(tasklist)}
          taskListData={taskListData ?? []}
        />
      )}
      <Button
        variant="plus"
        size="plus"
        className="fixed bottom-6 right-6 z-20 text-text-inverse"
        onClick={() => handleOpenModal('task')}
      >
        + 할 일 추가
      </Button>
      <CreateListModal
        isOpen={isOpen && modalType === 'list'}
        onClose={closeModal}
        groupId={Number(teamid)}
      />
      <CreateTaskModal
        isOpen={isOpen && modalType === 'task'}
        onClose={closeModal}
      />
    </div>
  );
}

export default TaskListPage;
