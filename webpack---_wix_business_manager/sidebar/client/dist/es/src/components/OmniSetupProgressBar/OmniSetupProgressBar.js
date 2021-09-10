import { __extends } from "tslib";
import * as React from 'react';
import { connect } from 'react-redux';
import { ModuleRegistry } from 'react-module-container';
import { SIDEBAR_OMNI_SETUP_COMPONENT_NAME_LAZY } from '@wix/omni-setup-sidebar/dist/src/business-manager-integration/config';
import { experimentsSelectors } from '@wix/wix-experiments-redux';
import { selectIsHidden } from '../../selectors/select-is-hidden';
import { withErrorBoundary } from '@wix/business-manager-common-utils';
var View = /** @class */ (function (_super) {
    __extends(View, _super);
    function View() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.LazyComponent = ModuleRegistry.component(SIDEBAR_OMNI_SETUP_COMPONENT_NAME_LAZY);
        return _this;
    }
    View.prototype.render = function () {
        var _a = this.props, experiments = _a.experiments, isSidebarHidden = _a.isSidebarHidden;
        if (!this.LazyComponent) {
            return null;
        }
        return React.createElement(this.LazyComponent, { isSidebarHidden: isSidebarHidden, experiments: experiments });
    };
    return View;
}(React.PureComponent));
var mapStateToProps = function (state) { return ({
    experiments: experimentsSelectors(state),
    isSidebarHidden: selectIsHidden(state)
}); };
export var ProgressBar = withErrorBoundary()(connect(mapStateToProps)(View));
//# sourceMappingURL=OmniSetupProgressBar.js.map