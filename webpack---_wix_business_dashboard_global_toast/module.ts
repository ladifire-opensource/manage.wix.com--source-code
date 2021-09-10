import { ModuleInitFn } from '@wix/yoshi-flow-bm';
import { runGlobalToasts } from './global-toast-service/global-toast-service';

export const init: ModuleInitFn = ({ moduleParams: { metaSiteId } }) => {
  runGlobalToasts({ metaSiteId });
};
