type HistoryInterceptor = (cb: () => void) => Function;
type HistoryFnName = 'pushState' | 'replaceState';
const createHistoryInterceptor = (
  fnName: HistoryFnName,
): HistoryInterceptor => {
  return (callback) => {
    const oldHandler = window.history[fnName];
    let active = true;
    window.history[fnName] = (...args) => {
      const res = oldHandler.apply(window.history, args);
      if (active) {
        callback();
      }
      return res;
    };
    return () => {
      active = false;
    };
  };
};

export const onPushState: HistoryInterceptor = createHistoryInterceptor(
  'pushState',
);
export const onReplaceState: HistoryInterceptor = createHistoryInterceptor(
  'replaceState',
);

export const onPopState: HistoryInterceptor = (cb) => {
  let active = true;
  const originalPopStateHandler = window.onpopstate;
  window.onpopstate = (ev: PopStateEvent) => {
    if (typeof originalPopStateHandler === 'function') {
      originalPopStateHandler.call(window, ev);
    }
    if (active) {
      cb();
    }
  };
  return () => {
    active = false;
  };
};
