import { createElement } from 'react';
import ReactDOM from 'react-dom';
import { BMMethodFlowAPI, MethodFn } from 'yoshi-flow-bm-runtime';
import { ModuleRegistry } from 'react-module-container';
import { SendInvoiceModalProps } from '../exported-components/SendInvoiceModal/SendInvoiceModal';

const openSendInvoiceModal: MethodFn = (
  bmProps: BMMethodFlowAPI,
  componentProps: SendInvoiceModalProps,
) => {
  const component = ModuleRegistry.component(
    'crm-financial-actions.SendInvoiceModal',
  );
  const portal = document.createElement('div');
  const props: SendInvoiceModalProps = {
    ...componentProps,
    onClose: () => {
      unmountSendInvoiceModal();
      componentProps.onClose && componentProps.onClose();
    },
    onSendSuccess: () => {
      unmountSendInvoiceModal();
      componentProps.onSendSuccess && componentProps.onSendSuccess();
    },
    onError: (e:Error) => {
      unmountSendInvoiceModal();
      componentProps.onError && componentProps.onError(e);
    },
  };
  portal.setAttribute('id', 'invoices-send-invoice-modal-portal');
  document.body.appendChild(portal);
  ReactDOM.render(createElement(component, props), portal);
};

const unmountSendInvoiceModal = () => {
  const portal = document.getElementById('invoices-send-invoice-modal-portal');
  if (portal) {
    ReactDOM.unmountComponentAtNode(portal);
    portal.parentNode!.removeChild(portal);
  }
};

export default openSendInvoiceModal;
