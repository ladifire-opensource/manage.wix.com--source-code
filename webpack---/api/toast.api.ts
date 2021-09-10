import { showToast, ToastType, ToastTimeout, showTip, appDefIds } from '@wix/business-manager-api';
import { TranslationFunction } from 'i18next';

interface IToastOptions {
  biName?: string;
  message?: string;
  messageKey?: string;
}

export enum ToastBiNames {
  PAYMENTS_BANNER = 'invoices.payments-banner',
  INVOICE_SENT = 'invoices.invoice-sent',
  INVOICE_VOIDED = 'invoices.invoice-voided',
  INVOICE_ERROR = 'invoice.error',
  INVOICE_DELETED = 'invoices.invoice-deleted',
}

export class InvoicesToastApi {
  private readonly translate: TranslationFunction;

  constructor({ translate }: { translate: TranslationFunction }) {
    this.translate = translate;
  }

  public showPaymentsBanner({ onClick }) {
    return showToast({
      biName: ToastBiNames.PAYMENTS_BANNER,
      message: this.translate('invoices.payment_terms_banner.text', {
        interpolation: { escape: str => str }
      }),
      type: ToastType.WARNING,
      timeout: ToastTimeout.NONE,
      action: {
        text: this.translate('invoices.payment_terms_banner.link'),
        onClick
      }
    });
  }

  public showInvoiceSent({ email }: { email: string }) {
    showTip({ sourceApplication: appDefIds.invoices });
    showToast({
      biName: ToastBiNames.INVOICE_SENT,
      message: this.translate('invoice.toasts.sent', { email }),
      type: ToastType.SUCCESS
    });
  }

  public showInvoiceAndOrderSent() {
    showTip({ sourceApplication: appDefIds.invoices });
    showToast({
      biName: ToastBiNames.INVOICE_SENT,
      message: this.translate('invoice-and-order.toasts.sent'),
      type: ToastType.SUCCESS
    });
  }

  public showInvoicePaymentAdded() {
    showToast({
      biName: ToastBiNames.INVOICE_SENT,
      message: this.translate('invoice.toasts.payment-added'),
      type: ToastType.SUCCESS
    });
  }

  public showInvoiceVoided() {
    showToast({
      biName: ToastBiNames.INVOICE_VOIDED,
      message: this.translate('invoice.toasts.voided'),
      type: ToastType.SUCCESS
    });
  }

  public showError(options?: IToastOptions) {
    const biName = options?.biName || ToastBiNames.INVOICE_ERROR;
    const message = (() => {
      if (options?.message) {
        return options.message;
      }
      if (options?.messageKey) {
        return this.translate(options.messageKey);
      }
      return this.translate('invoice.toasts.error');
    })();

    showToast({
      biName,
      message,
      type: ToastType.ERROR
    });
  }

  public showInvoiceDeleted() {
    showToast({
      biName: ToastBiNames.INVOICE_DELETED,
      message: this.translate('invoice.toasts.deleted'),
      type: ToastType.SUCCESS
    });
  }
}
