import { createElement } from 'react';
import ReactDOM from 'react-dom';
import { BMMethodFlowAPI, MethodFn } from 'yoshi-flow-bm-runtime';
import { ModuleRegistry } from 'react-module-container';
import { CreateTaxModalProps } from '../components/CreateTaxModal/CreateTaxModal';

const openCreateTaxModal: MethodFn = (
  bmProps: BMMethodFlowAPI,
  componentProps: CreateTaxModalProps,
) => {
  const component = ModuleRegistry.component(
    'crm-financial-actions.CreateTaxModal',
  );
  const portal = document.createElement('div');
  const props = {
    ...componentProps,
    onCancel: () => {
      unmountCreateTaxModal();
      componentProps.onCancel && componentProps.onCancel();
    },
    onSuccess: (id: string) => {
      unmountCreateTaxModal();
      componentProps.onSuccess && componentProps.onSuccess(id);
    },
  };
  portal.setAttribute('id', 'invoices-create-tax-modal-portal');
  document.body.appendChild(portal);
  ReactDOM.render(createElement(component, props), portal);
};

const unmountCreateTaxModal = () => {
  const portal = document.getElementById('invoices-create-tax-modal-portal');
  if (portal) {
    ReactDOM.unmountComponentAtNode(portal);
    portal.parentNode!.removeChild(portal);
  }
};

export default openCreateTaxModal;
