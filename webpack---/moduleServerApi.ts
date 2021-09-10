import {
  BusinessManagerModule,
  TModuleParams,
} from '@wix/business-manager-api';

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

  async getTranslations(
    keyboardName: string,
  ): Promise<{ [key: string]: string }> {
    const baseUrl = this.moduleParams.config.topology.staticsUrl;
    const transUrl = `${baseUrl}assets/locale/${keyboardName}/${keyboardName}_${this.moduleParams.accountLanguage}.json`;
    const response = await this.httpClient.get(transUrl);
    return response.data as { [key: string]: string };
  }
}
