import * as Sentry from '@sentry/browser';

import {sentryOptions} from './sentry-options';

const sentryClient = new Sentry.BrowserClient(sentryOptions);

export const sentryHub = new Sentry.Hub(sentryClient);
