"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessManagerModule = exports.VELO_WRAPPER = void 0;
var tslib_1 = require("tslib");
var React = require("react");
var recompose_1 = require("recompose");
var module_registry_1 = require("react-module-container/dist/src/module-registry");
var withSuspense_1 = require("./withSuspense");
exports.VELO_WRAPPER = 'businessManager.VeloWrapper';
var BusinessManagerModule = /** @class */ (function () {
    function BusinessManagerModule(moduleId) {
        this._moduleParams = null;
        this.appDefId = null;
        this._moduleId = moduleId;
        this._moduleConfigurationId = moduleId;
    }
    BusinessManagerModule.prototype.registerPageComponent = function (pageComponentName, PageComponent) {
        module_registry_1.default.registerComponent(pageComponentName, function () { return withSuspense_1.withSuspense(PageComponent); });
    };
    BusinessManagerModule.prototype.registerComponentWithModuleParams = function (componentName, Component, _a) {
        var _this = this;
        var _b = (_a === void 0 ? {} : _a).suspense, suspense = _b === void 0 ? false : _b;
        module_registry_1.default.registerComponent(componentName, function () {
            var withModuleParams = recompose_1.defaultProps(_this._moduleParams);
            if (suspense) {
                return withSuspense_1.withSuspense(withModuleParams(Component));
            }
            return withModuleParams(Component);
        });
    };
    BusinessManagerModule.prototype.registerVeloComponent = function (componentName, options) {
        var _this = this;
        module_registry_1.default.registerComponent(componentName, function () { return function () { return React.createElement(module_registry_1.default.component(exports.VELO_WRAPPER), tslib_1.__assign({ moduleParams: _this._moduleParams, componentName: componentName }, options)); }; });
    };
    BusinessManagerModule.prototype.registerHostContainer = function (hostContainerId) {
        module_registry_1.default.invoke('businessManager.registerHostContainer', hostContainerId);
    };
    BusinessManagerModule.prototype.setModuleParams = function (moduleParams) {
        this._moduleParams = moduleParams;
    };
    BusinessManagerModule.prototype.setModuleConfigurationId = function (moduleConfigurationId) {
        this._moduleConfigurationId = moduleConfigurationId;
    };
    BusinessManagerModule.prototype.setAppEssentials = function (appEssentials) {
        this.appEssentials = appEssentials;
    };
    BusinessManagerModule.prototype.register = function (moduleParams) {
        // override with your implementation
    };
    BusinessManagerModule.prototype.init = function (moduleParams) {
        // override with your implementation
    };
    BusinessManagerModule.prototype.config = function (sourceModuleId, configPayload) {
        // override with your implementation
    };
    BusinessManagerModule.prototype.dispose = function () {
        // override with your implementation
    };
    Object.defineProperty(BusinessManagerModule.prototype, "moduleId", {
        get: function () {
            return this._moduleId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BusinessManagerModule.prototype, "moduleConfigurationId", {
        get: function () {
            return this._moduleConfigurationId;
        },
        enumerable: false,
        configurable: true
    });
    return BusinessManagerModule;
}());
exports.BusinessManagerModule = BusinessManagerModule;
//# sourceMappingURL=BusinessManagerModule.js.map