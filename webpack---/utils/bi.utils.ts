export const getDashboardModuleLoadedTime = (msid: string): number =>
  // @ts-ignore: suppressImplicitAnyIndexErrors
  window[`dashboard-module-loaded-new-${msid}`];

export const setDashboardModuleLoadedTime = (msid: string): void => {
  // @ts-ignore: suppressImplicitAnyIndexErrors
  window[`dashboard-module-loaded-new-${msid}`] = Date.now();
};

/*
  BI wants loading_time_from_start similar to how it is done in event 302 directly in business manager.
  the above code is similar to this:
  https://github.com/wix-private/business-manager/blob/master/business-manager-web/src/client/modules/pageComponentLifecycle/PageComponentLifecycleBI.ts#L195
*/
export const getTimeSinceBiStart = (timeSincePageLoad: number) => {
  // @ts-ignore: suppressImplicitAnyIndexErrors
  const biStartTime = window.__bi_performance_start_time__;
  return Math.round(timeSincePageLoad - biStartTime);
};
