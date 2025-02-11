'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import IconProfileEdit from '@/app/components/icons/IconProfileEdit';
import IconProfile from '@/app/components/icons/IconProfile';

interface ProfileUploaderProps {
  initialImage?: string;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

function ProfileUploader({
  initialImage,
  register,
  setValue,
}: ProfileUploaderProps) {
  const [profileImage, setProfileImage] = useState<string | null>(
    initialImage || '',
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file); // 미리보기 URL 생성
      setProfileImage(url);
      setValue('profile', file);
    }
  };

  useEffect(() => {
    setProfileImage(initialImage || '');
  }, [initialImage]);

  return (
    <div>
      <span className="mb-3 inline-block">팀 프로필</span>
      <label
        htmlFor="profile"
        className="relative block h-16 w-16 cursor-pointer"
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
          <>
            <Image
              src={profileImage}
              className="rounded-full border-2 border-border-primary"
              fill
              alt="프로필 이미지"
            />
            <IconProfileEdit className="absolute bottom-0 right-0" />
          </>
        ) : (
          <IconProfile />
        )}
      </label>
    </div>
  );
}

export default ProfileUploader;
