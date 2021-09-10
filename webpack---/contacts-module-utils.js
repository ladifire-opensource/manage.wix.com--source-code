import React from 'react';
import ReactDOM from 'react-dom';

import { ModuleRegistry } from 'react-module-container';

import { ContactsModule } from './contacts-module';

export const EDIT_CONTACT_PORTAL = 'edit-contact-portal';
export const DELETE_CONTACTS_PORTAL = 'delete-contacts-portal';

export const mountDeleteContactsModal = ({
  onFinish,
  onCancel,
  ...otherProps
} = {}) => {
  const component = ModuleRegistry.component(
    ContactsModule.DELETE_CONTACTS_MODAL,
  );
  const portal = document.createElement('div');
  const props = {
    ...otherProps,
    onFinish: (res) => {
      unmountDeleteContactsModal();
      onFinish(res);
    },
    onCancel: (res) => {
      unmountDeleteContactsModal();
      onCancel(res);
    },
  };
  portal.setAttribute('id', DELETE_CONTACTS_PORTAL);
  document.body.appendChild(portal);
  ReactDOM.render(React.createElement(component, props), portal);
};

const unmountDeleteContactsModal = () => {
  const portal = document.getElementById(DELETE_CONTACTS_PORTAL);
  ReactDOM.unmountComponentAtNode(portal);
  portal.parentNode.removeChild(portal);
};
