'use client';

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import IconProfileEdit from '@/app/components/icons/IconProfileEdit';
import IconMyProfile from '@/app/components/icons/IconMyProfile';
import postImage from '@/app/lib/image/postImage';
import getUser, { GetUserResponse } from '@/app/lib/user/getUser';
import patchUser from '@/app/lib/user/patchUser';
import Modal from '@/app/components/common/modal/Modal';
import Button from '@/app/components/common/button/Button';
import useModal from '@/app/hooks/useModal';

interface ProfileUploaderProps {
  register: UseFormRegister<FieldValues>;
}

type PostImageResponse = {
  url: string;
};

function ProfileChanger({ register }: ProfileUploaderProps) {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { isOpen, openModal, closeModal } = useModal();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    data: user,
    isLoading: isUserLoading,
    refetch,
  } = useQuery<GetUserResponse>({
    queryKey: ['user'],
    queryFn: getUser,
  });

  const patchUserMutation = useMutation({
    mutationFn: (imageUrl: string) => patchUser({ image: imageUrl }),
    onSuccess: () => {
      refetch();
      closeModal();
    },
  });

  // postImage -> patchUser 순서대로 실행
  const uploadImageMutation = useMutation<PostImageResponse, Error, FormData>({
    mutationFn: postImage,
    onSuccess: (data) => {
      patchUserMutation.mutate(data.url);
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

    const tempUrl = URL.createObjectURL(file);
    setTempImage(tempUrl);
    setSelectedFile(file);
    openModal();

    // 파일 선택 후 input 값 초기화 (같은 파일 다시 선택 가능하도록)
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCancel = () => {
    setTempImage(null);
    setSelectedFile(null);
    closeModal();
  };

  const handleConfirmChange = () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile);

    uploadImageMutation.mutate(formData);
  };

  const { ref, ...rest } = register('profile');

  return (
    <div>
      <label
        htmlFor="profile"
        className="relative block h-16 w-16 cursor-pointer"
      >
        <input
          ref={(e) => {
            ref(e);
            fileInputRef.current = e;
          }}
          id="profile"
          className="sr-only"
          type="file"
          accept="image/*"
          {...rest}
          onChange={handleFileChange}
        />
        {isUserLoading ||
        uploadImageMutation.isPending ||
        patchUserMutation.isPending ? (
          <IconMyProfile />
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

      {(uploadImageMutation.isError || patchUserMutation.isError) && (
        <p className="mt-2 text-sm text-red-500">이미지 업로드 실패</p>
      )}

      {/* 변경 확인 모달 */}
      <Modal isOpen={isOpen} closeModal={closeModal} hasCloseBtn>
        <div className="flex w-full flex-col items-center px-9">
          <h2 className="text-2lg">프로필 이미지 변경</h2>
          <p className="mt-2 text-md text-text-secondary">
            이미지를 변경하시겠습니까?
          </p>

          <div className="mt-5 flex w-full justify-center">
            {tempImage && (
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-border-primary">
                <Image
                  src={tempImage}
                  alt="미리보기 이미지"
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="mt-6 flex w-full justify-between gap-2">
            <Button variant="cancel" size="large" onClick={handleCancel}>
              취소
            </Button>

            <Button
              variant="primary"
              size="large"
              onClick={handleConfirmChange}
              disabled={
                uploadImageMutation.isPending || patchUserMutation.isPending
              }
            >
              {uploadImageMutation.isPending || patchUserMutation.isPending
                ? '변경 중...'
                : '변경'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ProfileChanger;
