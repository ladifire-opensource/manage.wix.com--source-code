import { __assign } from "tslib";
import { getScaleToFillImageURL } from 'image-client-api/dist/imageClientSDK';
var getURI = function (iconURL) { return iconURL && iconURL.split('/').pop(); };
var defaultOptions = {
    originalWidth: 1000,
    originalHeight: 1000,
    toWidth: 54,
    toHeight: 54,
};
export var getClientImageURL = function (iconURL, options) {
    if (options === void 0) { options = defaultOptions; }
    var _options = __assign(__assign({}, defaultOptions), options);
    var originalWidth = _options.originalWidth, originalHeight = _options.originalHeight, toWidth = _options.toWidth, toHeight = _options.toHeight;
    return getScaleToFillImageURL(getURI(iconURL), originalWidth, originalHeight, toWidth, toHeight);
};
//# sourceMappingURL=getClientImageURL.js.map