import artifactVersion from '../../artifact-version';

export const firebaseConfig = {
  apiKey: 'AIzaSyB3N--ERgl49X9uQWI23x5tukPZpgl6pRk',
  authDomain: 'wix-ping-notification.firebaseapp.com',
  databaseURL: 'https://wix-ping-notification.firebaseio.com',
  projectId: 'wix-ping-notification',
  storageBucket: 'wix-ping-notification.appspot.com',
  messagingSenderId: '257704878507',
  appId: '1:257704878507:web:740846cb3b487805d032ee',
};

export const allowedUrlPrefixes = [
  'https://www.wix.com/',
  'https://manage.wix.com/',
];
export const locationHref = typeof location === 'undefined' ? '' : location.href;
export const getCurrentUrlPrefix = (prefixes: string[]) => prefixes.find(prefix => locationHref.startsWith(prefix)) || `<Disallowed Url Prefix in ${locationHref}>`;
export const serviceWorkerUrl = `${getCurrentUrlPrefix(allowedUrlPrefixes)}_partials/browser-notifications-client/${artifactVersion}/wix-ping-fcm-service-worker.bundle.min.js`;

export const firebasePublicKey =
  'BL9O0drViaP9kr7Dn6TVQLQt-4T7rWtA0Z7O7InSHtNW9BGrNXxmdGEXhRUixKxC-sbskQG7dpAn7U6r7fVhU64';

export const pingNotificationsApp = 'WixBrowserNotifications';

export const APNsWebServiceURL = 'https://www.wix.com/_api/ping/push-notifications/safari';
export const APNsPushId = 'web.com.wix.browser-notifications';
