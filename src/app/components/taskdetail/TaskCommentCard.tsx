import { Comment } from '@/app/lib/comment/getComment';
import { getTimeDifference } from '@/app/utils/formatTime';
import { Dispatch, SetStateAction, useState } from 'react';
import { useEditTaskCommentMutation } from '@/app/lib/comment/patchComment';
import Image from 'next/image';
import TaskDetailProfile from '../icons/TaskDetailProfile';
import TaskCommentMenu from './TaskCommentDropdown';
import Button from '../common/button/Button';

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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setEditedComment(comment.content);
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
    <li className="mb-4 border-b border-border-primary/10 bg-background-secondary pb-4">
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
              <Button onClick={handleSaveClick} variant="complete" size="small">
                수정
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="text-md text-text-primary">{currentComment}</p>
              <TaskCommentMenu
                taskId={taskId}
                commentId={comment.id}
                onEdit={handleEditClick}
                setIsModalOpen={setIsModalOpen}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {comment.user.image ? (
                  <Image src={comment.user.image} alt="Profile" />
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
    </li>
  );
}
export default TaskCommentCard;
