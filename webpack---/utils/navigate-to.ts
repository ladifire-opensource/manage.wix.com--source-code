import { ModuleRegistry } from 'react-module-container';
import { ActionLink } from '@wix/notifications-widget-common/types/notifications';
import Experiments from '@wix/wix-experiments';
import { getBusinessManagerLink } from '../services/business-manager/business-manager-link';

export type NavigateToFunction = (actionLink: ActionLink, metaSiteId?: string) => void;

export class NavigationToBuilder {
  private currentMetaSiteId: string;
  private referrer: string;
  private experiments: Experiments;

  withCurrentMetaSite(currentMetaSiteId: string) {
    this.currentMetaSiteId = currentMetaSiteId;
    return this;
  }

  withReferrer(referrer: string) {
    this.referrer = referrer;
    return this;
  }

  withExperiments(experiments: Experiments) {
    this.experiments = experiments;
    return this;
  }

  build(): NavigateToFunction {
    return (actionLink: ActionLink, metaSiteId?: string) => {
      if (actionLink.url) {
        window.location.assign(actionLink.url);
      } else if (metaSiteId && metaSiteId === this.currentMetaSiteId && ModuleRegistry.registeredMethods['businessManager.navigateTo']) {
        const contextData = { ...actionLink.module.contextData };
        if (this.referrer) {
          contextData['referrer'] = this.referrer;
        }

        ModuleRegistry.invoke('businessManager.navigateTo', { ...actionLink.module, contextData });
      } else {
        const businessManagerLink = getBusinessManagerLink(actionLink, metaSiteId, this.referrer, this.experiments);
        window.location.assign(businessManagerLink);
      }
    };
  }
}

export const createNavigationToFunction = () => new NavigationToBuilder();
