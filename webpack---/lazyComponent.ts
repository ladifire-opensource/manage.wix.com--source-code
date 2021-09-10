import { COMPONENT_NAME } from './config';
import { ReactLazyComponent } from 'react-module-container';
import { PageData, SettingsModuleProps } from './types/componentProps';
import Experiments from '@wix/wix-experiments';
import { appDefIds, getCurrentInstance, notifyViewStartLoading } from '@wix/business-manager-api';
import { sentryClient } from './services/sentry-client';
import { navigateToInnerPagesIfNeeded } from './services/navigateToInnerPagesIfNeeded';

export const SERVER_API_URL = '/_api/settings-lobby-server';
const axios = (window as any).axios;
const minified = debug => (debug ? '' : '.min');

const settingsLobbyAppBundleFiles = (props: SettingsModuleProps) => [
  `${props.config.topology.staticsUrl}settings-lobby.bundle${minified(props.debug)}.js`,
  `${props.config.topology.staticsUrl}settings-lobby${minified(props.debug)}.css`,
];

export class BusinessManagerSettingsLazyComponent extends (ReactLazyComponent as React.ComponentClass) {
  private axiosInstance;

  constructor(props: SettingsModuleProps) {
    super(props, {
      files: settingsLobbyAppBundleFiles(props),
      component: COMPONENT_NAME,
      resolve: async () => {
        try {
          navigateToInnerPagesIfNeeded(); //This is a temporary solution. After lobby is open for all users, all links should be fixed and lead directly to the required page
          notifyViewStartLoading(COMPONENT_NAME);
          this.axiosInstance = axios.create({ headers: { Authorization: getCurrentInstance(appDefIds.metaSite) } });
          const [translations, rawSettingsData, pageData, experiments] = await Promise.all([
            this.fetchTranslations(props.config.topology.translationsStaticsUrl, props.accountLanguage),
            this.fetchSettingsItemsData(props.config.topology.dataStaticsUrl),
            this.fetchPageData(),
            this.fetchExperiments(),
          ]);
          return ({
            translations,
            rawSettingsData,
            pageData,
            experiments,
          });
        } catch (e) {
          sentryClient.captureException(e);
        }
      }
    });
  }

  fetchTranslations(baseUrl: string, locale: string = 'en') {
    return axios.create()
      .get(`${baseUrl}assets/locale/business-manager-settings/messages_${locale}.json`)
      .then(res => res.data);
  }

  fetchPageData(): PageData {
    return this.axiosInstance
      .get(`${SERVER_API_URL}/settings-lobby-data`)
      .then(res => ({ ...res.data, errorFetchingData: false }))
      .catch(() => ({ premiumData: null, errorFetchingData: true }));
  }

  fetchSettingsItemsData(baseUrl: string) {
    return axios.create()
      .get(`${baseUrl}assets/settings-items.json`)
      .then(res => res.data);
  }

  async fetchExperiments() {
    const experiments = new Experiments();
    experiments.load('business-manager');
    experiments.load('settings-lobby');
    await experiments.ready();
    return experiments;
  }
}
