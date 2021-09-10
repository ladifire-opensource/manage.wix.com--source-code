import { TSiteMetaData } from '../../common/types/site';
import { SetPrimarySiteLocale } from '../actions/siteMetaDataActions';
import { Reducer } from 'redux';
import { SiteMetaDataActionTypes } from '../actionTypes/siteMetaDataActionTypes';

export const siteMetaData: Reducer<TSiteMetaData> = (state = null, action: SetPrimarySiteLocale) => {
  switch (action.type) {
    case SiteMetaDataActionTypes.SetPrimarySiteLocale:
      const primarySiteLocale = action.payload;
      return { ...state, primarySiteLocale };
    default:
      return state;
  }
};
