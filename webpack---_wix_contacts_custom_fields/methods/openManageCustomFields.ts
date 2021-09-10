import { createElement } from 'react';
import ReactDOM from 'react-dom';

import { MethodFn } from '@wix/yoshi-flow-bm';
import { ModuleRegistry } from 'react-module-container';

const openManageCustomFields: MethodFn = (
  options,
  {
    onClose,
  }: {
    onClose?(): void;
  },
) => {
  const component = ModuleRegistry.component('manage-custom-fields');
  const portal = document.createElement('div');
  const props = {
    isOpen: true,
    onClose: () => {
      unmountManageCustomFieldsModal();
      onClose && onClose();
    },
  };
  portal.setAttribute('id', 'contacts-custom-fields-manager-portal');
  document.body.appendChild(portal);
  ReactDOM.render(createElement(component, props), portal);
};

const unmountManageCustomFieldsModal = () => {
  const portal = document.getElementById(
    'contacts-custom-fields-manager-portal',
  );
  if (portal) {
    ReactDOM.unmountComponentAtNode(portal);
    portal.parentNode!.removeChild(portal);
  }
};

export default openManageCustomFields;
