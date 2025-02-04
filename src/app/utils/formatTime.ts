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

const formatToAmPm = (dateString: string): string => {
  try {
    const dateObj = new Date(dateString);
    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    const period = hours < 12 ? '오전' : '오후';

    hours = hours % 12 || 12;

    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

    return `${period} ${formattedTime}`;
  } catch (error) {
    console.error('시간 변환 오류:', error);
    return '오전 00:00';
  }
};

export { adjustTimeFormat, formatToAmPm };
