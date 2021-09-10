import { IApp } from '../../common/types/app';
import { IState } from '../types/store';

export function getAppById(state: IState, appId): IApp {
  let app: IApp;
  if (state && state.apps && state.apps.data[appId]) {
    app = state.apps.data[appId];
  } else {
    app = null;
  }

  return app;
}
