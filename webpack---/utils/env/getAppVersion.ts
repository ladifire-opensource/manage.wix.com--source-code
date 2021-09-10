export function getAppVersion() {
  return window.__CI_APP_VERSION__.replace('-SNAPSHOT', '');
}
