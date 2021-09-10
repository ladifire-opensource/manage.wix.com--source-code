import * as i18next from 'i18next';
import * as i18nextXHRBackend from 'i18next-xhr-backend';

export default function i18n({
  locale,
  baseUrl = '',
}: {
  locale: string;
  baseUrl: string;
}) {
  return i18next.use(i18nextXHRBackend).init({
    lng: locale,
    fallbackLng: 'en',
    keySeparator: '$',
    interpolation: {
      prefix: '{',
      suffix: '}',
      escapeValue: false,
    },
    backend: {
      loadPath: `${baseUrl}assets/locale/messages_{lng}.json`,
      crossDomain: true,
    },
  });
}
