export const adjustTimeFormat = (time: string, isAM: boolean): string => {
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
