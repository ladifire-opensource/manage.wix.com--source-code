import { experimentsSelectors } from '@wix/wix-experiments-redux';
export var CollapsibleInnerMenuWithoutTitles = 'no-titles';
export var CollapsibleInnerMenu = 'titles';
export var selectIsCollapsible = function (state) {
    var innerMenuType = experimentsSelectors(state).get('specs.wosbm.useBmCollapsibleSidebar');
    return innerMenuType === CollapsibleInnerMenu || innerMenuType === CollapsibleInnerMenuWithoutTitles;
};
//# sourceMappingURL=select-is-collapsible.js.map