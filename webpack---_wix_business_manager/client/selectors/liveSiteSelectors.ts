import { IState } from '../types/store';
import { SiteType } from '../../common/types/site';
import { EditorType } from '@wix/business-manager-api';

export const getLiveSiteEditUrl = (state: IState): string => {
  const msid = state.siteMetaData.metaSiteId;
  return `/editor/${ msid }`;
};
export const getLiveSiteViewUrl = (state: IState): string => state.liveSite && state.liveSite.viewUrl;
export const getIsFlashSite = (state: IState): boolean => state.liveSite && state.liveSite.siteType === SiteType.FLASH;
export const getIsLiveSitePublished = (state: IState): boolean => state.liveSite && state.liveSite.published;
export const getEditorType = (state: IState): EditorType => state.liveSite && state.liveSite.editorType;
export const getLiveSiteType = (state: IState): SiteType => state.liveSite && state.liveSite.siteType;
export const getEditorSiteId = (state: IState): string => state.liveSite && state.liveSite.editorSiteId;
export const isADIEditorType = (state: IState): boolean => !!state.liveSite && state.liveSite.editorType === EditorType.ADI;
export const hasLiveSite = (state: IState): boolean => !!getEditorSiteId(state);
