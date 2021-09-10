import { getSumOfChildCounters } from './select-badge';
export var selectNodes = function (state) { return state.nodes; };
export var selectNode = function (state, id) { return state.nodes[id]; };
export var selectAllNodes = function (state) { return Object.values(state.nodes); };
export var selectBiName = function (state, id) {
    var node = selectNode(state, id);
    return node && node.biName;
};
export var selectSubItemNodes = function (state, id) {
    var subItemIds = selectNode(state, id).subItemIds;
    return subItemIds ? subItemIds.map(function (itemId) { return selectNode(state, itemId); }) : [];
};
export var selectBiItemsListWithCount = function (state, id) {
    var subItemsNodes = selectSubItemNodes(state, id);
    return subItemsNodes.reduce(function (output, node) {
        if (node.biName) {
            output[node.biName] = getSumOfChildCounters(state, node.id);
        }
        return output;
    }, {});
};
export var selectIsRootNodeReady = function (nodes) { return nodes && nodes.ROOT && !!nodes.ROOT.subItemIds.length; };
//# sourceMappingURL=select-node.js.map