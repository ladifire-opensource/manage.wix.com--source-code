export const fedopsInit = (name) => {
  /* tslint:disable  no-bitwise no-empty*/
  window.fedops = window.fedops || {};
  window.fedops.apps = window.fedops.apps || {};
  window.fedops.apps[name] = {
    startLoadTime:
      window.performance && window.performance.now && window.performance.now(),
  };
  try {
    window.fedops.sessionId = window.localStorage.getItem(
      'fedops.logger.sessionId',
    );
  } catch (e) {}
  window.fedops.sessionId =
    window.fedops.sessionId ||
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  new Image().src = `//frog.wix.com/fed?appName=${name}&src=72&evid=14&session_id=${
    window.fedops.sessionId
  }&_=${Math.random().toString()}`;
  /* tslint:enable  */
};
