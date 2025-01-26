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

    return `${adjustedHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;
  } catch (error) {
    return '00:00:00';
  }
};
