"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionModalLazyComponent = void 0;
var tslib_1 = require("tslib");
var componentName_1 = require("../../types/componentName");
var business_manager_api_1 = require("@wix/business-manager-api");
var PromotionModalLazyComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PromotionModalLazyComponent, _super);
    function PromotionModalLazyComponent(props) {
        var _this = this;
        var manifest = {
            files: getManifestFileList(),
            component: componentName_1.ComponentName.PromotionModal,
            crossorigin: true,
        };
        _this = _super.call(this, props, manifest) || this;
        return _this;
    }
    return PromotionModalLazyComponent;
}(window.ReactLazyComponent));
exports.PromotionModalLazyComponent = PromotionModalLazyComponent;
function getManifestFileList() {
    var storeModule = business_manager_api_1.getModule(business_manager_api_1.ModuleId.Stores);
    var basicUrl = storeModule.getStoresBasicUrl();
    var debug = storeModule.getModuleParams().debug;
    return [
        basicUrl + "registerPromotionModalComponent" + (debug ? '' : '.min') + ".css",
        basicUrl + "registerPromotionModalComponent.bundle" + (debug ? '' : '.min') + ".js",
    ];
}
//# sourceMappingURL=PromotionModalLazyComponent.js.map