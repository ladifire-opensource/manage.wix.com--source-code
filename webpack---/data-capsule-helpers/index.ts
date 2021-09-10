import { LocalStorageCachedCapsule, WixStorageStrategy } from 'data-capsule';

import { IState } from '../store/widget';

const DATA_CAPSULE_NAMESPACE = 'CHATBOT_WIDGET';
const WIDGET_DATA = 'WIDGET_DATA';
const MAX_AGE = 1000 * 60 * 60 * 24; // 24h due to tooltip hiding logic

export interface UserStorageType {
  getWidgetData: () => Promise<IState | undefined>;
  setWidgetData: (state: IState) => Promise<void>;
}

export function createUserStorage(): UserStorageType {
  const capsule = LocalStorageCachedCapsule({
    remoteStrategy: new WixStorageStrategy(),
    namespace: DATA_CAPSULE_NAMESPACE,
  });

  return {
    getWidgetData: async () => {
      try {
        const widgetData = await capsule.getItem(WIDGET_DATA);

        if (widgetData && Date.now() - widgetData.lastUpdated < MAX_AGE) {
          return widgetData;
        }
      } catch (error) {}

      return;
    },

    setWidgetData: async (state: IState) => {
      const value: Partial<IState> = {
        expanded: state.expanded,
        left: state.left,
        top: state.top,
        bottom: state.bottom,
        right: state.right,
        conversation_id: state.conversation_id,
        node_id: state.node_id,
        orig_page_name: state.orig_page_name,
        orig_platform: state.orig_platform,
        lang: state.lang,
        lastUpdated: state.lastUpdated,
        tooltip: state.tooltip,
      };

      try {
        await capsule.setItem(WIDGET_DATA, value, { expiration: 60 * 60 * 24 });
      } catch (error) {
        console.error('setWidgetData', error);
      }
    },
  };
}
