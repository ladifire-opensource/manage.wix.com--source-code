export function baseUrl(isNewApi, maybeBaseUrl) {
    var maybeTestkitUrl = process.env.NODE_ENV === 'test' &&
        isNewApi &&
        process.env.EXPERIMENTS_TESTKIT_URL;
    return maybeBaseUrl || maybeTestkitUrl || '';
}
//# sourceMappingURL=base-url.js.map