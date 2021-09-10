import { axiosInstance } from '../utils/axiosInstance';
import * as types from '../actionTypes/appsActionTypes';
import { IAppMarketDTO } from '../../common/types/app';
import { getEmbeddedServicesIds } from '../selectors/embeddedServicesSelectors';
import { chunk, flatten } from 'lodash';

export const APP_MARKET_QUERY_FIELDS = 'appDefinitionId,name,teaser,svgIcon,hasDashboard,editorCompNonEssential';

const getAppsData = (apps: string[]): Promise<IAppMarketDTO[]> => {
  const url = `/_api/app-market-api/apps/dashboard?q=${apps.join(',')}&fields=${APP_MARKET_QUERY_FIELDS}`;
  return axiosInstance.get(url).then(res => res.data);
};

const MAX_CHUNK_SIZE = 20;

export function fetchApps() {
  return (dispatch, getState) => {
    const fetchAppIds = getEmbeddedServicesIds(getState());

    return Promise.all(chunk(fetchAppIds, MAX_CHUNK_SIZE).map(getAppsData))
      .then(flatten)
      .then((apps: IAppMarketDTO[]) => dispatch(fetchAppsSuccess(apps)));
  };
}

export function fetchAppsSuccess(apps: IAppMarketDTO[]) {
  return {
    type: types.FETCH_APPS_SUCCESS,
    apps
  };
}
