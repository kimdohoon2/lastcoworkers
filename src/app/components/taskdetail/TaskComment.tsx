import { Dispatch, SetStateAction } from 'react';
import { useTaskCommentQuery } from '@/app/lib/comment/getComment';
import TaskCommentInput from '@/app/components/taskdetail/TaskCommentInput';
import TaskCommentCard from '@/app/components/taskdetail/TaskCommentCard';

interface TaskCommentProps {
  taskId: number;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

function TaskComment({ taskId, setIsModalOpen }: TaskCommentProps) {
  const { data, error } = useTaskCommentQuery(taskId);
  const comments = data ?? [];

  return (
    <div className="mb-24 flex flex-col">
      <TaskCommentInput taskId={taskId} />

      {error && (
        <p className="text-text-default">
          댓글을 불러오는 중 오류가 발생했습니다.
        </p>
      )}
      <div className="mt-6">
        {comments.length === 0 ? (
          <p className="text-text-default">댓글이 없습니다.</p>
        ) : (
          comments.map((comment) => (
            <TaskCommentCard
              key={comment.id}
              taskId={taskId}
              comment={comment}
              setIsModalOpen={setIsModalOpen}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TaskComment;
