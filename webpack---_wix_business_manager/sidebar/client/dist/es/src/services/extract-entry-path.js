import * as URI from 'urijs';
import * as Sentry from '@sentry/browser';
export var extractEntryPath = function (fullPath) {
    if (fullPath) {
        var entry = void 0;
        try {
            var entryUri = URI(fullPath).segment(0, '').segment(0, '').removeQuery('debug');
            entry = URI.decode(entryUri.toString());
        }
        catch (error) {
            Sentry.captureException(error);
            return;
        }
        if (entry && entry.startsWith('/')) {
            entry = entry.slice(1);
        }
        if (entry && entry.endsWith('/')) {
            return entry.slice(0, -1);
        }
        return entry;
    }
    return;
};
//# sourceMappingURL=extract-entry-path.js.map