import { ModuleFlowAPI } from '@wix/yoshi-flow-bm';

export const resolve = async ({
  moduleParams: { config, accountLanguage },
  getI18n,
}: ModuleFlowAPI) => {
  const [i18n, messages] = await Promise.all([
    getI18n(),
    fetchTranslations(config.topology.translationsStaticsUrl, accountLanguage),
  ]);

  i18n.addResourceBundle(accountLanguage, 'translation', messages, true, false);
};

const fetchTranslations = (url: string, language: string) => {
  return fetch(`${url}/assets/locale/messages_${language}.json`).then((x) =>
    x.json(),
  );
};
