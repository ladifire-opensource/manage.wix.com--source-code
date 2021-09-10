import { ContactsLabelsApp } from '@wix/ambassador-contacts-labels-app/http';
import { appDefIds, getCurrentInstance } from '@wix/business-manager-api';

const getAuthorizedFacetsApiInstance = (instance: string) => {
  return ContactsLabelsApp('/_api/contacts/').ContactLabelsServiceV4()({
    Authorization: instance,
  });
};

export const getAllLabels = (instance: string) => {
  return getAuthorizedFacetsApiInstance(instance).listLabels({});
};

export const createLabel = (labelName: string) => {
  const instance = getCurrentInstance(appDefIds.metaSite);
  return getAuthorizedFacetsApiInstance(instance).findOrCreateLabel({
    displayName: labelName,
  });
};
