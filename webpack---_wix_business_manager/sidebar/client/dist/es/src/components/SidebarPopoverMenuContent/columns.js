import { __spreadArrays } from "tslib";
import { isSeparator, isTitle } from '../../selectors/select-item-type';
import { last } from 'lodash';
export var createColumns = function (nodes, columnLength) {
    return nodesToColumns(nodes, columnLength)
        .map(removeLastSeparatorFromColumn);
};
var nodesToColumns = function (nodes, columnLength) {
    return nodes.reduce(function (columns, node) {
        var column = columns.pop();
        var isLastSpotInColumn = column.length === columnLength - 1;
        var isLastNodeInNodes = node === last(nodes);
        var isColumnEmpty = !column.length;
        var isIgnoreNode = isSeparator(node) && isColumnEmpty;
        var isAddItemToNextColumn = isTitle(node) && isLastSpotInColumn;
        var updatedColumn = isIgnoreNode || isAddItemToNextColumn ? column : __spreadArrays(column, [node]);
        var updatedColumns = __spreadArrays(columns, [updatedColumn]);
        if (isLastSpotInColumn && !isLastNodeInNodes) {
            var nextColumn = isAddItemToNextColumn ? [node] : [];
            return __spreadArrays(updatedColumns, [
                nextColumn
            ]);
        }
        else {
            return updatedColumns;
        }
    }, [[]]);
};
var removeLastSeparatorFromColumn = function (column) {
    return isSeparator(last(column)) ? column.slice(0, -1) : column;
};
//# sourceMappingURL=columns.js.map