import { __assign } from "tslib";
import biLogger from '@wix/web-bi-logger';
export var BIEvent = {
    LOADING_STARTED: 1459,
    LOADING_FINISHED: 1460,
    SCRIPT_ERROR: 1461,
    COMPONENT_SHOWN: 1462
};
var getDefaultExtraBiFields = function (isFinishEvent) {
    if (isFinishEvent === void 0) { isFinishEvent = false; }
    return (__assign({ component_name: null, msid: null, component_app_id: null, hosting: null, view: null, sub_view: null, app_id: null }, (isFinishEvent && { loading_time_from_host_load: 0 })));
};
export var buildBiLoggerSubscriber = function (biSubscriberOptions) {
    var logger = biLogger
        .factory({ endpoint: 'dash' })
        .updateDefaults({ src: 5 })
        .logger();
    var startingLoadingTime;
    var errorState = false;
    var getExtraFields = biSubscriberOptions.getBiExtraFields ? biSubscriberOptions.getBiExtraFields : getDefaultExtraBiFields;
    return {
        onStartLoading: function () {
            startingLoadingTime = Date.now();
            logger.log(__assign({ evid: BIEvent.LOADING_STARTED, component_id: biSubscriberOptions.componentId, host_Id: biSubscriberOptions.wrapperContextId, state: 'normal' }, getExtraFields()));
        },
        onComponentShow: function () {
            logger.log(__assign({ evid: BIEvent.COMPONENT_SHOWN, component_id: biSubscriberOptions.componentId, host_Id: biSubscriberOptions.wrapperContextId, state: errorState ? 'error' : 'normal' }, getExtraFields()));
        },
        onFinishedLoading: function () {
            logger.log(__assign({ evid: BIEvent.LOADING_FINISHED, component_id: biSubscriberOptions.componentId, host_Id: biSubscriberOptions.wrapperContextId, state: 'normal', loading_time: Math.round(Date.now() - startingLoadingTime) }, getExtraFields(true)));
        },
        onError: function () {
            errorState = true;
            logger.log(__assign({ evid: BIEvent.SCRIPT_ERROR, component_id: biSubscriberOptions.componentId, host_Id: biSubscriberOptions.wrapperContextId, state: 'error' }, getExtraFields()));
        }
    };
};
//# sourceMappingURL=bi-logger.js.map