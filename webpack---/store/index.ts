import createStoreon from 'storeon';

import { widgetModule, IState, IEvents } from './widget';

type TKey = keyof IState;
type TConnectCallback = (state: IState) => void;
type TConnect = (key: TKey, cb: TConnectCallback) => () => void;

interface ISubs {
  key: TKey;
  cb: TConnectCallback;
}

let subs: ISubs[] = [];

const { on, get, dispatch } = createStoreon<IState, IEvents>([widgetModule]);

const connect: TConnect = (key, cb) => {
  subs.push({ key, cb });

  return () => {
    subs = subs.filter((s) => s.cb !== cb);
  };
};

const bind: TConnect = (key, cb) => {
  requestAnimationFrame(() => {
    cb(get());
  });

  return connect(key, cb);
};

on('@changed', (state, diff) => {
  subs.forEach((s) => {
    if (s.key in diff) {
      s.cb(state);
    }
  });
});

export { get as getState, dispatch, connect, bind };
