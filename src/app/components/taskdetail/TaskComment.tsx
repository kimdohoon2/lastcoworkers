import { useTaskCommentQuery } from '@/app/lib/comment/getComment';
import { useState } from 'react';
import TaskDetailProfile from '../icons/TaskDetailProfile';
import TaskCardDropdown from '../icons/TaskCardDropdown';
import CommentActive from '../icons/CommentActive';
import CommentInactive from '../icons/CommentInactive';

function TaskComments({ taskId }: { taskId: number }) {
  const { data, isLoading, error } = useTaskCommentQuery(taskId);
  const [comment, setComment] = useState('');

  if (isLoading) return <p>댓글을 불러오는 중..</p>;
  if (error) return <p>댓글을 불러오는 중 오류가 발생했습니다.</p>;

  const comments = data ?? [];

  if (comments.length === 0) {
    return <p className="text-text-default">댓글이 없습니다.</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="relative w-full">
        <input
          name="comment"
          title=""
          type="text"
          placeholder="댓글을 달아주세요"
          autoComplete="off"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border-b border-t border-border-primary/10 bg-background-secondary py-[0.8125rem] text-md outline-none"
        />
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2"
          disabled={!comment.trim()}
        >
          {comment.trim() ? <CommentActive /> : <CommentInactive />}
        </button>
      </div>
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
    </div>
  );
}

export default TaskComments;
