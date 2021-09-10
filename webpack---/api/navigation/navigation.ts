import { ModuleRegistry } from 'react-module-container';
import { navigateToAndShowBackToast, navigateTo, INavigateToPageConfig, PageComponentId, } from '@wix/business-manager-api';

export const generalNavigationBackToast = ({ t }) => ({ text: t('price.quote.back_toast.text'), buttonText: t('price.quote.back_toast.button-text') });
export const ORIGIN_PAGE_COMPONENT = { pageComponentId: PageComponentId.PriceQuotes };
const VIEW_ID = 'price-quotes';
const navigateToPageConfig: INavigateToPageConfig = {
  pageComponentId: PageComponentId.PriceQuotes,
  viewId: VIEW_ID,
};

export const navigateToPriceQuotes = (config = {}) => navigateTo({
  ...navigateToPageConfig,
  ...config
});

export class BusinessManagerNavigationApi {
  private readonly translate: Function;

  private readonly navigateToAndShowBackToast = (toPageComponent: string) => {
    navigateToAndShowBackToast(
      { pageComponentId: toPageComponent },
      ORIGIN_PAGE_COMPONENT,
      generalNavigationBackToast({ t: this.translate })
    );
  };

  private readonly navigateTo = (toPageComponent: string, appState: string, viewId: string) => {
    navigateTo({
      pageComponentId: toPageComponent,
      viewId,
      contextData: {
        appState
      }
    });
  };

  constructor({
    translate,
  }: {
    translate: Function;
  }) {
    this.translate = translate;
  }

  navigateToInvoicesSettings() {
    this.navigateToAndShowBackToast(PageComponentId.InvoicesSettings);
  }

  navigateToPayments() {
    this.navigateToAndShowBackToast(PageComponentId.Cashier);
  }

  navigateToBusinessSettings() {
    this.navigateToAndShowBackToast(PageComponentId.Settings);
  }

  navigateToBusinessInfoSettingsLobby() {
    this.navigateToAndShowBackToast(PageComponentId.BusinessInfo);
  }

  navigateToProducts() {
    navigateToAndShowBackToast(
      {
        pageComponentId: PageComponentId.Invoices,
        contextData: { appState: 'products/list' }
      },
      ORIGIN_PAGE_COMPONENT,
      generalNavigationBackToast({ t: this.translate })
    );
  }

  navigateToEditInvoice(invoiceId: string) {
    this.navigateTo(PageComponentId.Invoices, `${invoiceId}/edit`, invoiceId);
  }

  navigateToNewEditInvoice(invoiceId: string) {
    this.navigateTo(PageComponentId.Invoices, `invoice/new?id=${invoiceId}`, invoiceId);
  }

  addNavigationListener(onNavigate) {
    const { remove } = ModuleRegistry.addListener(
      'businessManager.onNavigation',
      onNavigate
    );

    return { remove };
  }
}
