import * as _ from 'lodash';

export function executeSdkWorkAround() {
  const fakeWix: any = {
    getSiteInfo: () => ({ baseUrl: 'http://www.wix.com' }),
    Dashboard: {
      getEditorUrl: () => undefined
    },
    Utils: {
      getViewMode: () => 'dashboard',
      getInstanceValue: () => undefined
    },
    Performance: {
      applicationLoaded: () => undefined,
      reportApplicationLoadingStep: () => undefined
    }
  };

  window['Wix'] = _.merge(fakeWix, window['Wix'] || {});
}
