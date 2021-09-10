import { create } from '@wix/fedops-logger';
import { Interactions } from './interactions';

export class Fedops {
  private logger;

  constructor() {
    this.logger = create('notifications-widget-component');
  }

  started = {
    widgetOpen: () => this.logger.interactionStarted(Interactions.WIDGET_OPEN),
    markAllAsRead: () => this.logger.interactionStarted(Interactions.MARK_ALL_AS_SEEN)
  };

  ended = {
    widgetOpen: () => this.logger.interactionEnded(Interactions.WIDGET_OPEN),
    markAllAsRead: () => this.logger.interactionEnded(Interactions.MARK_ALL_AS_SEEN)
  };

  appLoaded() {
    this.logger.appLoaded();
  }
}
