import { Brand, EditorType } from '@wix/business-manager-api';

export interface ISiteFromMetaSiteDTO {
  metaSiteId: string;
  siteName: string;
  published: boolean;
  onboarding: boolean;
  mainApplication: IMainApplicationDTO;
  editorX: boolean;
  blocked: boolean;
}

interface IMainApplicationDTO {
  id: string;
  appType: string;
  published: boolean;
  viewUrl: string;
}

export enum SiteType {
  FLASH = 'Flash',
  HTML = 'HtmlWeb'
}

export type TSiteDTO = ISitePermissions & SiteProperties & { ownerId: string };

export interface ISitePermissions {
  isOwner: boolean;
  permissions: string[];
  roles: string[];
}

export type TLiveSite = {
  published: boolean,
  viewUrl: string,
  editorSiteId: string,
  siteType: SiteType,
  editorType: EditorType
};

export type TSiteMetaData = {
  metaSiteId: string;
  name: string;
  isOwner: boolean;
  permissions: string[];
  roles: string[];
  ownerId: string;
  primarySiteLocale: string;
  blocked: boolean
};

export interface SiteProperties {
  metaSiteId?: string;
  name: string;
  liveSite?: TLiveSite;
  primarySiteLocale: string;
  brand: Brand;
  blocked: boolean;
}

export interface IOwnerDTO {
  metasiteId: string;
  ownerId: string;
}
