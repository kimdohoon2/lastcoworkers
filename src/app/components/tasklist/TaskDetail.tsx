interface TaskDetailProps {
  taskId: number | undefined;
}

function TaskDetail({ taskId }: TaskDetailProps) {
  return (
    <div className="flex flex-col gap-4 p-4 tablet:p-6 xl:p-10">
      <h2>할 일 상세</h2>
      <p>할 일 ID: {taskId}</p>
      <p>123</p>
    </div>
  );
}

export default TaskDetail;
