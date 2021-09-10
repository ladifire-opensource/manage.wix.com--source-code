import { BusinessManagerModule } from '@wix/business-manager-api';
import { TModuleParams } from './commonTypes';
import { getInstance } from '../services/bmUtils';

const inboxUrlPrefix = '/_api/crm-inbox-server';
const coreChatUrlPrefix = `${inboxUrlPrefix}/core-chat`;
const inboxSettingsUrlPrefix = `_api/inbox-settings-server/v1/inbox/settings`;

export default class ModuleServerApi {
  httpClient: BusinessManagerModule['appEssentials']['httpClient'];
  moduleParams: TModuleParams;
  constructor(
    httpClient: BusinessManagerModule['appEssentials']['httpClient'],
    moduleParams: TModuleParams,
  ) {
    this.httpClient = httpClient;
    this.moduleParams = moduleParams;
  }

  migrateAsync() {
    this.httpClient
      .post(`${coreChatUrlPrefix}/migrate-async`, {})
      .then((res) => res.data);
  }

  getSitePages(): any {
    return this.httpClient
      .get(`${inboxSettingsUrlPrefix}/site-pages`, {
        headers: {
          Authorization: getInstance(),
        },
      })
      .then((res) => res.data);
  }

  async getTranslations(locale: string): Promise<{ [key: string]: string }> {
    const baseUrl = this.moduleParams.config.topology.engageWebStaticsUrl;
    const transUrl = `${baseUrl}assets/locale/inbox-module/module_${locale}.json`;
    const response = await this.httpClient.get(transUrl);
    return response.data as { [key: string]: string };
  }
}
