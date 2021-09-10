import { __assign } from "tslib";
import { ExternalPageId } from '@wix/business-manager-api';
export var DEFAULT_TOOLTIP = 'sidebar.tooltip.default';
export var ownerOnlyLinks = ['subscription', 'plans-settings', 'domains-settings', 'mailboxes-settings', 'payments'];
export var ownerOnlyMessageKey = 'sidebar.tooltip.ownerOnly';
export var contactOwnerMessageKey = 'sidebar.tooltip.contactOwner';
export var disabledInFlashSiteMessageKey = 'sidebar.tooltip.flashSite';
export var contactOwnerLearnMore = 'sidebar.tooltip.contactOwner.learnMoreLink';
export var noPermissionsSupportArticle = '/article/roles-permissions-information-for-site-collaborators';
var getDisabledTooltipText = function (entry, isEnabledForSiteType) {
    var text = isEnabledForSiteType ? contactOwnerMessageKey : disabledInFlashSiteMessageKey;
    if (ownerOnlyLinks.includes(entry.id)) {
        text = ownerOnlyMessageKey;
    }
    return text;
};
var getDisabledTooltipLinkInfo = function (state, entry) {
    return {
        entryId: entry.id,
        linkText: contactOwnerLearnMore,
        navigateToConfig: {
            pageComponentId: ExternalPageId.Support,
            contextData: { article: noPermissionsSupportArticle, locale: state.locale },
            openInNewTab: true,
        }
    };
};
export var getEntryTooltip = function (state, enabled, entry, isEnabledForSiteType) {
    if (!enabled) {
        var text = getDisabledTooltipText(entry, isEnabledForSiteType);
        var linkInfo = isEnabledForSiteType && getDisabledTooltipLinkInfo(state, entry);
        return { tooltip: __assign({ type: DEFAULT_TOOLTIP, text: text }, linkInfo)
        };
    }
    if (entry.tooltip) {
        return { tooltip: __assign(__assign({}, entry.tooltip), { entryId: entry.id }) };
    }
    return {};
};
//# sourceMappingURL=add-tooltip-to-entry.js.map