import { Comment } from '@/app/lib/comment/getComment';
import TaskDetailProfile from '../icons/TaskDetailProfile';
import TaskCommentMenu from './TaskCommentDropdown';

interface TaskCommentItemProps {
  taskId: number;
  comment: Comment;
}

function TaskCommentItem({ taskId, comment }: TaskCommentItemProps) {
  return (
    <li className="mb-4 border-b border-border-primary/10 bg-background-secondary pb-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-md text-text-primary">{comment.content}</p>
          <TaskCommentMenu taskId={taskId} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {comment.user.image ? comment.user.image : <TaskDetailProfile />}
            <span className="text-md">{comment.user.nickname}</span>
          </div>
          <span className="text-text-secondary">{comment.createdAt}</span>
        </div>
      </div>
    </li>
  );
}

export default TaskCommentItem;
