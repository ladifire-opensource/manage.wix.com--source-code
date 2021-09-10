import { __assign } from "tslib";
import * as React from 'react';
import { CounterBadge } from 'wix-style-react';
import ArrowLeft from 'wix-ui-icons-common/ArrowLeft';
import FormFieldError from 'wix-ui-icons-common/system/FormFieldError';
import styles from './Badge.scss';
import { BadgeType, UploadStatus } from '@wix/business-manager-api';
import { WrappedCountBadge } from './CountBadge';
var isUploadBadge = function (badge) {
    return badge.type === BadgeType.UPLOAD && !!badge.status;
};
var isCountBadge = function (badge) {
    return badge.type === BadgeType.COUNT &&
        !!badge.count &&
        Number.isInteger(badge.count);
};
var isNotificationBadge = function (badge) {
    return badge.type === BadgeType.NOTIFICATION;
};
export var isNewBadge = function (badge) {
    return badge.type === BadgeType.NEW;
};
export var getRequiredBadge = function (badge) {
    if (isNotificationBadge(badge)) {
        return React.createElement(NotificationBadgeComponent, null);
    }
    if (isUploadBadge(badge)) {
        return React.createElement(UploadBadgeComponent, __assign({}, badge));
    }
    if (isCountBadge(badge) && badge.count > 0) {
        return React.createElement(WrappedCountBadge, __assign({}, badge));
    }
};
var NotificationBadgeComponent = function () {
    var iconWrapperStyle = {
        width: 'auto',
        height: 'auto',
        marginTop: '1px'
    };
    return (React.createElement(CounterBadge, { skin: "danger", "data-hook": "notification-badge" },
        React.createElement("div", { style: iconWrapperStyle },
            React.createElement(FormFieldError, { size: "10px" }))));
};
var UploadBadgeComponent = function (badge) {
    var status = badge.status;
    return (React.createElement("div", { "data-hook": "upload-badge" },
        status === UploadStatus.UPLOADING && React.createElement(VideoUploadingIndicator, null),
        status === UploadStatus.SUCCESS && React.createElement("div", { "data-hook": "upload-success", className: styles.uploadingSuccess }),
        status === UploadStatus.ERROR && React.createElement("div", { "data-hook": "upload-error", className: styles.uploadingError })));
};
var VideoUploadingIndicator = function () { return (React.createElement("div", { className: styles.videoUploading, "data-hook": "uploading-indicator" },
    React.createElement("div", { className: styles.arrowContainer },
        React.createElement(ArrowLeft, { size: "16px" })),
    React.createElement("div", { className: styles.ring },
        React.createElement("div", null),
        React.createElement("div", null),
        React.createElement("div", null),
        React.createElement("div", null)))); };
//# sourceMappingURL=Badges.js.map