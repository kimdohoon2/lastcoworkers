// YYYY년 M월 D일
const formatDate = (dateString: string | undefined) => {
  if (!dateString) return '날짜 없음';

  const date = new Date(dateString);

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

// YYYY.MM.DD
const formatDateShort = (dateString: string | undefined) => {
  if (!dateString) return '날짜 없음';

  const date = new Date(dateString);

  return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date
    .getDate()
    .toString()
    .padStart(2, '0')}`;
};

export { formatDate, formatDateShort };
