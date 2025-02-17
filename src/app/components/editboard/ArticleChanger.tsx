'use client';

import useToast from '@/app/hooks/useToast';
import { useState, useEffect } from 'react';

interface ArticleChangerProps {
  initialTitle: string;
  initialContent: string;
  onTitleChange: (newTitle: string) => void;
  onContentChange: (newContent: string) => void;
}

export default function ArticleChanger({
  initialTitle,
  initialContent,
  onTitleChange,
  onContentChange,
}: ArticleChangerProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const { showToast } = useToast();

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;

    if (newTitle.length > 200) {
      showToast({ message: '제목은 200자를 넘을 수 없습니다.' });
      return;
    }

    setTitle(newTitle);
    onTitleChange(newTitle);
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="mb-4 mt-6 flex gap-1.5 text-md tablet:mt-10 tablet:text-lg">
          <span className="text-brand-tertiary">*</span>제목
        </h2>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="제목을 입력해주세요."
          className="w-full rounded-xl border-[0.063rem] border-text-primary border-opacity-10 bg-background-secondary py-3 pl-4 placeholder:text-md placeholder:font-light placeholder:text-gray-400 focus:border-interaction-focus focus:outline-none"
        />
      </div>

      <div>
        <h3 className="mb-4 flex gap-1.5 text-md tablet:text-lg">
          <span className="text-brand-tertiary">*</span>내용
        </h3>
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            onContentChange(e.target.value);
          }}
          placeholder="내용을 입력해주세요."
          className="custom-scrollbar h-[15rem] w-full resize-none rounded-xl border-[0.063rem] border-text-primary border-opacity-10 bg-background-secondary py-4 pl-4 placeholder:text-md placeholder:font-light placeholder:text-gray-400 focus:border-interaction-focus focus:outline-none"
        />
      </div>
    </div>
  );
}
