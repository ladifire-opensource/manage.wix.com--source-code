"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariantsModalLazyComponent = void 0;
var tslib_1 = require("tslib");
var componentName_1 = require("../../types/componentName");
var business_manager_api_1 = require("@wix/business-manager-api");
var ProductVariantsModalLazyComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ProductVariantsModalLazyComponent, _super);
    function ProductVariantsModalLazyComponent(props) {
        var _this = this;
        var manifest = {
            files: getManifestFileList(),
            component: componentName_1.ComponentName.ProductVariantsModal,
            crossorigin: true,
        };
        _this = _super.call(this, props, manifest) || this;
        return _this;
    }
    return ProductVariantsModalLazyComponent;
}(window.ReactLazyComponent));
exports.ProductVariantsModalLazyComponent = ProductVariantsModalLazyComponent;
function getManifestFileList() {
    var storeModule = business_manager_api_1.getModule(business_manager_api_1.ModuleId.Stores);
    var basicUrl = storeModule.getStoresBasicUrl();
    var debug = storeModule.getModuleParams().debug;
    return [
        basicUrl + "registerProductVariantsModalComponent" + (debug ? '' : '.min') + ".css",
        basicUrl + "registerProductVariantsModalComponent.bundle" + (debug ? '' : '.min') + ".js",
    ];
}
//# sourceMappingURL=ProductVariantsModalLazyComponent.js.map