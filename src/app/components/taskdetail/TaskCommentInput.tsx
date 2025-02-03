import { useState } from 'react';
import CommentActive from '../icons/CommentActive';
import CommentInactive from '../icons/CommentInactive';

function TaskCommentInput() {
  const [comment, setComment] = useState('');

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="댓글을 달아주세요."
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
  );
}

export default TaskCommentInput;
