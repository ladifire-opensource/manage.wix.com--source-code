export function calculateAppEnvironment() {
    var hostname = window.location.hostname;
    var userAgent = window.navigator.userAgent;
    var cookie = window.document.cookie;
    // https://github.com/wix-private/sled/blob/c07286aac964a5acc4a1cb1e8c213c3b1fc0bf5d/packages/sled-test-runner/src/jest-runtime/lib/sled-global.ts#L134
    var isSled = /(^|;)automation=sled:/.test(cookie);
    var isLocalhost = /localhost|127\.0\.0\.1|::1|\.local|local.wix.com|^$/i.test(hostname);
    var isBot = /Googlebot|AdsBot-Google-Mobile|bingbot|BingPreview|facebookexternalhit|Baiduspider|YandexBot/i.test(userAgent);
    var isNotValidUserAgent = /BonEcho|NewsGator|SeaMonkey|iTunes|Epiphany|Konqueror|Sleipnir|IceWeasel/i.test(userAgent);
    switch (true) {
        case process.env.NODE_ENV === 'development' || isLocalhost:
            return 'development';
        case isBot:
            return 'bot';
        case isNotValidUserAgent:
            return 'invalid_useragent';
        case isSled:
            return 'sled';
        default:
            return 'production';
    }
}
//# sourceMappingURL=calculateAppEnvironment.js.map