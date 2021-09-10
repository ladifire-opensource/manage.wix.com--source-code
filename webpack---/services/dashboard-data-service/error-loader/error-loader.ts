import { FlowAPIInstances } from 'yoshi-flow-bm-runtime';

export function loadAndShowError(i18n: FlowAPIInstances['i18n']) {
  import('./display-error').then(({ displayError }) => displayError(i18n));
}
