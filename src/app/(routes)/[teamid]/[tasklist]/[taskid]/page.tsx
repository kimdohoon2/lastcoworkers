'use client';

import TaskDetailDrawer from '@/app/components/taskdetail/TaskDetailDrawer';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function TaskDetailPage() {
  const { teamid, tasklist, taskid } = useParams();
  const router = useRouter();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (taskid) {
      setIsDrawerOpen(true);
    }
  }, [taskid]);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    router.push(`/${teamid}/${tasklist}`);
  };

  return (
    <TaskDetailDrawer
      isOpen={isDrawerOpen}
      onClose={closeDrawer}
      groupId={Number(teamid)}
      taskListId={Number(tasklist)}
      taskId={taskid ? Number(taskid) : undefined}
    />
  );
}

export default TaskDetailPage;
