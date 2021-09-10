import { navigateTo } from '@wix/business-manager-api';
import URI from 'urijs';
import { innerPagesFocusParams } from '../consts/innerPagesFocusParams';

export const navigateToInnerPagesIfNeeded = () => {
  const fieldToFocus = new URI().query(true)['focus'];
  if (fieldToFocus) {
    const redirectPageComponentId = getPageByInputField(fieldToFocus);
    if (redirectPageComponentId) {
      navigateTo({
        pageComponentId: redirectPageComponentId,
        contextData: { appState: `?focus=${fieldToFocus}` }
      });
    }
  }
};

const getPageByInputField = (fieldToFocus: string): string => {
  const elementEntry = Object.entries(innerPagesFocusParams)
    .find(([key, value]) => (value.includes(fieldToFocus)));
  return elementEntry && elementEntry[0];
};
