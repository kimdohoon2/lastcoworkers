const weekDays = [
  { name: '일', value: 0 },
  { name: '월', value: 1 },
  { name: '화', value: 2 },
  { name: '수', value: 3 },
  { name: '목', value: 4 },
  { name: '금', value: 5 },
  { name: '토', value: 6 },
];

const MonthDays = Array.from({ length: 31 }, (_, i) => i + 1);

export { weekDays, MonthDays };
