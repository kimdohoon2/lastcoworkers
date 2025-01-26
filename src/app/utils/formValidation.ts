import { FrequencyType, RecurringTaskDataBody } from '@/app/types/task';

/*
 * 반복 설정 유효 여부 함수
 * 반복 설정이  WEEKLY 또는 MONTHLY인 경우 추가적인 검증이 필요
 */
export const isRepeatValid = (repeatData: RecurringTaskDataBody): boolean => {
  switch (repeatData.frequencyType) {
    case FrequencyType.WEEKLY:
      return repeatData.weekDays.length > 0;
    case FrequencyType.MONTHLY:
      return (
        'monthDay' in repeatData && typeof repeatData.monthDay === 'number'
      );
    default:
      return true;
  }
};

/*
 * 모든 폼 필드 값 유효 여부 함수
 */
export const isFormValid = (
  fields: RecurringTaskDataBody,
  selectedTime: string,
  repeatData: RecurringTaskDataBody,
): boolean => {
  return (
    Object.values(fields).every((value) => value && value.trim() !== '') &&
    selectedTime !== '' &&
    isRepeatValid(repeatData)
  );
};
