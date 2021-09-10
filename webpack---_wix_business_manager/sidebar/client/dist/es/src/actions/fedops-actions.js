export var reportAppLoaded = function () {
    return function (dispatch, getState, _a) {
        var fedopsLogger = _a.fedopsLogger;
        fedopsLogger.appLoaded();
    };
};
//# sourceMappingURL=fedops-actions.js.map