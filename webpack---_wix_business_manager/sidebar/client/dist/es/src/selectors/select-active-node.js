import { selectNode } from './select-node';
export var selectActiveNodeId = function (state) { return state.active.current; };
export var selectCurrentPageId = function (state) { return state.active.currentPageId; };
export var selectActiveNode = function (state) { return selectNode(state, state.active.current); };
export var selectActiveParentNode = function (state) {
    var activeNode = selectActiveNode(state);
    return selectNode(state, activeNode.parentId);
};
export var selectActiveNodeParentId = function (state) {
    var activeNode = selectActiveNode(state);
    return activeNode && activeNode.parentId;
};
export var selectPreviousActiveNode = function (state) { return selectNode(state, state.active.previous); };
export var selectParentOfPreviousActiveNode = function (state) {
    var previousActive = selectPreviousActiveNode(state);
    return previousActive && selectNode(state, previousActive.parentId);
};
//# sourceMappingURL=select-active-node.js.map