import { __awaiter, __generator } from "tslib";
import * as React from 'react';
import { UpgradeButton } from './UpgradeButton';
import style from './Footer.scss';
import { RestaurantsFooterView } from './RestaurantsFooterView';
import { hasPermissions } from '../../selectors/select-has-permissions';
import { connect } from 'react-redux';
import { manageBackofficePermission } from '../../permissions';
import { experimentsSelectors } from '@wix/wix-experiments-redux';
import { getEditorType } from '../../selectors/select-site';
import { getHostContainer } from '@wix/business-manager-api';
import { FOOTER_CONTAINER_ID } from '../../consts';
import { selectCurrentPageId } from '../../selectors/select-active-node';
var FooterView = function (props) {
    var isPermitted = props.isPermitted, showAddNewButton = props.showAddNewButton, pageView = props.pageView;
    var _a = React.useState(undefined), AddNewButton = _a[0], setAddNewButton = _a[1];
    React.useEffect(function () {
        var getAddNewButtonExtension = function () { return __awaiter(void 0, void 0, void 0, function () {
            var hostContainer, containerExtensions, Component;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hostContainer = getHostContainer(FOOTER_CONTAINER_ID);
                        return [4 /*yield*/, hostContainer.getExtensions()];
                    case 1:
                        containerExtensions = _a.sent();
                        Component = containerExtensions.find(function (extension) { return extension.componentId === 'add-new-button'; }).Component;
                        setAddNewButton(function () { return Component; });
                        return [2 /*return*/];
                }
            });
        }); };
        if (showAddNewButton) {
            getAddNewButtonExtension();
        }
    }, [showAddNewButton]);
    if (!isPermitted) {
        return null;
    }
    return (React.createElement("div", { "data-hook": "sidebar-footer" },
        React.createElement("div", { className: style.upgradeButtonContainer },
            React.createElement(UpgradeButton, null)),
        React.createElement(RestaurantsFooterView, null),
        showAddNewButton && AddNewButton && React.createElement(AddNewButton, { pageView: pageView })));
};
var mapStateToProps = function (state) {
    var isAddNewButtonExperimentEnabled = experimentsSelectors(state).enabled('specs.wosbm.AddNewButtonOnSidebar');
    var editorType = getEditorType(state);
    var isInEditorX = editorType === 'EditorX';
    var shouldShowAddNewButton = state.isInDashboard && !isInEditorX && isAddNewButtonExperimentEnabled;
    var pageView = selectCurrentPageId(state);
    return ({
        isPermitted: hasPermissions(state, manageBackofficePermission),
        showAddNewButton: shouldShowAddNewButton,
        pageView: pageView,
    });
};
export var Footer = connect(mapStateToProps)(FooterView);
//# sourceMappingURL=Footer.js.map