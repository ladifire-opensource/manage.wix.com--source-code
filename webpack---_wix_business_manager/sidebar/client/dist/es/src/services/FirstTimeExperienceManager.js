import { __awaiter, __generator } from "tslib";
import { LocalStorageCachedCapsule, WixStorageStrategy } from 'data-capsule';
export var BM_SIDEBAR_BACKBUTTON_NAMESPACE = 'businessManager.Sidebar.BackButton';
export var userClickedBackButtoneCapsuleKey = 'user-clicked-back-button';
var FirstTimeExperienceManager = /** @class */ (function () {
    function FirstTimeExperienceManager(capsule) {
        this.buttonClickedCapsule = capsule ? capsule :
            LocalStorageCachedCapsule({
                remoteStrategy: new WixStorageStrategy(),
                namespace: BM_SIDEBAR_BACKBUTTON_NAMESPACE
            });
        this.capsuleValue = this.getCapsuleValue();
    }
    FirstTimeExperienceManager.prototype.getCapsuleValue = function () {
        return this.buttonClickedCapsule.getItem(userClickedBackButtoneCapsuleKey).catch(function () { return 'false'; });
    };
    FirstTimeExperienceManager.prototype.setNotFirstTime = function () {
        return this.buttonClickedCapsule.setItem(userClickedBackButtoneCapsuleKey, 'true');
    };
    FirstTimeExperienceManager.prototype.isFirstTime = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.capsuleValue];
                    case 1: return [2 /*return*/, (_a.sent()) !== 'true'];
                }
            });
        });
    };
    return FirstTimeExperienceManager;
}());
export { FirstTimeExperienceManager };
//# sourceMappingURL=FirstTimeExperienceManager.js.map