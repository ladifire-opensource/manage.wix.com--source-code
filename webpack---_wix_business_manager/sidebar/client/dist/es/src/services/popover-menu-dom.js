var SMALL_MARGIN = 12;
var BIG_MARGIN = 30;
var HEADER_HEIGHT = 48;
var getMargin = function () {
    return window.innerHeight < 524 ? SMALL_MARGIN : BIG_MARGIN;
};
var getElementTopOverflow = function (elementTopPosition) {
    return HEADER_HEIGHT + getMargin() - elementTopPosition;
};
var getElementBottomOverflow = function (elementHeight, elementTopPosition) {
    var elementTotalHeight = elementHeight + elementTopPosition + getMargin();
    return window.innerHeight - elementTotalHeight;
};
var getElementOverflow = function (elementHeight, elementTopPosition) {
    var offsetFromTop = getElementTopOverflow(elementTopPosition);
    var offsetFromBottom = getElementBottomOverflow(elementHeight, elementTopPosition);
    if (offsetFromTop > 0) {
        return offsetFromTop;
    }
    else if (offsetFromBottom < 0) {
        return offsetFromBottom;
    }
    else {
        return 0;
    }
};
export var createMoveByProp = function (elementHeight, elementTopPosition) { return ({
    y: getElementOverflow(elementHeight, elementTopPosition)
}); };
export var resetMoveByProp = function () { return ({ y: 0 }); };
//# sourceMappingURL=popover-menu-dom.js.map