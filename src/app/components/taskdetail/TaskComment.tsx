import { useTaskCommentQuery } from '@/app/lib/comment/getComment';
import TaskCommentItem from './TaskCommentCard';
import TaskCommentInput from './TaskCommentInput';

function TaskComments({ taskId }: { taskId: number }) {
  const { data, isLoading, error } = useTaskCommentQuery(taskId);
  const comments = data ?? [];

  if (isLoading) return <p>댓글을 불러오는 중..</p>;
  if (error) return <p>댓글을 불러오는 중 오류가 발생했습니다.</p>;

  return (
    <div className="mb-24 flex flex-col gap-6">
      <TaskCommentInput />
      {comments?.length === 0 ? (
        <p className="text-text-default">댓글이 없습니다.</p>
      ) : (
        <ul>
          {comments?.map((comment) => (
            <TaskCommentItem
              key={comment.id}
              taskId={taskId}
              comment={comment}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskComments;
