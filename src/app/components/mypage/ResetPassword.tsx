import { FormProvider, useForm } from 'react-hook-form';
import Input from '../common/input/Input';
import Button from '../common/button/Button';

export default function ResetPassword() {
  const methods = useForm();
  return (
    <div>
      <FormProvider {...methods}>
        <Input
          name="password"
          title="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          autoComplete="new-password"
          validationRules={{
            required: '비밀번호를 입력해주세요.',
            pattern: {
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/,
              message:
                '비밀번호는 8~20자의 숫자, 영문, 특수문자가 포함되어야 합니다.',
            },
          }}
          backgroundColor="bg-background-tertiary"
          customButton={
            <Button variant="plus" size="small">
              변경하기
            </Button>
          }
        />
      </FormProvider>
    </div>
  );
}
