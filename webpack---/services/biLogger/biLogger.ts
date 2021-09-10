import webBiLogger from '@wix/web-bi-logger';
import { biEventsMap } from './biConstants';
import {
  getCurrentSubView,
  getCurrentView,
  getInstanceId,
  getMetasiteId,
} from '../BusinessManagerService';
import { WidgetTab } from '../../components/SiteLevelWidgetContent/SiteLevelWidgetContent';
import { WidgetView } from '../../components/WidgetLoader/WidgetLoader';

const lazyLogger = new (class {
  private logger;
  private readonly defaults = () => ({
    src: 5,
    app_instance_id: getInstanceId(),
    msid: getMetasiteId(),
  });

  private getLogger() {
    if (!this.logger) {
      this.logger = webBiLogger.factory({ endpoint: 'engage' }).logger();
    }
    return this.logger;
  }

  log(biData) {
    return this.getLogger().log({ ...this.defaults(), ...biData });
  }
})();

export const createBiLogForClick = (clickableName: string) => {
  return lazyLogger.log({
    ...biEventsMap.BUTTON_CLICKED,
    button_name: clickableName,
  });
};

export const createBiLogForToggleWidget = (
  isOpen: boolean,
  view: WidgetView,
) => {
  return lazyLogger.log({
    ...biEventsMap.WIDGET_ICON_CLICKED,
    view: view === 'site_level' ? getCurrentView() : 'sites-list',
    sub_view: view === 'site_level' ? getCurrentSubView() : undefined,
    state: isOpen ? 'open' : 'close',
  });
};

export const createBiLogForToggleVisitorsList = (
  selection: 'more' | 'less',
  numberOfVisitors: number,
) => {
  return lazyLogger.log({
    ...biEventsMap.TOGGLE_VISITORS_LIST,
    selection,
    origin: 'web',
    num_of_online_users: numberOfVisitors,
  });
};

export type MarkAllAsReadSource = WidgetTab | 'sites_list';

export const createBiLogForMarkAllAsRead = (source: MarkAllAsReadSource) => {
  const biSources = {
    this_site: 'topbar.this-site',
    all_sites: 'topbar.all-sites',
    sites_list: 'topbar.sites-list',
  };
  return lazyLogger.log({
    ...biEventsMap.MARK_ALL_AS_READ_CLICKED,
    button_name: 'mark all as read',
    origin: 'web',
    source: biSources[source],
  });
};
