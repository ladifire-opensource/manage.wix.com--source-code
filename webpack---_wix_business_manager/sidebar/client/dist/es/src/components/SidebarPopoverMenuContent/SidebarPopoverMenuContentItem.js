import * as React from 'react';
import { SidebarItem as SidebarItemView } from '../SidebarItem/SidebarItem';
import { Sidebar, SidebarDivider } from 'wix-style-react';
import { selectNodeType, SidebarComponentsTypes } from '../../selectors/select-item-type';
var SidebarPopoverMenuContentItem = function (props) {
    var item = props.item, onLinkClick = props.onLinkClick, hideTitlesAndDividers = props.hideTitlesAndDividers;
    var id = item.id, enabled = item.enabled, label = item.label;
    var nodeType = selectNodeType(item);
    if (!hideTitlesAndDividers && nodeType === SidebarComponentsTypes.title) {
        return React.createElement(SidebarItemView, { dataHook: "sidebar-popover-content-title-" + id, key: id, label: label, id: id });
    }
    if (!hideTitlesAndDividers && nodeType === SidebarComponentsTypes.separator) {
        return React.createElement(SidebarDivider, { dataHook: "sidebar-popover-content-separator-" + id, key: id });
    }
    if (nodeType === SidebarComponentsTypes.link) {
        return (React.createElement(Sidebar.Item, { key: id, itemKey: id, disable: !enabled, "data-hook": "sidebar-popover-content-link-" + id, onClick: onLinkClick },
            React.createElement(SidebarItemView, { id: id })));
    }
    return React.createElement(React.Fragment, null);
};
export default SidebarPopoverMenuContentItem;
//# sourceMappingURL=SidebarPopoverMenuContentItem.js.map