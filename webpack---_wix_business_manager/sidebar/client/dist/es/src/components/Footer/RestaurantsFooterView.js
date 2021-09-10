import { __assign } from "tslib";
import * as React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from '@wix/wix-i18n-config';
import RestaurantsFooter from './RestaurantsFooter/RestaurantsFooter';
import { ModuleRegistry } from 'react-module-container';
import { ModuleId } from '@wix/business-manager-api';
import { selectMetaSiteId } from '../../selectors/select-basic-aspects';
import { experimentsSelectors } from '@wix/wix-experiments-redux';
var RestaurantsFooterViewWrapper = function (props) {
    return ModuleRegistry.modules[ModuleId.Restaurants] ?
        React.createElement(RestaurantsFooter, __assign({}, props)) :
        null;
};
var mapStateToProps = function (state) {
    return {
        locale: state.locale,
        metaSiteId: selectMetaSiteId(state),
        useNewDashboardEnabled: experimentsSelectors(state).enabled('specs.wos1.useNewDashboard2020')
    };
};
export var RestaurantsFooterView = connect(mapStateToProps)(withTranslation()(RestaurantsFooterViewWrapper));
//# sourceMappingURL=RestaurantsFooterView.js.map