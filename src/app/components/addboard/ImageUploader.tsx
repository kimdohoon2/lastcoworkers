'use client';

import { useState } from 'react';
import Image from 'next/image';
import IconImagePlus from '../icons/IconImagePlus';

export default function ImageUploader() {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div>
      <label
        htmlFor="image-upload"
        className="flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-xl border-[0.063rem] border-text-primary border-opacity-10 bg-background-secondary text-gray-300 hover:bg-opacity-80 tablet:h-60 tablet:w-60"
      >
        {image ? (
          <Image
            src={image}
            alt="업로드된 이미지"
            width={160}
            height={160}
            className="h-full w-full rounded-xl object-cover"
          />
        ) : (
          <>
            <IconImagePlus />
            <p className="mt-3 text-sm text-gray-400 tablet:text-lg">
              이미지 등록
            </p>
          </>
        )}
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
    </div>
  );
}
