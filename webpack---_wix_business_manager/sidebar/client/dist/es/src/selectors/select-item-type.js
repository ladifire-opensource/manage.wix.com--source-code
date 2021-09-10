import { selectNode } from './select-node';
export var SidebarComponentsTypes = {
    link: 'LINK',
    title: 'TITLE',
    separator: 'SEPARATOR',
    category: 'CATEGORY'
};
export var selectItemType = function (state, id) { return selectNodeType(selectNode(state, id)); };
export var selectNodeType = function (node) {
    if (node.subItemIds.length > 0) {
        return SidebarComponentsTypes.category;
    }
    if (node.paths) {
        return SidebarComponentsTypes.link;
    }
    if (node.label) {
        return SidebarComponentsTypes.title;
    }
    return SidebarComponentsTypes.separator;
};
export var isSeparator = function (node) { return node && selectNodeType(node) === SidebarComponentsTypes.separator; };
export var isLink = function (node) { return node && selectNodeType(node) === SidebarComponentsTypes.link; };
export var isCategory = function (node) { return node && selectNodeType(node) === SidebarComponentsTypes.category; };
export var isTitle = function (node) { return node && selectNodeType(node) === SidebarComponentsTypes.title; };
export var selectTooltipContent = function (state, id) {
    return selectNode(state, id).tooltip;
};
export var isEnabledLink = function (state) { return function (id) {
    var node = selectNode(state, id);
    return node && node.enabled && !!node.paths;
}; };
//# sourceMappingURL=select-item-type.js.map