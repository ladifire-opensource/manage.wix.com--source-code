!function(a, b) {
    "use strict";
    if ("function" == typeof define && define.amd) define([ "angular" ], b); else if ("object" == typeof module && module.exports) {
        var c = angular || require("angular");
        c && c.module || "undefined" == typeof angular || (c = angular), module.exports = b(c);
    } else b(a.angular);
}(this, function(a) {
    "use strict";
    var b = a.module("rzModule", []).factory("RzSliderOptions", function() {
        var b = {
            floor: 0,
            ceil: null,
            step: 1,
            precision: 0,
            minRange: null,
            maxRange: null,
            pushRange: !1,
            minLimit: null,
            maxLimit: null,
            id: null,
            translate: null,
            getLegend: null,
            stepsArray: null,
            bindIndexForStepsArray: !1,
            draggableRange: !1,
            draggableRangeOnly: !1,
            showSelectionBar: !1,
            showSelectionBarEnd: !1,
            showSelectionBarFromValue: null,
            hidePointerLabels: !1,
            hideLimitLabels: !1,
            autoHideLimitLabels: !0,
            readOnly: !1,
            disabled: !1,
            interval: 350,
            showTicks: !1,
            showTicksValues: !1,
            ticksArray: null,
            ticksTooltip: null,
            ticksValuesTooltip: null,
            vertical: !1,
            getSelectionBarColor: null,
            getTickColor: null,
            getPointerColor: null,
            keyboardSupport: !0,
            scale: 1,
            enforceStep: !0,
            enforceRange: !1,
            noSwitching: !1,
            onlyBindHandles: !1,
            onStart: null,
            onChange: null,
            onEnd: null,
            rightToLeft: !1,
            boundPointerLabels: !0,
            mergeRangeLabelsIfSame: !1,
            customTemplateScope: null,
            logScale: !1,
            customValueToPosition: null,
            customPositionToValue: null,
            selectionBarGradient: null
        }, c = {}, d = {};
        return d.options = function(b) {
            a.extend(c, b);
        }, d.getOptions = function(d) {
            return a.extend({}, b, c, d);
        }, d;
    }).factory("rzThrottle", [ "$timeout", function(a) {
        return function(b, c, d) {
            var e, f, g, h = Date.now || function() {
                return new Date().getTime();
            }, i = null, j = 0;
            d = d || {};
            var k = function() {
                j = h(), i = null, g = b.apply(e, f), e = f = null;
            };
            return function() {
                var l = h(), m = c - (l - j);
                return e = this, f = arguments, 0 >= m ? (a.cancel(i), i = null, j = l, g = b.apply(e, f), 
                e = f = null) : i || d.trailing === !1 || (i = a(k, m)), g;
            };
        };
    } ]).factory("RzSlider", [ "$timeout", "$document", "$window", "$compile", "RzSliderOptions", "rzThrottle", function(b, c, d, e, f, g) {
        var h = function(a, b) {
            this.scope = a, this.lowValue = 0, this.highValue = 0, this.sliderElem = b, this.range = void 0 !== this.scope.rzSliderModel && void 0 !== this.scope.rzSliderHigh, 
            this.dragging = {
                active: !1,
                value: 0,
                difference: 0,
                position: 0,
                lowLimit: 0,
                highLimit: 0
            }, this.positionProperty = "left", this.dimensionProperty = "width", this.handleHalfDim = 0, 
            this.maxPos = 0, this.precision = 0, this.step = 1, this.tracking = "", this.minValue = 0, 
            this.maxValue = 0, this.valueRange = 0, this.intermediateTicks = !1, this.initHasRun = !1, 
            this.firstKeyDown = !1, this.internalChange = !1, this.cmbLabelShown = !1, this.currentFocusElement = null, 
            this.fullBar = null, this.selBar = null, this.minH = null, this.maxH = null, this.flrLab = null, 
            this.ceilLab = null, this.minLab = null, this.maxLab = null, this.cmbLab = null, 
            this.ticks = null, this.init();
        };
        return h.prototype = {
            init: function() {
                var b, c, e = this, f = function() {
                    e.calcViewDimensions();
                };
                this.applyOptions(), this.syncLowValue(), this.range && this.syncHighValue(), this.initElemHandles(), 
                this.manageElementsStyle(), this.setDisabledState(), this.calcViewDimensions(), 
                this.setMinAndMax(), this.addAccessibility(), this.updateCeilLab(), this.updateFloorLab(), 
                this.initHandles(), this.manageEventsBindings(), this.scope.$on("reCalcViewDimensions", f), 
                a.element(d).on("resize", f), this.initHasRun = !0, b = g(function() {
                    e.onLowHandleChange();
                }, e.options.interval), c = g(function() {
                    e.onHighHandleChange();
                }, e.options.interval), this.scope.$on("rzSliderForceRender", function() {
                    e.resetLabelsValue(), b(), e.range && c(), e.resetSlider();
                }), this.scope.$watch("rzSliderOptions()", function(a, b) {
                    a !== b && (e.applyOptions(), e.syncLowValue(), e.range && e.syncHighValue(), e.resetSlider());
                }, !0), this.scope.$watch("rzSliderModel", function(a, c) {
                    e.internalChange || a !== c && b();
                }), this.scope.$watch("rzSliderHigh", function(a, b) {
                    e.internalChange || a !== b && (null != a && c(), (e.range && null == a || !e.range && null != a) && (e.applyOptions(), 
                    e.resetSlider()));
                }), this.scope.$on("$destroy", function() {
                    e.unbindEvents(), a.element(d).off("resize", f), e.currentFocusElement = null;
                });
            },
            findStepIndex: function(b) {
                for (var c = 0, d = 0; d < this.options.stepsArray.length; d++) {
                    var e = this.options.stepsArray[d];
                    if (e === b) {
                        c = d;
                        break;
                    }
                    if (a.isDate(e)) {
                        if (e.getTime() === b.getTime()) {
                            c = d;
                            break;
                        }
                    } else if (a.isObject(e) && (a.isDate(e.value) && e.value.getTime() === b.getTime() || e.value === b)) {
                        c = d;
                        break;
                    }
                }
                return c;
            },
            syncLowValue: function() {
                this.options.stepsArray ? this.options.bindIndexForStepsArray ? this.lowValue = this.scope.rzSliderModel : this.lowValue = this.findStepIndex(this.scope.rzSliderModel) : this.lowValue = this.scope.rzSliderModel;
            },
            syncHighValue: function() {
                this.options.stepsArray ? this.options.bindIndexForStepsArray ? this.highValue = this.scope.rzSliderHigh : this.highValue = this.findStepIndex(this.scope.rzSliderHigh) : this.highValue = this.scope.rzSliderHigh;
            },
            getStepValue: function(b) {
                var c = this.options.stepsArray[b];
                return a.isDate(c) ? c : a.isObject(c) ? c.value : c;
            },
            applyLowValue: function() {
                this.options.stepsArray ? this.options.bindIndexForStepsArray ? this.scope.rzSliderModel = this.lowValue : this.scope.rzSliderModel = this.getStepValue(this.lowValue) : this.scope.rzSliderModel = this.lowValue;
            },
            applyHighValue: function() {
                this.options.stepsArray ? this.options.bindIndexForStepsArray ? this.scope.rzSliderHigh = this.highValue : this.scope.rzSliderHigh = this.getStepValue(this.highValue) : this.scope.rzSliderHigh = this.highValue;
            },
            onLowHandleChange: function() {
                this.syncLowValue(), this.range && this.syncHighValue(), this.setMinAndMax(), this.updateLowHandle(this.valueToPosition(this.lowValue)), 
                this.updateSelectionBar(), this.updateTicksScale(), this.updateAriaAttributes(), 
                this.range && this.updateCmbLabel();
            },
            onHighHandleChange: function() {
                this.syncLowValue(), this.syncHighValue(), this.setMinAndMax(), this.updateHighHandle(this.valueToPosition(this.highValue)), 
                this.updateSelectionBar(), this.updateTicksScale(), this.updateCmbLabel(), this.updateAriaAttributes();
            },
            applyOptions: function() {
                var b;
                b = this.scope.rzSliderOptions ? this.scope.rzSliderOptions() : {}, this.options = f.getOptions(b), 
                this.options.step <= 0 && (this.options.step = 1), this.range = void 0 !== this.scope.rzSliderModel && void 0 !== this.scope.rzSliderHigh, 
                this.options.draggableRange = this.range && this.options.draggableRange, this.options.draggableRangeOnly = this.range && this.options.draggableRangeOnly, 
                this.options.draggableRangeOnly && (this.options.draggableRange = !0), this.options.showTicks = this.options.showTicks || this.options.showTicksValues || !!this.options.ticksArray, 
                this.scope.showTicks = this.options.showTicks, (a.isNumber(this.options.showTicks) || this.options.ticksArray) && (this.intermediateTicks = !0), 
                this.options.showSelectionBar = this.options.showSelectionBar || this.options.showSelectionBarEnd || null !== this.options.showSelectionBarFromValue, 
                this.options.stepsArray ? this.parseStepsArray() : (this.options.translate ? this.customTrFn = this.options.translate : this.customTrFn = function(a) {
                    return String(a);
                }, this.getLegend = this.options.getLegend), this.options.vertical && (this.positionProperty = "bottom", 
                this.dimensionProperty = "height"), this.options.customTemplateScope && (this.scope.custom = this.options.customTemplateScope);
            },
            parseStepsArray: function() {
                this.options.floor = 0, this.options.ceil = this.options.stepsArray.length - 1, 
                this.options.step = 1, this.options.translate ? this.customTrFn = this.options.translate : this.customTrFn = function(a) {
                    return this.options.bindIndexForStepsArray ? this.getStepValue(a) : a;
                }, this.getLegend = function(b) {
                    var c = this.options.stepsArray[b];
                    return a.isObject(c) ? c.legend : null;
                };
            },
            resetSlider: function() {
                this.manageElementsStyle(), this.addAccessibility(), this.setMinAndMax(), this.updateCeilLab(), 
                this.updateFloorLab(), this.unbindEvents(), this.manageEventsBindings(), this.setDisabledState(), 
                this.calcViewDimensions(), this.refocusPointerIfNeeded();
            },
            refocusPointerIfNeeded: function() {
                this.currentFocusElement && (this.onPointerFocus(this.currentFocusElement.pointer, this.currentFocusElement.ref), 
                this.focusElement(this.currentFocusElement.pointer));
            },
            initElemHandles: function() {
                a.forEach(this.sliderElem.children(), function(b, c) {
                    var d = a.element(b);
                    switch (c) {
                      case 0:
                        this.fullBar = d;
                        break;

                      case 1:
                        this.selBar = d;
                        break;

                      case 2:
                        this.minH = d;
                        break;

                      case 3:
                        this.maxH = d;
                        break;

                      case 4:
                        this.flrLab = d;
                        break;

                      case 5:
                        this.ceilLab = d;
                        break;

                      case 6:
                        this.minLab = d;
                        break;

                      case 7:
                        this.maxLab = d;
                        break;

                      case 8:
                        this.cmbLab = d;
                        break;

                      case 9:
                        this.ticks = d;
                    }
                }, this), this.selBar.rzsp = 0, this.minH.rzsp = 0, this.maxH.rzsp = 0, this.flrLab.rzsp = 0, 
                this.ceilLab.rzsp = 0, this.minLab.rzsp = 0, this.maxLab.rzsp = 0, this.cmbLab.rzsp = 0;
            },
            manageElementsStyle: function() {
                this.range ? this.maxH.css("display", "") : this.maxH.css("display", "none"), this.alwaysHide(this.flrLab, this.options.showTicksValues || this.options.hideLimitLabels), 
                this.alwaysHide(this.ceilLab, this.options.showTicksValues || this.options.hideLimitLabels);
                var a = this.options.showTicksValues && !this.intermediateTicks;
                this.alwaysHide(this.minLab, a || this.options.hidePointerLabels), this.alwaysHide(this.maxLab, a || !this.range || this.options.hidePointerLabels), 
                this.alwaysHide(this.cmbLab, a || !this.range || this.options.hidePointerLabels), 
                this.alwaysHide(this.selBar, !this.range && !this.options.showSelectionBar), this.options.vertical && this.sliderElem.addClass("rz-vertical"), 
                this.options.draggableRange ? this.selBar.addClass("rz-draggable") : this.selBar.removeClass("rz-draggable"), 
                this.intermediateTicks && this.options.showTicksValues && this.ticks.addClass("rz-ticks-values-under");
            },
            alwaysHide: function(a, b) {
                a.rzAlwaysHide = b, b ? this.hideEl(a) : this.showEl(a);
            },
            manageEventsBindings: function() {
                this.options.disabled || this.options.readOnly ? this.unbindEvents() : this.bindEvents();
            },
            setDisabledState: function() {
                this.options.disabled ? this.sliderElem.attr("disabled", "disabled") : this.sliderElem.attr("disabled", null);
            },
            resetLabelsValue: function() {
                this.minLab.rzsv = void 0, this.maxLab.rzsv = void 0;
            },
            initHandles: function() {
                this.updateLowHandle(this.valueToPosition(this.lowValue)), this.range && this.updateHighHandle(this.valueToPosition(this.highValue)), 
                this.updateSelectionBar(), this.range && this.updateCmbLabel(), this.updateTicksScale();
            },
            translateFn: function(a, b, c, d) {
                d = void 0 === d ? !0 : d;
                var e = "", f = !1, g = b.hasClass("no-label-injection");
                d ? (this.options.stepsArray && !this.options.bindIndexForStepsArray && (a = this.getStepValue(a)), 
                e = String(this.customTrFn(a, this.options.id, c))) : e = String(a), (void 0 === b.rzsv || b.rzsv.length !== e.length || b.rzsv.length > 0 && 0 === b.rzsd) && (f = !0, 
                b.rzsv = e), g || b.html(e), this.scope[c + "Label"] = e, f && this.getDimension(b);
            },
            setMinAndMax: function() {
                if (this.step = +this.options.step, this.precision = +this.options.precision, this.minValue = this.options.floor, 
                this.options.logScale && 0 === this.minValue) throw Error("Can't use floor=0 with logarithmic scale");
                this.options.enforceStep && (this.lowValue = this.roundStep(this.lowValue), this.range && (this.highValue = this.roundStep(this.highValue))), 
                null != this.options.ceil ? this.maxValue = this.options.ceil : this.maxValue = this.options.ceil = this.range ? this.highValue : this.lowValue, 
                this.options.enforceRange && (this.lowValue = this.sanitizeValue(this.lowValue), 
                this.range && (this.highValue = this.sanitizeValue(this.highValue))), this.applyLowValue(), 
                this.range && this.applyHighValue(), this.valueRange = this.maxValue - this.minValue;
            },
            addAccessibility: function() {
                this.minH.attr("role", "slider"), this.updateAriaAttributes(), !this.options.keyboardSupport || this.options.readOnly || this.options.disabled ? this.minH.attr("tabindex", "") : this.minH.attr("tabindex", "0"), 
                this.options.vertical && this.minH.attr("aria-orientation", "vertical"), this.range && (this.maxH.attr("role", "slider"), 
                !this.options.keyboardSupport || this.options.readOnly || this.options.disabled ? this.maxH.attr("tabindex", "") : this.maxH.attr("tabindex", "0"), 
                this.options.vertical && this.maxH.attr("aria-orientation", "vertical"));
            },
            updateAriaAttributes: function() {
                this.minH.attr({
                    "aria-valuenow": this.scope.rzSliderModel,
                    "aria-valuetext": this.customTrFn(this.scope.rzSliderModel, this.options.id, "model"),
                    "aria-valuemin": this.minValue,
                    "aria-valuemax": this.maxValue
                }), this.range && this.maxH.attr({
                    "aria-valuenow": this.scope.rzSliderHigh,
                    "aria-valuetext": this.customTrFn(this.scope.rzSliderHigh, this.options.id, "high"),
                    "aria-valuemin": this.minValue,
                    "aria-valuemax": this.maxValue
                });
            },
            calcViewDimensions: function() {
                var a = this.getDimension(this.minH);
                if (this.handleHalfDim = a / 2, this.barDimension = this.getDimension(this.fullBar), 
                this.maxPos = this.barDimension - a, this.getDimension(this.sliderElem), this.sliderElem.rzsp = this.sliderElem[0].getBoundingClientRect()[this.positionProperty], 
                this.initHasRun) {
                    this.updateFloorLab(), this.updateCeilLab(), this.initHandles();
                    var c = this;
                    b(function() {
                        c.updateTicksScale();
                    });
                }
            },
            updateTicksScale: function() {
                if (this.options.showTicks) {
                    var a = this.options.ticksArray || this.getTicksArray(), b = this.options.vertical ? "translateY" : "translateX", c = this;
                    this.options.rightToLeft && a.reverse(), this.scope.ticks = a.map(function(a) {
                        var d = c.valueToPosition(a);
                        c.options.vertical && (d = c.maxPos - d);
                        var e = {
                            selected: c.isTickSelected(a),
                            style: {
                                transform: b + "(" + Math.round(d) + "px)"
                            }
                        };
                        if (e.selected && c.options.getSelectionBarColor && (e.style["background-color"] = c.getSelectionBarColor()), 
                        !e.selected && c.options.getTickColor && (e.style["background-color"] = c.getTickColor(a)), 
                        c.options.ticksTooltip && (e.tooltip = c.options.ticksTooltip(a), e.tooltipPlacement = c.options.vertical ? "right" : "top"), 
                        c.options.showTicksValues && (e.value = c.getDisplayValue(a, "tick-value"), c.options.ticksValuesTooltip && (e.valueTooltip = c.options.ticksValuesTooltip(a), 
                        e.valueTooltipPlacement = c.options.vertical ? "right" : "top")), c.getLegend) {
                            var f = c.getLegend(a, c.options.id);
                            f && (e.legend = f);
                        }
                        return e;
                    });
                }
            },
            getTicksArray: function() {
                var a = this.step, b = [];
                this.intermediateTicks && (a = this.options.showTicks);
                for (var c = this.minValue; c <= this.maxValue; c += a) b.push(c);
                return b;
            },
            isTickSelected: function(a) {
                if (!this.range) if (null !== this.options.showSelectionBarFromValue) {
                    var b = this.options.showSelectionBarFromValue;
                    if (this.lowValue > b && a >= b && a <= this.lowValue) return !0;
                    if (this.lowValue < b && b >= a && a >= this.lowValue) return !0;
                } else if (this.options.showSelectionBarEnd) {
                    if (a >= this.lowValue) return !0;
                } else if (this.options.showSelectionBar && a <= this.lowValue) return !0;
                return this.range && a >= this.lowValue && a <= this.highValue ? !0 : !1;
            },
            updateFloorLab: function() {
                this.translateFn(this.minValue, this.flrLab, "floor"), this.getDimension(this.flrLab);
                var a = this.options.rightToLeft ? this.barDimension - this.flrLab.rzsd : 0;
                this.setPosition(this.flrLab, a);
            },
            updateCeilLab: function() {
                this.translateFn(this.maxValue, this.ceilLab, "ceil"), this.getDimension(this.ceilLab);
                var a = this.options.rightToLeft ? 0 : this.barDimension - this.ceilLab.rzsd;
                this.setPosition(this.ceilLab, a);
            },
            updateHandles: function(a, b) {
                "lowValue" === a ? this.updateLowHandle(b) : this.updateHighHandle(b), this.updateSelectionBar(), 
                this.updateTicksScale(), this.range && this.updateCmbLabel();
            },
            getHandleLabelPos: function(a, b) {
                var c = this[a].rzsd, d = b - c / 2 + this.handleHalfDim, e = this.barDimension - c;
                return this.options.boundPointerLabels ? this.options.rightToLeft && "minLab" === a || !this.options.rightToLeft && "maxLab" === a ? Math.min(d, e) : Math.min(Math.max(d, 0), e) : d;
            },
            updateLowHandle: function(a) {
                if (this.setPosition(this.minH, a), this.translateFn(this.lowValue, this.minLab, "model"), 
                this.setPosition(this.minLab, this.getHandleLabelPos("minLab", a)), this.options.getPointerColor) {
                    var b = this.getPointerColor("min");
                    this.scope.minPointerStyle = {
                        backgroundColor: b
                    };
                }
                this.options.autoHideLimitLabels && this.shFloorCeil();
            },
            updateHighHandle: function(a) {
                if (this.setPosition(this.maxH, a), this.translateFn(this.highValue, this.maxLab, "high"), 
                this.setPosition(this.maxLab, this.getHandleLabelPos("maxLab", a)), this.options.getPointerColor) {
                    var b = this.getPointerColor("max");
                    this.scope.maxPointerStyle = {
                        backgroundColor: b
                    };
                }
                this.options.autoHideLimitLabels && this.shFloorCeil();
            },
            shFloorCeil: function() {
                if (!this.options.hidePointerLabels) {
                    var a = !1, b = !1, c = this.isLabelBelowFloorLab(this.minLab), d = this.isLabelAboveCeilLab(this.minLab), e = this.isLabelAboveCeilLab(this.maxLab), f = this.isLabelBelowFloorLab(this.cmbLab), g = this.isLabelAboveCeilLab(this.cmbLab);
                    if (c ? (a = !0, this.hideEl(this.flrLab)) : (a = !1, this.showEl(this.flrLab)), 
                    d ? (b = !0, this.hideEl(this.ceilLab)) : (b = !1, this.showEl(this.ceilLab)), this.range) {
                        var h = this.cmbLabelShown ? g : e, i = this.cmbLabelShown ? f : c;
                        h ? this.hideEl(this.ceilLab) : b || this.showEl(this.ceilLab), i ? this.hideEl(this.flrLab) : a || this.showEl(this.flrLab);
                    }
                }
            },
            isLabelBelowFloorLab: function(a) {
                var b = this.options.rightToLeft, c = a.rzsp, d = a.rzsd, e = this.flrLab.rzsp, f = this.flrLab.rzsd;
                return b ? c + d >= e - 2 : e + f + 2 >= c;
            },
            isLabelAboveCeilLab: function(a) {
                var b = this.options.rightToLeft, c = a.rzsp, d = a.rzsd, e = this.ceilLab.rzsp, f = this.ceilLab.rzsd;
                return b ? e + f + 2 >= c : c + d >= e - 2;
            },
            updateSelectionBar: function() {
                var a = 0, b = 0, c = this.options.rightToLeft ? !this.options.showSelectionBarEnd : this.options.showSelectionBarEnd, d = this.options.rightToLeft ? this.maxH.rzsp + this.handleHalfDim : this.minH.rzsp + this.handleHalfDim;
                if (this.range) b = Math.abs(this.maxH.rzsp - this.minH.rzsp), a = d; else if (null !== this.options.showSelectionBarFromValue) {
                    var e = this.options.showSelectionBarFromValue, f = this.valueToPosition(e), g = this.options.rightToLeft ? this.lowValue <= e : this.lowValue > e;
                    g ? (b = this.minH.rzsp - f, a = f + this.handleHalfDim) : (b = f - this.minH.rzsp, 
                    a = this.minH.rzsp + this.handleHalfDim);
                } else c ? (b = Math.abs(this.maxPos - this.minH.rzsp) + this.handleHalfDim, a = this.minH.rzsp + this.handleHalfDim) : (b = Math.abs(this.maxH.rzsp - this.minH.rzsp) + this.handleHalfDim, 
                a = 0);
                if (this.setDimension(this.selBar, b), this.setPosition(this.selBar, a), this.options.getSelectionBarColor) {
                    var h = this.getSelectionBarColor();
                    this.scope.barStyle = {
                        backgroundColor: h
                    };
                } else if (this.options.selectionBarGradient) {
                    var i = null !== this.options.showSelectionBarFromValue ? this.valueToPosition(this.options.showSelectionBarFromValue) : 0, j = i - a > 0 ^ c, k = this.options.vertical ? j ? "bottom" : "top" : j ? "left" : "right";
                    this.scope.barStyle = {
                        backgroundImage: "linear-gradient(to " + k + ", " + this.options.selectionBarGradient.from + " 0%," + this.options.selectionBarGradient.to + " 100%)"
                    }, this.options.vertical ? (this.scope.barStyle.backgroundPosition = "center " + (i + b + a + (j ? -this.handleHalfDim : 0)) + "px", 
                    this.scope.barStyle.backgroundSize = "100% " + (this.barDimension - this.handleHalfDim) + "px") : (this.scope.barStyle.backgroundPosition = i - a + (j ? this.handleHalfDim : 0) + "px center", 
                    this.scope.barStyle.backgroundSize = this.barDimension - this.handleHalfDim + "px 100%");
                }
            },
            getSelectionBarColor: function() {
                return this.range ? this.options.getSelectionBarColor(this.scope.rzSliderModel, this.scope.rzSliderHigh) : this.options.getSelectionBarColor(this.scope.rzSliderModel);
            },
            getPointerColor: function(a) {
                return "max" === a ? this.options.getPointerColor(this.scope.rzSliderHigh, a) : this.options.getPointerColor(this.scope.rzSliderModel, a);
            },
            getTickColor: function(a) {
                return this.options.getTickColor(a);
            },
            updateCmbLabel: function() {
                var a = null;
                if (a = this.options.rightToLeft ? this.minLab.rzsp - this.minLab.rzsd - 10 <= this.maxLab.rzsp : this.minLab.rzsp + this.minLab.rzsd + 10 >= this.maxLab.rzsp) {
                    var b = this.getDisplayValue(this.lowValue, "model"), c = this.getDisplayValue(this.highValue, "high"), d = "";
                    d = this.options.mergeRangeLabelsIfSame && b === c ? b : this.options.rightToLeft ? c + " - " + b : b + " - " + c, 
                    this.translateFn(d, this.cmbLab, "cmb", !1);
                    var e = this.options.boundPointerLabels ? Math.min(Math.max(this.selBar.rzsp + this.selBar.rzsd / 2 - this.cmbLab.rzsd / 2, 0), this.barDimension - this.cmbLab.rzsd) : this.selBar.rzsp + this.selBar.rzsd / 2 - this.cmbLab.rzsd / 2;
                    this.setPosition(this.cmbLab, e), this.cmbLabelShown = !0, this.hideEl(this.minLab), 
                    this.hideEl(this.maxLab), this.showEl(this.cmbLab);
                } else this.cmbLabelShown = !1, this.showEl(this.maxLab), this.showEl(this.minLab), 
                this.hideEl(this.cmbLab);
                this.options.autoHideLimitLabels && this.shFloorCeil();
            },
            getDisplayValue: function(a, b) {
                return this.options.stepsArray && !this.options.bindIndexForStepsArray && (a = this.getStepValue(a)), 
                this.customTrFn(a, this.options.id, b);
            },
            roundStep: function(a, b) {
                var c = b ? b : this.step, d = parseFloat((a - this.minValue) / c).toPrecision(12);
                d = Math.round(+d) * c;
                var e = (this.minValue + d).toFixed(this.precision);
                return +e;
            },
            hideEl: function(a) {
                return a.css({
                    visibility: "hidden"
                });
            },
            showEl: function(a) {
                return a.rzAlwaysHide ? a : a.css({
                    visibility: "visible"
                });
            },
            setPosition: function(a, b) {
                a.rzsp = b;
                var c = {};
                return c[this.positionProperty] = Math.round(b) + "px", a.css(c), b;
            },
            getDimension: function(a) {
                var b = a[0].getBoundingClientRect();
                return this.options.vertical ? a.rzsd = (b.bottom - b.top) * this.options.scale : a.rzsd = (b.right - b.left) * this.options.scale, 
                a.rzsd;
            },
            setDimension: function(a, b) {
                a.rzsd = b;
                var c = {};
                return c[this.dimensionProperty] = Math.round(b) + "px", a.css(c), b;
            },
            sanitizeValue: function(a) {
                return Math.min(Math.max(a, this.minValue), this.maxValue);
            },
            valueToPosition: function(a) {
                var b = this.linearValueToPosition;
                this.options.customValueToPosition ? b = this.options.customValueToPosition : this.options.logScale && (b = this.logValueToPosition), 
                a = this.sanitizeValue(a);
                var c = b(a, this.minValue, this.maxValue) || 0;
                return this.options.rightToLeft && (c = 1 - c), c * this.maxPos;
            },
            linearValueToPosition: function(a, b, c) {
                var d = c - b;
                return (a - b) / d;
            },
            logValueToPosition: function(a, b, c) {
                a = Math.log(a), b = Math.log(b), c = Math.log(c);
                var d = c - b;
                return (a - b) / d;
            },
            positionToValue: function(a) {
                var b = a / this.maxPos;
                this.options.rightToLeft && (b = 1 - b);
                var c = this.linearPositionToValue;
                return this.options.customPositionToValue ? c = this.options.customPositionToValue : this.options.logScale && (c = this.logPositionToValue), 
                c(b, this.minValue, this.maxValue) || 0;
            },
            linearPositionToValue: function(a, b, c) {
                return a * (c - b) + b;
            },
            logPositionToValue: function(a, b, c) {
                b = Math.log(b), c = Math.log(c);
                var d = a * (c - b) + b;
                return Math.exp(d);
            },
            getEventXY: function(a) {
                var b = this.options.vertical ? "clientY" : "clientX";
                return void 0 !== a[b] ? a[b] : void 0 === a.originalEvent ? a.touches[0][b] : a.originalEvent.touches[0][b];
            },
            getEventPosition: function(a) {
                var b = this.sliderElem.rzsp, c = 0;
                return c = this.options.vertical ? -this.getEventXY(a) + b : this.getEventXY(a) - b, 
                c * this.options.scale - this.handleHalfDim;
            },
            getEventNames: function(a) {
                var b = {
                    moveEvent: "",
                    endEvent: ""
                };
                return a.touches || void 0 !== a.originalEvent && a.originalEvent.touches ? (b.moveEvent = "touchmove", 
                b.endEvent = "touchend") : (b.moveEvent = "mousemove", b.endEvent = "mouseup"), 
                b;
            },
            getNearestHandle: function(a) {
                if (!this.range) return this.minH;
                var b = this.getEventPosition(a), c = Math.abs(b - this.minH.rzsp), d = Math.abs(b - this.maxH.rzsp);
                return d > c ? this.minH : c > d ? this.maxH : this.options.rightToLeft ? b > this.minH.rzsp ? this.minH : this.maxH : b < this.minH.rzsp ? this.minH : this.maxH;
            },
            focusElement: function(a) {
                var b = 0;
                a[b].focus();
            },
            bindEvents: function() {
                var b, c, d;
                this.options.draggableRange ? (b = "rzSliderDrag", c = this.onDragStart, d = this.onDragMove) : (b = "lowValue", 
                c = this.onStart, d = this.onMove), this.options.onlyBindHandles || (this.selBar.on("mousedown", a.bind(this, c, null, b)), 
                this.selBar.on("mousedown", a.bind(this, d, this.selBar))), this.options.draggableRangeOnly ? (this.minH.on("mousedown", a.bind(this, c, null, b)), 
                this.maxH.on("mousedown", a.bind(this, c, null, b))) : (this.minH.on("mousedown", a.bind(this, this.onStart, this.minH, "lowValue")), 
                this.range && this.maxH.on("mousedown", a.bind(this, this.onStart, this.maxH, "highValue")), 
                this.options.onlyBindHandles || (this.fullBar.on("mousedown", a.bind(this, this.onStart, null, null)), 
                this.fullBar.on("mousedown", a.bind(this, this.onMove, this.fullBar)), this.ticks.on("mousedown", a.bind(this, this.onStart, null, null)), 
                this.ticks.on("mousedown", a.bind(this, this.onTickClick, this.ticks)))), this.options.onlyBindHandles || (this.selBar.on("touchstart", a.bind(this, c, null, b)), 
                this.selBar.on("touchstart", a.bind(this, d, this.selBar))), this.options.draggableRangeOnly ? (this.minH.on("touchstart", a.bind(this, c, null, b)), 
                this.maxH.on("touchstart", a.bind(this, c, null, b))) : (this.minH.on("touchstart", a.bind(this, this.onStart, this.minH, "lowValue")), 
                this.range && this.maxH.on("touchstart", a.bind(this, this.onStart, this.maxH, "highValue")), 
                this.options.onlyBindHandles || (this.fullBar.on("touchstart", a.bind(this, this.onStart, null, null)), 
                this.fullBar.on("touchstart", a.bind(this, this.onMove, this.fullBar)), this.ticks.on("touchstart", a.bind(this, this.onStart, null, null)), 
                this.ticks.on("touchstart", a.bind(this, this.onTickClick, this.ticks)))), this.options.keyboardSupport && (this.minH.on("focus", a.bind(this, this.onPointerFocus, this.minH, "lowValue")), 
                this.range && this.maxH.on("focus", a.bind(this, this.onPointerFocus, this.maxH, "highValue")));
            },
            unbindEvents: function() {
                this.minH.off(), this.maxH.off(), this.fullBar.off(), this.selBar.off(), this.ticks.off();
            },
            onStart: function(b, d, e) {
                var f, g, h = this.getEventNames(e);
                e.stopPropagation(), e.preventDefault(), this.calcViewDimensions(), b ? this.tracking = d : (b = this.getNearestHandle(e), 
                this.tracking = b === this.minH ? "lowValue" : "highValue"), b.addClass("rz-active"), 
                this.options.keyboardSupport && this.focusElement(b), f = a.bind(this, this.dragging.active ? this.onDragMove : this.onMove, b), 
                g = a.bind(this, this.onEnd, f), c.on(h.moveEvent, f), c.one(h.endEvent, g), this.callOnStart();
            },
            onMove: function(b, c, d) {
                var e, f = this.getEventPosition(c), g = this.options.rightToLeft ? this.minValue : this.maxValue, h = this.options.rightToLeft ? this.maxValue : this.minValue;
                0 >= f ? e = h : f >= this.maxPos ? e = g : (e = this.positionToValue(f), e = d && a.isNumber(this.options.showTicks) ? this.roundStep(e, this.options.showTicks) : this.roundStep(e)), 
                this.positionTrackingHandle(e);
            },
            onEnd: function(a, b) {
                var d = this.getEventNames(b).moveEvent;
                this.options.keyboardSupport || (this.minH.removeClass("rz-active"), this.maxH.removeClass("rz-active"), 
                this.tracking = ""), this.dragging.active = !1, c.off(d, a), this.callOnEnd();
            },
            onTickClick: function(a, b) {
                this.onMove(a, b, !0);
            },
            onPointerFocus: function(b, c) {
                this.tracking = c, b.one("blur", a.bind(this, this.onPointerBlur, b)), b.on("keydown", a.bind(this, this.onKeyboardEvent)), 
                b.on("keyup", a.bind(this, this.onKeyUp)), this.firstKeyDown = !0, b.addClass("rz-active"), 
                this.currentFocusElement = {
                    pointer: b,
                    ref: c
                };
            },
            onKeyUp: function() {
                this.firstKeyDown = !0, this.callOnEnd();
            },
            onPointerBlur: function(a) {
                a.off("keydown"), a.off("keyup"), this.tracking = "", a.removeClass("rz-active"), 
                this.currentFocusElement = null;
            },
            getKeyActions: function(a) {
                var b = a + this.step, c = a - this.step, d = a + this.valueRange / 10, e = a - this.valueRange / 10, f = {
                    UP: b,
                    DOWN: c,
                    LEFT: c,
                    RIGHT: b,
                    PAGEUP: d,
                    PAGEDOWN: e,
                    HOME: this.minValue,
                    END: this.maxValue
                };
                return this.options.rightToLeft && (f.LEFT = b, f.RIGHT = c, this.options.vertical && (f.UP = c, 
                f.DOWN = b)), f;
            },
            onKeyboardEvent: function(a) {
                var c = this[this.tracking], d = a.keyCode || a.which, e = {
                    38: "UP",
                    40: "DOWN",
                    37: "LEFT",
                    39: "RIGHT",
                    33: "PAGEUP",
                    34: "PAGEDOWN",
                    36: "HOME",
                    35: "END"
                }, f = this.getKeyActions(c), g = e[d], h = f[g];
                if (null != h && "" !== this.tracking) {
                    a.preventDefault(), this.firstKeyDown && (this.firstKeyDown = !1, this.callOnStart());
                    var i = this;
                    b(function() {
                        var a = i.roundStep(i.sanitizeValue(h));
                        if (i.options.draggableRangeOnly) {
                            var b, c, d = i.highValue - i.lowValue;
                            "lowValue" === i.tracking ? (b = a, c = a + d, c > i.maxValue && (c = i.maxValue, 
                            b = c - d)) : (c = a, b = a - d, b < i.minValue && (b = i.minValue, c = b + d)), 
                            i.positionTrackingBar(b, c);
                        } else i.positionTrackingHandle(a);
                    });
                }
            },
            onDragStart: function(a, b, c) {
                var d = this.getEventPosition(c);
                this.dragging = {
                    active: !0,
                    value: this.positionToValue(d),
                    difference: this.highValue - this.lowValue,
                    lowLimit: this.options.rightToLeft ? this.minH.rzsp - d : d - this.minH.rzsp,
                    highLimit: this.options.rightToLeft ? d - this.maxH.rzsp : this.maxH.rzsp - d
                }, this.onStart(a, b, c);
            },
            getValue: function(a, b, c, d) {
                var e = this.options.rightToLeft, f = null;
                return f = "min" === a ? c ? d ? e ? this.minValue : this.maxValue - this.dragging.difference : e ? this.maxValue - this.dragging.difference : this.minValue : e ? this.positionToValue(b + this.dragging.lowLimit) : this.positionToValue(b - this.dragging.lowLimit) : c ? d ? e ? this.minValue + this.dragging.difference : this.maxValue : e ? this.maxValue : this.minValue + this.dragging.difference : e ? this.positionToValue(b + this.dragging.lowLimit) + this.dragging.difference : this.positionToValue(b - this.dragging.lowLimit) + this.dragging.difference, 
                this.roundStep(f);
            },
            onDragMove: function(a, b) {
                var c, d, e, f, g, h, i, j, k = this.getEventPosition(b);
                if (this.options.rightToLeft ? (e = this.dragging.lowLimit, f = this.dragging.highLimit, 
                i = this.maxH, j = this.minH) : (e = this.dragging.highLimit, f = this.dragging.lowLimit, 
                i = this.minH, j = this.maxH), g = f >= k, h = k >= this.maxPos - e, g) {
                    if (0 === i.rzsp) return;
                    c = this.getValue("min", k, !0, !1), d = this.getValue("max", k, !0, !1);
                } else if (h) {
                    if (j.rzsp === this.maxPos) return;
                    d = this.getValue("max", k, !0, !0), c = this.getValue("min", k, !0, !0);
                } else c = this.getValue("min", k, !1), d = this.getValue("max", k, !1);
                this.positionTrackingBar(c, d);
            },
            positionTrackingBar: function(a, b) {
                null != this.options.minLimit && a < this.options.minLimit && (a = this.options.minLimit, 
                b = a + this.dragging.difference), null != this.options.maxLimit && b > this.options.maxLimit && (b = this.options.maxLimit, 
                a = b - this.dragging.difference), this.lowValue = a, this.highValue = b, this.applyLowValue(), 
                this.range && this.applyHighValue(), this.applyModel(), this.updateHandles("lowValue", this.valueToPosition(a)), 
                this.updateHandles("highValue", this.valueToPosition(b));
            },
            positionTrackingHandle: function(a) {
                var b = !1;
                a = this.applyMinMaxLimit(a), this.range && (this.options.pushRange ? (a = this.applyPushRange(a), 
                b = !0) : (this.options.noSwitching && ("lowValue" === this.tracking && a > this.highValue ? a = this.applyMinMaxRange(this.highValue) : "highValue" === this.tracking && a < this.lowValue && (a = this.applyMinMaxRange(this.lowValue))), 
                a = this.applyMinMaxRange(a), "lowValue" === this.tracking && a > this.highValue ? (this.lowValue = this.highValue, 
                this.applyLowValue(), this.updateHandles(this.tracking, this.maxH.rzsp), this.updateAriaAttributes(), 
                this.tracking = "highValue", this.minH.removeClass("rz-active"), this.maxH.addClass("rz-active"), 
                this.options.keyboardSupport && this.focusElement(this.maxH), b = !0) : "highValue" === this.tracking && a < this.lowValue && (this.highValue = this.lowValue, 
                this.applyHighValue(), this.updateHandles(this.tracking, this.minH.rzsp), this.updateAriaAttributes(), 
                this.tracking = "lowValue", this.maxH.removeClass("rz-active"), this.minH.addClass("rz-active"), 
                this.options.keyboardSupport && this.focusElement(this.minH), b = !0))), this[this.tracking] !== a && (this[this.tracking] = a, 
                "lowValue" === this.tracking ? this.applyLowValue() : this.applyHighValue(), this.updateHandles(this.tracking, this.valueToPosition(a)), 
                this.updateAriaAttributes(), b = !0), b && this.applyModel();
            },
            applyMinMaxLimit: function(a) {
                return null != this.options.minLimit && a < this.options.minLimit ? this.options.minLimit : null != this.options.maxLimit && a > this.options.maxLimit ? this.options.maxLimit : a;
            },
            applyMinMaxRange: function(a) {
                var b = "lowValue" === this.tracking ? this.highValue : this.lowValue, c = Math.abs(a - b);
                return null != this.options.minRange && c < this.options.minRange ? "lowValue" === this.tracking ? this.highValue - this.options.minRange : this.lowValue + this.options.minRange : null != this.options.maxRange && c > this.options.maxRange ? "lowValue" === this.tracking ? this.highValue - this.options.maxRange : this.lowValue + this.options.maxRange : a;
            },
            applyPushRange: function(a) {
                var b = "lowValue" === this.tracking ? this.highValue - a : a - this.lowValue, c = null !== this.options.minRange ? this.options.minRange : this.options.step, d = this.options.maxRange;
                return c > b ? ("lowValue" === this.tracking ? (this.highValue = Math.min(a + c, this.maxValue), 
                a = this.highValue - c, this.applyHighValue(), this.updateHandles("highValue", this.valueToPosition(this.highValue))) : (this.lowValue = Math.max(a - c, this.minValue), 
                a = this.lowValue + c, this.applyLowValue(), this.updateHandles("lowValue", this.valueToPosition(this.lowValue))), 
                this.updateAriaAttributes()) : null !== d && b > d && ("lowValue" === this.tracking ? (this.highValue = a + d, 
                this.applyHighValue(), this.updateHandles("highValue", this.valueToPosition(this.highValue))) : (this.lowValue = a - d, 
                this.applyLowValue(), this.updateHandles("lowValue", this.valueToPosition(this.lowValue))), 
                this.updateAriaAttributes()), a;
            },
            applyModel: function() {
                this.internalChange = !0, this.scope.$apply(), this.callOnChange(), this.internalChange = !1;
            },
            callOnStart: function() {
                if (this.options.onStart) {
                    var a = this, b = "lowValue" === this.tracking ? "min" : "max";
                    this.scope.$evalAsync(function() {
                        a.options.onStart(a.options.id, a.scope.rzSliderModel, a.scope.rzSliderHigh, b);
                    });
                }
            },
            callOnChange: function() {
                if (this.options.onChange) {
                    var a = this, b = "lowValue" === this.tracking ? "min" : "max";
                    this.scope.$evalAsync(function() {
                        a.options.onChange(a.options.id, a.scope.rzSliderModel, a.scope.rzSliderHigh, b);
                    });
                }
            },
            callOnEnd: function() {
                if (this.options.onEnd) {
                    var a = this, b = "lowValue" === this.tracking ? "min" : "max";
                    this.scope.$evalAsync(function() {
                        a.options.onEnd(a.options.id, a.scope.rzSliderModel, a.scope.rzSliderHigh, b);
                    });
                }
                this.scope.$emit("slideEnded");
            }
        }, h;
    } ]).directive("rzslider", [ "RzSlider", function(a) {
        return {
            restrict: "AE",
            replace: !0,
            scope: {
                rzSliderModel: "=?",
                rzSliderHigh: "=?",
                rzSliderOptions: "&?",
                rzSliderTplUrl: "@"
            },
            templateUrl: function(a, b) {
                return b.rzSliderTplUrl || "rzSliderTpl.html";
            },
            link: function(b, c) {
                b.slider = new a(b, c);
            }
        };
    } ]);
    return b.run([ "$templateCache", function(a) {
        a.put("rzSliderTpl.html", '<div class=rzslider><span class=rz-bar-wrapper><span class=rz-bar></span></span> <span class=rz-bar-wrapper><span class="rz-bar rz-selection" ng-style=barStyle></span></span> <span class="rz-pointer rz-pointer-min" ng-style=minPointerStyle></span> <span class="rz-pointer rz-pointer-max" ng-style=maxPointerStyle></span> <span class="rz-bubble rz-limit rz-floor"></span> <span class="rz-bubble rz-limit rz-ceil"></span> <span class=rz-bubble></span> <span class=rz-bubble></span> <span class=rz-bubble></span><ul ng-show=showTicks class=rz-ticks><li ng-repeat="t in ticks track by $index" class=rz-tick ng-class="{\'rz-selected\': t.selected}" ng-style=t.style ng-attr-uib-tooltip="{{ t.tooltip }}" ng-attr-tooltip-placement={{t.tooltipPlacement}} ng-attr-tooltip-append-to-body="{{ t.tooltip ? true : undefined}}"><span ng-if="t.value != null" class=rz-tick-value ng-attr-uib-tooltip="{{ t.valueTooltip }}" ng-attr-tooltip-placement={{t.valueTooltipPlacement}}>{{ t.value }}</span> <span ng-if="t.legend != null" class=rz-tick-legend>{{ t.legend }}</span></li></ul></div>');
    } ]), b.name;
});

"use strict";

try {
    angular.module("wixStyleInternal");
} catch (e) {
    angular.module("wixStyleInternal", []);
}

angular.module("wixStyleInternal").run([ "$templateCache", function($templateCache) {
    "use strict";
    $templateCache.put("views/directives/wix-dropdown.html", "<div ng-class=\"{'dropdown-no-hover': openOnClick, 'dropdown-open': isOpen}\" class=\"wix-dropdown\">\n" + '    <div class="dropdown-title" ng-click="openOnClick && openDropdown()">{{selectedItem.text}}</div>\n' + "    <ul>\n" + '        <li ng-repeat="item in items" ng-class="{\'selected\': item.selected}">\n' + '            <a ng-click="selectOption(item)">\n' + "               {{item.text}}\n" + "             </a>\n" + "        </li>\n" + "    </ul>\n" + "</div>");
} ]);

"use strict";

try {
    angular.module("wixStyleInternal");
} catch (e) {
    angular.module("wixStyleInternal", []);
}

angular.module("wixStyleInternal").run([ "$templateCache", function($templateCache) {
    "use strict";
    $templateCache.put("views/directives/wix-tabs.html", '<div class="tabs-wrapper">\n' + '    <a ng-repeat="tab in wixTabsVM.tabControllers" class="tab-container tab-title" ng-class="{\'active\': wixTabsVM.isActive(tab), \'disabled\': tab.disabled}" href ng-click="wixTabsVM.onTabClick(tab)">{{tab.getLabel()}}</a>\n' + "</div>\n" + '\x3c!--<div ng-repeat="tab in wixTabsVM.tabsArray" class="tab-content" ng-class="{\'active-tab-content\': wixTabsVM.isActive(tab)}" ng-bind-html="wixTabsVM.getTabContent(tab)">\n' + "</div>--\x3e\n" + "\n" + '<div class="active-tab-content" ng-transclude></div>\n' + "\n");
} ]);

"use strict";

try {
    angular.module("wixStyleInternal");
} catch (e) {
    angular.module("wixStyleInternal", []);
}

angular.module("wixStyleInternal").run([ "$templateCache", function($templateCache) {
    "use strict";
    $templateCache.put("views/directives/wix-wizard.html", '<ul class="wizard-steps">\n' + '    <li class="step" ng-repeat="step in steps">\n' + "        <div class=\"step-status\" ng-class=\"{'active': step.state==='active'}\"><span>1</span></div>\n" + '        <a class="step-name">{{step.name}}</a>\n' + "        </li>\n" + "    </ul>\n" + '<button class="next-button wix-button is-button-large">Next</button>');
} ]);

"use strict";

try {
    angular.module("wixStyleInternal");
} catch (e) {
    angular.module("wixStyleInternal", []);
}

angular.module("wixStyleInternal").run([ "$templateCache", function($templateCache) {
    "use strict";
    $templateCache.put("views/directives/wix-search.html", '<label class="wix-search-icon wix-style-svg-font-icons-search-new"></label>\n' + '<span class="wix-search-wrapper">\n' + '  <input type="text" ng-focus="onFocusIn($event)" ng-blur="onFocusOut($event)">\n' + '  <span class="wix-search-clear wix-style-svg-font-icons-x" ng-mousedown="clearSearch($event)" ng-class="{\'visible\': shouldShowClear()}"></span>\n' + "</span>\n" + "\n");
} ]);

"use strict";

try {
    angular.module("wixStyleInternal");
} catch (e) {
    angular.module("wixStyleInternal", []);
}

angular.module("wixStyleInternal").run([ "$templateCache", function($templateCache) {
    "use strict";
    $templateCache.put("views/directives/wix-list.html", '<wix-list-item ng-repeat="item in items track by $index" ng-class="{\'empty\': item.empty}" index="{{$index}}" ng-if="!transcluded">\n' + '    <div class="wix-list-item-blue-section" ng-if="!checkableItem() && !imageSquare()"></div>\n' + "    <wix-checkbox ng-class=\"{'wix-list-item-checkbox-circular-image': !imageSquare()}\"\n" + '                  ng-if="checkableProperty" ng-model="item.checked"></wix-checkbox>\n' + '    <div class="wix-list-item-content" ng-include="contentTemplate"\n' + "         ng-class=\"imageSquare() ? 'wix-list-square-image' : 'wix-list-circular-image'\"></div>\n" + '    <div class="wix-list-draggable" ng-if="draggableItem"></div>\n' + "</wix-list-item>\n" + '<div ng-transclude="true"></div>');
} ]);

"use strict";

try {
    angular.module("wixStyleInternal");
} catch (e) {
    angular.module("wixStyleInternal", []);
}

angular.module("wixStyleInternal").run([ "$templateCache", function($templateCache) {
    "use strict";
    $templateCache.put("views/directives/wix-monthly-picker.html", '<div class="dp-wrapper"\n' + "     ng-class=\"{'is-open': dp.isOpen}\">\n" + "\n" + "    <wix-input\n" + '            readonly="true"\n' + '            placeholder="{{dp.startDate | date:dp.format}}"\n' + '            ng-model="dp.displayDate"\n' + '            ng-click="dp.toggleIsOpen($event)"></wix-input>\n' + "\n" + '    <div class="dp"\n' + "         ng-class=\"{'dp--alternate': dp.direction == 'bottom'}\">\n" + '        <div class="dp-header">\n' + '            <span class="dp-prev"\n' + '                  ng-click="dp.goPrev()"></span>\n' + "\n" + '            <span class="dp-current"\n' + '                  ng-click="dp.unpick()"\n' + '                  ng-switch="dp.state.type">\n' + '                <span ng-switch-when="year">\n' + "                    {{dp.min().year}} - {{dp.max().year}}\n" + "                </span>\n" + '                <span ng-switch-when="month">\n' + "                    {{dp.state.year}}\n" + "                </span>\n" + '                <span ng-switch-when="day">\n' + "                    {{dp.state.month | padZero}}\n" + "                </span>\n" + "            </span>\n" + "\n" + '            <span class="dp-next"\n' + '                  ng-click="dp.goNext()"></span>\n' + "        </div>\n" + "\n" + '        <div ng-show="dp.isOpen"\n' + '             ng-switch="dp.state.type">\n' + '            <div class="dp-grid dp-grid-year"\n' + '                 ng-switch-when="year">\n' + '                <div class="dp-grid-item"\n' + '                     ng-click="dp.pick(option)"\n' + '                     ng-repeat="option in dp.options().year">\n' + '                    <div class="dp-year"\n' + '                         ng-class="{\n' + "                        'dp--active': dp.isActive(option),\n" + "                        'dp--today': dp.isToday(option)\n" + '                     }">\n' + "                        {{option}}\n" + "                    </div>\n" + "                </div>\n" + "            </div>\n" + '            <div class="dp-grid dp-grid-month"\n' + '                 ng-switch-when="month">\n' + '                <div class="dp-grid-item"\n' + '                     ng-click="dp.pick(option)"\n' + '                     ng-repeat="option in dp.options().month">\n' + '                    <div class="dp-month"\n' + '                         ng-class="{\n' + "                        'dp--active': dp.isActive(option),\n" + "                        'dp--today': dp.isToday(option)\n" + '                     }">\n' + "                        {{option | padZero}}\n" + "                    </div>\n" + "                </div>\n" + "            </div>\n" + '            <div class="dp-grid dp-grid-day"\n' + '                 ng-switch-when="day">\n' + '                <div class="dp-grid-item"\n' + '                     ng-click="dp.pick(option)"\n' + '                     ng-repeat="option in dp.options().day track by $index">\n' + '                    <div class="dp-day"\n' + '                         ng-class="{\n' + "                        'dp--active': dp.isActive(option),\n" + "                        'dp--today': dp.isToday(option)\n" + '                     }">\n' + "                        {{option}}\n" + "                    </div>\n" + "                </div>\n" + "            </div>\n" + "        </div>\n" + "    </div>\n" + "\n" + "</div>\n");
} ]);

"use strict";

try {
    angular.module("wixStyleInternal");
} catch (e) {
    angular.module("wixStyleInternal", []);
}

angular.module("wixStyleInternal").run([ "$templateCache", function($templateCache) {
    "use strict";
    $templateCache.put("views/directives/calendar/day-calendar.html", "<table>\n" + "  <thead>\n" + '  <tr class="wix-day-calendar-header">\n' + "    <th>\n" + '      <button type="button" class="calendar-primary-btn calendar-arrow-btn pull-left uib-left"\n' + '              data-hook="prev"\n' + '              ng-click="$ctrl.move({ direction: -1 })" tabindex="-1">\n' + '        <i class="previous wix-style-svg-font-icons-data-picker-arrow"></i>\n' + "      </button>\n" + "    </th>\n" + '    <th colspan="5" class="title"><span data-hook="title">{{$ctrl.title}}</span></th>\n' + "    <th>\n" + '      <button type="button" class="calendar-primary-btn calendar-arrow-btn pull-right uib-right"\n' + '              data-hook="next"\n' + '              ng-click="$ctrl.move({ direction: 1 })" tabindex="-1">\n' + '        <i class="wix-style-svg-font-icons-data-picker-arrow"></i>\n' + "      </button>\n" + "    </th>\n" + "  </tr>\n" + '  <tr class="week-labels">\n' + '    <th ng-repeat="label in ::$ctrl.labels track by $index" class="text-center">\n' + '      <small aria-label="{{::label.full}}" data-hook="weekDay">{{::label.abbr}}</small>\n' + "    </th>\n" + "  </tr>\n" + "  </thead>\n" + "  <tbody>\n" + '  <tr class="uib-weeks" ng-repeat="row in $ctrl.rows track by $index">\n' + '    <td ng-repeat="dt in row"\n' + '        class="calendar-day text-center"\n' + '        id="{{::dt.uid}}"\n' + '        data-hook="day">\n' + '      <button type="button" class="calendar-primary-btn"\n' + '              data-hook="day-btn"\n' + "              ng-class=\"::[dt.customClass, {'max-date': dt.isMaxDate, 'min-date': dt.isMinDate, 'selected': dt.selected, 'active': $ctrl.active === dt}]\"\n" + '              ng-click="$ctrl.select({ date: dt.date })"\n' + '              ng-disabled="::dt.disabled"\n' + '              ng-if="::!dt.secondary">\n' + '        <span data-hook="day-label">{{::dt.label}}</span>\n' + "      </button>\n" + '      <div class="empty-state" ng-if="::dt.secondary"></div>\n' + "    </td>\n" + "  </tr>\n" + "  </tbody>\n" + "</table>");
} ]);

"use strict";

try {
    angular.module("wixStyleInternal");
} catch (e) {
    angular.module("wixStyleInternal", []);
}

angular.module("wixStyleInternal").run([ "$templateCache", function($templateCache) {
    "use strict";
    $templateCache.put("views/directives/calendar/calendar.html", '<div class="wix-calendar">\n' + "  <div uib-datepicker\n" + '       ng-model="$ctrl.internalDate"\n' + '       template-url="views/directives/calendar/patchViews/datePickerPatch.html"\n' + '       class="calendar"\n' + '       datepicker-options="$ctrl.uibOptions">\n' + "  </div>\n" + "\n" + '  <div class="control-buttons" data-hook="control-buttons" ng-if="::$ctrl.showControlButtons">\n' + '    <a data-hook="clear-btn" ng-click="$ctrl.clear()" translate="calendar.clear"></a>\n' + "  </div>\n" + "</div>");
} ]);

"use strict";

try {
    angular.module("wixStyleInternal");
} catch (e) {
    angular.module("wixStyleInternal", []);
}

angular.module("wixStyleInternal").run([ "$templateCache", function($templateCache) {
    "use strict";
    $templateCache.put("views/directives/calendar/popover-calendar.html", '<label class="popover-calendar" data-hook="popover-button">\n' + "    <ng-transclude></ng-transclude>\n" + '    <wix-popover placement="{{ $ctrl.placement }}"\n' + '                 tooltip-trigger="click click"\n' + '                 append-to-body="true"\n' + '                 is-open="$ctrl.isOpen"\n' + '                 tooltip-class="tooltip-in-dropdown popover-calendar-popover"\n' + '                 tooltip-close-on-content="true">\n' + '        <wix-calendar data-hook="popover-content-calendar"\n' + '                     on-select="$ctrl.onSelectDate($event)"\n' + '                     show-control-buttons="$ctrl.showControlButtons"\n' + '                     date="$ctrl.date"\n' + '                     options="$ctrl.options"></wix-calendar>\n' + "    </wix-popover>\n" + "</label>\n");
} ]);

"use strict";

try {
    angular.module("wixStyleInternal");
} catch (e) {
    angular.module("wixStyleInternal", []);
}

angular.module("wixStyleInternal").run([ "$templateCache", function($templateCache) {
    "use strict";
    $templateCache.put("views/directives/calendar/patchViews/datePickerPatch.html", '<div class="uib-datepicker" ng-switch="datepickerMode" data-hook="calendar" ng-keydown="keydown($event)">\n' + '    <div uib-daypicker template-url="views/directives/calendar/patchViews/dayPickerPatch.html" ng-switch-when="day" tabindex="0"></div>\n' + '    <div uib-monthpicker ng-switch-when="month" tabindex="0"></div>\n' + '    <div uib-yearpicker ng-switch-when="year" tabindex="0"></div>\n' + "</div>");
} ]);

"use strict";

try {
    angular.module("wixStyleInternal");
} catch (e) {
    angular.module("wixStyleInternal", []);
}

angular.module("wixStyleInternal").run([ "$templateCache", function($templateCache) {
    "use strict";
    $templateCache.put("views/directives/calendar/patchViews/dayPickerPatch.html", "<div>\n" + '    <wix-day-calendar labels="labels"\n' + '                   move="move(direction)"\n' + '                   data-title="title"\n' + '                   select="select(date)"\n' + '                   active="activeDt"\n' + '                   rows="rows"></wix-day-calendar>\n' + "</div>\n");
} ]);

"use strict";

try {
    angular.module("wixStyleInternal");
} catch (e) {
    angular.module("wixStyleInternal", []);
}

angular.module("wixStyleInternal").run([ "$templateCache", function($templateCache) {
    "use strict";
    $templateCache.put("views/components/modals/wix-modal-header1.html", "<div class='wix-modal--header' ng-class='$ctrl.getCssClasses()'>\n" + "<div class='wix-modal--title' data-hook='modal-title' ng-if='title'>{{title}}</div>\n" + "<div class='wix-modal--subtitle' data-hook='modal-subtitle' ng-if='subtitle'>{{subtitle}}</div>\n" + "<button class='wix-modal--close-button wix-style-svg-font-icons-close' data-hook='close-button' md-autofocus='{{autofocusOnClose}}' ng-click='onClose({$event: $event})' ng-if='onClose' type='button'></button>\n" + "</div>\n");
} ]);

"use strict";

try {
    angular.module("wixStyleInternal");
} catch (e) {
    angular.module("wixStyleInternal", []);
}

angular.module("wixStyleInternal").run([ "$templateCache", function($templateCache) {
    "use strict";
    $templateCache.put("views/components/modals/wix-modal-header2.html", "<div class='wix-modal--header' ng-class='{&#39;with-subtitle&#39;:subtitle}'>\n" + "<label>I'm header preset number 2!</label>\n" + "<div class='wix-modal--title' data-hook='modal-title' ng-if='title'>{{title}}</div>\n" + "<div class='wix-modal--subtitle' data-hook='modal-subtitle' ng-if='subtitle'>{{subtitle}}</div>\n" + "<button class='wix-modal--close-button wix-style-svg-font-icons-close' data-hook='close-button' md-autofocus='{{autofocusOnClose}}' ng-click='onClose({$event: $event})' type='button'></button>\n" + "</div>\n");
} ]);

"use strict";

try {
    angular.module("wixStyleInternal");
} catch (e) {
    angular.module("wixStyleInternal", []);
}

angular.module("wixStyleInternal").run([ "$templateCache", function($templateCache) {
    "use strict";
    $templateCache.put("views/components/modals/wix-modal-message-window.html", "<div class='wix-modal' ng-class='customClass' ng-style='customStyle'>\n" + "<div class='wix-modal--message-window' data-hook='modal-container' ng-class='style'>\n" + "<wix-modal-header1 css-class='headerClass' data-hook='modal-header' ng-if='headerPreset === 1' on-close='windowCtrl.close($event)' subtitle='subtitle' title='title'></wix-modal-header1>\n" + "<wix-modal-header2 data-hook='modal-header' ng-if='headerPreset === 2' on-close='windowCtrl.close($event)' subtitle='subtitle' title='title'></wix-modal-header2>\n" + "<div class='wix-modal--body-wrapper'>\n" + "<div class='wix-modal--body' ng-class='{&#39;wix-modal--body_footer-floating&#39; : floatingFooter}' ng-style='customBodyStyle'>\n" + "<div class='wix-modal--icon-wrapper' data-hook='modal-icon-wrapper' ng-if='iconUrl'>\n" + "<img class='wix-modal--icon' ng-src='{{iconUrl}}'>\n" + "</div>\n" + "<div class='wix-modal--content' data-hook='modal-content-inline' ng-bind-html='htmlContent' ng-if='htmlContent'></div>\n" + "<div class='wix-modal--content' data-hook='modal-content-external' ng-if='contentUrl' ng-include='contentUrl'></div>\n" + "</div>\n" + "<div class='wix-modal--footer' data-hook='modal-footer' ng-class='{&#39;wix-modal--footer_floating&#39; : floatingFooter}' ng-if='confirmButton.label || cancelButton.label'>\n" + "<button class='modal-button wix-modal--confirm-button' data-hook='modal-confirm-button' ng-class='confirmButton.buttonClass' ng-click='windowCtrl.confirm($event)' ng-if='confirmButton.label'>{{confirmButton.label}}</button>\n" + "<button class='modal-button is-button-outline wix-modal--cancel-button' data-hook='modal-cancel-button' ng-class='cancelButton.buttonClass' ng-click='windowCtrl.cancel($event)' ng-if='cancelButton.label'>{{cancelButton.label}}</button>\n" + "</div>\n" + "</div>\n" + "<div class='wix-modal--disclaimer' data-hook='modal-disclaimer' ng-if='disclaimer' translate='{{disclaimer}}'></div>\n" + "</div>\n" + "</div>\n");
} ]);

"use strict";

try {
    angular.module("wixStyleInternal");
} catch (e) {
    angular.module("wixStyleInternal", []);
}

angular.module("wixStyleInternal").run([ "$templateCache", function($templateCache) {
    "use strict";
    $templateCache.put("views/components/modals/wix-message-window.html", "<div class='wix-modal' ng-class='customClass' ng-style='customStyle'>\n" + "<div class='wix-modal--message-window' data-hook='modal-container' ng-class='style'>\n" + "<div class='wix-modal--header' data-hook='modal-header' ng-class='{&#39;with-subtitle&#39;:subtitle}' ng-if='title'>\n" + "<div class='wix-modal--title' data-hook='modal-title'>{{title}}</div>\n" + "<div class='wix-modal--subtitle' data-hook='modal-subtitle' ng-if='subtitle'>{{subtitle}}</div>\n" + "<div class='wix-modal--header-icon-wrapper' data-hook='modal-header-icon' ng-if='headerIcon'>\n" + "<img class='wix-modal--icon' ng-src='{{headerIcon}}'>\n" + "</div>\n" + "<button class='wix-modal--close-button wix-style-svg-font-icons-close' data-hook='close-button' md-autofocus='{{autofocusOnClose}}' ng-click='windowCtrl.close($event)' type='button'></button>\n" + "</div>\n" + "<div class='wix-modal--body-wrapper'>\n" + "<div class='wix-modal--body' ng-class='{&#39;wix-modal--body_footer-floating&#39; : floatingFooter}' ng-style='customBodyStyle'>\n" + "<div class='wix-modal--icon-wrapper' data-hook='modal-icon-wrapper' ng-if='iconUrl'>\n" + "<img class='wix-modal--icon' ng-src='{{iconUrl}}'>\n" + "</div>\n" + "<div class='wix-modal--content' data-hook='modal-content-inline' ng-bind-html='htmlContent' ng-if='htmlContent'></div>\n" + "<div class='wix-modal--content' data-hook='modal-content-external' ng-if='contentUrl' ng-include='contentUrl'></div>\n" + "</div>\n" + "<div class='wix-modal--footer' data-hook='modal-footer' ng-class='{&#39;wix-modal--footer_floating&#39; : floatingFooter}' ng-if='confirmButton.label || cancelButton.label'>\n" + "<button class='modal-button wix-modal--confirm-button' data-hook='modal-confirm-button' ng-class='confirmButton.buttonClass' ng-click='windowCtrl.confirm($event)' ng-if='confirmButton.label'>{{confirmButton.label}}</button>\n" + "<button class='modal-button is-button-outline wix-modal--cancel-button' data-hook='modal-cancel-button' ng-class='cancelButton.buttonClass' ng-click='windowCtrl.cancel($event)' ng-if='cancelButton.label'>{{cancelButton.label}}</button>\n" + "</div>\n" + "</div>\n" + "<div class='wix-modal--disclaimer' data-hook='modal-disclaimer' ng-if='disclaimer' translate='{{disclaimer}}'></div>\n" + "</div>\n" + "</div>\n");
} ]);

"use strict";

try {
    angular.module("wixStyleInternal");
} catch (e) {
    angular.module("wixStyleInternal", []);
}

angular.module("wixStyleInternal").run([ "$templateCache", function($templateCache) {
    "use strict";
    $templateCache.put("views/components/modals/wix-premium-window.html", "<div class='wix-modal' ng-style='customStyle'>\n" + "<div class='wix-modal--premium-window'>\n" + "<div class='wix-modal--premium-header'>\n" + "<button class='wix-modal--premium-close-button wix-style-svg-font-icons-close' md-autofocus ng-click='windowCtrl.close($event)'></button>\n" + "<div class='wix-modal--premium-title'>{{title}}</div>\n" + "<div class='wix-modal--premium-sub-title'>{{subtitle}}</div>\n" + "</div>\n" + "<div class='wix-modal--premium-modal-body'>\n" + "<img class='wix-modal--premium-icon' ng-show='iconUrl' ng-src='{{iconUrl}}'>\n" + "<div class='wix-modal--premium-content'>{{htmlContent}}</div>\n" + "<div class='wix-modal--premium-buttons'>\n" + "<button class='wix-modal--premium-confirm-button' ng-class='confirmButton.buttonClass' ng-click='windowCtrl.confirm($event)' ng-show='confirmButton'>{{confirmButton.label}}</button>\n" + "<button class='wix-modal--premium-cancel-button' ng-class='cancelButton.buttonClass' ng-click='windowCtrl.cancel($event)' ng-show='cancelButton'>{{cancelButton.label}}</button>\n" + "</div>\n" + "</div>\n" + "</div>\n" + "</div>\n");
} ]);

"use strict";

try {
    angular.module("wixStyleInternal");
} catch (e) {
    angular.module("wixStyleInternal", []);
}

angular.module("wixStyleInternal").run([ "$templateCache", function($templateCache) {
    "use strict";
    $templateCache.put("views/components/modals/wix-modal-custom-example.html", "<div class='wix-modal-custom-example-class'>\n" + "<div>Hey I'm a custom modal</div>\n" + "<button class='wix-button' ng-click='myCustomController.confirm($event)'>Click to Close</button>\n" + "<label>{{myCustomController.footer}}</label>\n" + "</div>\n");
} ]);

"use strict";

try {
    angular.module("wixStyleInternal");
} catch (e) {
    angular.module("wixStyleInternal", []);
}

angular.module("wixStyleInternal").provider("wixStyleConfig", function() {
    var _newWixInput = false;
    return {
        useNewWixInput: function(decision) {
            _newWixInput = decision;
        },
        $get: function wixStyleFactory() {
            return {
                shouldUseNewWixInput: function() {
                    return _newWixInput;
                }
            };
        }
    };
});

angular.module("wixStyle", [ "wixStyleInternal", "styleTranslations", "rzModule" ]).config(function() {
    return;
});

angular.module("wixStyleMaterialInternal", []);

angular.module("wixStyleMaterial", [ "wixStyleMaterialInternal", "wixStyle", "ngMaterial" ]).config(function() {
    return;
});

"use strict";

angular.module("wixStyleInternal").value("TODAY", {
    DATE: new Date()
}).factory("DateService", [ "$window", "TODAY", function($window, TODAY) {
    return {
        getToday: function() {
            return TODAY.DATE;
        }
    };
} ]);

"use strict";

(function() {
    WixMdDialogBuilder.$inject = [ "provider", "$sce", "$rootScope" ];
    function WixMdDialogBuilder(provider, $sce, $rootScope) {
        var ALERT_TYPES = {
            DANGER: {
                wrapperClass: "wix-modal--danger",
                buttonClass: "wix-button-danger is-button-small"
            },
            ALERT: {
                wrapperClass: "wix-modal--alert",
                buttonClass: "wix-button is-button-small"
            }
        };
        function BaseModal(scope) {
            this.scope = scope;
            this.title = function(value) {
                scope.title = value;
                return this;
            };
            this.subtitle = function(value) {
                scope.subtitle = value;
                return this;
            };
            this.content = function(value) {
                scope.htmlContent = $sce.trustAsHtml(value);
                return this;
            };
            this.contentUrl = function(url) {
                scope.contentUrl = url;
                return this;
            };
            this.iconUrl = function(url) {
                scope.iconUrl = url;
                return this;
            };
            this.windowClass = function(value) {
                this.modalClass = value;
                return this;
            };
            this.modalController = function(controllerName) {
                this.controller = controllerName;
                return this;
            };
            this.modalControllerAs = function(controllerAs) {
                this.controllerAs = controllerAs;
                return this;
            };
            this.customStyle = function(style) {
                scope.customStyle = style || {};
                return this;
            };
            this.customBodyStyle = function(style) {
                scope.customBodyStyle = style || {};
                return this;
            };
            this.customClass = function(className) {
                scope.customClass = className || "";
                return this;
            };
            this.disclaimer = function(disclaimer) {
                scope.disclaimer = disclaimer;
                return this;
            };
            this.autofocusOnClose = function(autofocusOnClose) {
                scope.autofocusOnClose = autofocusOnClose === undefined ? true : autofocusOnClose;
                return this;
            };
            this.modalLocals = function(locals) {
                this.locals = {
                    locals: locals || {}
                };
                return this;
            };
            this.floatingFooter = function(value) {
                scope.floatingFooter = value;
                return this;
            };
            this.headerIcon = function(value) {
                scope.headerIcon = value;
                return this;
            };
            this.windowClass("").modalController("mdMessageWindowCtrl").modalControllerAs("windowCtrl");
            this.withParent = function(elementOrSelector) {
                var element = typeof elementOrSelector === "string" ? angular.element(document.querySelector(elementOrSelector)) : elementOrSelector;
                this.parent = element;
                return this;
            };
            if (provider.parent) {
                this.withParent(provider.parent);
            }
        }
        this.alert = function() {
            var scope = $rootScope.$new();
            var alertModal = new BaseModal(scope);
            alertModal.scope.style = ALERT_TYPES.ALERT.wrapperClass;
            alertModal.scope.confirmButton = {
                buttonClass: ALERT_TYPES.ALERT.buttonClass
            };
            alertModal.scope.cancelButton = {
                buttonClass: ALERT_TYPES.ALERT.buttonClass
            };
            alertModal.templateUrl = "views/components/modals/wix-message-window.html";
            alertModal.confirm = function(text) {
                alertModal.scope.confirmButton.label = text;
                return this;
            };
            alertModal.cancel = function(text) {
                alertModal.scope.cancelButton.label = text;
                return this;
            };
            alertModal.style = function(type) {
                var selectedType = ALERT_TYPES[type];
                if (selectedType !== undefined) {
                    this.scope.style = selectedType.wrapperClass;
                    this.scope.confirmButton.buttonClass = selectedType.buttonClass;
                    this.scope.cancelButton.buttonClass = selectedType.buttonClass;
                }
                return this;
            };
            return alertModal;
        };
        this.premium = function() {
            var scope = $rootScope.$new();
            var premiumModal = new BaseModal(scope);
            premiumModal.templateUrl = "views/components/modals/wix-premium-window.html";
            premiumModal.subtitle = function(text) {
                this.scope.subtitle = text;
                return this;
            };
            premiumModal.confirm = function(label, buttonClass) {
                this.scope.confirmButton = {
                    label: label,
                    buttonClass: buttonClass
                };
                return this;
            };
            premiumModal.cancel = function(label, buttonClass) {
                this.scope.cancelButton = {
                    label: label,
                    buttonClass: buttonClass
                };
                return this;
            };
            return premiumModal;
        };
    }
    angular.module("wixStyleMaterialInternal").provider("wixMdDialogBuilder", function() {
        this.setParent = function(parent) {
            this.parent = parent;
        };
        this.$get = [ "$injector", function($injector) {
            return $injector.instantiate(WixMdDialogBuilder, {
                provider: this
            });
        } ];
        this.$get.$inject = [ "$injector" ];
    });
})();

"use strict";

(function() {
    WixMdToastBuilder.$inject = [ "provider", "$log" ];
    function WixMdToastBuilder(provider, $log) {
        var template = '<md-toast ng-class="toastCtrl.getToastClass()">' + '<div class="wix-md-notification-wrapper">' + '<div ng-class="toastCtrl.icon.cssClasses" ng-show = "toastCtrl.icon.visible">' + '<img ng-src = "{{toastCtrl.icon.url}}"/>' + "</div>" + '<div class="wix-md-notification-content" ng-bind="toastCtrl.content"></div>' + '<a ng-class="toastCtrl.action.cssClass" ng-show="toastCtrl.action.visible" ng-click="toastCtrl.action.onClick($event)" ng-href="{{toastCtrl.action.url}}" target="{{toastCtrl.action.targetType}}">{{toastCtrl.action.text}}</a>' + '<button class="wix-md-notification-button wix-md-notification-close" ng-show="toastCtrl.closeVisible" ng-click="toastCtrl.close()"><svg version="1.1" id="Layer_1" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10px" x="0px" y="0px" viewBox="-2.4 21.6 9.7 9.7" style="enable-background:new -2.4 21.6 9.7 9.7;" xml:space="preserve"><polygon points="7.3,22.4 6.6,21.6 2.5,25.8 -1.6,21.6 -2.4,22.4 1.8,26.5 -2.4,30.6 -1.6,31.3 2.5,27.2 6.6,31.3 7.3,30.6 3.2,26.5 "/></svg></button>' + "</div>" + "</md-toast>";
        var allowedTypes = {
            general: "general",
            warning: "warning",
            error: "error",
            success: "success"
        };
        var allowedActionTypes = {
            none: "none",
            button: "button",
            link: "link"
        };
        var allowedTargetTypes = {
            blank: "_blank",
            self: "_self"
        };
        var unSupportedFeatures = {
            warning: {
                showAction: {
                    name: "action",
                    functionName: "showAction"
                },
                showIcon: {
                    name: "icon",
                    functionName: "showIcon"
                },
                showCloseButton: {
                    name: "close",
                    functionName: "showCloseButton"
                },
                showFullWidth: {
                    name: "full width",
                    functionName: "showFullWidth"
                }
            }
        };
        function removeUnSupportedFeatures(toastType, toastObject) {
            angular.forEach(unSupportedFeatures[toastType], function(unSupportedFeature) {
                toastObject[unSupportedFeature.functionName] = function() {
                    $log.error(unSupportedFeature.name + " on " + toastType + " is not supported");
                    return this;
                };
            });
        }
        function BaseToast(tType) {
            var toastType = allowedTypes[tType] || allowedTypes.general;
            this.controller = "wixToastController";
            this.controllerAs = "toastCtrl";
            this.position = "top";
            this.template = template;
            this.autoHide = 5e3;
            this.promise = {};
            this.locals = {
                content: "",
                isFullWidth: false,
                type: toastType,
                isLightColored: false,
                action: {
                    type: allowedActionTypes.none,
                    text: "",
                    onClick: angular.noop,
                    url: "",
                    targetType: allowedTargetTypes.blank
                },
                icon: {
                    url: "",
                    cssClass: "",
                    isDark: false
                }
            };
            this.autoHide = function(milliSeconds) {
                this.hideDelay = parseInt(milliSeconds, 10);
                return this;
            };
            this.content = function(value) {
                this.locals.content = value;
                return this;
            };
            this.showLightColored = function() {
                this.locals.isLightColored = true;
                return this;
            };
            this.showFullWidth = function() {
                this.locals.isFullWidth = true;
                return this;
            };
            this.showCloseButton = function() {
                this.locals.closeVisible = true;
                return this;
            };
            this.showAction = function(opts) {
                var options = opts || {}, actionType, actionOnClick, actionUrl, actionTargetType;
                actionType = allowedActionTypes[options.type] || "";
                actionOnClick = options.onClick ? options.onClick : angular.noop;
                actionUrl = options.url ? options.url : "";
                actionTargetType = options.url && options.targetType ? options.targetType : allowedTargetTypes.blank;
                if (actionType) {
                    this.locals.action = {
                        type: actionType,
                        text: options.text,
                        onClick: actionOnClick,
                        url: actionUrl,
                        targetType: actionTargetType
                    };
                }
                return this;
            };
            this.showIcon = function(opts) {
                var options = opts || {};
                this.locals.icon.url = options.url || "";
                this.locals.icon.cssClass = options.cssClass || "";
                this.locals.icon.isDark = options.isDark || false;
                return this;
            };
            this.withParent = function(elementOrSelector) {
                var element = typeof elementOrSelector === "string" ? angular.element(document.querySelector(elementOrSelector)) : elementOrSelector;
                this.parent = element;
                this.locals.parent = element;
                this.locals.hasParent = true;
                return this;
            };
            if (provider.parent) {
                this.withParent(provider.parent);
            }
        }
        this.toastTypes = allowedTypes;
        this.actionTypes = allowedActionTypes;
        this.targetTypes = allowedTargetTypes;
        angular.forEach(allowedTypes, function(value, key) {
            this[key] = function() {
                var alertToast = new BaseToast(allowedTypes[key]);
                removeUnSupportedFeatures(key, alertToast);
                return alertToast;
            };
        }, this);
    }
    angular.module("wixStyleMaterialInternal").provider("wixMdToastBuilder", function() {
        this.setParent = function(parent) {
            this.parent = parent;
        };
        this.$get = [ "$injector", function($injector) {
            return $injector.instantiate(WixMdToastBuilder, {
                provider: this
            });
        } ];
        this.$get.$inject = [ "$injector" ];
    });
})();

var WixStyle;

(function(WixStyle) {
    var WixDirectivesUtils = function() {
        function WixDirectivesUtils() {
            this.attrsToExcludeInMove = [];
        }
        WixDirectivesUtils.prototype.moveAttributesToChild = function(parent, child, attrs, attrsToExclude) {
            var excludes = this.attrsToExcludeInMove.concat(attrsToExclude);
            for (var attrCamelCase in attrs.$attr) {
                if (attrs.$attr.hasOwnProperty(attrCamelCase) && excludes.indexOf(attrCamelCase) === -1) {
                    var attrKebabCase = attrs.$attr[attrCamelCase];
                    var attrValue = attrs[attrCamelCase];
                    child.attr(attrKebabCase, attrValue);
                    parent.removeAttr(attrKebabCase);
                    if (attrCamelCase === "id") {
                        delete attrs["id"];
                        delete attrs.$attr["id"];
                    }
                }
            }
        };
        WixDirectivesUtils.prototype.getStringOrObject = function(ztring) {
            try {
                return angular.fromJson(ztring);
            } catch (error) {
                return ztring;
            }
        };
        return WixDirectivesUtils;
    }();
    WixStyle.WixDirectivesUtils = WixDirectivesUtils;
    angular.module("wixStyleInternal").service("wixDirectivesUtils", WixDirectivesUtils);
})(WixStyle || (WixStyle = {}));

"use strict";

var MdMessageWindowCtrl = function() {
    MdMessageWindowCtrl.$inject = [ "$injector", "$mdDialog" ];
    function MdMessageWindowCtrl($injector, $mdDialog) {
        this.$mdDialog = $mdDialog;
        var locals;
        try {
            locals = $injector.get("locals");
        } catch (e) {
            locals = {};
        }
        angular.extend(this, locals);
    }
    MdMessageWindowCtrl.prototype.close = function($event) {
        this.$mdDialog.cancel();
        $event.stopImmediatePropagation();
    };
    MdMessageWindowCtrl.prototype.cancel = function($event) {
        this.$mdDialog.cancel();
        $event.stopImmediatePropagation();
    };
    MdMessageWindowCtrl.prototype.confirm = function($event) {
        this.$mdDialog.hide();
        $event.stopImmediatePropagation();
    };
    return MdMessageWindowCtrl;
}();

angular.module("wixStyleMaterialInternal").controller("mdMessageWindowCtrl", MdMessageWindowCtrl);

"use strict";

(function() {
    WixToastController.$inject = [ "$scope", "$mdToast", "locals", "$document", "$timeout" ];
    function WixToastController($scope, $mdToast, locals, $document, $timeout) {
        var _self = this;
        var placeholderElementClass = "wix-style-md-material-toast-full-width-placeholder";
        var placeholderElement = angular.element('<div class="' + placeholderElementClass + '"></div>');
        var parentElement = locals.hasParent ? locals.parent : $document.find("body");
        var SHOW_DURATION = 450;
        var HIDE_DURATION = 300;
        function displayPlaceholder() {
            parentElement.prepend(placeholderElement);
            $timeout(function() {
                placeholderElement.addClass(placeholderElementClass + "-open");
            }, 0);
        }
        function removePlaceholder() {
            placeholderElement.removeClass(placeholderElementClass + "-open");
            $timeout(function() {
                placeholderElement.remove();
            }, HIDE_DURATION);
        }
        function manageParentOverflowStyle(duration) {
            parentElement.css("overflow", "hidden");
            $timeout(function() {
                parentElement.css("overflow", "");
            }, duration);
        }
        if (locals.hasParent) {
            manageParentOverflowStyle(SHOW_DURATION);
        }
        if (locals.isFullWidth) {
            displayPlaceholder();
        }
        this.closeVisible = locals.closeVisible;
        this.content = locals.content;
        this.action = angular.extend(locals.action);
        this.action.visible = locals.action.type !== "none";
        Object.defineProperty(this.action, "cssClass", {
            get: function() {
                var cssClasses = [ "wix-md-notification-action", "wix-md-notification-action-" + locals.action.type ];
                if (locals.action.type === "button") {
                    cssClasses.push("wix-button");
                    cssClasses.push("wix-md-notification-button");
                    cssClasses.push("is-button-small");
                }
                return cssClasses;
            }
        });
        this.icon = angular.extend(locals.icon);
        this.icon.visible = locals.icon.url !== "";
        Object.defineProperty(this.icon, "cssClasses", {
            get: function() {
                var cssClasses = [ "wix-md-notification-icon-wrapper" ];
                if (locals.icon.cssClass) {
                    cssClasses.push(locals.icon.cssClass);
                }
                if (locals.icon.isDark) {
                    cssClasses.push("wix-md-notification-icon-wrapper-dark");
                }
                return cssClasses;
            }
        });
        this.getToastClass = function() {
            var cssClasses = [ "wix-md-notification-container", "wix-md-notification-" + locals.type ];
            if (locals.isLightColored) {
                cssClasses.push("wix-md-notification-light");
            }
            if (locals.isFullWidth) {
                cssClasses.push("wix-md-notification-full-width");
            }
            if (_self.closeVisible) {
                cssClasses.push("wix-md-notification-with-close");
            }
            if (locals.hasParent) {
                cssClasses.push("wix-md-notification-under-parent");
            }
            return cssClasses;
        };
        this.close = function() {
            $mdToast.hide();
            onClose();
        };
        $scope.$on("$destroy", function() {
            onClose();
        });
        function onClose() {
            removePlaceholder();
            if (locals.hasParent) {
                manageParentOverflowStyle(HIDE_DURATION);
            }
        }
    }
    angular.module("wixStyleMaterialInternal").controller("wixToastController", WixToastController);
})();

"use strict";

var MessageWindowCtrl = function() {
    MessageWindowCtrl.$inject = [ "modal" ];
    function MessageWindowCtrl(modal) {
        this.modal = modal;
    }
    MessageWindowCtrl.prototype.close = function($event) {
        this.modal.close("CLOSE");
        $event.stopImmediatePropagation();
    };
    MessageWindowCtrl.prototype.cancel = function($event) {
        this.modal.close("CANCEL");
        $event.stopImmediatePropagation();
    };
    MessageWindowCtrl.prototype.confirm = function($event) {
        this.modal.close("CONFIRM");
        $event.stopImmediatePropagation();
    };
    return MessageWindowCtrl;
}();

angular.module("wixStyleInternal").controller("MessageWindowCtrl", MessageWindowCtrl);

"use strict";

var WixModalCustomExample = function() {
    WixModalCustomExample.$inject = [ "modal", "footer" ];
    function WixModalCustomExample(modal, footer) {
        this.modal = modal;
        this.footer = footer;
    }
    WixModalCustomExample.prototype.confirm = function($event) {
        this.modal.close("CONFIRM");
        $event.stopImmediatePropagation();
    };
    return WixModalCustomExample;
}();

angular.module("wixStyleInternal").controller("WixModalCustomExample", WixModalCustomExample);

"use strict";

(function() {
    function dropdown() {
        return {
            templateUrl: "views/directives/wix-dropdown.html",
            restrict: "E",
            scope: {
                openOnClick: "=openOnClick",
                items: "=items",
                selectedItem: "=?selectedItem",
                ngDisabled: "=ngDisabled"
            },
            link: function postLink(scope) {
                if (scope.items && !scope.selectedItem) {
                    var firstItem = scope.items[0];
                    firstItem.selected = true;
                    scope.selectedItem = firstItem;
                }
                scope.openDropdown = function() {
                    scope.isOpen = !scope.isOpen && !scope.ngDisabled;
                };
                scope.selectOption = function(item) {
                    if (!item) {
                        throw new Error("item is missing");
                    }
                    if (scope.selectedItem) {
                        scope.selectedItem.selected = false;
                    }
                    item.selected = true;
                    scope.selectedItem = item;
                    scope.isOpen = false;
                };
            }
        };
    }
    angular.module("wixStyleInternal").directive("wixDropdown", dropdown);
})();

(function() {
    wixToggle.$inject = [ "wixDirectivesUtils", "$compile" ];
    function wixToggle(wixDirectivesUtils, $compile) {
        return {
            template: '<label class="wix-toggle" allow-propagation-from="input">\n          <input type="checkbox" />\n          <span>\n            <i class="toggle-circle"></i>\n          </span>\n        </label>',
            restrict: "E",
            priority: 550,
            terminal: true,
            compile: function(element, $attrs) {
                var input = element.find("input");
                wixDirectivesUtils.moveAttributesToChild(element, input, $attrs, [ "ngRepeat", "ngIf" ]);
                return function postLink($scope, $element) {
                    $compile($element.find("label"))($scope);
                };
            }
        };
    }
    angular.module("wixStyleInternal").directive("wixToggle", wixToggle);
})();

"use strict";

(function() {
    wixInputNew.$inject = [ "wixDirectivesUtils", "$compile" ];
    wixInputOld.$inject = [ "wixDirectivesUtils", "$compile" ];
    innerInput.$inject = [ "wixStyleConfig" ];
    function wixInputNew(wixDirectivesUtils, $compile) {
        return {
            restrict: "E",
            transclude: true,
            priority: 550,
            terminal: true,
            template: '<div class="wix-input"><input data-hook="input"/><i class="icon wix-style-svg-font-icons-validation" data-hook="tooltip"></i></div>',
            compile: function(element, $attrs) {
                var input = element.find("input");
                wixDirectivesUtils.moveAttributesToChild(element, input, $attrs, [ "ngRepeat", "ngIf" ]);
                return function postLink(scope, element, attrs, controller, transcludeFn) {
                    init();
                    function init() {
                        $compile(element[0].querySelector(".wix-input"))(scope);
                        buildErrorMessagesWithTooltip();
                    }
                    function buildErrorMessagesWithTooltip() {
                        var errorMessage = attrs.errorMessage;
                        if (errorMessage) {
                            addTooltip(errorMessage, attrs.errorTooltipClass);
                        } else {
                            var errorMessages = wixDirectivesUtils.getStringOrObject(attrs.errorMessages);
                            if (typeof errorMessages === "object") {
                                var errorMessagesTemplate = getValidationMessages(errorMessages);
                                addTooltip(errorMessagesTemplate, attrs.errorTooltipClass);
                            } else {
                                transcludeFn(scope, function(clone) {
                                    var content = clone.find("error-message").parent()[0];
                                    if (content) {
                                        var errorMessagesTemplate = content.outerHTML.replace(/error-message/g, "ng-message");
                                        addTooltip(errorMessagesTemplate, attrs.errorTooltipClass);
                                    }
                                });
                            }
                        }
                        function addTooltip(errorMessagesTemplate, tooltipClass) {
                            var icon = element.find("i");
                            icon.attr("wix-tooltip", "");
                            icon.attr("tooltip-template", errorMessagesTemplate);
                            icon.attr("tooltip-scope", "tooltipScope");
                            icon.attr("placement", "top");
                            icon.attr("append-to-body", "true");
                            icon.attr("max-width", "250px");
                            icon.attr("tooltip-class", tooltipClass || "");
                            compileIcon(icon);
                        }
                        function getValidationMessages(errorMessages) {
                            var template = '<ng-messages for="error">';
                            for (var errorKey in errorMessages) {
                                if (errorMessages.hasOwnProperty(errorKey)) {
                                    template += '<ng-message when="' + errorKey + '">' + errorMessages[errorKey] + "</ng-message>";
                                }
                            }
                            template += "</ng-messages>";
                            return template;
                        }
                        function compileIcon(icon) {
                            var iconScope = scope.$new(true);
                            var inputCtrls = element.find("input").controller("ngModel");
                            iconScope.tooltipScope = {
                                error: inputCtrls && inputCtrls.$error
                            };
                            $compile(icon)(iconScope);
                        }
                    }
                };
            }
        };
    }
    function innerInput(wixStyleConfig) {
        return {
            restrict: "E",
            require: "?ngModel",
            link: {
                pre: function(scope, element, attr, ctrls) {
                    if (wixStyleConfig.shouldUseNewWixInput()) {
                        return;
                    }
                    var parentFn = element.parents || element.parent;
                    var wixInputCtrls = parentFn.call(element, "wix-input").controller("ngModel");
                    if (ctrls && wixInputCtrls) {
                        var outerSetValidity = wixInputCtrls.$setValidity;
                        var innerSetValidity = ctrls.$setValidity;
                        ctrls.$setValidity = function() {
                            outerSetValidity.apply(wixInputCtrls, arguments);
                            innerSetValidity.apply(ctrls, arguments);
                        };
                    }
                }
            }
        };
    }
    function wixInputOld(wixDirectivesUtils, $compile) {
        return {
            restrict: "E",
            require: "?ngModel",
            transclude: true,
            template: '<div class="wix-input"><input data-hook="input"/><i class="icon wix-style-svg-font-icons-validation" data-hook="tooltip"></i></div>',
            compile: function(element, $attrs, transcludeFn) {
                function replaceToTextArea() {
                    var input = element.find("input");
                    input.replaceWith(angular.element('<textarea data-hook="textarea"></textarea>'));
                }
                function addTooltip(errorMessagesTemplate, tooltipClass) {
                    var icon = element.find("i");
                    icon.attr("wix-tooltip", "");
                    icon.attr("tooltip-template", errorMessagesTemplate);
                    icon.attr("tooltip-scope", "tooltipScope");
                    icon.attr("placement", "top");
                    icon.attr("append-to-body", "true");
                    icon.attr("max-width", "250px");
                    icon.attr("tooltip-class", tooltipClass || "");
                }
                var rows = $attrs.$attr.rows;
                if (rows) {
                    replaceToTextArea();
                }
                var errorMessage = $attrs.errorMessage;
                if (errorMessage) {
                    var errorType = $attrs.errorType || "tooltip";
                    if (errorType === "tooltip") {
                        addTooltip(errorMessage, $attrs.errorTooltipClass);
                    }
                }
                var inputOrTextarea = element.find(rows ? "textarea" : "input");
                wixDirectivesUtils.moveAttributesToChild(element, inputOrTextarea, $attrs);
                return {
                    post: function(scope, element, attrs, controller) {
                        function getValidationMessages(errorMessages) {
                            var template = '<ng-messages for="error">';
                            for (var errorKey in errorMessages) {
                                if (errorMessages.hasOwnProperty(errorKey)) {
                                    template += '<ng-message when="' + errorKey + '">' + errorMessages[errorKey] + "</ng-message>";
                                }
                            }
                            template += "</ng-messages>";
                            return template;
                        }
                        function compileIcon() {
                            var icon = element.find("i");
                            var iconScope = scope.$new(true);
                            iconScope.tooltipScope = {
                                error: controller && controller.$error
                            };
                            $compile(icon)(iconScope);
                        }
                        var errorMessages = wixDirectivesUtils.getStringOrObject(attrs.errorMessages);
                        if (typeof errorMessages === "object") {
                            var errorType = attrs.errorType || "tooltip";
                            if (errorType === "tooltip") {
                                var errorMessagesTemplate = getValidationMessages(errorMessages);
                                addTooltip(errorMessagesTemplate, attrs.errorTooltipClass);
                                compileIcon();
                            }
                        }
                        transcludeFn(scope, function(clone) {
                            var content = clone.find("error-message").parent()[0];
                            if (content) {
                                var errorMessagesTemplate = content.outerHTML.replace(/error-message/g, "ng-message");
                                addTooltip(errorMessagesTemplate);
                                compileIcon();
                            }
                        });
                    }
                };
            }
        };
    }
    angular.module("wixStyleInternal").directive("input", innerInput).directive("wixInput", [ "wixDirectivesUtils", "$compile", "wixStyleConfig", function(wixDirectivesUtils, $compile, wixStyleConfig) {
        if (wixStyleConfig.shouldUseNewWixInput()) {
            return wixInputNew(wixDirectivesUtils, $compile);
        } else {
            return wixInputOld(wixDirectivesUtils, $compile);
        }
    } ]);
})();

"use strict";

(function() {
    wixTextarea.$inject = [ "wixDirectivesUtils", "$compile" ];
    function wixTextarea(wixDirectivesUtils, $compile) {
        return {
            template: '<div class="wix-textarea"><textarea data-hook="textarea"></textarea></div>',
            restrict: "E",
            priority: 550,
            terminal: true,
            compile: function(element, $attrs) {
                var input = element.find("textarea");
                wixDirectivesUtils.moveAttributesToChild(element, input, $attrs, [ "ngRepeat", "ngIf" ]);
                return function postLink($scope, $element) {
                    $compile($element.find("textarea"))($scope);
                };
            }
        };
    }
    angular.module("wixStyleInternal").directive("wixTextarea", wixTextarea);
})();

"use strict";

angular.module("wixStyleInternal").directive("wixInputContainer", function() {
    return {
        restrict: "E",
        link: function(scope, element, attrs) {
            var input = element.find("input");
            var icon = element.find("i");
            if (icon.length > 0) {
                addIconToInput();
            }
            function addIconToInput() {
                var iconWrapper = angular.element('<div class="icon-container"></div>');
                if (icon.attr("class").indexOf("error-icon-red") !== -1) {
                    icon.addClass("wix-style-svg-font-icons-validation");
                }
                iconWrapper.append(input);
                iconWrapper.append(icon);
                element.append(iconWrapper);
            }
        }
    };
});

"use strict";

(function() {
    WixModal.$inject = [ "$q", "$sce", "$templateCache", "$http", "$rootScope", "$controller", "$compile", "$document" ];
    var _defaults = Object.create(null);
    _defaults.bodyClass = "wix-modal-body-open";
    _defaults.width = 564;
    function defaults(options) {
        for (var key in _defaults) {
            if (options[key] === undefined) {
                options[key] = _defaults[key];
            }
        }
    }
    function toUniqueClassesString(bodyClassNamesStack) {
        return bodyClassNamesStack.filter(function(className, index) {
            return bodyClassNamesStack.indexOf(className) === index;
        }).join(" ");
    }
    function WixModal($q, $sce, $templateCache, $http, $rootScope, $controller, $compile, $document) {
        var ALERT_TYPES = {
            DANGER: {
                wrapperClass: "wix-modal--danger",
                buttonClass: "wix-button-danger is-button-small",
                headerClass: "wix-modal-header-danger"
            },
            ALERT: {
                wrapperClass: "wix-modal--alert",
                buttonClass: "wix-button is-button-small",
                headerClass: "wix-modal-header-alert"
            }
        };
        var body = $document.find("body");
        var modalStack = [];
        var focusedElementsStack = [];
        var bodyClassNamesStack = [];
        var self = this;
        self.modalContainer = null;
        function BaseModal(scope) {
            this.scope = scope;
            this.modalClass = "";
            this.escapeToClose = true;
            this.clickOutsideToClose = true;
            this.enterToConfirm = false;
            this.title = function(value) {
                scope.title = value;
                if (!scope.headerPreset) {
                    this.setHeaderPresetNumberOne();
                }
                return this;
            };
            this.locals = function(localsObject) {
                this.locals = localsObject;
                return this;
            };
            this.subtitle = function(value) {
                scope.subtitle = value;
                return this;
            };
            this.setHeaderPresetNumberOne = function() {
                scope.headerPreset = 1;
                return this;
            };
            this.setHeaderPresetNumberTwo = function() {
                scope.headerPreset = 2;
                return this;
            };
            this.disclaimer = function(disclaimer) {
                scope.disclaimer = disclaimer;
                return this;
            };
            this.customBodyStyle = function(style) {
                scope.customBodyStyle = style || {};
                return this;
            };
            this.modalController = function(controllerName) {
                this.controller = controllerName;
                return this;
            };
            this.modalControllerAs = function(controllerAs) {
                this.controllerAs = controllerAs;
                return this;
            };
            this.modalTemplateUrl = function(templateUrl) {
                this.template = null;
                this.templateUrl = templateUrl;
                return this;
            };
            this.modalTemplate = function(template) {
                this.templateUrl = null;
                this.template = template;
                return this;
            };
            this.modalEscapeToClose = function(escapeToClose) {
                this.escapeToClose = escapeToClose;
                return this;
            };
            this.modalEnterToConfirm = function(enterToConfirm) {
                this.enterToConfirm = enterToConfirm;
                return this;
            };
            this.modalClickOutsideToClose = function(clickOutsideToClose) {
                this.clickOutsideToClose = clickOutsideToClose;
                return this;
            };
            this.customStyle = function(style) {
                scope.customStyle = style || {};
                return this;
            };
            this.floatingFooter = function(value) {
                scope.floatingFooter = value;
                return this;
            };
            this.contentUrl = function(url) {
                scope.contentUrl = url;
                return this;
            };
            this.content = function(value) {
                scope.htmlContent = $sce.trustAsHtml(value);
                return this;
            };
            this.iconUrl = function(url) {
                scope.iconUrl = url;
                return this;
            };
            this.windowClass = function(value) {
                this.modalClass = value;
                return this;
            };
            this.openedBodyClass = function(value) {
                this.bodyClass = value;
                return this;
            };
            this.confirm = function(text, buttonClass) {
                this.scope.confirmButton = this.scope.confirmButton || {};
                this.scope.confirmButton = {
                    buttonClass: buttonClass || this.scope.confirmButton.buttonClass,
                    label: text || this.scope.confirmButton.label
                };
                return this;
            };
            this.cancel = function(text, buttonClass) {
                this.scope.cancelButton = this.scope.cancelButton || {};
                this.scope.cancelButton = {
                    buttonClass: buttonClass || this.scope.cancelButton.buttonClass,
                    label: text || this.scope.cancelButton.label
                };
                return this;
            };
        }
        this.base = function() {
            var scope = $rootScope.$new();
            var baseModal = new BaseModal(scope);
            baseModal.modalTemplateUrl("views/components/modals/wix-modal-message-window.html");
            baseModal.modalController("MessageWindowCtrl");
            baseModal.modalControllerAs("windowCtrl");
            baseModal.scope.style = "wix-modal--base";
            return baseModal;
        };
        this.alert = function() {
            var alertModal = this.base();
            function setAlertType(type) {
                var selectedType = ALERT_TYPES[type];
                if (selectedType === undefined) {
                    return;
                }
                alertModal.scope.style = selectedType.wrapperClass;
                alertModal.scope.headerClass = selectedType.headerClass;
                alertModal.confirm(null, selectedType.buttonClass);
                alertModal.cancel(null, selectedType.buttonClass);
            }
            setAlertType("ALERT");
            alertModal.style = function(type) {
                setAlertType(type);
                return this;
            };
            return alertModal;
        };
        this.danger = function() {
            var dangerModal = this.alert();
            dangerModal.style("DANGER");
            return dangerModal;
        };
        this.premium = function() {
            var scope = $rootScope.$new();
            var premiumModal = new BaseModal(scope);
            premiumModal.templateUrl = "views/components/modals/wix-premium-window.html";
            premiumModal.controller = "MessageWindowCtrl";
            premiumModal.controllerAs = "windowCtrl";
            premiumModal.subtitle = function(text) {
                this.scope.subtitle = text;
                return this;
            };
            premiumModal.confirm = function(label, buttonClass) {
                this.scope.confirmButton = {
                    label: label,
                    buttonClass: buttonClass
                };
                return this;
            };
            premiumModal.cancel = function(label, buttonClass) {
                this.scope.cancelButton = {
                    label: label,
                    buttonClass: buttonClass
                };
                return this;
            };
            return premiumModal;
        };
        function getTemplate(template, templateUrl) {
            if (templateUrl) {
                return $http({
                    method: "GET",
                    url: templateUrl,
                    cache: $templateCache
                }).then(function(response) {
                    return response.data;
                });
            } else {
                return $q.when(template);
            }
        }
        function removeModal(modalElement, options) {
            removeBackDrop(options);
            if (focusedElementsStack.length) {
                focusedElementsStack.pop().focus();
            }
            modalElement.remove();
        }
        function removeBackDrop(options) {
            if (modalStack.length === 0) {
                self.modalContainer.off("click");
                body.off("keyup");
                self.modalContainer.remove();
                self.modalContainer = null;
            }
            dropClassName(options.bodyClass);
        }
        function dropClassName(bodyClass) {
            var index = bodyClassNamesStack.indexOf(bodyClass);
            body.removeClass(toUniqueClassesString(bodyClassNamesStack));
            if (index > -1) {
                bodyClassNamesStack.splice(index, 1);
            }
            body.addClass(toUniqueClassesString(bodyClassNamesStack));
        }
        function addBackDrop(options) {
            bodyClassNamesStack.push(options.bodyClass);
            body.addClass(toUniqueClassesString(bodyClassNamesStack));
            if (self.modalContainer === null) {
                self.modalContainer = angular.element('<div class="wix-modal wix-modal--container"></div>');
                body.append(self.modalContainer);
                if (options.escapeToClose) {
                    body.on("keyup", function(e) {
                        if (e.keyCode === 27) {
                            self.close("BLUR");
                        }
                    });
                }
                if (options.enterToConfirm) {
                    body.on("keypress", function(e) {
                        if (e.keyCode === 13) {
                            self.close("CONFIRM");
                        }
                    });
                }
                if (options.clickOutsideToClose) {
                    self.modalContainer.on("click", function(e) {
                        if (angular.element(e.target).hasClass("wix-modal--container")) {
                            self.close("BLUR");
                        }
                    });
                }
            }
        }
        function createController(options, modalInstance) {
            var controllerName = options.controller;
            if (options.controllerAs) {
                controllerName = controllerName + " as " + options.controllerAs;
            }
            var locals = {
                $scope: options.scope,
                modal: modalInstance
            };
            if (options.locals) {
                Object.assign(locals, options.locals);
            }
            $controller(controllerName, locals);
        }
        function createModalElement(options, result) {
            var renderTemplate = "" + '<div class="wix-modal-window-wrapper">' + '<div class="wix-modal--window ' + options.modalClass + '" style="width:' + options.width + 'px;">' + result + "</div>" + "</div>";
            angular.element(renderTemplate);
            var linkFn = $compile(renderTemplate);
            var modalElement = linkFn(options.scope);
            return modalElement;
        }
        function createModalWindow(options, modalInstance) {
            return getTemplate(options.template, options.templateUrl).then(function(result) {
                addBackDrop(options);
                createController(options, modalInstance);
                var modalElement = createModalElement(options, result);
                self.modalContainer.append(modalElement);
                focusedElementsStack.push($document[0].activeElement);
                if (!!$document[0].activeElement) {
                    $document[0].activeElement.blur();
                } else {
                    document.body.blur();
                }
                return modalElement;
            });
        }
        function createModalInstance(defer) {
            return {
                close: function(reason) {
                    var index = modalStack.findIndex(function(obj) {
                        return obj === defer;
                    });
                    modalStack.splice(index, 1);
                    return defer.resolve(reason);
                }
            };
        }
        this.confirm = function(result) {
            var defer = modalStack.pop();
            if (defer) {
                defer.reject(result);
            }
        };
        this.close = function(reason) {
            var defer = modalStack.pop();
            if (defer) {
                defer.resolve(reason);
            }
        };
        this.open = function(options) {
            var modalElement = null;
            var defer = $q.defer();
            defaults(options);
            return createModalWindow(options, createModalInstance(defer)).then(function(result) {
                modalElement = result;
                modalStack.push(defer);
                return defer.promise;
            }).then(function(result) {
                removeModal(modalElement, options);
                return result;
            }).catch(function(reason) {
                removeModal(modalElement, options);
                return reason;
            });
        };
    }
    angular.module("wixStyleInternal").service("wixModal", WixModal);
})();

(function() {
    wixCheckbox.$inject = [ "wixDirectivesUtils", "$compile" ];
    function wixCheckbox(wixDirectivesUtils, $compile) {
        return {
            template: '<label allow-propagation-from="input">\n                  <input type="checkbox"/>\n                  <span class="wix-checkbox-inner"></span>\n                </label>',
            restrict: "E",
            priority: 550,
            terminal: true,
            compile: function(element, $attrs) {
                var input = element.find("input");
                wixDirectivesUtils.moveAttributesToChild(element, input, $attrs, [ "ngRepeat", "ngIf" ]);
                return function postLink($scope, $element) {
                    $compile($element.find("label"))($scope);
                    var checkboxElement = $element.find("input");
                    var indeterminateExpression = checkboxElement.attr("checkbox-indeterminate");
                    if (indeterminateExpression) {
                        $scope.$watch(indeterminateExpression, function(newValue) {
                            checkboxElement[0].indeterminate = newValue;
                        });
                    }
                };
            }
        };
    }
    angular.module("wixStyleInternal").directive("wixCheckbox", wixCheckbox);
})();

"use strict";

(function() {
    notification.$inject = [ "$timeout" ];
    function notification($timeout) {
        return {
            template: '<div class="wix-notification-container" ng-if="notificationTemplate === \'with-shadow\'"><div class="wix-notification-{{ notificationType }} is-notification-with-shadow" ng-transclude></div></div>' + '<div ng-if="notificationTemplate === \'with-close-button\'" class="wix-notification-{{ notificationType }} is-notification-closable"><span ng-transclude></span><span class="wix-notification-close-button" ng-click="close()"></span></div>' + '<div ng-if="notificationTemplate === \'with-inner-button\'" class="wix-notification-{{ notificationType }} is-notification-closable-with-inner-button"><span ng-transclude></span><span class="wix-notification-close-button" ng-click="close()"></span></div>' + '<div ng-if="notificationTemplate === \'with-icon\'" class="wix-notification-{{ notificationType }} is-notification-closable-with-icon"><span class="wix-notification-icon"></span><span ng-transclude></span><span class="wix-notification-close-button" ng-click="close()"></span></div>' + '<div ng-if="notificationTemplate === \'with-icon-dark\'" class="wix-notification-{{ notificationType }} is-notification-closable-with-icon-dark"><span class="wix-notification-icon"></span><span ng-transclude></span><span class="wix-notification-close-button" ng-click="close()"></span></div>',
            restrict: "E",
            transclude: true,
            scope: {
                template: "@",
                type: "@",
                onClose: "&",
                autoHide: "@"
            },
            link: function postLink(scope, element) {
                var notificationTypes = {
                    general: "general",
                    error: "error",
                    warning: "warning",
                    success: "success"
                };
                var templateTypes = {
                    "with-shadow": "with-shadow",
                    "with-close-button": "with-close-button",
                    "with-inner-button": "with-inner-button",
                    "with-icon": "with-icon",
                    "with-icon-dark": "with-icon-dark"
                };
                scope.notificationTemplate = templateTypes[scope.template] || "with-close-button";
                scope.notificationType = notificationTypes[scope.type] || "general";
                scope.close = function() {
                    scope.onClose();
                    element.remove();
                };
                if (scope.notificationTemplate === "with-shadow") {
                    scope.timeout = scope.autoHide > 0 ? scope.autoHide : 5e3;
                    $timeout(scope.close, scope.timeout);
                }
            }
        };
    }
    angular.module("wixStyleInternal").directive("wixNotification", notification);
})();

"use strict";

var WixWizard = function() {
    WixWizard.$inject = [ "$scope", "$element" ];
    function WixWizard($scope, $element) {
        var firstStep = $scope.steps[0];
        firstStep.state = "active";
    }
    return WixWizard;
}();

angular.module("wixStyle").directive("wixWizard", function() {
    return {
        templateUrl: "views/directives/wix-wizard.html",
        restrict: "E",
        scope: {
            steps: "="
        },
        controller: WixWizard,
        controllerAs: "wixWizard"
    };
});

"use strict";

angular.module("wixStyle").directive("wixModalHeader1", function() {
    return {
        templateUrl: "views/components/modals/wix-modal-header1.html",
        restrict: "E",
        scope: {
            title: "=",
            subtitle: "=?",
            onClose: "&?",
            cssClass: "=?"
        },
        controllerAs: "$ctrl",
        controller: [ "$scope", function($scope) {
            this.getCssClasses = function() {
                var classesArray = [];
                if ($scope.cssClass) {
                    classesArray.push($scope.cssClass);
                }
                if ($scope.subtitle) {
                    classesArray.push("with-subtitle");
                }
                return classesArray;
            };
        } ],
        link: function(scope, element) {
            element.removeAttr("title");
        }
    };
});

"use strict";

angular.module("wixStyle").directive("wixModalHeader2", function() {
    return {
        templateUrl: "views/components/modals/wix-modal-header2.html",
        restrict: "E",
        scope: {
            title: "=",
            subtitle: "=?",
            onClose: "&?"
        },
        link: function(scope, element) {
            element.removeAttr("title");
        }
    };
});

(function() {
    wixRadio.$inject = [ "wixDirectivesUtils", "$compile" ];
    function wixRadio(wixDirectivesUtils, $compile) {
        return {
            template: '<label allow-propagation-from="input"> \n                  <input type="radio"/>\n                  <span class="wix-radio-inner"></span>\n                </label>',
            restrict: "E",
            priority: 550,
            terminal: true,
            compile: function(element, $attrs) {
                var input = element.find("input");
                wixDirectivesUtils.moveAttributesToChild(element, input, $attrs, [ "ngRepeat", "ngIf" ]);
                return function postLink($scope, $element) {
                    $compile($element.find("label"))($scope);
                };
            }
        };
    }
    angular.module("wixStyleInternal").directive("wixRadio", wixRadio);
})();

(function() {
    angular.module("wixStyle").directive("wixTooltip", [ "wixTooltipFactory", function(wixTooltipFactory) {
        return wixTooltipFactory();
    } ]);
    angular.module("wixStyle").factory("wixPosition", [ "$document", "$window", function($document, $window) {
        function getStyle(el, cssprop) {
            if (el.currentStyle) {
                return el.currentStyle[cssprop];
            } else if ($window.getComputedStyle) {
                return $window.getComputedStyle(el)[cssprop];
            }
            return el.style[cssprop];
        }
        function isStaticPositioned(element) {
            return (getStyle(element, "position") || "static") === "static";
        }
        var parentOffsetEl = function(element) {
            var docDomEl = $document[0];
            var offsetParent = element.offsetParent || docDomEl;
            while (offsetParent && offsetParent !== docDomEl && isStaticPositioned(offsetParent)) {
                offsetParent = offsetParent.offsetParent;
            }
            return offsetParent || docDomEl;
        };
        var fixMarginBelowBody = function(rect) {
            rect.top = rect.top - $document.find("body")[0].getBoundingClientRect().top - ($window.pageYOffset || $document[0].documentElement.scrollTop);
            return rect;
        };
        return {
            position: function(element) {
                var elBCR = this.offset(element);
                var offsetParentBCR = {
                    top: 0,
                    left: 0
                };
                var offsetParentEl = parentOffsetEl(element[0]);
                if (offsetParentEl !== $document[0]) {
                    offsetParentBCR = this.offset(angular.element(offsetParentEl));
                    offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
                    offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
                }
                var boundingClientRect = element[0].getBoundingClientRect();
                return {
                    width: boundingClientRect.width || element.prop("offsetWidth"),
                    height: boundingClientRect.height || element.prop("offsetHeight"),
                    top: elBCR.top - offsetParentBCR.top,
                    left: elBCR.left - offsetParentBCR.left
                };
            },
            offset: function(element) {
                var boundingClientRect = element[0].getBoundingClientRect();
                return {
                    width: boundingClientRect.width || element.prop("offsetWidth"),
                    height: boundingClientRect.height || element.prop("offsetHeight"),
                    top: boundingClientRect.top + ($window.pageYOffset || $document[0].documentElement.scrollTop),
                    left: boundingClientRect.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft)
                };
            },
            positionElements: function(hostEl, targetEl, positionStr, appendToBody, align) {
                var positionStrParts = positionStr.split("-");
                var pos0 = positionStrParts[0], pos1 = positionStrParts[1] || "center";
                var hostElPos, targetElWidth, targetElHeight, targetElPos;
                hostElPos = appendToBody ? fixMarginBelowBody(this.offset(hostEl)) : this.position(hostEl);
                targetElWidth = targetEl.prop("offsetWidth");
                targetElHeight = targetEl.prop("offsetHeight");
                var shiftWidth = {
                    center: function() {
                        return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
                    },
                    left: function() {
                        return hostElPos.left;
                    },
                    right: function() {
                        return hostElPos.left + hostElPos.width;
                    }
                };
                var shiftHeight = {
                    center: function() {
                        return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
                    },
                    top: function() {
                        return hostElPos.top;
                    },
                    bottom: function() {
                        return hostElPos.top + hostElPos.height;
                    }
                };
                switch (pos0) {
                  case "right":
                    targetElPos = {
                        top: shiftHeight[pos1](),
                        left: shiftWidth[pos0]()
                    };
                    break;

                  case "left":
                    targetElPos = {
                        top: shiftHeight[pos1](),
                        left: hostElPos.left - targetElWidth
                    };
                    break;

                  case "bottom":
                    targetElPos = {
                        top: shiftHeight[pos0](),
                        left: shiftWidth[pos1]()
                    };
                    break;

                  default:
                    targetElPos = {
                        top: hostElPos.top - targetElHeight,
                        left: shiftWidth[pos1]()
                    };
                    break;
                }
                switch (align) {
                  case "right":
                    targetElPos.left = hostElPos.left + hostElPos.width - targetElWidth;
                    break;

                  case "left":
                    targetElPos.left = hostElPos.left;
                    break;

                  case "bottom":
                    targetElPos.top = hostElPos.top + hostElPos.height - targetElHeight;
                    break;

                  case "top":
                    targetElPos.top = hostElPos.top;
                    break;
                }
                return targetElPos;
            }
        };
    } ]);
    angular.module("wixStyle").factory("wixTooltipFactory", [ "$timeout", "$compile", "wixPosition", "$sce", "$document", function($timeout, $compile, wixPosition, $sce, $document) {
        return function(isPopover) {
            var directiveScope = {
                maxWidth: "@",
                appendToBody: "=?",
                debug: "=?",
                tooltipTemplate: "@?",
                tooltipScope: "=?",
                tooltipTrigger: "@?",
                isOpen: "=?",
                tooltipCloseOnContent: "=?",
                untrusted: "=?",
                preventScroll: "=?",
                alignTooltip: "@?",
                alwaysCloseOnClickOutside: "=?"
            };
            if (isPopover) {
                delete directiveScope.tooltipTemplate;
                delete directiveScope.tooltipScope;
            }
            return {
                restrict: isPopover ? "E" : "A",
                transclude: !!isPopover,
                scope: directiveScope,
                controllerAs: "vm",
                link: function(scope, element, attrs, controller, transcludeFn) {
                    if (isPopover) {
                        element = element.parent();
                    }
                    var disableTooltipDestroy = attrs.debug === "" || attrs.debug === "true" || scope.tooltipTrigger === "false";
                    var trustContent = !(attrs.untrusted === "" || attrs.untrusted === "true");
                    var closeOnContent = !!scope.tooltipCloseOnContent;
                    var ttScope;
                    var transclusionScope;
                    var allowedPlacements = {
                        top: "top",
                        bottom: "bottom",
                        left: "left",
                        right: "right"
                    };
                    var defaultOptions = {
                        placement: "top"
                    };
                    var tooltipDestroyTimeout;
                    var placement = defaultOptions.placement;
                    var placementForce = false;
                    var tooltipElement;
                    var arrowBefore;
                    var arrowAfter;
                    var shouldAppendToBody;
                    var hasEnableExp = angular.isDefined(attrs.tooltipEnable);
                    var backdrop = angular.element('<div class="wix-tooltip-backdrop"></div>');
                    function destroyTooltip() {
                        if (tooltipElement) {
                            backdrop.detach();
                            setVisibility(false);
                            if (scope.preventScroll) {
                                $document.find("body").removeClass("tooltip-open");
                            }
                            tooltipElement.remove();
                            tooltipElement = null;
                            ttScope.$destroy();
                            ttScope = null;
                            if (isPopover) {
                                transclusionScope.$destroy();
                                transclusionScope = null;
                            }
                        }
                    }
                    scope.$on("$destroy", destroyTooltip);
                    scope.$watch("isOpen", function(newVal, oldVal) {
                        if (oldVal && newVal === false && tooltipElement) {
                            destroyTooltipGracefully();
                        } else if (newVal === true && !tooltipElement) {
                            $timeout(function() {
                                setPlacement();
                                showTooltip();
                                if (scope.alwaysCloseOnClickOutside) {
                                    attachBackdrop();
                                    bindClickTriggerToBackdrop();
                                }
                            }, 0);
                        }
                    });
                    function newPlacementToFit(_a) {
                        var wantedPlacement = _a.wantedPlacement, element = _a.element, tooltipElement = _a.tooltipElement;
                        function appropriatePlacementForElement(_a) {
                            var placement = _a.placement, element = _a.element, tooltip = _a.tooltip, body = _a.body;
                            switch (placement) {
                              case allowedPlacements.top:
                                if (element.top - tooltip.height > 0) {
                                    return true;
                                }
                                break;

                              case allowedPlacements.right:
                                if (element.right + tooltip.width < body.width) {
                                    return true;
                                }
                                break;

                              case allowedPlacements.bottom:
                                if (element.bottom + tooltip.height < body.height) {
                                    return true;
                                }
                                break;

                              case allowedPlacements.left:
                                if (element.left - tooltip.width > 0) {
                                    return true;
                                }
                                break;

                              default:
                                break;
                            }
                            return false;
                        }
                        function getFallbackOrder(placement) {
                            var placemenFallbackOrder = {};
                            placemenFallbackOrder[allowedPlacements.top] = [ allowedPlacements.bottom, allowedPlacements.left, allowedPlacements.right ];
                            placemenFallbackOrder[allowedPlacements.bottom] = [ allowedPlacements.top, allowedPlacements.left, allowedPlacements.right ];
                            placemenFallbackOrder[allowedPlacements.left] = [ allowedPlacements.right, allowedPlacements.top, allowedPlacements.bottom ];
                            placemenFallbackOrder[allowedPlacements.right] = [ allowedPlacements.left, allowedPlacements.top, allowedPlacements.bottom ];
                            return [ placement ].concat(placemenFallbackOrder[placement]);
                        }
                        var tooltipPosition = tooltipElement.getBoundingClientRect();
                        var elementPosition = element.getBoundingClientRect();
                        var bodyPosition = $document.find("body")[0].getBoundingClientRect();
                        var placementFallbackList = getFallbackOrder(wantedPlacement);
                        var newPlacement = null;
                        placementFallbackList.some(function(placement) {
                            return appropriatePlacementForElement({
                                placement: placement,
                                element: elementPosition,
                                tooltip: tooltipPosition,
                                body: bodyPosition
                            }) ? newPlacement = placement : false;
                        });
                        return newPlacement ? newPlacement : wantedPlacement;
                    }
                    function positionTooltip() {
                        if (!tooltipElement) {
                            return;
                        }
                        var fitterPlacement = placementForce ? placement : newPlacementToFit({
                            wantedPlacement: placement,
                            element: element[0],
                            tooltipElement: tooltipElement[0]
                        });
                        var originalPlacement = placement;
                        placement = fitterPlacement;
                        tooltipElement.addClass("placement-" + placement);
                        if (scope.maxWidth && typeof scope.maxWidth === "string") {
                            tooltipElement.css({
                                "max-width": scope.maxWidth
                            });
                        }
                        var isHorizontalAlign = (scope.alignTooltip === "right" || scope.alignTooltip === "left") && (placement === "bottom" || placement === "top");
                        var isVerticalAlign = (scope.alignTooltip === "top" || scope.alignTooltip === "bottom") && (placement === "right" || placement === "left");
                        var isAlignValid = isHorizontalAlign || isVerticalAlign;
                        var alignTooltip = isAlignValid ? scope.alignTooltip : "center";
                        var ttPosition = wixPosition.positionElements(element, tooltipElement, placement, shouldAppendToBody, alignTooltip);
                        switch (placement) {
                          case allowedPlacements.bottom:
                            ttPosition.top += -2;
                            break;

                          case allowedPlacements.left:
                            ttPosition.left += 2;
                            break;

                          case allowedPlacements.right:
                            ttPosition.left += -2;
                            break;

                          default:
                            ttPosition.top += 2;
                            break;
                        }
                        ttPosition.top += "px";
                        ttPosition.left += "px";
                        tooltipElement.css(ttPosition);
                        if (isAlignValid) {
                            tooltipElement.addClass("hide-pseudo-elements");
                            arrowBefore = angular.element('<div class="arrow-before"></div>');
                            arrowAfter = angular.element('<div class="arrow-after"></div>');
                            tooltipElement.prepend(arrowBefore);
                            tooltipElement.append(arrowAfter);
                            var arrowPositionRight;
                            var arrowPositionTop;
                            switch (alignTooltip) {
                              case "right":
                                arrowPositionRight = wixPosition.offset(element).width / 2;
                                arrowBefore.css("right", arrowPositionRight);
                                arrowAfter.css("right", arrowPositionRight);
                                break;

                              case "left":
                                arrowPositionRight = wixPosition.offset(tooltipElement).width - wixPosition.offset(element).width / 2;
                                arrowBefore.css("right", arrowPositionRight);
                                arrowAfter.css("right", arrowPositionRight);
                                break;

                              case "top":
                                arrowPositionTop = wixPosition.offset(element).height / 2;
                                arrowBefore.css("top", arrowPositionTop);
                                arrowAfter.css("top", arrowPositionTop);
                                break;

                              case "bottom":
                                arrowPositionTop = wixPosition.offset(tooltipElement).height - wixPosition.offset(element).height / 2;
                                arrowBefore.css("top", arrowPositionTop);
                                arrowAfter.css("top", arrowPositionTop);
                                break;
                            }
                        }
                        placement = originalPlacement;
                    }
                    function cancelTooltipRemove() {
                        $timeout.cancel(tooltipDestroyTimeout);
                        tooltipDestroyTimeout = null;
                    }
                    function onElementMouseOver() {
                        if (tooltipDestroyTimeout) {
                            cancelTooltipRemove();
                        } else {
                            showTooltip();
                        }
                    }
                    function showTooltip() {
                        if (hasEnableExp && !scope.$eval(attrs.tooltipEnable)) {
                            return;
                        }
                        createTooltip();
                        ttScope.$apply();
                        positionTooltip();
                        ttScope.$apply();
                    }
                    function onElementMouseLeave() {
                        if (disableTooltipDestroy || isClickTrigger()) {
                            return;
                        }
                        destroyTooltipGracefully();
                    }
                    function onTooltipMouseOver() {
                        if (!closeOnContent) {
                            cancelTooltipRemove();
                        }
                    }
                    function onTooltipMouseLeave() {
                        onElementMouseLeave();
                    }
                    function createScope() {
                        var res = scope.$new(true);
                        angular.extend(res, scope.tooltipScope || {});
                        return res;
                    }
                    function getTooltipTemplate() {
                        var placeholder = '<div class="wix-tooltip-content" ng-bind-html="htmlContent"></div>';
                        if (typeof scope.tooltipTemplate === "string") {
                            placeholder = "<div>" + scope.tooltipTemplate + "</div>";
                        } else if (isPopover) {
                            placeholder = '<div class="wix-tooltip-content"></div>';
                        }
                        return '<div class="wix-tooltip" ng-mouseover="onTooltipMouseOver()" ng-mouseleave="onTooltipMouseLeave()">' + '<div class="wix-tooltip-container">' + '<div class="wix-tooltip-arrow"></div>' + placeholder + "</div>" + "</div>";
                    }
                    function setVisibility(visible) {
                        ttScope.tooltipVisible = visible;
                        scope.isOpen = visible;
                    }
                    function createTooltip() {
                        if (tooltipElement) {
                            destroyTooltip();
                        }
                        ttScope = createScope();
                        shouldAppendToBody = scope.appendToBody ? scope.appendToBody : false;
                        if (!isPopover) {
                            ttScope.htmlContent = trustContent ? $sce.trustAsHtml(attrs.wixTooltip) : attrs.wixTooltip;
                        }
                        setVisibility(false);
                        ttScope.onTooltipMouseOver = onTooltipMouseOver;
                        ttScope.onTooltipMouseLeave = onTooltipMouseLeave;
                        tooltipElement = $compile(getTooltipTemplate())(ttScope, function(tooltip) {
                            if (shouldAppendToBody) {
                                $document.find("body").append(tooltip);
                            } else {
                                element.after(tooltip);
                            }
                            if (isPopover) {
                                transcludeFn(function(clone, scope) {
                                    angular.element(tooltip[0].querySelector(".wix-tooltip-content")).append(clone);
                                    transclusionScope = scope;
                                });
                            }
                        });
                        tooltipElement.addClass(attrs.tooltipClass);
                        setVisibility(true);
                        if (scope.preventScroll) {
                            $document.find("body").addClass("tooltip-open");
                        }
                    }
                    function setPlacement() {
                        var userDefinedPlacement = attrs.placement;
                        if (userDefinedPlacement && allowedPlacements[userDefinedPlacement]) {
                            placement = userDefinedPlacement;
                        }
                        if (attrs.placementForce && attrs.placementForce !== "false") {
                            placementForce = true;
                        }
                    }
                    function destroyTooltipGracefully() {
                        tooltipDestroyTimeout = $timeout(function() {
                            destroyTooltip();
                            tooltipDestroyTimeout = null;
                        }, 0);
                    }
                    function isClickTrigger() {
                        return scope.tooltipTrigger === "click click";
                    }
                    function isClickHoverTrigger() {
                        return scope.tooltipTrigger === "click hover";
                    }
                    function isTriggerDisabled() {
                        return scope.tooltipTrigger === "false";
                    }
                    function bindClickToCloseFromTriggerElement() {
                        element.bind("click", function() {
                            if (scope.isOpen) {
                                destroyTooltipGracefully();
                            }
                        });
                    }
                    function bindClickTriggerToBackdrop() {
                        backdrop.bind("click", function() {
                            destroyTooltipGracefully();
                        });
                    }
                    function bindClickTriggers() {
                        element.bind("click", function() {
                            showTooltip();
                            attachBackdrop();
                        });
                        bindClickTriggerToBackdrop();
                    }
                    function attachBackdrop() {
                        $document.find("body").append(backdrop);
                    }
                    function bindTooltipTriggers() {
                        if (!isTriggerDisabled()) {
                            if (isClickTrigger()) {
                                bindClickTriggers();
                            } else {
                                bindClickToCloseFromTriggerElement();
                                element.bind(isClickHoverTrigger() ? "click" : "mouseenter", onElementMouseOver);
                                element.bind("mouseleave", onElementMouseLeave);
                            }
                        }
                    }
                    function init() {
                        setPlacement();
                        bindTooltipTriggers();
                        if (scope.isOpen && isClickTrigger()) {
                            attachBackdrop();
                        }
                    }
                    init();
                }
            };
        };
    } ]);
})();

"use strict";

var directives;

(function(directives) {
    var WixTabController = function() {
        WixTabController.$inject = [ "$scope" ];
        function WixTabController($scope) {
            this.$scope = $scope;
            this.isActive = true;
        }
        WixTabController.prototype.getLabel = function() {
            return this.label;
        };
        return WixTabController;
    }();
    directives.WixTabController = WixTabController;
    function wixTab() {
        return {
            template: '<div ng-if="wixTabVM.isActive" ng-transclude></div>',
            controller: WixTabController,
            controllerAs: "wixTabVM",
            bindToController: {
                label: "@"
            },
            transclude: true,
            scope: true,
            link: function($scope, $element, attrs, ctrl) {
                ctrl.isActive = attrs.hasOwnProperty("active");
                ctrl.disabled = attrs.hasOwnProperty("disabled");
                ctrl.label = attrs.label;
            },
            restrict: "E"
        };
    }
    directives.wixTab = wixTab;
    var WixTabsController = function() {
        function WixTabsController() {}
        WixTabsController.prototype.onTabClick = function(tab) {
            if (!tab.disabled) {
                this.activeTabIndex = this.tabControllers.indexOf(tab);
            }
        };
        Object.defineProperty(WixTabsController.prototype, "activeTabIndex", {
            get: function() {
                return this._activeTabIndex;
            },
            set: function(value) {
                this._activeTabIndex = value;
                for (var i = 0; i < this.tabControllers.length; i++) {
                    this.tabControllers[i].isActive = false;
                }
                this.tabControllers[value].isActive = true;
            },
            enumerable: true,
            configurable: true
        });
        WixTabsController.prototype.isActive = function(tab) {
            return this.tabControllers.indexOf(tab) === this.activeTabIndex;
        };
        return WixTabsController;
    }();
    directives.WixTabsController = WixTabsController;
    function wixTabs() {
        function getActiveTabIndex(tabsElements) {
            var activeIndex = 0;
            angular.forEach(tabsElements, function(value, index) {
                if (value.isActive === true) {
                    activeIndex = index;
                }
            });
            return activeIndex;
        }
        return {
            templateUrl: "views/directives/wix-tabs.html",
            controller: WixTabsController,
            controllerAs: "wixTabsVM",
            transclude: true,
            scope: true,
            link: function($scope, $element, attrs, ctrl) {
                $element.addClass("wix-tabs");
                var tabControllers = [];
                angular.forEach($element.find("wix-tab"), function(element, index) {
                    var jqLiteElement = angular.element(element);
                    tabControllers.push(jqLiteElement.controller("wixTab"));
                });
                ctrl.tabControllers = tabControllers;
                if (!attrs.hasOwnProperty("mdSelected")) {
                    ctrl.activeTabIndex = getActiveTabIndex(tabControllers);
                } else {
                    ctrl.activeTabIndex = parseInt(attrs.mdSelected, 10);
                }
            },
            restrict: "E"
        };
    }
    directives.wixTabs = wixTabs;
})(directives || (directives = {}));

angular.module("wixStyle").directive("wixTab", directives.wixTab);

angular.module("wixStyle").directive("wixTabs", directives.wixTabs);

"use strict";

(function() {
    wixSearch.$inject = [ "wixDirectivesUtils" ];
    function wixSearch(wixDirectivesUtils) {
        return {
            templateUrl: "views/directives/wix-search.html",
            restrict: "E",
            compile: function(element, $attrs) {
                var isAnimated = element.hasClass("animated");
                var isShrank = element.hasClass("shrank");
                var input = element.find("input");
                wixDirectivesUtils.moveAttributesToChild(element, input, $attrs, [ "skin" ]);
                element.addClass("wix-search");
                if (isAnimated) {
                    element.addClass("animated");
                }
                if (isShrank) {
                    element.addClass("shrank");
                }
                return function postLink(scope, element, attr) {
                    var input = element.find("input");
                    function evalOnClear(event) {
                        scope.$eval(attr.onClear, {
                            event: event,
                            oldValue: input.val()
                        });
                    }
                    scope.clearSearch = function(event) {
                        evalOnClear(event);
                        input.val("").triggerHandler("change");
                    };
                    scope.shouldShowClear = function() {
                        return input.val();
                    };
                    scope.onFocusIn = function() {
                        element.addClass("focus");
                    };
                    scope.onFocusOut = function() {
                        element.removeClass("focus");
                    };
                    input.bind("keyup", function(event) {
                        if (event.which === 13 && input.val()) {
                            scope.$eval(attr.onSearch, {
                                event: event
                            });
                            event.preventDefault();
                        }
                    });
                };
            }
        };
    }
    angular.module("wixStyleInternal").directive("wixSearch", wixSearch);
})();

"use strict";

(function() {
    function list() {
        return {
            restrict: "E",
            transclude: true,
            require: "ngModel",
            scope: {
                draggableItem: "&",
                checkableProperty: "&",
                imageSquare: "&",
                contentTemplate: "@",
                transcluded: "="
            },
            templateUrl: "views/directives/wix-list.html",
            link: function postLink(scope, element, attr, ngModelCtrl) {
                var dragSrcEl, dragTempEl;
                var dragSrcElItem;
                var startY = 0, y = 0;
                ngModelCtrl.$render = function() {
                    scope.items = ngModelCtrl.$viewValue;
                };
                scope.checkableProperty = attr.checkableProperty;
                var list = {
                    indexOfPlaceholder: undefined,
                    movePlaceholder: function(target) {
                        if (target === undefined) {
                            return;
                        }
                        var placeholder = scope.items.splice(this.indexOfPlaceholder, 1);
                        scope.items.splice(target, 0, placeholder[0]);
                        this.indexOfPlaceholder = target;
                        scope.$digest();
                    },
                    replacePlaceholderWithSrcItem: function(target) {
                        if (target === undefined) {
                            target = this.indexOfPlaceholder;
                        }
                        scope.items.splice(this.indexOfPlaceholder, 1);
                        scope.items.splice(target, 0, dragSrcElItem);
                        scope.$apply(function() {
                            ngModelCtrl.$setViewValue(scope.items);
                        });
                    },
                    replaceSrcItemWithPlaceholder: function(itemIndex) {
                        dragSrcElItem = scope.items[itemIndex];
                        this.indexOfPlaceholder = itemIndex;
                        scope.items.splice(itemIndex, 1);
                        scope.items.splice(itemIndex, 0, {
                            empty: true
                        });
                        scope.$digest();
                    }
                };
                var getIndex = function(target) {
                    if (target.attr("index")) {
                        return target.attr("index");
                    } else if (target.parent().attr("index")) {
                        return target.parent().attr("index");
                    }
                };
                element.on("mousedown", function(event) {
                    event.preventDefault();
                    var dragButton = angular.element(event.target);
                    if (dragButton.hasClass("wix-list-draggable")) {
                        dragSrcEl = dragButton.parent();
                        dragTempEl = angular.element('<div><div class="wix-list-item">' + dragSrcEl[0].innerHTML + "</div></div>");
                        element.append(dragTempEl);
                        dragTempEl.css({
                            position: "absolute",
                            width: "calc(100% - 18px)",
                            top: dragSrcEl[0].offsetTop + "px",
                            "pointer-events": "none"
                        });
                        startY = dragSrcEl[0].offsetTop - y;
                        list.replaceSrcItemWithPlaceholder(dragButton.parent().scope().$index);
                    }
                });
                var getCorrectPosition = function(event, target) {
                    var currentY = event.screenY + window.scrollY - target.offsetHeight * 1.5;
                    var heightMax = element[0].offsetHeight - target.offsetHeight + element[0].offsetTop;
                    var heightMin = element[0].offsetTop;
                    if (currentY < heightMin) {
                        return y;
                    } else if (heightMax < currentY) {
                        return y;
                    } else {
                        return currentY;
                    }
                };
                element.on("mousemove", function(event) {
                    if (dragSrcEl) {
                        if (event.preventDefault) {
                            event.preventDefault();
                        }
                        if (dragSrcEl !== event.target) {
                            list.movePlaceholder(getIndex(angular.element(event.target)));
                            y = getCorrectPosition(event, dragSrcEl[0]);
                            dragTempEl.css({
                                top: y + "px"
                            });
                        }
                    }
                    return false;
                });
                element.on("mouseup", function(event) {
                    if (dragSrcEl) {
                        if (event.stopPropagation) {
                            event.stopPropagation();
                        }
                        if (dragSrcEl !== event.target) {
                            list.replacePlaceholderWithSrcItem(getIndex(angular.element(event.target)));
                        }
                        dragSrcEl = null;
                        dragSrcElItem = null;
                        dragTempEl.remove();
                        return false;
                    }
                });
            }
        };
    }
    angular.module("wixStyleInternal").directive("wixList", list);
})();

(function() {
    angular.module("wixStyle").directive("wixPopover", [ "wixTooltipFactory", function(wixTooltipFactory) {
        return wixTooltipFactory(true);
    } ]);
})();

var directives;

(function(directives) {
    var Calendar;
    (function(Calendar) {
        var CustomizedDayPicker = function() {
            CustomizedDayPicker.$inject = [ "$animate", "$scope" ];
            function CustomizedDayPicker($animate, $scope) {
                this.$animate = $animate;
                this.$scope = $scope;
            }
            CustomizedDayPicker.prototype.mutateDays = function(dates) {
                var flattenDates = _.flatten(dates);
                removeLeadingZeros(flattenDates);
                markMinAndMaxDate(flattenDates);
            };
            return CustomizedDayPicker;
        }();
        Calendar.CustomizedDayPicker = CustomizedDayPicker;
        function removeLeadingZeros(dates) {
            dates.forEach(function(day) {
                return day.label = _.parseInt(day.label, 10);
            });
        }
        function markMinAndMaxDate(dates) {
            var possibleDates = dates.filter(function(date) {
                return !date.disabled;
            });
            var minDate = _.first(possibleDates);
            var maxDate = _.last(possibleDates);
            if (minDate) {
                minDate.isMinDate = true;
            }
            if (maxDate) {
                maxDate.isMaxDate = true;
            }
        }
    })(Calendar = directives.Calendar || (directives.Calendar = {}));
})(directives || (directives = {}));

angular.module("wixStyleInternal").directive("wixDayCalendar", function() {
    return {
        templateUrl: "views/directives/calendar/day-calendar.html",
        controller: directives.Calendar.CustomizedDayPicker,
        scope: {
            labels: "=",
            rows: "=",
            title: "=",
            active: "=",
            move: "&",
            select: "&"
        },
        bindToController: true,
        controllerAs: "$ctrl",
        link: function(scope, element, attributes, ctrl) {
            scope.$watch(function() {
                return ctrl.rows;
            }, function(newData) {
                if (newData) {
                    ctrl.mutateDays(newData);
                }
            });
        }
    };
});

var _this = this;

var directives;

(function(directives) {
    var Calendar;
    (function(Calendar_1) {
        var Calendar = function() {
            Calendar.$inject = [ "$scope" ];
            function Calendar($scope) {
                this.$scope = $scope;
            }
            Calendar.prototype.init = function() {
                var _this = this;
                if (!_.isBoolean(this.showControlButtons)) {
                    this.showControlButtons = true;
                }
                var overridesOptions = {
                    showWeeks: false,
                    maxMode: "day"
                };
                this.uibOptions = _.merge({}, this.options, overridesOptions);
                if (this.options && this.options.theme) {
                    this.uibOptions.customClass = function() {
                        return "theme theme-" + _this.options.theme;
                    };
                }
                this.watchDateSelected();
            };
            Calendar.prototype.onChanges = function(changes) {
                if (changes.date && changes.date.currentValue !== this.internalDate) {
                    this.internalDate = angular.copy(changes.date.currentValue);
                }
            };
            Calendar.prototype.clear = function() {
                this.internalDate = null;
            };
            Calendar.prototype.watchDateSelected = function() {
                var _this = this;
                this.$scope.$watch(function() {
                    return _this.internalDate;
                }, function(newValue, preValue) {
                    if (preValue !== newValue) {
                        var changes = {
                            date: {
                                currentValue: newValue
                            }
                        };
                        _this.onChanges(changes);
                        _this.onSelect({
                            $event: {
                                date: _this.internalDate
                            }
                        });
                    }
                });
            };
            return Calendar;
        }();
        Calendar_1.Calendar = Calendar;
    })(Calendar = directives.Calendar || (directives.Calendar = {}));
})(directives || (directives = {}));

angular.module("wixStyleInternal").directive("wixCalendar", function() {
    return {
        templateUrl: "views/directives/calendar/calendar.html",
        controller: directives.Calendar.Calendar,
        scope: {
            options: "=",
            date: "=",
            onSelect: "&",
            showControlButtons: "="
        },
        bindToController: true,
        controllerAs: "$ctrl",
        link: {
            pre: function(scope, element, attributes, ctrl) {
                ctrl.internalDate = ctrl.date;
                scope.$watch(function() {
                    return ctrl.date;
                }, function(newVal, prevVal) {
                    if (newVal !== prevVal) {
                        _this.internalDate = newVal;
                    }
                });
            },
            post: function(scope, element, attributes, ctrl) {
                ctrl.init();
            }
        }
    };
});

var directives;

(function(directives) {
    var PopoverCalendar;
    (function(PopoverCalendar_1) {
        var PopoverCalendar = function() {
            function PopoverCalendar() {
                this.isOpen = false;
            }
            PopoverCalendar.prototype.onSelectDate = function($event) {
                this.isOpen = false;
                this.onSelect({
                    $event: {
                        date: $event.date
                    }
                });
            };
            return PopoverCalendar;
        }();
        PopoverCalendar_1.PopoverCalendar = PopoverCalendar;
    })(PopoverCalendar = directives.PopoverCalendar || (directives.PopoverCalendar = {}));
})(directives || (directives = {}));

angular.module("wixStyleInternal").directive("wixPopoverCalendar", function() {
    return {
        templateUrl: "views/directives/calendar/popover-calendar.html",
        transclude: true,
        scope: {
            options: "=",
            placement: "@",
            date: "=",
            onSelect: "&",
            showControlButtons: "="
        },
        bindToController: true,
        controller: directives.PopoverCalendar.PopoverCalendar,
        controllerAs: "$ctrl"
    };
});

(function() {
    wixSlider.$inject = [ "wixDirectivesUtils", "$compile" ];
    function wixSlider(wixDirectivesUtils, $compile) {
        return {
            template: '<rzslider data-hook="slider"/>',
            restrict: "E",
            priority: 550,
            terminal: true,
            compile: function(element, $attrs) {
                var container = element.find("rzslider");
                wixDirectivesUtils.moveAttributesToChild(element, container, $attrs, [ "ngRepeat", "ngIf" ]);
                return function postLink($scope, $element) {
                    $compile($element.find("rzslider"))($scope);
                };
            }
        };
    }
    angular.module("wixStyleInternal").directive("wixSlider", wixSlider);
})();

(function() {
    WixSwitchToggles.$inject = [ "$timeout" ];
    function WixSwitchToggles($timeout) {
        return {
            template: '\n        <div class="switch-slider" \n             data-hook="switch-slider"\n             ng-style="{\n                width: $ctrl.sliderWidth + \'px\',\n                transform: \'translateX(\' + $ctrl.switchSliderOffset + \'px)\'\n             }"></div>\n        <div class="toggles"></div>\n      ',
            restrict: "E",
            require: [ "wixSwitchToggles", "ngModel" ],
            scope: {},
            transclude: true,
            controllerAs: "$ctrl",
            controller: [ "$element", "$attrs", "$scope", "$q", "$transclude", function($element, $attrs, $scope, $q, $transclude) {
                var _this = this;
                this.cssWidth = "auto";
                this.width = 0;
                this.sliderWidth = 0;
                this.switchSliderOffset = 0;
                this.toggles = [];
                this.value = "";
                this.selectedItem = undefined;
                this.selectedIndex = 0;
                this.getToggles = $q.defer();
                this.getInitialValue = $q.defer();
                this.togglesToWaitFor = 0;
                this.childrenReady = false;
                this.addToggle = function(toggle, isLast) {
                    var newToggleIndex = _this.toggles.push(toggle) - 1;
                    _this.togglesToWaitFor--;
                    if (!_this.childrenReady && (_this.togglesToWaitFor === 0 || isLast)) {
                        _this.childrenReady = true;
                        _this.getToggles.resolve(_this.toggles);
                    }
                    return newToggleIndex;
                };
                this.getSelectedToggleIndex = function(value) {
                    for (var i = 0; i < _this.toggles.length; i++) {
                        if (value === _this.toggles[i].getValue()) {
                            return i;
                        }
                    }
                };
                this.switchSlider = function(index) {
                    var sliderStyle = getComputedStyle($element[0].querySelector(".switch-slider"));
                    var sliderBorderRadius = parseInt(sliderStyle.getPropertyValue("border-radius"), 10) || 8;
                    var addWidth = sliderBorderRadius;
                    var fixOffset = -sliderBorderRadius;
                    if (index === 0) {
                        fixOffset = 0;
                    }
                    if (index > 0 && index < _this.toggles.length - 1) {
                        addWidth *= 2;
                    }
                    _this.sliderWidth = _this.width + addWidth;
                    _this.switchSliderOffset = _this.width * index + fixOffset;
                };
                this.getWidth = function() {
                    var width = Number($attrs.toggleWidth) || 0;
                    var labels = $element[0].querySelectorAll("label");
                    if (!width) {
                        for (var i = 0; i < labels.length; i++) {
                            width = Math.max(labels[i].offsetWidth, width);
                        }
                        width += 2;
                    }
                    return width;
                };
                this.setWidth = function(width) {
                    _this.cssWidth = width + "px";
                    _this.width = width;
                    _this.toggles.forEach(function(toggle) {
                        return toggle.setWidth(width);
                    });
                };
                this.setWatchers = function(ngModelCtrl) {
                    $scope.$watch(function() {
                        return _this.selectedIndex;
                    }, function(newIndex) {
                        if (newIndex === void 0) {
                            newIndex = 0;
                        }
                        _this.selectedItem = _this.toggles[newIndex];
                        _this.switchSlider(newIndex);
                    });
                    $scope.$watch(function() {
                        return _this.selectedItem.getValue();
                    }, function(newValue) {
                        _this.value = newValue;
                        ngModelCtrl.$setViewValue(newValue);
                    });
                };
                this.renderChildren = function() {
                    $transclude(function(clone) {
                        var toggles = $element[0].querySelector(".toggles");
                        var hasNgRepeat = false;
                        for (var i = 0; i < clone.length; i++) {
                            var el = clone[i];
                            if (el.tagName && el.tagName.toLowerCase() === "label") {
                                _this.togglesToWaitFor++;
                            } else if (el.nodeType === 8 && el.textContent.search(/ngRepeat:/)) {
                                hasNgRepeat = true;
                            }
                            toggles.appendChild(el);
                        }
                        if (hasNgRepeat && _this.togglesToWaitFor > 0) {
                            console.error("wix-switch-toggles: you can't use \nngRepeat-ed wix-switch-toggle and inline at the same time. \nIt can lead to unexpected result.");
                        }
                    });
                };
                this.load = function(ngModelCtrl) {
                    var initialValueIsGotten = false;
                    _this.renderChildren();
                    $q.all([ _this.getToggles.promise, _this.getInitialValue.promise ]).then(function(_a) {
                        var value = _a[1];
                        _this.selectedIndex = _this.getSelectedToggleIndex(value);
                        _this.setWatchers(ngModelCtrl);
                        $timeout(function() {
                            return _this.onLoad();
                        });
                    });
                    ngModelCtrl.$render = function() {
                        _this.value = ngModelCtrl.$viewValue;
                        _this.selectedIndex = _this.getSelectedToggleIndex(ngModelCtrl.$viewValue);
                        if (!initialValueIsGotten) {
                            initialValueIsGotten = true;
                            _this.getInitialValue.resolve(ngModelCtrl.$viewValue);
                        }
                    };
                };
                this.onLoad = function() {
                    _this.setWidth(_this.getWidth());
                    _this.switchSlider(_this.selectedIndex);
                };
            } ],
            link: function(scope, iElement, iAttrs, _a) {
                var $ctrl = _a[0], ngModelCtrl = _a[1];
                $ctrl.load(ngModelCtrl);
            }
        };
    }
    function WixSwitchToggle() {
        return {
            template: '\n        <label data-hook="toggle" ng-style="{ width: $ctrl.cssWidth }">\n          <div class="toggle-content" data-hook="toggle-content" ng-transclude></div>\n          <input\n            name="switch"\n            type="radio"\n            ng-value="$ctrl.index"\n            ng-model="$ctrl.switchCtrl.selectedIndex">\n        </label>',
            restrict: "E",
            require: [ "wixSwitchToggle", "^^wixSwitchToggles" ],
            transclude: true,
            replace: true,
            bindToController: true,
            controllerAs: "$ctrl",
            scope: {
                value: "="
            },
            controller: [ "$element", function($element) {
                var _this = this;
                this.cssWidth = "auto";
                this.index = 0;
                this.setWidth = function(width) {
                    return _this.cssWidth = width + "px";
                };
                this.getValue = function() {
                    return _this.value || $element[0].textContent.trim();
                };
            } ],
            link: function(scope, iElement, iAttrs, _a) {
                var $ctrl = _a[0], wixSwitchTogglesCtrl = _a[1];
                $ctrl.index = wixSwitchTogglesCtrl.addToggle($ctrl, scope.$parent.$last);
                $ctrl.switchCtrl = wixSwitchTogglesCtrl;
            }
        };
    }
    angular.module("wixStyleInternal").directive("wixSwitchToggles", WixSwitchToggles).directive("wixSwitchToggle", WixSwitchToggle);
})();

(function() {
    function allowPropagationFrom() {
        return {
            restrict: "A",
            link: function($scope, $element, $attrs) {
                var eventType = $attrs["eventType"] || "click";
                var innerElement = $attrs["allowPropagationFrom"];
                $element.on(eventType, function(event) {
                    if (event.target.tagName.toLowerCase() !== innerElement) {
                        event.stopPropagation();
                    }
                });
                $scope.$on("$destroy", function() {
                    return $element.off(eventType);
                });
            }
        };
    }
    angular.module("wixStyleInternal").directive("allowPropagationFrom", allowPropagationFrom);
})();

"use strict";

(function() {
    WixMonthlyPickerController.$inject = [ "$filter", "$timeout", "DateService" ];
    monthlyPicker.$inject = [ "$document" ];
    function _range(from, to) {
        var items = [];
        while (from <= to) {
            items.push(from++);
        }
        return items;
    }
    var DAYS_RANGE = _range(1, 31);
    function _daysRange(to) {
        return DAYS_RANGE.slice(0, to);
    }
    function isLeapYear(year) {
        return new Date(year, 1, 29).getMonth() === 1;
    }
    function getDaysInMonths(year) {
        return [ 31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    }
    function getObjectFromDate(d) {
        return {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate()
        };
    }
    function createDate(state) {
        return new Date(state.year, state.month ? state.month - 1 : 0, state.day || 1);
    }
    function padZero(n) {
        return n < 10 ? 0 + "" + n : "" + n;
    }
    var MAX_ITEMS = {
        year: 12,
        month: 12,
        day: 36
    };
    var MONTHS = _range(1, 12);
    function WixMonthlyPickerController($filter, $timeout, DateService) {
        var dp = this;
        var TODAY_DATE = DateService.getToday();
        dp.direction = dp.direction || "top";
        dp.format = dp.format || "MM/dd/yyyy";
        dp.flow = dp.flow || [ "year", "month" ];
        dp.today = getObjectFromDate(TODAY_DATE);
        var startDate = dp.startDate || TODAY_DATE;
        angular.extend(dp, {
            startDate: startDate,
            start: getObjectFromDate(startDate),
            isOpen: false,
            $timeout: $timeout,
            $filter: $filter,
            defaultType: dp.flow[0],
            picked: {
                isEmpty: true
            }
        });
        dp.state = angular.extend({
            type: dp.defaultType
        }, dp.start);
        this.init(dp.date);
    }
    angular.extend(WixMonthlyPickerController.prototype, {
        init: function(date) {
            if (!date || isNaN(date)) {
                return;
            }
            var dp = this;
            dp.date = date;
            dp.state = angular.extend(dp.state, getObjectFromDate(dp.date));
            dp.picked = getObjectFromDate(dp.date);
            if (!dp.picked.isEmpty) {
                dp.date = createDate(dp.picked);
            }
            dp.displayDate = dp.getDisplayDate(dp.date);
        },
        options: function() {
            var dp = this;
            var min = dp.min();
            var max = dp.max();
            return {
                year: _range(min.year, max.year),
                month: MONTHS,
                day: _daysRange(max.day)
            };
        },
        min: function() {
            return {
                year: this.state.year - parseInt(MAX_ITEMS.year / 2),
                month: 1,
                day: 1
            };
        },
        max: function() {
            return {
                year: this.state.year + parseInt(MAX_ITEMS.year / 2) - 1,
                month: 12,
                day: getDaysInMonths(this.state.year)[this.state.month - 1]
            };
        },
        goPrev: function() {
            this._prev[this.state.type].call(this);
        },
        _prev: {
            year: function() {
                this.state.year -= MAX_ITEMS.year;
            },
            month: function() {
                this.state.year -= 1;
            },
            day: function() {
                this.state.month = (this.state.month - 1) % 12 || 12;
            }
        },
        goNext: function() {
            this._next[this.state.type].call(this);
        },
        _next: {
            year: function() {
                this.state.year += MAX_ITEMS.year;
            },
            month: function() {
                this.state.year += 1;
            },
            day: function() {
                this.state.month = (this.state.month + 1) % 12 || 12;
            }
        },
        isActive: function(option) {
            return this.picked[this.state.type] === Number(option);
        },
        isToday: function(option) {
            return this._isToday[this.state.type].call(this, option);
        },
        _isToday: {
            year: function(option) {
                return this.today.year === (option || this.state.year);
            },
            month: function(option) {
                return this.today.month === Number(option || this.state.month);
            },
            day: function(option) {
                return this.today.day === (option || this.state.day);
            }
        },
        pick: function(pick) {
            var dp = this;
            var type = dp.state.type;
            var index = dp.flow.indexOf(type);
            dp.$timeout(function() {
                dp.picked[type] = Number(pick);
                dp.state[type] = Number(pick);
                dp.date = createDate(dp.picked);
                dp.displayDate = dp.getDisplayDate(dp.date);
                if (dp.flow[index + 1]) {
                    dp.state.type = dp.flow[index + 1];
                    return;
                }
                dp.toggle();
                dp.$timeout(function() {
                    dp.state.type = dp.defaultType;
                });
            });
        },
        unpick: function() {
            var dp = this;
            var type = dp.state.type;
            var index = dp.flow.indexOf(type);
            dp.$timeout(function() {
                if (dp.flow[index - 1]) {
                    dp.state.type = dp.flow[index - 1];
                }
            });
        },
        toggleIsOpen: function(event) {
            event.stopPropagation();
            this.toggle();
        },
        toggle: function() {
            var nextState = !this.isOpen;
            if (nextState) {
                this.state.type = this.defaultType;
            }
            this.isOpen = nextState;
        },
        getDisplayDate: function(date) {
            return this.$filter("date")(date, this.format);
        }
    });
    function monthlyPicker($document) {
        return {
            templateUrl: "views/directives/wix-monthly-picker.html",
            restrict: "E",
            scope: {
                date: "=",
                startDate: "=?",
                flow: "=?",
                format: "@?",
                direction: "@?"
            },
            bindToController: true,
            link: function(scope, el) {
                $document.on("click", function(e) {
                    if (!scope.dp.isOpen) {
                        return;
                    }
                    if (el !== e.target && !el[0].contains(e.target)) {
                        scope.$apply(function() {
                            scope.dp.toggle();
                        });
                    }
                });
            },
            controller: WixMonthlyPickerController,
            controllerAs: "dp"
        };
    }
    angular.module("wixStyleInternal").filter("padZero", function() {
        return padZero;
    }).directive("wixMonthlyPicker", monthlyPicker);
})();

"use strict";

(function() {
    angular.module("wixStyleInternal").directive("mdDatepicker", function() {
        return {
            priority: 9999,
            link: function(scope, element, attrs) {
                var datepickerInput = element.find("input");
                var datepickerButton = element.find("button")[1];
                if (attrs.mdClickOnInput) {
                    datepickerInput.attr("readonly", "true");
                    datepickerInput.bind("click", function($event) {
                        angular.element($event.target).blur();
                        datepickerButton.click();
                    });
                }
            }
        };
    });
})();

"use strict";

function find(element, selector) {
    return angular.element(element[0].querySelector(selector));
}

angular.module("wixStyleInternal").directive("mdAutocomplete", [ "$compile", "$timeout", function($compile, $timeout) {
    var actionTemplate = '<div class="md-autocomplete-action">\n                            <div ng-click="actionFn()">{{actionText}}</div>\n                          </div>';
    var iconTemplate = '<i class="icon wix-style-svg-font-icons-validation"\n                                  wix-tooltip="{{errorMessage}}"\n                                  append-to-body="true"\n                                  placement="top"\n                                  max-width="250px">\n                        </i>';
    return {
        require: "mdAutocomplete",
        link: function(scope, element, attrs, ctrl) {
            var inputElement = find(element, "input");
            var addIconTooltip = function(errorMessage) {
                scope.errorMessage = errorMessage;
                $timeout(function() {
                    inputElement = find(element, "input");
                    inputElement.addClass("error md-autocomplete-input");
                    var iconElement = $compile(iconTemplate)(scope);
                    inputElement.after(iconElement);
                }, 0);
            };
            if (attrs["mdActionText"]) {
                scope.actionText = attrs.mdActionText;
                scope.actionFn = function() {
                    inputElement.blur().attr("disabled", "");
                    scope.$eval(attrs.mdAction).finally(function() {
                        inputElement.removeAttr("disabled");
                    });
                };
                find(element, ".md-autocomplete-suggestions-container").append($compile(actionTemplate)(scope));
                scope.ctrl = ctrl;
            }
            if (attrs["errorMessage"]) {
                var errorType = attrs["errorType"] || "tooltip";
                if (errorType === "tooltip") {
                    addIconTooltip(attrs["errorMessage"]);
                }
            }
        }
    };
} ]);