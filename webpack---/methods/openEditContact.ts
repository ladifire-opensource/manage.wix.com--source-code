import { createElement } from 'react';
import ReactDOM from 'react-dom';

import { MethodFn } from 'yoshi-flow-bm-runtime';
import { ModuleRegistry } from 'react-module-container';

const openEditContact: MethodFn = (
  bmProps,
  { onSuccess, onClose, ...otherProps } = {},
) => {
  const component = ModuleRegistry.component('edit-contact-v4');
  const portal = document.createElement('div');
  const props = {
    ...otherProps,
    onSuccess: (contact, options) => {
      if (options && !options.createAnother) {
        unmountEditContactModal();
      }
      onSuccess && onSuccess(contact, options);
    },
    onClose: () => {
      unmountEditContactModal();
      onClose && onClose();
    },
    isOpen: true,
  };
  portal.setAttribute('id', 'contacts-crud-manager-portal');
  document.body.appendChild(portal);
  ReactDOM.render(createElement(component, props), portal);
};

const unmountEditContactModal = () => {
  const portal = document.getElementById('contacts-crud-manager-portal');
  if (portal) {
    ReactDOM.unmountComponentAtNode(portal);
    portal.parentNode!.removeChild(portal);
  }
};

export default openEditContact;
