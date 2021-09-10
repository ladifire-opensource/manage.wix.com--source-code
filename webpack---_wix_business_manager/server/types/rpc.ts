import { IOwnerDTO, ISiteFromMetaSiteDTO } from '../../common/types/site';
import { IMetaSiteClientSpecMap } from '../../common/types/embedded-services';
import { IWixAspects, IWixRequest } from './wix';
import { IConfig } from '../config';
import { NextFunction, RequestHandler, Response } from 'express';
import { ErrorReporter } from '../services/error-reporter';
import { com } from '../../../proto-generated/index';
import ProvisionResponse = com.wixpress.metasite.api.ProvisionResponse;
import GetSiteCoBrandingResponse = com.wixpress.cobranding.api.GetSiteCoBrandingResponse;
import { PetriFacade } from '../rpc/petriFacade';
import { AspectStore } from '@wix/wix-aspects';
import { BootstrapContext } from '@wix/wix-bootstrap-ng';
import { ApiGwClient } from '@wix/wix-bootstrap-api-gw-client';

export type IAccountInfo = (aspects: IWixAspects) => {
  getProfileImage(userId: string): Promise<{ imageUrl: string }>;
  getIsPro(userId: string): Promise<boolean>;
};

export type IAuthorizationServer = (aspects: IWixAspects) => {
  fetchOwner(siteId: string): Promise<IOwnerDTO>;
  fetchPermissionsOnSite(siteId: string): Promise<{permissions: string[]}>
  fetchRoles(userId: string, siteId: string): Promise<{ role: string }[]>
  getOverriddenAspectsForMetaSite(metaSiteId: string): Promise<AspectStore>;
};

export type IMetasiteFacade = (aspects: IWixAspects) => {
  fetchBy(siteId: string): Promise<ISiteFromMetaSiteDTO>;
  fetchMetaSiteId(appDefId: string, instanceId: string): Promise<string>;
  fetchEditorClientSpecMap(siteId: string, ip?: string, port?: number, isHttps?: boolean): Promise<IMetaSiteClientSpecMap>;
  provisionApp(siteId: string, appDefinitionId: string);
  provisionApps(metaSiteId: string, appDefIds: string[]): Promise<ProvisionResponse>;
  dashboardFetchBy(siteId: string): Promise<TSiteFromMetaSiteDashboardDTO>;
};

export type IIdentityFacade = (aspects: IWixAspects) => {
  getUserGuid(): Promise<string>;
  getAccountId(): Promise<string>;
};

export type TSiteFromMetaSiteDashboardDTO = {
  id: string;
  documentType: SiteState; // UGC || Template
  embeddedServices: Array<{
    id: string;
    idInApp: string; // instanceId
    embeddedServiceType: string; // ThirdPartyApps || SiteMembers || AppBuilder || ProvidedMailingService || MORE!
    embeddedServiceAttributes: TThirdPartyAppsAttributes | any;
    state: EmbeddedServicesState;
  }>;
};

type TThirdPartyAppsAttributes = {
  appId: string; // appDefId
};

export enum EmbeddedServicesState {
  Initialized = 'Initialized',
  Template = 'Template',
  Stub = 'Stub'
}

export enum SiteState {
  UserGenerated = 'UGC',
  Template = 'Template'
}

export interface Locale {
  languageCode?: string;
  country?: string;
}

export interface ISitePropertiesData {
  siteDisplayName?: string;
  locale?: Locale;
}

export type ISiteProperties = (aspects: IWixAspects) => {
  getProperties(): Promise<ISitePropertiesData>;
};

export type ICoBranding = (aspects: IWixAspects) => {
  getCoBranding(): Promise<GetSiteCoBrandingResponse>
};

export interface ISitePropertiesDTO {
  metasiteId: string;
  version: string;
  properties: {
    siteDisplayName: string;
    [key: string]: any;
    locale: Locale;
  };
}

export interface IUserPreferencesDTO {
  userId: string;
  nameSpace: string;
  key: string;
  blob: {
    [key: string]: any;
  };
}

export interface IResolvable {
  userId: string;
  nameSpace: string;
  key: string;
}

export type RecentlyViewedSite = {
  id: string;
  viewedOn: string; // ISO date
};
export type UserPreferences = com.wix.fed.settings.UserPreferences;

export type IUserPreferences = (aspects) => {
  get(resolvable: IResolvable): Promise<UserPreferences[]>;
  set(userPreferences: IUserPreferencesDTO): Promise<void>;
};

export interface IUserInfoDTO {
  guid: string;
  email: string;
  username: string;
}

export type IUsers = (aspects: IWixAspects) => {
  getUserById(userId: string): Promise<IUserInfoDTO>;
};

export type IDashboardPermissions = (aspects: IWixAspects, metaSiteId?: string) => {
  assertCanOpenDashboard(): Promise<void>;
  assertCanManageEtpa(): Promise<void>;
  assertCanOpenDashboardGatekeeper(): Promise<void>;
  assertCanManageEtpaGatekeeper(): Promise<void>;
};

export interface IRpcFactory {
  siteProperties: ISiteProperties;
  coBranding: ICoBranding;
  users: IUsers;
  accountInfo: IAccountInfo;
  authorization: IAuthorizationServer;
  metasite: IMetasiteFacade;
  userPreferencesService: IUserPreferences;
  petriFacade: PetriFacade;
  dashboardPermissions: IDashboardPermissions;
  errorReporter: ErrorReporter;
  identityFacade: IIdentityFacade;
}

export interface IServerContext {
  bi(aspects: IWixAspects): any;
  grpc: BootstrapContext['grpc'];
  rpcFactory: IRpcFactory;
  hostname: string;
  config: IConfig;
  requireLogin?: any;
  apiGwClient: ApiGwClient;
  disableNewrelic: RequestHandler;
  routes: {
    prefetch: RequestHandler;
    renderHTML(metaSiteId: string, req: IWixRequest, res: Response, next?: NextFunction): Promise<void>;
  };
}
