import { ModuleRegistry } from 'react-module-container';
import {
  appDefIds,
  ExternalPageId,
  navigateTo,
  PageComponentId,
} from '@wix/business-manager-api';

export const crmHomeMethodNames = {
  createContact: 'crm-home.createContact',
  addForm: 'crm-home.add-form',
  addChat: 'crm-home.add-chat',
  openHelpArticle: 'crm-home.open-help-article',
};

const registerAddContact = () => {
  ModuleRegistry.registerMethod(crmHomeMethodNames.createContact, () => () => {
    return ModuleRegistry.invoke('contacts.openEditContact', {
      onSuccess: () => {
        navigateTo({
          pageComponentId: PageComponentId.Contacts,
          contextData: {
            referrer: 'crmHome',
          },
        });
      },
      hideSaveAndCreateAnother: true,
    });
  });
};

const registerAddForm = (moduleParams) => {
  ModuleRegistry.registerMethod(crmHomeMethodNames.addForm, () => () => {
    window.open(
      `${moduleParams.liveSite.editUrl}?openPanel=addPanel.contact&referralInfo=crmHome`,
      '_blank'
    );
  });
};

const registerAddChat = (moduleParams) => {
  ModuleRegistry.registerMethod(crmHomeMethodNames.addChat, () => () => {
    window.open(
      `${moduleParams.liveSite.editUrl}?etpa=${appDefIds.chat}&referralInfo=crmHome`,
      '_blank'
    );
  });
};

const registerOpenHelpArticle = (moduleParams) => {
  ModuleRegistry.registerMethod(
    crmHomeMethodNames.openHelpArticle,
    () => (articlePath: string) => {
      window.open(
        ModuleRegistry.invoke(
          'businessManager.buildModuleLink',
          ExternalPageId.Support,
          {
            article: articlePath,
            locale: moduleParams.accountLanguage,
          }
        ),
        '_blank'
      );
    }
  );
};

export const registerCrmHomeMethods = (moduleParams) => {
  registerAddContact();
  registerAddForm(moduleParams);
  registerAddChat(moduleParams);
  registerOpenHelpArticle(moduleParams);
};
