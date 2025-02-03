import { useTaskCommentQuery } from '@/app/lib/comment/getComment';
import TaskDetailProfile from '../icons/TaskDetailProfile';
import TaskCardDropdown from '../icons/TaskCardDropdown';

function TaskComments({ taskId }: { taskId: number }) {
  const { data, isLoading, error } = useTaskCommentQuery(taskId);

  if (isLoading) return <p>댓글을 불러오는 중..</p>;
  if (error) return <p>댓글을 불러오는 중 오류가 발생했습니다.</p>;

  const comments = data ?? [];

  if (comments.length === 0) {
    return <p className="text-text-default">댓글이 없습니다.</p>;
  }

  return (
    <ul>
      {comments.map(({ id, content, createdAt, user }) => (
        <li
          key={id}
          className="mb-4 border-b border-border-primary/10 bg-background-secondary pb-4"
        >
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <p className="text-md text-text-primary">{content}</p>
              <TaskCardDropdown />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {user.image ? user.image : <TaskDetailProfile />}
                <span className="text-md">{user.nickname}</span>
              </div>
              <span className="text-text-secondary">{createdAt}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskComments;
