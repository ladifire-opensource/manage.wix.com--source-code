import { UPDATE_NODES } from '../actions/types';
import { defaultSidebarNodes } from '../services/convert-entries-to-nodes';
import { keyBy } from 'lodash';
export var mapById = function (nodes) { return keyBy(nodes, function (node) { return node.id; }); };
var defaultMap = mapById(defaultSidebarNodes);
export var nodesReducer = function (map, action) {
    if (map === void 0) { map = defaultMap; }
    return action.type === UPDATE_NODES ? mapById(action.nodes) : map;
};
//# sourceMappingURL=nodes-reducer.js.map