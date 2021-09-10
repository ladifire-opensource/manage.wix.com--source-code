import { useBi } from '@wix/yoshi-flow-bm';
import { Logger } from '@wix/bi-logger-suggestions-widget';

export const useSuggestionsBILogger = () => useBi() as Logger;

export * from './types';
export * from './events';
export * from './utils';
