import { formatDateShort } from '@/app/utils/formatDate';

// 12시간제 -> 24시간제 형식 변환 함수
// time: 12시간제 문자열
// isAm: true = 오전 | false = 오후
const adjustTimeFormat = (time: string, isAM: boolean): string => {
  try {
    const [hourStr, minuteStr] = time.split(':');
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    const adjustedHour = isAM
      ? hour === 12
        ? 0
        : hour
      : hour === 12
        ? 12
        : hour + 12;

    const formattedHour =
      adjustedHour < 10 ? `0${adjustedHour}` : `${adjustedHour}`;
    const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;

    return `${formattedHour}:${formattedMinute}:00`;
  } catch (error) {
    return '00:00:00';
  }
};

// 오전(오후) HH:MM 형식 변환 함수
const formatToAmPm = (dateString: string): string => {
  try {
    const dateObj = new Date(dateString);
    dateObj.setHours(dateObj.getHours() - 9);
    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    const period = hours < 12 ? '오전' : '오후';

    hours = hours % 12 || 12;

    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

    return `${period} ${formattedTime}`;
  } catch (error) {
    return '오전 00:00';
  }
};

// createdAt 값을 현재 시간 기준으로 포맷하는 함수
// 결과
// 59초 이내: "n초 전"
// 60초 ~ 59분: "n분 전"
// 60분 ~ 23시간: "n시간 전"
// 24시간 이상: "n일 전"
// 7일 이상: "YYYY.MM.DD"
const getTimeDifference = (createdAt: string): string => {
  const now = new Date();
  const createdDate = new Date(createdAt);

  const diffInSeconds = (now.getTime() - createdDate.getTime()) / 1000;
  const diffInDays = diffInSeconds / 86400;

  if (diffInSeconds < 60) return `${Math.floor(diffInSeconds)}초 전`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  if (diffInDays < 7) return `${Math.floor(diffInDays)}일 전`;

  return formatDateShort(createdAt);
};

// 12시간제 시간 생성 함수
// ['1:00', '1:30', ..., '12:00', '12:30'] 형식의 문자열 배열
const generateTimes = (): string[] => {
  const times: string[] = [];
  for (let hour = 1; hour <= 12; hour += 1) {
    times.push(`${hour}:00`, `${hour}:30`);
  }
  return times;
};

export { adjustTimeFormat, formatToAmPm, getTimeDifference, generateTimes };
