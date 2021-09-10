import { createElement } from 'react';
import ReactDOM from 'react-dom';

import { MethodFn } from '@wix/yoshi-flow-bm';
import { ModuleRegistry } from 'react-module-container';
import { CustomField } from '../models/customFields';

const openAddCustomField: MethodFn = (
  options,
  {
    customFieldKey,
    origin,
    onClose,
    displayName,
  }: {
    customFieldKey?: string;
    origin?: string;
    onClose?(field?: CustomField): void;
    displayName?: string;
  },
) => {
  const component = ModuleRegistry.component('add-custom-field');
  const portal = document.createElement('div');
  const props = {
    isOpen: true,
    onClose: (field?: CustomField) => {
      onClose && onClose(field);
      unmountEditContactModal();
    },
    customFieldKey,
    origin,
    displayName,
  };
  portal.setAttribute('id', 'contacts-custom-fields-manager-portal');
  document.body.appendChild(portal);
  ReactDOM.render(createElement(component, props), portal);
};

const unmountEditContactModal = () => {
  const portal = document.getElementById(
    'contacts-custom-fields-manager-portal',
  );
  if (portal) {
    ReactDOM.unmountComponentAtNode(portal);
    portal.parentNode!.removeChild(portal);
  }
};

export default openAddCustomField;
