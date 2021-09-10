import { IState } from '../types/store';

export const getMetaSiteId = (state: IState): string =>  state.siteMetaData.metaSiteId;
export const getSiteName = (state: IState): string => state.siteMetaData.name;
export const getSiteOwnerId = (state: IState): string => state.siteMetaData.ownerId;
export const getSiteRoles = (state: IState): string[] => state.siteMetaData.roles;
export const getSiteRolesString = (state: IState): string => state.siteMetaData.roles ? state.siteMetaData.roles.join(',') : '';
export const getIsSiteOwner = (state: IState): boolean => state.siteMetaData.isOwner;
export const getIsBlockedSite = (state: IState): boolean => state.siteMetaData.blocked;
export const getSitePermissions = (state: IState): string[] => state.siteMetaData.permissions;
export const hasPermissions = (state: IState, permission): boolean => {
  return getIsSiteOwner(state) || getSitePermissions(state).includes(permission);
};
export const getPrimarySiteLocale = ({ siteMetaData }: IState): string => siteMetaData.primarySiteLocale;
