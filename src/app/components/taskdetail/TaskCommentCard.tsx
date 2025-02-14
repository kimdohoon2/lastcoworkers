import Image from 'next/image';
import { useSelector } from 'react-redux';
import { Dispatch, SetStateAction, useState } from 'react';
import { RootState } from '@/app/stores/store';
import { Comment } from '@/app/lib/comment/getComment';
import { getTimeDifference } from '@/app/utils/formatTime';
import { useEditTaskCommentMutation } from '@/app/lib/comment/patchComment';
import Button from '@/app/components/common/button/Button';
import TaskDetailProfile from '@/app/components/icons/TaskDetailProfile';
import TaskCommentDropdown from '@/app/components/taskdetail/TaskCommentDropdown';

interface TaskCommentItemProps {
  taskId: number;
  comment: Comment;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

function TaskCommentCard({
  taskId,
  comment,
  setIsModalOpen,
}: TaskCommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.content);
  const [currentComment, setCurrentComment] = useState(comment.content);

  const editCommentMutation = useEditTaskCommentMutation();
  const { user } = useSelector((state: RootState) => state.auth);
  const isUserComment = comment.user.id === Number(user?.id);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setEditedComment(currentComment);
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    editCommentMutation.mutate(
      {
        taskId,
        commentId: comment.id,
        content: editedComment,
      },
      {
        onSuccess: () => {
          setCurrentComment(editedComment);
          setIsEditing(false);
        },
      },
    );
  };

  return (
    <div className="mb-4 border-b border-border-primary/10 bg-background-secondary pb-4">
      <div className="flex flex-col gap-4">
        {isEditing ? (
          <div className="flex flex-col gap-2">
            <textarea
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
              className="custom-scrollbar w-full resize-none rounded-xl border border-[#F8FAFC1A] bg-background-secondary px-4 py-[0.85rem] text-md text-text-primary placeholder:text-lg focus:border-interaction-focus focus:outline-none"
            />
            <div className="flex justify-end gap-2">
              <Button onClick={handleCancelClick} variant="cancel" size="small">
                취소
              </Button>
              <Button
                onClick={handleSaveClick}
                variant="complete"
                size="small"
                disabled={editedComment.trim() === ''}
              >
                수정
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="text-md text-text-primary">{currentComment}</p>
              <div className="min-h-[1.64rem]">
                {isUserComment && (
                  <TaskCommentDropdown
                    taskId={taskId}
                    commentId={comment.id}
                    onEdit={handleEditClick}
                    setIsModalOpen={setIsModalOpen}
                  />
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {comment.user.image ? (
                  <Image
                    src={comment.user.image}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <TaskDetailProfile />
                )}
                <span className="text-md">{comment.user.nickname}</span>
              </div>
              <span className="text-md text-text-secondary">
                {getTimeDifference(comment.createdAt)}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default TaskCommentCard;
