import i18next from 'i18next';
import i18nextXHRBackend from 'i18next-xhr-backend';
import abTranslate from 'ab-translate/dist/src/abTranslate-runtime';

export const i18n = i18next.use(i18nextXHRBackend);

export const setI18n = ({
  locale,
  baseUrl = '',
  translations = {},
  experiments,
}) => {
  return new Promise(async (resolve, reject) => {
    i18n.init(
      {
        lng: locale,
        fallbackLng: 'en',
        keySeparator: '$',
        interpolation: {
          escapeValue: false,
        },
        backend: {
          loadPath: `${baseUrl}assets/locale/messages_{{lng}}.json`,
          crossDomain: true,
          parse: (loadedTranslations) => {
            try {
              return abTranslate(experiments, {
                ...JSON.parse(loadedTranslations),
                ...translations,
              });
            } catch (e) {
              return { ...JSON.parse(loadedTranslations), ...translations };
            }
          },
        },
        react: {
          wait: true,
        },
      },
      (err) => (err ? reject(err) : resolve(i18n)),
    );
  });
};
