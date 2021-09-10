export const resolve = async (flowAPI) => {
  const { getI18n, moduleParams } = flowAPI;
  const {
    accountLanguage,
    config: { topology },
  } = moduleParams;

  try {
    const i18nPromise = getI18n();

    const response = await fetch(
      `${topology.contactsViewsStaticsUrl}/assets/locale/messages_${accountLanguage}.json`,
    );

    if (!response.ok) {
      throw new Error(
        `Can't fetch locale ${accountLanguage}, status code: ${response.status}`,
      );
    }

    const response1 = await fetch(
      `${topology.localeDatasetDataStaticsUrl}/translations/messages_${accountLanguage}.json`,
    );

    if (!response1.ok) {
      throw new Error(
        `Can't fetch locale ${accountLanguage}, status code: ${response1.status}`,
      );
    }

    const messages = await response.json();
    const messages1 = await response1.json();
    const i18n = await i18nPromise;

    i18n.addResourceBundle(
      accountLanguage,
      'translation',
      { ...messages, ...messages1 },
      true,
      false,
    );
  } catch (e) {
    // handle error
  }
};
