import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import Button from '@/app/components/common/button/Button';
import Input from '@/app/components/common/input/Input';
import ProfileUploader from '@/app/components/team/ProfileUploader';
import { PropsWithChildren, useEffect } from 'react';

interface TeamFormProps {
  initialImage?: string;
  initialName?: string;
  onSubmit: (data: FieldValues) => void;
  isLoading: boolean;
}

function TeamForm({
  children,
  initialImage,
  initialName,
  onSubmit,
  isLoading,
}: PropsWithChildren<TeamFormProps>) {
  const method = useForm<FieldValues>({
    defaultValues: { profile: initialImage, name: initialName },
  });
  const { register, handleSubmit, setValue } = method;

  useEffect(() => {
    setValue('profile', initialImage);
    setValue('name', initialName);
  }, [initialImage, initialName, setValue]);

  return (
    <FormProvider {...method}>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <ProfileUploader
          initialImage={initialImage}
          register={register}
          setValue={setValue}
        />
        <Input
          name="name"
          title="팀 이름"
          type="text"
          placeholder="팀 이름을 입력해주세요."
          validationRules={{
            required: '이름을 입력해주세요.',
            minLength: {
              value: 1,
              message: '이름은 최소 1글자 이상입니다.',
            },
            maxLength: {
              value: 30,
              message: '이름은 최대 30글자까지 입력 가능합니다.',
            },
            validate: (value) =>
              value.trim() !== '' || '팀 이름에 공백만 입력할 수 없습니다.',
          }}
          autoComplete="off"
        />
      </form>
      <Button
        variant="primary"
        className="mt-10 w-full text-white"
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        {children}
      </Button>
    </FormProvider>
  );
}

export default TeamForm;
