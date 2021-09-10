import { DataType, SearchEverythingType } from '../../../types';
import { PageComponentId } from '@wix/business-manager-api';
import { NavigationService } from '../../../services/navigation/NavigationService';

export const getHelpCenterUrl = (locale = 'en') => `https://support.wix.com/${locale}/`;

export type GotoActionMethod = (locale: string) => void;
type GotoActionMap = Record<string, GotoActionMethod>;

const openContactsInBusinessManager = () => NavigationService.navigateTo({
  type: DataType.BusinessManager,
  payload: {
    type: SearchEverythingType.Link,
    pageComponentId: PageComponentId.Contacts,
    appState: null,
  }
});

const openAppMarketInBusinessManager: GotoActionMethod = () => NavigationService.navigateTo({
  type: DataType.BusinessManager,
  payload: {
    type: SearchEverythingType.Link,
    pageComponentId: PageComponentId.AppMarket,
    appState: null
  }
});

const openHelpCenterUrl: GotoActionMethod = locale => NavigationService.navigateTo({
  type: DataType.BusinessManager,
  payload: {
    type: SearchEverythingType.Url,
    path: getHelpCenterUrl(locale)
  }
});

export const gotoActions: GotoActionMap = {
  [DataType.Contacts]: openContactsInBusinessManager,
  [DataType.AppMarket]: openAppMarketInBusinessManager,
  [DataType.Answers]: openHelpCenterUrl
};
