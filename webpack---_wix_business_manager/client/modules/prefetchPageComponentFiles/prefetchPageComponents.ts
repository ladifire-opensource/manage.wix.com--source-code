import { prefetchMainPageComponentFiles } from './prefetchMainPageComponentFiles';
import { prefetchOtherFiles } from './prefetchOtherFiles';

export const prefetchPageComponents = (store) => {
  prefetchMainPageComponentFiles(store.getState());
  try {
    prefetchOtherFiles(store.getState());
  } catch (error) {
    console.error('prefetch modules\' files failed', error); // tslint:disable-line:no-console
  }
};
