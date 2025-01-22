import { MouseEvent, ReactNode, useState } from 'react';
import { useFormContext, RegisterOptions } from 'react-hook-form';
import IconVisibility from '@/app/components/icons/IconVisibility';
import IconInVisibility from '@/app/components/icons/IconInVisibility';

type AuthInputProps = {
  name: string; // 필드 이름 (폼 데이터의 키)
  title: string; // 라벨 제목
  type: string; // input 타입 (예: text, password 등)
  placeholder: string; // 플레이스홀더
  autoComplete: string; // 자동 완성 옵션
  validationRules?: RegisterOptions; // react-hook-form 유효성 검증 규칙
  backgroundColor?: string; // 입력 필드 배경색
  customButton?: ReactNode; // 추가 버튼 컴포넌트
};

function AuthInput({
  name,
  title,
  type = 'text',
  placeholder,
  autoComplete,
  validationRules,
  backgroundColor = 'bg-background-secondary',
  customButton,
}: AuthInputProps) {
  const [isVisibleToggle, setIsVisibleToggle] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const isPassword = type === 'password';
  const inputType = isPassword ? (isVisibleToggle ? 'text' : 'password') : type;

  const handleToggleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsVisibleToggle(!isVisibleToggle);
  };

  const inputBorderClass = errors[name]
    ? 'border-status-danger' // 에러시 border 색상
    : 'border-[#F8FAFC1A]'; // 기본 border 색상

  return (
    <div className="flex flex-col gap-3">
      <label className="text-base font-medium text-text-primary" htmlFor={name}>
        {title}
      </label>

      <div className="relative">
        <input
          className={`placeholder:text-text-danger h-full w-full rounded-xl border px-4 py-[0.85rem] text-text-primary placeholder:text-lg focus:border-interaction-focus focus:outline-none ${backgroundColor} ${inputBorderClass}`}
          {...register(name, validationRules)}
          type={inputType}
          id={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        {isPassword && customButton && (
          <div className="absolute right-4 top-3 z-20">{customButton}</div>
        )}
        {isPassword && !customButton && (
          <button
            className="absolute right-4 top-3 z-10"
            type="button"
            onClick={handleToggleClick}
          >
            {isVisibleToggle ? <IconVisibility /> : <IconInVisibility />}
          </button>
        )}
      </div>

      {errors[name] && (
        <span className="text-sm text-status-danger">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
}

export default AuthInput;
