import { createElement } from 'react';
import ReactDOM from 'react-dom';

import { MethodFn } from 'yoshi-flow-bm-runtime';
import { ModuleRegistry } from 'react-module-container';

interface OpenInvoicePreview {
  origin: string;
  invoiceId: string;
  onActionsPreformed(result: OpenInvoiceResponse): void;
  onClose(): void;
}

export interface ActionResponse {
  actionName: string;
  date: string;
}

type OpenInvoiceResponse = ActionResponse[];
const openInvoicePreview: MethodFn = (bmProps, args: OpenInvoicePreview) => {
  const component = ModuleRegistry.component('invoices.preview');
  const portal = document.createElement('div');

  const openPreview = async (
    open: (invoiceId: string) => Promise<OpenInvoiceResponse>,
  ) => {
    try {
      const result = await open(args.invoiceId);
      args.onActionsPreformed && args.onActionsPreformed(result);
    } catch (error) {
      args.onClose && args.onClose();
      unmountBusinessInfoModal();
    }
  };

  const props = {
    origin: args.origin,
    registerOpen: openPreview,
  };
  portal.setAttribute('id', 'invoices-preview-modal-portal');
  document.body.appendChild(portal);
  ReactDOM.render(createElement(component, props), portal);
};

const unmountBusinessInfoModal = () => {
  const portal = document.getElementById('invoices-preview-modal-portal');
  if (portal) {
    ReactDOM.unmountComponentAtNode(portal);
    portal.parentNode!.removeChild(portal);
  }
};

export default openInvoicePreview;
