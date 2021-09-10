export * from './navigation';

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

export const toPercentage = (num: number) => `${num}%`;

export const numToLocalizedStr = ({
  num,
  locale = 'en-US',
}: {
  num: number;
  locale: string;
}) => num.toLocaleString(locale).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const numToLocalizedCurrencyStr = ({
  num,
  locale,
  currency,
  fractionDigits = 2,
}: {
  num: number;
  locale: string;
  currency: string;
  fractionDigits?: number;
}) =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(num);
