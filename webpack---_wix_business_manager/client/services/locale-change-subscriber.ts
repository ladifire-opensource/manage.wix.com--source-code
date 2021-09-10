import { Store } from 'redux';
import { IState } from '../types/store';
import { onUpdateBusinessSettings } from '@wix/business-settings-api';
import { setPrimarySiteLocale } from '../actions/siteMetaDataActions';

interface Settings {
  locale?: string;
  siteRegion?: string;
}

interface Response {
  settings?: Settings;
}

export const subscribeToLocaleChange = (store: Store<IState>) => {
  onUpdateBusinessSettings((response: Response) => {
    const siteRegion = response.settings?.siteRegion;
    if (siteRegion) {
      store.dispatch(setPrimarySiteLocale(siteRegion));
    }
  });
};
