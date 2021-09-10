import {ExternalSource, Layout, MainSource, Selection, Sort} from '../constants';

export const contextTypes = {
  mmgrSettings: () => null,
};

export interface IBlackArrowConfig {
  messageUrl: string;
  socketUrl: string;
  tokenUrl: string;
}

export type TMMGRCommonSettings = {
  siteMediaToken: string;
  mediaGalleryBaseHost: string;
  origin: string;
  openSource: string;
  privateMediaRestAPI?: string;
  privateMediaRestFiles?: string;
  privateMediaRestVideoFiles?: string;
  publicMediaRestAPI?: string;
  publicMediaRestFiles?: string;
  publicMediaRestVideoFiles?: string;
  shutterStockPaymentAPI?: string;
  blackArrowConfig?: IBlackArrowConfig;
  additionalItemAttributes?: string[];
  path?: string;
  baseHost?: string;
  appendTo?: string;
  i18nCode?: string;
  publicMediaRoot?: string;
  sort?: Sort;
  layout?: Layout;
  mediaType?: string;
  wixUser?: boolean;
};
export enum MediaManagerVersion {
  G5 = 'G5',
  G6 = 'G6',
}
export type TIncomingTranslationsObject = {
  [key: string]: string;
};

export type TIncomingMMGRSettings = TMMGRCommonSettings &
  Partial<{
    version: MediaManagerVersion;
    versionDefaults: TVersionDefaults;
    translations: string | TIncomingTranslationsObject;
    tabsList: string | string[];
    servicesList: string | string[];
    selectionType: Selection;
    submitItems: boolean;
    uploadItems: boolean;
    uploadItemsOpen: boolean;
    customData: {
      sections: {
        title: string;
        data: any[];
        action?: {
          url?: string;
          title: string;
        };
      }[];
    };
    metaSiteToken: string;
  }>;

export type TVersionDefaults = {
  [key: string]: Partial<TIncomingMMGRSettings>;
};

export type TMMGRSettings = TMMGRCommonSettings &
  Partial<{
    areMultipleMediaTypesAllowed: boolean;
    translations: {
      [key: string]: string;
    };
    tabsList: MainSource[];
    servicesList: ExternalSource[];
    timestamp: number;
    selection: Selection;
    isSecureContext: boolean;
    canSubmitItems: boolean;
    addMediaButtonVisible: boolean;
    addMediaPanelOpened: boolean;
    customData: {
      sections: any;
    };
  }>;

export type TMMGRAdapterSettings = Partial<{
  apiUrl: string;
  filesUrl: string;
  videoFilesUrl: string;
  siteMediaToken: string;
}>;
