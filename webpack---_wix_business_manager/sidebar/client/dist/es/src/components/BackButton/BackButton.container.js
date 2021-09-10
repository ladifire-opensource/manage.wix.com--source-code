import { __assign } from "tslib";
import { connect } from 'react-redux';
import { withTranslation } from '@wix/wix-i18n-config';
import { BIEvent, BISource, log } from '../../services/biLogger';
import { selectNodePageComponentId } from '../../selectors/selectNodePageComponentId';
import { BackButtonView } from './BackButtonView';
import { selectActiveNode, selectActiveParentNode } from '../../selectors/select-active-node';
export var BACK_BUTTON_TRANSLATION_KEY = 'sidebar.back';
var mapStateToProps = function (state, ownProps) {
    var activeEntry = selectActiveNode(state);
    var activeEntryParent = selectActiveParentNode(state);
    var biParams = __assign(__assign({}, state.biParams), { app_id: selectNodePageComponentId(activeEntry), name: activeEntryParent.biName, sidebar_name: activeEntryParent.id, src: BISource.myAccount, evid: BIEvent.BACK_MENU_CLICKED //570
     });
    return {
        onClick: function () { return log(biParams); },
        text: ownProps.t(BACK_BUTTON_TRANSLATION_KEY)
    };
};
export var BackButton = withTranslation()(connect(mapStateToProps)(BackButtonView));
//# sourceMappingURL=BackButton.container.js.map