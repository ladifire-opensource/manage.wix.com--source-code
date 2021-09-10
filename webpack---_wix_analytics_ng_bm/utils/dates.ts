import { TranslationFunction } from 'react-i18next';
import memoizeFormatConstructor from 'intl-format-cache';

const getDateTimeFormat = memoizeFormatConstructor(Intl.DateTimeFormat);

function getMonthFormat(locale: string): string {
  return locale === 'pt' ? 'long' : 'short';
}

export const formatDate = (
  value: Date,
  locale: string,
  options?: Intl.DateTimeFormatOptions,
): string => {
  return getDateTimeFormat(locale, options).format(value);
};

export const getShortDateWithYear = (date: Date, locale: string): string =>
  formatDate(date, locale, {
    month: getMonthFormat(locale),
    day: 'numeric',
    year: 'numeric',
  });

export const getShortMonthWithYear = (date: Date, locale: string): string =>
  formatDate(date, locale, {
    month: getMonthFormat(locale),
    year: 'numeric',
  });

export const getLongMonthWithYear = (date: Date, locale: string): string =>
  formatDate(date, locale, {
    month: 'long',
    year: 'numeric',
  });

export const getShortDate = (date: Date, locale: string): string =>
  formatDate(date, locale, {
    month: getMonthFormat(locale),
    day: 'numeric',
  });

export const getTimeZone = (): string => getDateTimeFormat().resolvedOptions().timeZone;

const MINUTE_AND_A_HAlF = 1000 * 60 * 1.5;
const FIVE_MINUTES = 1000 * 60 * 5;
const FIFTY_EIGHT_MINUTES = 1000 * 60 * 58;
const NINETY_MINUTES = 1000 * 60 * 90;

export function getUpdatedAtData(value: Date, t: TranslationFunction): string | null {
  if (!value) {
    return null;
  }
  const date = value.getTime();
  const now = Date.now();

  if (now - date < MINUTE_AND_A_HAlF) {
    return t('widget.dashboard-next.footer.updated.now');
  }
  if (now - date < FIVE_MINUTES) {
    return t('widget.dashboard-next.footer.updated.few-minutes-ago');
  }
  if (now - date < FIFTY_EIGHT_MINUTES) {
    const minutes = Math.ceil((now - date) / (1000 * 60));
    return t('widget.dashboard-next.footer.updated.minutes-ago', {
      amount: minutes,
    });
  }
  if (now - date < NINETY_MINUTES) {
    return t('widget.dashboard-next.footer.updated.hour-ago');
  }
  const amount = Math.ceil((now - date) / (1000 * 60 * 60));
  return t('widget.dashboard-next.footer.updated.hours-ago', { amount });
}
