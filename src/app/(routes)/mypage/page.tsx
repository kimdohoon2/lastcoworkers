import IconSubtract from '@/app/components/icons/IconSubtract';

export default function MyPage() {
  return (
    <div className="flex justify-center pt-[5.25rem]">
      <div className="flex w-[90%] max-w-[75rem] flex-col">
        <h1 className="mb-6 text-2lg font-bold tablet:text-xl">계정 설정</h1>
        <div className="mb-6">이미지 업로드 컴포넌트</div>
        <div className="mb-6 flex flex-col gap-6">
          <div>
            <h2 className="mb-3 text-lg font-light">이름</h2>
            <div className="rounded-2xl border-[0.063rem] border-text-primary border-opacity-10 bg-background-secondary py-[0.844rem] pl-4">
              <p className="text-md font-light tablet:text-lg">이름</p>
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-light">이메일</h3>
            <div className="rounded-2xl border-[0.063rem] border-text-primary border-opacity-10 bg-background-tertiary py-[0.844rem] pl-4">
              <p className="text-md font-light text-text-disabled tablet:text-lg">
                이메일
              </p>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-lg font-light">비밀번호</h4>
            <div className="rounded-2xl border-[0.063rem] border-text-primary border-opacity-10 bg-background-tertiary py-[0.844rem] pl-4">
              <p className="text-md font-light text-text-disabled tablet:text-lg">
                비밀번호 인풋
              </p>
            </div>
          </div>
        </div>
        <div className="flex cursor-pointer items-center gap-[0.813rem]">
          <IconSubtract />
          <div className="text-lg font-light text-point-red">회원 탈퇴하기</div>
        </div>
      </div>
    </div>
  );
}
