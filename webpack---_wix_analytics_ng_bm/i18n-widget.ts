import i18next from 'i18next';
import i18nextXHRBackend from 'i18next-xhr-backend';

export default function i18n(
  locale: string,
  staticsUrl: string = '',
  sharedTranslations: string = '',
) {
  if (i18next.isInitialized && i18next.language === locale) {
    return i18next;
  }

  return i18next.use(i18nextXHRBackend).init({
    ns: ['common', 'shared'],
    defaultNS: 'common',
    fallbackNS: 'shared',
    lng: locale,
    fallbackLng: 'en',
    keySeparator: '$',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: (lng, ns) => {
        return ns[0] === 'shared'
          ? `${sharedTranslations}assets/locale/analytics-ng-translations_messages_{{lng}}.json`
          : `${staticsUrl}assets/locale/analytics-ng-bm_messages_{{lng}}.json`;
      },
      crossDomain: true,
    },
    react: {
      wait: true,
    },
  });
}
