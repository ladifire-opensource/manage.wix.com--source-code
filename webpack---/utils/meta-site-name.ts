import { Notification } from '@wix/notifications-widget-common/types/notifications';

export type MetaSiteNameSelector = (notification: Notification) => string;

export class MetaSiteNameSelectorBuilder {
  private mainMetaSiteId: string;
  private thisSite: string;

  withMainMetaSiteId(metaSiteId: string) {
    this.mainMetaSiteId = metaSiteId;
    return this;
  }

  withThisSiteTranslation(thisSite: string) {
    this.thisSite = thisSite;
    return this;
  }

  private mainMetaSiteIdExists() {
    return !!(this.mainMetaSiteId);
  }

  build(): MetaSiteNameSelector {
    if (!this.thisSite) {
      throw new Error('No translation for "this site" was provided');
    }

    return (notification: Notification) => {
      if (this.mainMetaSiteIdExists() && notification.metaSiteId === this.mainMetaSiteId) {
        return this.thisSite;
      } else {
        return notification.metaSiteName;
      }
    };
  }
}

export const createRenderMetaSiteNameFunction = () => new MetaSiteNameSelectorBuilder();
