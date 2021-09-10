import { DataType, SearchEverythingType } from "../../types/index";
import { PageComponentId } from '@wix/business-manager-api';
import {
  IAnswersPayload,
  IAppMarketPayload, IContactsPayload, IEcomResponse, ISearchEverythingPayload
} from '../../types/services';

export type NavigationData = {
  type: DataType.BusinessManager;
  payload: ISearchEverythingPayload;
} | {
  type: DataType.AppMarket;
  payload: IAppMarketPayload;
} | {
  type: DataType.Contacts;
  payload: IContactsPayload;
} | {
  type: DataType.Answers;
  payload: IAnswersPayload;
} | {
  type: DataType.Ecom;
  payload: IEcomResponse;
};

const openMediaManagerModal = () => {
  const categories = window['ModuleRegistry'].invoke('mediaManager.categories');
  window['ModuleRegistry'].invoke('mediaManager.open', categories.MANAGE_MEDIA, 'search_BM');
};

export class NavigationService {

  static REFERRER = 'search';

  static navigateTo(data: NavigationData) {
    if (data.type === DataType.BusinessManager) {
      NavigationService.openSearchEverythingResult(data.payload);
    } else if (data.type === DataType.AppMarket) {
      NavigationService.openAppMarketResult(data.payload);
    } else if (data.type === DataType.Contacts) {
      NavigationService.openContactResult(data.payload);
    } else if (data.type === DataType.Answers) {
      NavigationService.openLinkResult(data.payload);
    }
  }

  private static openSearchEverythingResult(result: ISearchEverythingPayload) {
    if (result.type === SearchEverythingType.Link) {
      const contextData = result.appState && { appState: result.appState } || {};
      this.navigateUsingBusinessManager({
        pageComponentId: result.pageComponentId,
        contextData
      });
    } else if (result.type === SearchEverythingType.Modal) {
      this.openModal(result);
    } else {
      window.open(result.path, '_blank');
    }
  }

  private static openAppMarketResult(result: IAppMarketPayload) {
    const contextData = { appState: result.slug + '/overview' };
    this.navigateUsingBusinessManager({
      pageComponentId: PageComponentId.AppMarket,
      contextData
    });
  }

  private static openContactResult(result: IContactsPayload) {
    this.navigateUsingBusinessManager({
      pageComponentId: PageComponentId.Contacts
    });
    window['ModuleRegistry'].invoke('contacts.showContact', { contactId: result.contactId });
  }

  private static navigateUsingBusinessManager(args: { pageComponentId: string; contextData?: { appState?: string }}) {
    // send an action to ignore next navigation with ...params

    window['ModuleRegistry'].invoke('businessManager.navigateTo', {
      ...args,
      contextData: {
        ...args.contextData,
        referrer: this.REFERRER
      }
    });
  }

  private static openLinkResult(result: { url: string }) {
    if (result && result.url) {
      window.open(result.url, '_blank');
    }
  }

  private static openModal({ modalType }: { modalType?: string }) {
    if (modalType === 'mediaManager') {
      openMediaManagerModal();
    }
  }
}
