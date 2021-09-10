import {
  BusinessManagerModule,
  registerModule,
  ModuleId,
  PageComponentId,
  TModuleParams,
  configModule,
  getModule,
  appDefIds,
  getCurrentInstance
} from '@wix/business-manager-api';
import * as React from 'react';
import {MemberPermissionsLazyComponent} from './member-permissions-page-component';
import {ModuleRegistry} from 'react-module-container';
import {PermissionsConfig} from '@wix/member-permissions-server/dist/src/types/domain-types';
import ClientApi from './services/api';
import AxiosHttpCient, {createAxiosInstance} from './services/axios-http-client';
import {PagePermissionsWidgetLazyComponent} from './page-permissions-widget-component';

const getTranslations = (axiosHttpClient, baseUrl, locale) =>
  axiosHttpClient.get(`${baseUrl}assets/locale/messages_${locale}.json`);

class MemberPermissionsModule extends BusinessManagerModule {
  _permissionsConfigsFetchers: (() => Promise<PermissionsConfig>)[] = [];
  moduleParams: TModuleParams;
  translations: Object;
  deleteModalSuffix: string = '';

  constructor(moduleId) {
    super(moduleId);
    ModuleRegistry.registerComponent(
      PageComponentId.MemberPermissions,
      () => MemberPermissionsLazyComponent
    );
    ModuleRegistry.registerComponent('page-permissions-widget-loader', () => props => {
      const msid = this.moduleParams.metaSiteId;
      const instance = getCurrentInstance(appDefIds.metaSite);
      const axiosHttpClient = this.getAxiosClient(instance);
      const clientApi = this.getClientApi(axiosHttpClient, msid);
      const combinedProps = {
        ...props,
        clientApi,
        staticsUrl: this.moduleParams.config.topology.memberPermissionsStaticsUrl
      };

      return React.createElement(<any>PagePermissionsWidgetLazyComponent, combinedProps);
    });
  }

  config(sourceModule: string, permissionsConfigPromise: () => Promise<PermissionsConfig> | SuffixConfig) {
    if (typeof permissionsConfigPromise === 'function') {
      this._permissionsConfigsFetchers.push(<() => Promise<PermissionsConfig>>permissionsConfigPromise);
    } else {
      this.deleteModalSuffix = (<SuffixConfig>permissionsConfigPromise).text;
    }
  }

  fetchPermissionsConfigs() {
    return this._permissionsConfigsFetchers.map(f => f());
  }

  init(moduleParams: TModuleParams) {
    this.moduleParams = moduleParams;

    const msid = moduleParams.metaSiteId;
    const instance = getCurrentInstance(appDefIds.metaSite);
    const memberPermissionsStaticsUrl = moduleParams.config.topology.memberPermissionsStaticsUrl;
    const axiosHttpClient = this.getAxiosClient(instance, false);
    const clientApi = this.getClientApi(axiosHttpClient, msid);

    configModule(this.moduleId, ModuleId.MemberPermissions, () =>
      Promise.all([
        clientApi.getEditorPermissionsConfig(),
        getTranslations(axiosHttpClient, memberPermissionsStaticsUrl, this.moduleParams.locale)
      ]).then(([editorConfig, translations]) => {
        return {
          ...editorConfig,
          name: translations['editorManagePermissionsTitle'],
          description: translations['editorManagePermissionsSubtitle']
        };
      })
    );

    if (getModule(ModuleId.Membership)) {
      configModule(this.moduleId, ModuleId.Membership, {
        componentName: 'page-permissions-widget-loader',
        type: 'BenefitsSection',
        priority: 0
      });
    }
  }

  private getAxiosClient(instance: string, withDefaultHeaders: boolean = true) {
    return new AxiosHttpCient(createAxiosInstance(instance, withDefaultHeaders));
  }

  private getClientApi(axiosClient, msid: string) {
    return new ClientApi(axiosClient, 'member-permissions-server', msid);
  }
}

registerModule(ModuleId.MemberPermissions, MemberPermissionsModule);

type SuffixConfig = {
  type: 'DeleteSuffixConfig',
  text: string;
};
