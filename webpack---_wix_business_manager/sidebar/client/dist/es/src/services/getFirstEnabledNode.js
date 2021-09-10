import { ROOT_ENTRY_ID } from './convert-entries-to-nodes';
var isLinkNode = function (node) { return !!node.navigateToConfig; };
var isCategoryNode = function (node) { return !!node.subItemIds.length; };
export var getFirstEnabledNode = function (sidebarNodes) {
    var getFirstEnabledSubItem = function (category) {
        var firstEnabledNodeId = category.subItemIds
            .filter(function (nodeId) { return isLinkNode(sidebarNodes[nodeId]) || isCategoryNode(sidebarNodes[nodeId]); })
            .find(function (nodeId) { return sidebarNodes[nodeId].enabled; });
        return sidebarNodes[firstEnabledNodeId];
    };
    var rootNode = sidebarNodes[ROOT_ENTRY_ID];
    var firstEnabledNode = getFirstEnabledSubItem(rootNode);
    if (!firstEnabledNode) {
        return null;
    }
    var isNodeACategory = firstEnabledNode.subItemIds.length;
    if (isNodeACategory) {
        return getFirstEnabledSubItem(firstEnabledNode);
    }
    else {
        return firstEnabledNode;
    }
};
//# sourceMappingURL=getFirstEnabledNode.js.map