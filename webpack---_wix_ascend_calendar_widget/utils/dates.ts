import { WeekStartingDay } from '../internal-types';

export const formatDate = (
  date: string,
  locale: string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: undefined,
    minute: undefined,
  },
): string => {
  // Use Intl API to format the date
  try {
    const dateTimeFormat = new Intl.DateTimeFormat(locale, options);
    return dateTimeFormat.format(new Date(date));
  } catch (error) {}

  // If for some reason Intl API failed, let's try to use a default date
  try {
    return new Date(date).toDateString();
  } catch (error) {}

  return date.toString();
};

export const formatDateDDDDoMMMMDD = (date: Date): string => {
  return new Intl.DateTimeFormat('en', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export const formatDateTime = (
  date: string,
  locale: string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: undefined,
    minute: undefined,
  },
): string => {
  const dateStr = formatDate(date, locale, options);
  const timeStr = getTimeHHMMXM(new Date(date));
  return `${dateStr} (${timeStr})`;
};

export const addDays = (date: Date, days: number): Date => {
  const copy = new Date(Number(date));
  copy.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const offSet =
    (copy.getTimezoneOffset() - date.getTimezoneOffset()) / 60 / 24;
  copy.setTime(date.getTime() + (days + offSet) * 24 * 60 * 60 * 1000);
  return copy;
};

export const getWeekStartDate = (date: Date, startWeekOn: WeekStartingDay) => {
  const dayInTheWeek = date.getDay();
  const daysFromBeginingOfTheWeek =
    startWeekOn === 'MON'
      ? dayInTheWeek === 0
        ? dayInTheWeek + 6
        : dayInTheWeek - 1
      : dayInTheWeek;

  const weekStartDate = addDays(date, -1 * daysFromBeginingOfTheWeek);
  return getDateBOD(weekStartDate);
};

export const getWeekEndDate = (date: Date, startWeekOn: WeekStartingDay) => {
  const weekStartDate = getWeekStartDate(date, startWeekOn);
  return getDateEOD(addDays(weekStartDate, 6));
};

export const getDateFromatYYYYMMDD = (date: Date): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }

  return [year, month, day].join('-');
};

export const getDateFromatYYYYMMDDHHMMSS = (date: Date): string => {
  const d = new Date(date).toISOString();
  return d;
};

export const getDateEOD = (date: Date): Date => {
  return new Date(date.setHours(23, 59, 59, 999));
};

export const getDateBOD = (date: Date): Date => {
  return new Date(date.setHours(0, 0, 0, 0));
};

export const getWeekFormatMMMYYYY = (
  dateStart: Date,
  dateEnd: Date,
): string => {
  const isSameMonth = dateStart.getMonth() === dateEnd.getMonth();
  const isSameYear = dateStart.getFullYear() === dateEnd.getFullYear();

  const option: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: isSameMonth ? 'long' : 'short',
    day: undefined,
    hour: undefined,
    minute: undefined,
  };

  return isSameMonth
    ? `${new Intl.DateTimeFormat('en', option).format(new Date(dateStart))}`
    : isSameYear
    ? `${new Intl.DateTimeFormat('en', { ...option, year: undefined }).format(
        new Date(dateStart),
      )} - ${new Intl.DateTimeFormat('en', option).format(new Date(dateEnd))}`
    : `${new Intl.DateTimeFormat('en', option).format(
        new Date(dateStart),
      )} - ${new Intl.DateTimeFormat('en', option).format(new Date(dateEnd))}`;
};

const MILLISEC_IN_DAY = 1000 * 60 * 60 * 24;

export const getDaysDiffrence = (date1: Date, date2: Date): number =>
  Math.floor(Math.abs((date1.valueOf() - date2.valueOf()) / MILLISEC_IN_DAY));

export const getTimeHHMMXM = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const strAmPm = hours >= 12 ? 'PM' : 'AM';
  const pureHours = hours % 12;
  const strHours = `0${pureHours ? pureHours : 12}`.slice(-2);
  const strMinutes = `0${minutes}`.slice(-2);
  return `${strHours}:${strMinutes} ${strAmPm}`;
};

export const getCurrentDate = () => new Date();
