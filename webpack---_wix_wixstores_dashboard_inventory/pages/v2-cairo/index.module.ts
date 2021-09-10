import {ResolveFn} from '@wix/yoshi-flow-bm';
import {prefetchTranslations} from '@wix/cairo';

export const resolve: ResolveFn<{}> = async ({moduleParams, sentry: errorMonitor}) => {
  prefetchTranslations({errorMonitor})(moduleParams.accountLanguage);
};
