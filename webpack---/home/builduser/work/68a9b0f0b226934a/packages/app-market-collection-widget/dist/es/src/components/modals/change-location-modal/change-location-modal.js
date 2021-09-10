import { Box, Text, ModalSelectorLayout } from 'wix-style-react';
import * as React from 'react';
export var ChangeLocationModal = function (_a) {
    var handleDataSource = _a.handleDataSource, onChoose = _a.onChoose, onClose = _a.onClose, disableConfirmation = _a.disableConfirmation, onSelect = _a.onSelect, t = _a.t;
    var handleEmptyState = function (searchFilter) { return (React.createElement(Box, { align: "center", verticalAlign: "middle", height: '100%' },
        React.createElement(Text, null, t('change-location-modal.empty-state-description', {
            searchFilter: searchFilter,
        })))); };
    return (React.createElement(ModalSelectorLayout, { dataSource: handleDataSource, height: '510px', searchDebounceMs: 500, onCancel: onClose, onClose: onClose, onSelect: function (_a) {
            var id = _a.id;
            return onSelect(id.toString());
        }, onOk: function (_a) {
            var id = _a.id;
            return onChoose(id.toString());
        }, title: t('change-location-modal.title'), cancelButtonText: t('change-location-modal.cancel-button-label'), okButtonText: t('change-location-modal.choose-button-label'), searchPlaceholder: t('change-location-modal.search-placeholder'), noResultsFoundStateFactory: handleEmptyState, disableConfirmation: disableConfirmation }));
};
//# sourceMappingURL=change-location-modal.js.map