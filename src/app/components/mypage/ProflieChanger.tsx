'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import IconProfileEdit from '@/app/components/icons/IconProfileEdit';
import IconMyProfile from '@/app/components/icons/IconMyProfile';
import postImage from '@/app/lib/image/postImage';
import getUser, { GetUserResponse } from '@/app/lib/user/getUser';
import patchUser from '@/app/lib/user/patchUser';

interface ProfileUploaderProps {
  register: UseFormRegister<FieldValues>;
}

type PostImageResponse = {
  url: string;
};

function ProfileChanger({ register }: ProfileUploaderProps) {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const {
    data: user,
    isLoading: isUserLoading,
    refetch,
  } = useQuery<GetUserResponse>({
    queryKey: ['user'],
    queryFn: getUser,
  });

  // 프로필 이미지 업데이트 처리
  const updateUserImageMutation = useMutation({
    mutationFn: (imageUrl: string) => patchUser({ image: imageUrl }),
    onSuccess: () => {
      refetch();
    },
  });

  // 이미지 업로드 처리
  const uploadImageMutation = useMutation<PostImageResponse, Error, FormData>({
    mutationFn: postImage,
    onSuccess: (data) => {
      setProfileImage(data.url);

      updateUserImageMutation.mutate(data.url);
    },
  });

  useEffect(() => {
    if (user?.image) {
      setProfileImage(user.image);
    } else {
      setProfileImage(null);
    }
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    uploadImageMutation.mutate(formData);
  };

  return (
    <div>
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
        {isUserLoading ||
        uploadImageMutation.isPending ||
        updateUserImageMutation.isPending ? (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
            🔄 로딩 중...
          </div>
        ) : profileImage ? (
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
          <IconMyProfile />
        )}
      </label>
      {(uploadImageMutation.isError || updateUserImageMutation.isError) && (
        <p className="mt-2 text-sm text-red-500">이미지 업로드 실패</p>
      )}
    </div>
  );
}

export default ProfileChanger;
