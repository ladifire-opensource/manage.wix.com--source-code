"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureHttpClient = void 0;
var axios_1 = require("axios");
var wix_axios_config_1 = require("@wix/wix-axios-config/dist/src/wix-axios-config");
var http_1 = require("./http");
exports.configureHttpClient = function (endpointUrl, instanceOrResolver) {
    wix_axios_config_1.default(axios_1.default, { baseURL: endpointUrl });
    return new http_1.WixStoresHttp(instanceOrResolver, axios_1.default);
};
//# sourceMappingURL=http-client.js.map