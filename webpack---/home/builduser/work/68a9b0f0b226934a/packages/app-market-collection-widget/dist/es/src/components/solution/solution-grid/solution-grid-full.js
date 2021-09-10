import { __assign } from "tslib";
import * as React from 'react';
import { SolutionGrid } from './index';
import { composer } from '../../../component-decorators/composer';
export var SolutionGridFull = composer().compose(function (props) {
    var numOfSolutions = props.solutions.length;
    var numberOfLines = Math.min(Math.floor(numOfSolutions / 3), Math.floor(numOfSolutions / 4));
    return React.createElement(SolutionGrid, __assign({ numberOfLines: numberOfLines }, props));
});
//# sourceMappingURL=solution-grid-full.js.map