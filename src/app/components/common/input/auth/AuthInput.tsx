import { MouseEvent, useState } from 'react';
import { useFormContext, RegisterOptions } from 'react-hook-form';
import Visibility from '@public/icons/ic_visibility.svg';
import InVisibility from '@public/icons/ic_invisibility.svg';
import Image from 'next/image';

type AuthInputProps = {
  name: string; // 필드 이름 (폼 데이터의 키)
  title: string; // 라벨 제목
  type: string; // input 타입 (예: text, password 등)
  placeholder: string; // 플레이스홀더
  autoComplete: string; // 자동 완성 옵션
  validationRules?: RegisterOptions; // react-hook-form 유효성 검증 규칙
};

function AuthInput({
  name,
  title,
  type = 'text',
  placeholder,
  autoComplete,
  validationRules,
}: AuthInputProps) {
  const [isVisibleToggle, setIsVisibleToggle] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const isPassword = type === 'password';
  const inputType = isPassword ? (isVisibleToggle ? 'text' : 'password') : type;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsVisibleToggle(!isVisibleToggle);
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="text-base font-medium text-[#F8FAFC]" htmlFor={name}>
        {title}
      </label>

      <div className="relative">
        <input
          className="h-full w-full rounded-xl border border-[#F8FAFC1A] bg-[#1E293B] px-4 py-[0.85rem] text-[#64748B]"
          {...register(name, validationRules)}
          type={inputType}
          id={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />

        {isPassword && (
          <button
            className="absolute right-4 top-3 z-10"
            type="button"
            onClick={handleClick}
          >
            {isVisibleToggle ? (
              <Image src={Visibility} alt="보이게하기" width={24} height={24} />
            ) : (
              <Image
                src={InVisibility}
                alt="안보이게하기"
                width={24}
                height={24}
              />
            )}
          </button>
        )}
      </div>

      {errors[name] && <span>{errors[name]?.message as string}</span>}
    </div>
  );
}

export default AuthInput;
