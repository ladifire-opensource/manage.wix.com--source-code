import { wixAxios } from '../utils/wix-axios';
import { GetNotificationsAPIResponse, MarkAsSeenAPIRequest, MarkAllAsReadAPIRequest, GetUserSettingsResponse, GetAlertsAPIResponse, GetNotificationsAPIQuery } from '@wix/notifications-widget-common/types/api';
import { createQueryStringFromObject } from '../utils/query-string';

export const getNotificationsForAllSites = async (query: Partial<GetNotificationsAPIQuery> = {}): Promise<GetNotificationsAPIResponse> => {
  return wixAxios
    .get(`/_api/notifications-widget-server/notifications${createQueryStringFromObject(query)}`)
    .then(response => response.data);
};

export const getAlertsForAllSites = async (): Promise<GetAlertsAPIResponse> => {
  return wixAxios
  .get(`/_api/notifications-widget-server/alerts`)
  .then(response => response.data);
};

export const getNotificationsForMetaSite = async (metaSiteId: string, query: Partial<GetNotificationsAPIQuery> = {}): Promise<GetNotificationsAPIResponse> => {
  return wixAxios
    .get(`/_api/notifications-widget-server/site/${metaSiteId}/notifications${createQueryStringFromObject(query)}`)
    .then(response => response.data);
};

export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
  return wixAxios
    .put(`/_api/notifications-widget-server/notifications/${notificationId}/read`)
    .then(response => response.data);
};

export const markNotificationAsUnread = async (notificationId: string): Promise<void> => {
  return wixAxios
    .put(`/_api/notifications-widget-server/notifications/${notificationId}/unread`)
    .then(response => response.data);
};

export const markSiteNotificationsAsSeen = async (metaSiteId: string, fromNotificationId: string): Promise<void> => {
  const markAsSeenRequest: MarkAsSeenAPIRequest = { fromNotificationId };
  return wixAxios
    .post(`/_api/notifications-widget-server/site/${metaSiteId}/notifications/seen`, markAsSeenRequest)
    .then(response => response.data);
};

export const markAllSitesNotificationsAsSeen = async (fromNotificationId: string): Promise<void> => {
  const markAsSeenRequest: MarkAsSeenAPIRequest = { fromNotificationId };
  return wixAxios
    .post(`/_api/notifications-widget-server/notifications/seen`, markAsSeenRequest)
    .then(response => response.data);
};

export const markAllNotificationsAsRead = async (fromNotificationId: string): Promise<void> => {
  const markAllAsReadReq: MarkAllAsReadAPIRequest = { fromNotificationId };
  return wixAxios
    .post(`/_api/notifications-widget-server/notifications/read`, markAllAsReadReq)
    .then(response => response.data);
};

export const markAllSiteNotificationsAsRead = async (metasiteId: string, fromNotificationId: string): Promise<void> => {
  const markAllAsReadReq: MarkAllAsReadAPIRequest = { fromNotificationId };
  return wixAxios
    .post(`/_api/notifications-widget-server/site/${metasiteId}/notifications/read`, markAllAsReadReq)
    .then(response => response.data);
};

export const deleteNotification = async (notificationId: string): Promise<void> => {
  return wixAxios
    .delete(`/_api/notifications-widget-server/notifications/${notificationId}`);
};

export const dismissAlert = async (notificationId: string): Promise<void> => {
  return wixAxios
  .put(`/_api/notifications-widget-server/alerts/${notificationId}/dismiss`)
  .then(response => response.data);
};

export const getUserSettings = async (): Promise<GetUserSettingsResponse> => {
  return wixAxios
    .get(`/_api/notifications-widget-server/user/settings`)
    .then(response => response.data);
};
