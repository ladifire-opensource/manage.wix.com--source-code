import { ModuleInitFn } from '@wix/yoshi-flow-bm';
import { registerNotesContactsActionsConfig } from './init-module';

export const init: ModuleInitFn = () => {
  registerNotesContactsActionsConfig();
};
