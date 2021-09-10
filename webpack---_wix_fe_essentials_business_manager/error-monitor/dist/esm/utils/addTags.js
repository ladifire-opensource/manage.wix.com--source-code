import { SENTRY_TAG_VALUE_LIMIT, SENTRY_TAG_NAME_LIMIT, TAG_WARNING_LIMIT, } from '../constants';
/**
 * Along with passing tags (sanitized to be all strings) we warn in case when tag name or value has incorrect size.
 *
 * @param scope
 * @param appName
 * @param tags
 */
export function addTags(scope, appName, tags) {
    if (appName === void 0) { appName = ''; }
    var sanitizedTags = sanitizeTags(tags, appName);
    Object.keys(sanitizedTags).forEach(function (tag) {
        // we do not use `scope.setTags()` cause it is not available in sentry@4 version
        scope.setTag(tag, sanitizedTags[tag]);
    });
}
export function sanitizeTags(tags, appName) {
    if (process.env.NODE_ENV === 'development') {
        warnInConsoleIfTagIsIncorrect(tags, appName);
    }
    return Object.keys(tags).reduce(function (acc, key) {
        var value = tags[key];
        if (value !== undefined) {
            acc[key] = String(value);
        }
        return acc;
    }, {});
}
function warnInConsoleIfTagIsIncorrect(tagsObject, appName) {
    if (appName === void 0) { appName = ''; }
    Object.keys(tagsObject).forEach(function (tagKey) {
        var tagValue = tagsObject[tagKey];
        if (tagKey.length >= SENTRY_TAG_NAME_LIMIT) {
            console.warn("ErrorMonitor::" + appName + ":: tag NAME is too long!\n\n " + tagKey);
        }
        var stringValues = typeof tagValue === 'object'
            ? JSON.stringify(tagValue)
            : String(tagValue);
        if (stringValues && stringValues.length >= SENTRY_TAG_VALUE_LIMIT) {
            var truncatedValue = truncateIfBiggerThen(tagValue, TAG_WARNING_LIMIT);
            console.warn("ErrorMonitor::" + appName + ":: tag VALUE is too long!\n\n " + tagKey + ": " + truncatedValue);
        }
    });
}
function truncateIfBiggerThen(value, length) {
    if (!value ||
        typeof value === 'boolean' ||
        typeof value === 'number' ||
        value.length <= length) {
        return value;
    }
    return value.substring(0, length) + '...';
}
//# sourceMappingURL=addTags.js.map