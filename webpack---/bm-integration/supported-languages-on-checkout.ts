import { onFieldChange, reportUnsupportedLanguage } from '@wix/business-settings-api';

const appName = 'PaymentsByWix';

onFieldChange(({ changedField }) => {
  const { language } = changedField;
  if (language && !SUPPORTED_LANGUAGES.includes(language)) {
    reportUnsupportedLanguage({ appName, language });
  }
});

const SUPPORTED_LANGUAGES = [
  'ar',
  'bg',
  'cs',
  'da',
  'de',
  'el',
  'en',
  'es',
  'fi',
  'fr',
  'he',
  'hi',
  'hu',
  'id',
  'it',
  'ja',
  'ko',
  'lt',
  'ms',
  'nl',
  'no',
  'pl',
  'pt',
  'ro',
  'ru',
  'sv',
  'th',
  'tl',
  'tr',
  'uk',
  'zh',
];
