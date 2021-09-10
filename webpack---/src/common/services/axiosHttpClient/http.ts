"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.WixStoresHttp = exports.Http = void 0;
var _ = require("lodash");
var url_parser_1 = require("./url-parser");
var Http = /** @class */ (function () {
    function Http(httpTransport) {
        this.httpTransport = httpTransport;
    }
    Http.prototype.post = function (urlTamplate, data, options) {
        if (options === void 0) { options = {}; }
        var parsedUrl = new url_parser_1.UrlParser(urlTamplate).generate(options.templateParams, options.queryParams);
        var headers = this.getBaseHeaders();
        return this.httpTransport.post(parsedUrl, data, { headers: headers });
    };
    Http.prototype.get = function (url, options) {
        if (options === void 0) { options = {}; }
        var queryParams = _.merge({}, options.queryParams, { cacheKiller: Date.now() });
        var parsedUrl = new url_parser_1.UrlParser(url).generate(options.templateParams, queryParams);
        var headers = this.getBaseHeaders();
        return this.httpTransport.get(parsedUrl, { headers: headers });
    };
    Http.prototype.delete = function (url, options) {
        if (options === void 0) { options = {}; }
        var parsedUrl = new url_parser_1.UrlParser(url).generate(options.templateParams, options.queryParams);
        var headers = this.getBaseHeaders();
        return this.httpTransport.delete(parsedUrl, { headers: headers });
    };
    Http.prototype.patch = function (urlTamplate, data, options) {
        if (options === void 0) { options = {}; }
        var parsedUrl = new url_parser_1.UrlParser(urlTamplate).generate(options.templateParams, options.queryParams);
        var headers = this.getBaseHeaders();
        return this.httpTransport.patch(parsedUrl, data, { headers: headers });
    };
    return Http;
}());
exports.Http = Http;
var WixStoresHttp = /** @class */ (function (_super) {
    __extends(WixStoresHttp, _super);
    function WixStoresHttp(instanceOrResolver, httpTransport) {
        var _this = _super.call(this, httpTransport) || this;
        _this.instanceOrResolver = instanceOrResolver;
        _this.httpTransport = httpTransport;
        return _this;
    }
    WixStoresHttp.prototype.getInstance = function () {
        if (typeof this.instanceOrResolver === 'string') {
            return this.instanceOrResolver;
        }
        return this.instanceOrResolver();
    };
    WixStoresHttp.prototype.getBaseHeaders = function () {
        var instance = this.getInstance();
        return {
            Authorization: instance,
            'Content-Type': 'application/json; charset=utf-8'
        };
    };
    return WixStoresHttp;
}(Http));
exports.WixStoresHttp = WixStoresHttp;
//# sourceMappingURL=http.js.map