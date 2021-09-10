import { onFieldChange, reportUnsupportedLanguage } from '@wix/business-settings-api';

const SupportedLocales = [
  'en',
  'da',
  'de',
  'hi',
  'it',
  'ja',
  'ko',
  'nl',
  'no',
  'ru',
  'sv',
  'tr',
  'fr',
  'es',
  'pt',
  'pl',
  'cs',
  'sv',
  'zh',
  'id',
  'th',
  'tl',
  'ro',
  'hu',
  'bg',
  'el',
  'fi',
  'ar',
  'he',
  'uk',
  'lt',
].reduce((obj, lang) => ({
  ...obj,
  [lang]: true
}), {});



export const registerReportUnsupportedLanguages = () => {
  onFieldChange(({ changedField }) => {
    const { language } = changedField;

    if (language && !SupportedLocales[language]) {
      reportUnsupportedLanguage({ appName: 'Wix Invoices', language });
    }
  });
};
