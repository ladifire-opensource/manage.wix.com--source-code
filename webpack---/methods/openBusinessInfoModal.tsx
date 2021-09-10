import { createElement } from 'react';
import ReactDOM from 'react-dom';

import { MethodFn } from 'yoshi-flow-bm-runtime';
import { ModuleRegistry } from 'react-module-container';
import { AddBusinessInfoModalExternalProps } from '../components/AddBusinessInfoModal/AddBusinessInfoModal';

const openBusinessInfoModal: MethodFn = (
  bmProps,
  componentProps: AddBusinessInfoModalExternalProps,
) => {
  const msid = bmProps.moduleParams.metaSiteId;
  const component = ModuleRegistry.component(
    'crm-financial-actions.AddBusinessInfoModal',
  );
  const portal = document.createElement('div');
  const props = {
    msid,
    ...componentProps,
    isOpen: true,
    onCancel: () => {
      unmountBusinessInfoModal();
      componentProps.onCancel && componentProps.onCancel();
    },
    onSuccess: () => {
      unmountBusinessInfoModal();
      componentProps.onSuccess && componentProps.onSuccess();
    },
  };
  portal.setAttribute('id', 'invoices-set-business-info-modal-portal');
  document.body.appendChild(portal);
  ReactDOM.render(createElement(component, props), portal);
};

const unmountBusinessInfoModal = () => {
  const portal = document.getElementById(
    'invoices-set-business-info-modal-portal',
  );
  if (portal) {
    ReactDOM.unmountComponentAtNode(portal);
    portal.parentNode!.removeChild(portal);
  }
};

export default openBusinessInfoModal;
