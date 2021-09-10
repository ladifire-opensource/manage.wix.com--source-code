import abTranslate from 'ab-translate/dist/src/abTranslate-runtime';
import { initI18n } from '@wix/wix-i18n-config';
import axios from 'axios';

export const configureI18N = ({ locale, translationsUrl, experiments }) => {
  return initI18n({
      locale,
      asyncMessagesLoader: async lng => {
        const loadPath = `${translationsUrl}assets/locales/messages_${lng}.json`;
        const translations = (await axios.get(loadPath)).data;
        return abTranslate(experiments, translations);
      },
    });
};
