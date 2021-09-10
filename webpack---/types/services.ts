export enum SearchEverythingType {
  Url = 'Url',
  Link = 'Link',
  Modal = 'Modal'
}

export interface ISearchEverythingAPIResponseCommon {
  type: SearchEverythingType;
  id: string;
  title: string;
  snippet: string;
  keywords: string;
  icon: string;
}

export interface IURLPayload {
  type: SearchEverythingType.Url;
  path: string;
}

export interface ILinkPayload {
  type: SearchEverythingType.Link;
  pageComponentId: string;
  appState?: string;
}

export interface IModalPayload {
  type: SearchEverythingType.Modal;
  modalType: string;
}

export type ISearchEverythingPayload = IURLPayload | ILinkPayload | IModalPayload;

export type ILinkAPIResponse = ISearchEverythingAPIResponseCommon & ILinkPayload;
export type IURLAPIResponse = ISearchEverythingAPIResponseCommon & IURLPayload;
export type IModalAPIResponse = ISearchEverythingAPIResponseCommon & IModalPayload;

export type ISearchEverythingAPIResponse = IURLAPIResponse | ILinkAPIResponse | IModalAPIResponse;

export interface IContactsAPIResponseOld {
  id: string;
  initials: string;
  picture: string;
  title: string;
  emails: {
    email: string;
  }[];
}

export interface IContactsAPIResponse {
  id: string;
  info: {
    name?: {
      first: string;
      last: string;
    };
    picture?: {
      image: {
        url: string;
      };
    };
  };
  primaryInfo: {
    email: string;
  };
}

export interface IContactsPayload {
  contactId: string;
  initials: string;
}

export interface IAppMarketPayload {
  slug: string;
  installed: boolean;
}

export interface IAppMarketAPIResponse {
  appDefinitionId: string;
  slug: string;
  isTrial: boolean;
  by: string;
  appType: string;
  name: string;
  appIcon: string;
  listedInMarket: boolean;
  teaser: string;
  frontPageImage: string;
  hasPremium: boolean;
  overrideDashboardUrl: boolean;
  dashboard: any;
  premiumOnly: boolean;
  externalPremium: boolean;
  installed?: boolean;
}

export interface INewAppMarketAPIResponse {
  id: string;
  name: string;
  teaser: string;
  icon: string;
  slug: string;
  company: {
    name: string;
  };
}

export interface IAnswersAPIResponse {
  content: string;
  creationDate: number;
  id: string;
  title: string;
  url: string;
}

export interface IAnswersPayload {
  url: string;
}

export type SearchResultPayload = ISearchEverythingPayload | IContactsPayload | IAnswersPayload | IAppMarketPayload;

export interface IEcomResponse {
  id: string;
  media: {
    mediaType: string;
    url: string;
    height: number;
    width: number;
  }[];
  name: string;
}
