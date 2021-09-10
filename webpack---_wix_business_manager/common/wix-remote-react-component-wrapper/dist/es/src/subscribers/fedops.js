import { create } from '@wix/fedops-logger';
export var buildFedopsSubscriber = function (_a) {
    var wrapperContextId = _a.wrapperContextId, componentId = _a.componentId;
    var componentFedopsLogger = create(componentId);
    var wrapperFedopsLogger = create(wrapperContextId);
    return {
        onStartLoading: function () {
            componentFedopsLogger.clearResourceTimings(); // Untested: Testkit doesn't expose anything for this. Based on BM page component fedops flow.
            componentFedopsLogger.appLoadStarted();
            wrapperFedopsLogger.interactionStarted(componentId);
        },
        onFinishedLoading: function () {
            componentFedopsLogger.appLoaded();
            wrapperFedopsLogger.interactionEnded(componentId);
        }
    };
};
//# sourceMappingURL=fedops.js.map