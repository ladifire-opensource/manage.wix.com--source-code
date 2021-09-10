import { MethodFn } from 'yoshi-flow-bm-runtime';
import { ModuleRegistry } from 'react-module-container';
import ReactDOM from 'react-dom';
import { createElement } from 'react';

const CONTAINER_ID = 'copy-invoice-share-link-modal';

export interface OpenInvoiceShareLink {
  invoiceId: string;
  onLinkCreated?: () => {};
}
const openInvoiceShareLink: MethodFn = (
  bmProps,
  args: OpenInvoiceShareLink,
) => {
  const { invoiceId, onLinkCreated } = args;
  openInvoiceShareLinkModal({ invoiceId, origin, onLinkCreated });
};
export default openInvoiceShareLink;

export interface OpenInvoiceShareLinkModal {
  invoiceId: string;
  origin: string;
  onLinkCreated?: () => void;
  onClose?: () => void;
}

const openInvoiceShareLinkModal = ({
  invoiceId,
  origin,
  onLinkCreated,
  onClose,
}: OpenInvoiceShareLinkModal) => {
  const component = ModuleRegistry.component(
    'crm-financial-actions.CopyInvoiceShareLinkModal',
  );
  const portal = document.createElement('div');
  const closeComponent = () => {
    unmountShareLinkModal();
    if (onClose) {
      onClose();
    }
  };
  const props = {
    invoiceId,
    isOpen: true,
    origin,
    onClose: closeComponent,
    onConfirm: closeComponent,
    onLinkCreated: () => {
      if (onLinkCreated) {
        onLinkCreated();
      }
    },
  };
  portal.setAttribute('id', CONTAINER_ID);
  portal.setAttribute('data-hook', CONTAINER_ID);
  document.body.appendChild(portal);
  ReactDOM.render(createElement(component, props), portal);
};

const unmountShareLinkModal = () => {
  const portal = document.getElementById(CONTAINER_ID);
  if (portal) {
    ReactDOM.unmountComponentAtNode(portal);
    portal.parentNode!.removeChild(portal);
  }
};
