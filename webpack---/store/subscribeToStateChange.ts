import { mount } from '../render/mount';
import { createWidgetIframe } from '../components/Widget';
import { UserStorageType } from '../data-capsule-helpers';
import { connect } from '.';

export const subscribeToStateChange = (userStorage: UserStorageType) => {
  const disconnect = connect('expanded', ({ expanded, isActiveSession }) => {
    if (expanded || isActiveSession) {
      mount([createWidgetIframe()]);
      disconnect();
    }
  });

  connect('lastUpdated', (state) => {
    if (state.isActiveSession || state.tooltip) {
      userStorage.setWidgetData(state);
    }
  });
};
