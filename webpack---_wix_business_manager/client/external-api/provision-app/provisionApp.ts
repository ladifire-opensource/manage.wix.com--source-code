import { IState } from '../../types/store';
import { provisionApp } from '../../actions/embeddedServicesActions';
import { getMetaSiteId } from '../../selectors/siteMetaDataSelectors';
import { getSentryClient } from './sentry-client';

//referrer is not used, but declared for legacy reasons
export const provisionAppFromStore = (state: IState) => (targetAppId: string, _referrer?: string, metaSiteId?: string) => {
  const sentry = getSentryClient();
  const currentMetaSiteId = getMetaSiteId(state);
  const id = metaSiteId || currentMetaSiteId;
  const isProvisioningOnCurrentSite = !metaSiteId || metaSiteId === currentMetaSiteId;
  if (metaSiteId) {
    sentry.captureException(new Error(`provision is called with metaSiteId ${metaSiteId}, referer: ${_referrer}, targerApp: ${targetAppId}`));
    if (!isProvisioningOnCurrentSite) {
      sentry.captureException(new Error(`provision is for site ${metaSiteId}, but current site is ${currentMetaSiteId}`));
    }
  }
  return provisionApp(state, targetAppId, id, isProvisioningOnCurrentSite);
};
