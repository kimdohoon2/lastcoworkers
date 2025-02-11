import { useTaskCommentQuery } from '@/app/lib/comment/getComment';
import { Dispatch, SetStateAction } from 'react';
import TaskCommentInput from './TaskCommentInput';
import TaskCommentCard from './TaskCommentCard';
import TaskCommentSkeleton from './TaskCommentSkeleton';

function TaskComments({
  taskId,
  setIsModalOpen,
}: {
  taskId: number;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { data, isLoading, error } = useTaskCommentQuery(taskId);
  const comments = data ?? [];

  return (
    <div className="mb-24 flex flex-col gap-6">
      <TaskCommentInput taskId={taskId} />

      {error && (
        <p className="text-text-default">
          댓글을 불러오는 중 오류가 발생했습니다.
        </p>
      )}

      {isLoading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }, (_, i) => (
            <TaskCommentSkeleton key={`skeleton-${i}`} />
          ))}
        </div>
      ) : comments.length === 0 ? (
        <p className="text-text-default">댓글이 없습니다.</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <TaskCommentCard
              key={comment.id}
              taskId={taskId}
              comment={comment}
              setIsModalOpen={setIsModalOpen}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskComments;
