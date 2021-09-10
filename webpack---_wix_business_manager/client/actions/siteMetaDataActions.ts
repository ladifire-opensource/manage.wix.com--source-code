import { SiteMetaDataActionTypes } from '../actionTypes/siteMetaDataActionTypes';
import { Action } from 'redux';

export interface SetPrimarySiteLocale extends Action {
  type: SiteMetaDataActionTypes.SetPrimarySiteLocale;
  payload: string;
}

export const setPrimarySiteLocale = (locale: string): SetPrimarySiteLocale => ({ type: SiteMetaDataActionTypes.SetPrimarySiteLocale, payload: locale });
