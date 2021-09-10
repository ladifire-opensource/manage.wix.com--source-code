"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExploreProductsLazyComponent = void 0;
var tslib_1 = require("tslib");
var business_manager_api_1 = require("@wix/business-manager-api");
var componentName_1 = require("../../types/componentName");
var ExploreProductsLazyComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ExploreProductsLazyComponent, _super);
    function ExploreProductsLazyComponent(props) {
        var _this = this;
        var storeModule = business_manager_api_1.getModule(business_manager_api_1.ModuleId.Stores);
        var basicUrl = storeModule.getStoresBasicUrl();
        var debug = storeModule.getModuleParams().debug;
        var manifest = {
            files: [
                basicUrl + "registerExploreProductsComponent" + (debug ? '' : '.min') + ".css",
                basicUrl + "registerExploreProductsComponent.bundle" + (debug ? '' : '.min') + ".js",
            ],
            component: componentName_1.ComponentName.ExploreProducts,
            crossorigin: true,
        };
        _this = _super.call(this, props, manifest) || this;
        return _this;
    }
    return ExploreProductsLazyComponent;
}(window.ReactLazyComponent));
exports.ExploreProductsLazyComponent = ExploreProductsLazyComponent;
//# sourceMappingURL=ExploreProductsLazyComponent.js.map