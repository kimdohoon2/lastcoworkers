// 날짜 표시 변경 함수
const formatDate = (dateString: string | undefined) => {
  if (!dateString) return '날짜 없음';

  const date = new Date(dateString);

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export default formatDate;
