export const hoursToMs = (hours: number): number => hours * 60 * 60 * 1000;

export const calcRemainingHoursInMs = (endDate: Date, countingHours: number): number => {
  const diff = endDate.getTime() - new Date().getTime();
  const countingHoursInMs = hoursToMs(countingHours);
  return diff < countingHoursInMs ? diff : diff - countingHoursInMs;
};

export const formatToHHMMSS = (ms: number): string => {
  if (ms < 0) {
    return '00:00:00';
  }

  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor(((ms % 360000) % 60000) / 1000);

  return `${formatTwoDigits(hours)}:${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}`;
};

const formatTwoDigits = (value: number): string => {
  return value < 10 ? `0${value}` : value.toString();
};
