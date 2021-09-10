import i18next, { TranslationFunction } from 'i18next';

export const t: TranslationFunction = (key, options?) => {
  return i18next.t(key, options);
};

export const getLanguage = (): string => i18next.language;
