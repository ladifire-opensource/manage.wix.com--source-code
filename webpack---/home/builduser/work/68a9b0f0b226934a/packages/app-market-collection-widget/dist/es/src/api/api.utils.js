function calculateApiHostname() {
    var _a, _b, _c, _d, _e, _f;
    var isLocalEnv = (_b = (_a = window === null || window === void 0 ? void 0 : window.location) === null || _a === void 0 ? void 0 : _a.hostname) === null || _b === void 0 ? void 0 : _b.includes('local');
    var isBrandWix = ((_d = (_c = window === null || window === void 0 ? void 0 : window.location) === null || _c === void 0 ? void 0 : _c.hostname) === null || _d === void 0 ? void 0 : _d.includes('wix')) && !isLocalEnv;
    var isBrandEditorX = ((_f = (_e = window === null || window === void 0 ? void 0 : window.location) === null || _e === void 0 ? void 0 : _e.hostname) === null || _f === void 0 ? void 0 : _f.includes('editorx')) && !isLocalEnv;
    if (isBrandWix || isBrandEditorX) {
        return window.location.hostname;
    }
    return 'www.wix.com';
}
export { calculateApiHostname };
//# sourceMappingURL=api.utils.js.map