var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { ReactLoadableComponent } from 'react-module-container';
import { BusinessManagerModule, PageComponentId, registerModule, ModuleId, registerPageComponentMonitors, notifyViewStartLoading, } from '@wix/business-manager-api';
import { setI18n } from './i18n';
import Experiments from '@wix/wix-experiments';
import { videoFirstFrame } from './constants/preload-video';
var experimentsInstance = new Experiments();
var ShareitModule = /** @class */ (function (_super) {
    __extends(ShareitModule, _super);
    function ShareitModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShareitModule.prototype.register = function (moduleParams) {
        var _this = this;
        var errorMonitor = this.appEssentials.createErrorMonitor({
            dsn: 'https://ceec4ebab961478c9ad8b8689f716d3d@sentry.wixpress.com/211',
        });
        var httpClient = this.appEssentials.httpClient;
        var i18nBaseConfig = {
            locale: moduleParams.accountLanguage || moduleParams.locale,
            baseUrl: moduleParams.config.topology.staticsUrl,
            translations: [],
        };
        this.registerPageComponent(PageComponentId.ShareitWeb, ReactLoadableComponent(PageComponentId.ShareitWeb, function () { return __awaiter(_this, void 0, void 0, function () {
            var baseURL, _a, _b, actionableIntents, entries, fromScratchIntents, intentContentTranslations, hasPosts, component, experiments, i18n;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        notifyViewStartLoading(PageComponentId.ShareitWeb);
                        baseURL = "https://" + window.location.host + "/_api/promote-insights-public";
                        return [4 /*yield*/, Promise.all([
                                httpClient.get("v3/intents/home-page?provideFromScratchIntents=true&provideDefaultIntents=true&diffFromUTC=" + (new Date().getTimezoneOffset() / 60) * -1 + "&getHasPosts=true", { baseURL: baseURL }),
                                import('./app'),
                                httpClient.get(videoFirstFrame),
                                experimentsInstance.load('promote-spw'),
                            ])];
                    case 1:
                        _a = _c.sent(), _b = _a[0].data, actionableIntents = _b.targetedActionableIntents, entries = _b.entries, fromScratchIntents = _b.fromScratchIntents, intentContentTranslations = _b.intentContentTranslations, hasPosts = _b.hasPosts, component = _a[1];
                        experiments = experimentsInstance.all();
                        return [4 /*yield*/, setI18n(__assign(__assign({}, i18nBaseConfig), { translations: intentContentTranslations, experiments: experiments }))];
                    case 2:
                        i18n = _c.sent();
                        return [2 /*return*/, {
                                default: component.default,
                                experiments: experiments,
                                httpClient: httpClient,
                                errorMonitor: errorMonitor,
                                i18n: i18n,
                                baseURL: baseURL,
                                actionableIntents: actionableIntents,
                                entries: entries,
                                fromScratchIntents: fromScratchIntents,
                                intentContentTranslations: intentContentTranslations,
                                hasPosts: hasPosts,
                            }];
                }
            });
        }); }));
        registerPageComponentMonitors(PageComponentId.ShareitWeb, {
            errorMonitor: errorMonitor,
        });
    };
    return ShareitModule;
}(BusinessManagerModule));
registerModule(ModuleId.ShareitWeb, ShareitModule);
