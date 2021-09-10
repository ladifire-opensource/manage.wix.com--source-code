export const APP_ROUTE = '/badge-definitions';

export const IMAGE_ROUTE = (path: string) => `https://static.wixstatic.com/${path}`;

export const AUTOMATIONS_COUNT_ROUTE = () => '/rules/search';

export const BADGES_ROUTE = () => '/';
export const NEW_BADGE_ROUTE = () => `/new`;
export const BADGE_SETTINGS_ROUTE = (id: string = ':id') => `/${id}/edit`;
export const BADGE_MEMBERS_ROUTE = (id: string = ':id') => `/${id}/members`;
export const BADGE_PERMISSIONS_ROUTE = (id: string = ':id') => `/${id}/permissions`;

export const API_BADGES_ROUTE = () => '/badges';
export const API_BADGE_ROUTE = (id: string = ':id') => `/badges/${id}`;
export const API_BADGE_MEMBERS_ROUTE = (id: string = ':id') => `/badges/${id}/members`;
export const API_BADGE_REMOVE_MEMBERS_ROUTE = (id: string = ':id') => `/badges/${id}/members/bulk-remove`;

export const API_MEMBERS_GROUPS_ROUTE = (id: string = ':id') => `/groups/${id}`;
export const API_MEMBERS_GROUPS_COUNT_ROUTE = () => '/groups/count';
export const API_MEMBERS_GROUPS_ROLE_MEMBERS_ROUTE = (id: string = ':id') => `/groups/${id}/users`;
export const API_MEMBERS_GROUPS_REMOVE_USERS_ROUTE = (id: string = ':id') => `/groups/${id}/users/delete`;
export const API_MEMBERS_GROUPS_LIST_PERMISSIONS_ROUTE = (id: string = ':id') => `/groups/${id}/permissions`;
export const API_MEMBERS_GROUPS_LIST_MEMBERS_ROLES_ROUTE = () => '/groups/users/listGroups';

export const API_MEMBER_PERMISSIONS_GET_PERMISSIONS_ROUTE = () => `/editorPermissionsConfig`;

export const API_MEMBERS_QUERY_ROUTE = () => '/members/query';
