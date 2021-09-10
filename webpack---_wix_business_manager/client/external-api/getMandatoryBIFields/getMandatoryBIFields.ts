import { IState } from '../../types/store';
import { Store } from 'redux';
import { ModuleRegistry } from 'react-module-container';
import { MandatoryBIFields, GET_MANDATORY_BI_FIELDS } from '@wix/business-manager-api';
import { getSiteOwnerId, getSiteRolesString } from '../../selectors/siteMetaDataSelectors';
import { getLoggedAccountId } from '../../selectors/accountDataSelectors';
import { getCurrentUserId } from '../../selectors/currentUserSelectors';

const getMandatoryBIFields = (getState: () => IState) => (): MandatoryBIFields => {
  const latestState = getState();
  const ownerId = getSiteOwnerId(latestState);
  const roles = getSiteRolesString(latestState);
  const target_account_id = getSiteOwnerId(latestState);
  const logged_account_id = getLoggedAccountId(latestState);
  const logged_user_id = getCurrentUserId(latestState) ;

  return { ownerId, roles, target_account_id, logged_user_id, logged_account_id };
};

export const registerGetMandatoryBIFields = (store: Store<IState>) => {
  ModuleRegistry.registerMethod(GET_MANDATORY_BI_FIELDS, () => getMandatoryBIFields(store.getState));
};
