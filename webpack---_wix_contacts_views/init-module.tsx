import { RegisteredEntityTypes } from './types/registeredEntities';
import { ModuleRegistry } from 'react-module-container';
import * as React from 'react';
import { Note } from 'wix-ui-icons-common';
import { configModule, ModuleId } from '@wix/business-manager-api';

export const registerNotesContactsActionsConfig = () => {
  const contactsActionsConfig = {
    type: RegisteredEntityTypes.MoreActions,
    actions: [
      {
        label: Promise.resolve('header.action.addNote'),
        onClick: () => {
          ModuleRegistry.invoke('crm.contacts.fullPage.openTabByModuleId', {
            moduleId: 'notes',
            onFirstReady: () =>
              ModuleRegistry.notifyListeners('notesApp.addNoteClicked'),
          });
          ModuleRegistry.notifyListeners('notesApp.addNoteClicked');
        },
        icon: <Note />,
        subtitle: Promise.resolve('header.action.addNode.subtitle'),
      },
    ],
  };

  configModule(ModuleId.Contacts, ModuleId.Contacts, contactsActionsConfig);
};
