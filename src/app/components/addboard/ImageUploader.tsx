'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import IconImagePlus from '@/app/components/icons/IconImagePlus';
import IconDelete from '@/app/components/icons/IconDelete';

export default function ImageUploader() {
  const { register } = useFormContext();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // 파일 처리하는 함수
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file); // 미리보기 URL 생성
      setProfileImage(url); // 미리보기 이미지 업데이트
    }
  };

  // 이미지 삭제 함수
  const handleImageRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setProfileImage(null);
  };

  return (
    <div>
      <label
        htmlFor="profile"
        className="relative flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-xl border border-text-primary border-opacity-10 bg-background-secondary text-gray-400 transition hover:bg-opacity-80 tablet:h-60 tablet:w-60"
      >
        <input
          id="profile"
          className="sr-only"
          type="file"
          accept="image/*"
          {...register('profile')}
          onChange={handleFileChange}
        />
        {profileImage ? (
          <div className="relative h-full w-full">
            <Image
              src={profileImage}
              className="h-full w-full rounded-xl object-cover"
              width={240}
              height={240}
              alt="프로필 이미지"
            />
            <button
              type="button"
              onClick={handleImageRemove}
              className="absolute inset-0 flex items-center justify-center rounded-xl hover:bg-opacity-60"
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
