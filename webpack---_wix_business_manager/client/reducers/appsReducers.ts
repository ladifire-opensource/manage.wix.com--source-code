import { combineReducers } from 'redux';
import { IApp, IApps, IAppMarketDTO } from '../../common/types/app';
import * as types from '../actionTypes/appsActionTypes';

export function data(state = {}, action) {
  // initial state is the hardcoded apps which come from the server and are merged with the apps from metasite
  switch (action.type) {
    case types.FETCH_APPS_SUCCESS:
      const transformed = transformToApps(action.apps, state);
      return { ...state, ...transformed };
    default:
      return state;
  }
}

function transformToApps(appMarketDTOs: IAppMarketDTO[], appsFromState): IApps {
  const transformed = appMarketDTOs.map(transformAppMarketDTOToApp);
  return transformed.reduce((result, app) => {
    result[app.id] = { ...appsFromState[app.id], ...app };
    return result;
  }, {});
}

function transformAppMarketDTOToApp(appMarketDTO: IAppMarketDTO): IApp {
  return {
    id: appMarketDTO.appDefinitionId,
    editorComponentEssential: !appMarketDTO.editorCompNonEssential
  };
}

function loading(state = true, action): boolean {
  switch (action.type) {
    case types.FETCH_APPS_SUCCESS:
      return false;
    default:
      return state;
  }
}

export const apps = combineReducers({
  data,
  loading
});
