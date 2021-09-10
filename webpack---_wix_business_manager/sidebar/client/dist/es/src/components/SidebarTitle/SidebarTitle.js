import * as React from 'react';
import { connect } from 'react-redux';
import { selectNode } from '../../selectors/select-node';
import { withTranslation } from '@wix/wix-i18n-config';
import { SidebarSectionTitle } from 'wix-style-react';
var mapStateToProps = function (state, _a) {
    var id = _a.id;
    return ({
        id: id,
        label: selectNode(state, id).label
    });
};
var View = function (_a) {
    var t = _a.t, id = _a.id, label = _a.label;
    return React.createElement(SidebarSectionTitle, { dataHook: id }, t(label));
};
export var SidebarTitleView = withTranslation()(View);
export var SidebarTitle = connect(mapStateToProps)(SidebarTitleView);
//# sourceMappingURL=SidebarTitle.js.map