import i18next from 'i18next';

export default function i18n(locale) {
  return i18next.createInstance().init({
    keySeparator: false,
    lng: locale,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      [locale]: {
        translation: require(`./assets/locale/messages_${locale}.json`),
      },
    },
  });
}
