import { APNsPushId } from '../configs/backoffice';

export const isSafari = () => Boolean(window.safari?.pushNotification);

const getPermissionData = () => window.safari.pushNotification.permission(APNsPushId);

export const getBrowserNotificationsToken = () => getPermissionData()?.deviceToken;

export const getBrowserNotificationsPermission = () => getPermissionData()?.permission || 'denied';
