'use client';

import TaskDetailDrawer from '@/app/components/tasklist/TaskDetailDrawer';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const teamid = params.teamid as string;
  const taskid = params.taskid as string | undefined;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (taskid) {
      setIsDrawerOpen(true);
    }
  }, [taskid]);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    router.push(`/${teamid}/tasklist`);
  };

  return <TaskDetailDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />;
}

export default TaskDetailPage;
