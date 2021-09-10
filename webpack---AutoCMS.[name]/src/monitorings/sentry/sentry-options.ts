import * as Sentry from '@sentry/browser';

import {
    isBO, isDevelopment, isProduction, isTesting
} from '@/utils/webpack-env';
import {isSentryIgnored} from '@/utils/sentry-ignorable-error';
import {isProductionSentry} from '@/utils/is-production-sentry';

const getSentryEnvironment = (): string => {
    if (isBO) {
        return 'start:bo';
    }

    if (isTesting) {
        return 'testing';
    }

    if (isDevelopment) {
        return 'development';
    }

    if (isProduction) {
        return 'production';
    }

    return 'unknown';
};

export const sentryOptions: Sentry.BrowserOptions = {
    dsn: 'https://e41bc3a9c6584d4eab1f69cda756b008@sentry.wixpress.com/187',
    release: process.env.APP_VERSION,
    environment: getSentryEnvironment(),
    beforeSend(event, hint) {
        const exception = hint?.originalException || hint?.syntheticException;
        const isIgnored = exception instanceof Error && isSentryIgnored(exception);

        if (!isProductionSentry()) {
            // don't send errors to sentry in non-production mode
            // eslint-disable-next-line no-console
            console.error(`Sentry error ${isIgnored ? ' (ignored)' : ''}`, exception);
            return null;
        }

        if (isIgnored) {
            return null;
        }

        return event;
    }
};
