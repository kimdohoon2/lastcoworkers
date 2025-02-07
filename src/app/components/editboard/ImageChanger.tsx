'use client';

import { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import postImage from '@/app/lib/image/postImage';
import Image from 'next/image';
import IconImagePlus from '@/app/components/icons/IconImagePlus';
import IconDelete from '@/app/components/icons/IconDelete';

interface ImageChangerProps {
  initialImage: string | null;
  onImageChange: (newImage: string | null) => void;
}

export default function ImageChanger({
  initialImage,
  onImageChange,
}: ImageChangerProps) {
  const [image, setImage] = useState<string | null>(initialImage);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setImage(initialImage);
  }, [initialImage]);

  const uploadImageMutation = useMutation({
    mutationFn: (formData: FormData) => postImage(formData),
    onSuccess: (data) => {
      setImage(data.url);
      onImageChange(data.url);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    uploadImageMutation.mutate(formData);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setImage(null);
    onImageChange(null);
  };

  return (
    <div>
      <h4 className="mb-4 mt-6 flex gap-1.5 text-md tablet:mt-10 tablet:text-lg">
        이미지
      </h4>
      <label
        htmlFor="image-upload"
        className="relative flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-xl border border-text-primary border-opacity-10 bg-background-secondary text-gray-400 transition hover:bg-opacity-80 tablet:h-60 tablet:w-60"
      >
        <input
          id="image-upload"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handleFileChange}
        />
        {image ? (
          <div className="relative h-full w-full">
            <Image
              src={image}
              className="h-full w-full rounded-xl object-cover"
              width={240}
              height={240}
              alt="게시글 이미지"
            />
            <button
              type="button"
              onClick={handleImageRemove}
              className="absolute inset-0 flex items-center justify-center rounded-xl bg-opacity-40 transition hover:bg-opacity-60"
            >
              <IconDelete className="h-10 w-10 text-white opacity-80 hover:opacity-100" />
            </button>
          </div>
        ) : (
          <>
            <IconImagePlus className="tablet:h-10 tablet:w-10" />
            <p className="mt-2 text-md tablet:mt-3 tablet:text-lg">
              이미지 등록
            </p>
          </>
        )}
      </label>
    </div>
  );
}
