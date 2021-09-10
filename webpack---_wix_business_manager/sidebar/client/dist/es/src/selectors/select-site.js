export var isSitelessExperience = function (state) { return !state.liveSite; };
var getSiteType = function (state) { return state.liveSite && state.liveSite.siteType; };
export var isHtmlSite = function (state) { return getSiteType(state) === 'HtmlWeb'; };
export var getEditorSiteId = function (state) { return state.liveSite && state.liveSite.editorSiteId; };
export var getEditorType = function (state) { var _a; return (_a = state.liveSite) === null || _a === void 0 ? void 0 : _a.editorType; };
export var getEditUrl = function (state) { return state.liveSite && state.liveSite.editUrl; };
//# sourceMappingURL=select-site.js.map