"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlParser = void 0;
var URI = require("urijs");
var UrlParser = /** @class */ (function () {
    function UrlParser(urlString) {
        this.urlString = urlString;
    }
    UrlParser.prototype.generate = function (templateParams, queryParams) {
        if (templateParams === void 0) { templateParams = {}; }
        if (queryParams === void 0) { queryParams = {}; }
        var urlWithParsedTemplateParams = this.urlString.replace(/{(\w+)}/g, function (_, k) {
            return templateParams[k];
        });
        var url = new URI(urlWithParsedTemplateParams);
        url.setQuery(queryParams);
        return url.href();
    };
    return UrlParser;
}());
exports.UrlParser = UrlParser;
//# sourceMappingURL=url-parser.js.map