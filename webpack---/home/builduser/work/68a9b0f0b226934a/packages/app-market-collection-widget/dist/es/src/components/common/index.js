import { AppGroup, } from '@wix/marketplace-interfaces';
export var extractWebSolutions = function (rawCollection) {
    return (rawCollection.sectionData.tagData.tagsToWebSolutions &&
        rawCollection.sectionData.tagData.tagsToWebSolutions[0].webSolutions
            .webSolutions);
};
export var getWebSolutionData = function (webSolution) {
    var baseInfo = webSolution.baseInfo, assetsMap = webSolution.assetsMap;
    return {
        id: baseInfo.id,
        slug: baseInfo.slug,
        name: baseInfo.name,
        description: baseInfo.teaser,
        teaser: baseInfo.teaser,
        icon: baseInfo.icon,
        appIcon: baseInfo.icon,
        pricing: baseInfo.pricing,
        poster: (assetsMap.collectionImage && assetsMap.collectionImage.assets[0].url) ||
            (assetsMap.images && assetsMap.images.assets[0].url) ||
            '',
        numberOfReviews: baseInfo.numberOfReviews || 0,
        reviewStars: baseInfo.reviewStars || 0,
        badge: baseInfo.badge,
        isInstalled: baseInfo.isInstalled,
        company: baseInfo.company,
        openConsentIn: baseInfo.openConsentIn,
        Tags: baseInfo.Tags,
        type: 'type',
        showPremiumLabel: baseInfo.showPremiumLabel,
        isBundleAppNotInstalled: baseInfo.isBundleAppNotInstalled
    };
};
export var getFakeWebSolutionBiData = function (solutions, widgetName) {
    return solutions.map(function (solution, index) {
        return {
            impressionType: widgetName,
            index: index,
            market: 'fake market',
            tagName: 'fake tagName',
            tagType: 'fake tagType',
            subCategory: 'fake subCategory',
        };
    });
};
export var getCollectionDefinition = function (rawTagDefinition) { return ({
    name: rawTagDefinition.name,
    slug: rawTagDefinition.slug,
    description: rawTagDefinition.description,
    type: rawTagDefinition.type,
    teaser: rawTagDefinition.teaser,
    color: rawTagDefinition.colors[0],
    author: rawTagDefinition.data && {
        name: rawTagDefinition.data.collectionDate.writerName,
        teaser: rawTagDefinition.data.collectionDate.teaser,
        role: rawTagDefinition.data.collectionDate.writerRole,
        image: (rawTagDefinition.assetsMap.writerImage.assets &&
            rawTagDefinition.assetsMap.writerImage.assets[0] &&
            rawTagDefinition.assetsMap.writerImage.assets[0].url) ||
            '',
        signature: (rawTagDefinition.assetsMap.signatureImage &&
            rawTagDefinition.assetsMap.signatureImage.assets &&
            rawTagDefinition.assetsMap.signatureImage.assets[0] &&
            rawTagDefinition.assetsMap.signatureImage.assets[0].url) ||
            '',
    },
}); };
export var extractTagsDefinition = function (tagsToWebSolutions) {
    return tagsToWebSolutions.map(function (tagData) {
        var _a = tagData.webSolutions.tagsAndSubCategories[0].tag, name = _a.name, slug = _a.slug, description = _a.description, colors = _a.colors, teaser = _a.teaser, data = _a.data, assetsMap = _a.assetsMap;
        return {
            name: name,
            description: description,
            teaser: teaser,
            color: (colors && colors[0]) || '',
            icon: (assetsMap &&
                assetsMap.collectionImage &&
                assetsMap.collectionImage.assets.length &&
                assetsMap.collectionImage.assets[0].url) ||
                '',
            author: data && {
                name: data.collectionDate.writerName,
                teaser: data.collectionDate.teaser,
                role: data.collectionDate.writerRole,
                image: assetsMap.writerImage.assets[0].url,
                signature: (assetsMap.signatureImage &&
                    assetsMap.signatureImage.assets &&
                    assetsMap.signatureImage.assets[0] &&
                    assetsMap.signatureImage.assets[0].url) ||
                    '',
            },
            slug: slug,
        };
    });
};
export var getBadgeFromTags = function (tags, experiments) {
    if ((experiments === null || experiments === void 0 ? void 0 : experiments.enabled('specs.marketplace.blackFridaySale')) && ((tags === null || tags === void 0 ? void 0 : tags.findIndex(function (tag) { return tag.slug === 'black-friday-sale'; })) > -1)) {
        return 'solutionBox.badge.blackFridaySale';
    }
    return '';
};
export var getAppBadgeTitle = function (isBundleAppInstalled, isBundleAppNotInstalled, tags, experiments, hideTagsBadge) {
    var badgeFromTags = hideTagsBadge ? '' : getBadgeFromTags(tags, experiments);
    if (badgeFromTags) {
        return badgeFromTags;
    }
    if (isBundleAppInstalled || isBundleAppNotInstalled) {
        return 'solutionBox.badge.bundle';
    }
};
export var getAppBadgeTheme = function (badgeKey) {
    if (badgeKey === 'solutionBox.badge.bundle') {
        return {
            skin: 'success',
            type: 'solid',
            size: 'small',
            uppercase: false,
        };
    }
    if (badgeKey === 'solutionBox.badge.blackFridaySale') {
        return {
            size: 'small',
            uppercase: true,
        };
    }
};
export var getAppBadgeTooltipContent = function (isBundleAppInstalled, isBundleAppNotInstalled, isVoucherApp) {
    if (isBundleAppNotInstalled && isVoucherApp) {
        return 'solutionBox.badge.bundle-tooltip-voucher-not-installed';
    }
    if (isBundleAppNotInstalled) {
        return 'solutionBox.badge.bundle-tooltip-bundle-not-installed';
    }
    if (isBundleAppInstalled && isVoucherApp) {
        return 'solutionBox.badge.bundle-tooltip-installed-voucher';
    }
    if (isBundleAppInstalled) {
        return 'solutionBox.badge.bundle-tooltip-not-installed';
    }
};
export var isBundleAppAndInstalled = function (appID, bundleApps) {
    var bundleApp = bundleApps && bundleApps.find(function (app) { return app.webSolutionBase.id === appID; });
    return (bundleApp &&
        bundleApp.group === AppGroup.BUNDLE &&
        bundleApp.upgradeSuggestion);
};
export var isBundleAppAndNotInstalled = function (appID, bundleApps) {
    var bundleApp = bundleApps && bundleApps.find(function (app) { return app.webSolutionBase.id === appID; });
    return (bundleApp &&
        bundleApp.group === AppGroup.BUNDLE &&
        !bundleApp.upgradeSuggestion);
};
export var getBundleAppSavedPrice = function (appID, bundleApps) {
    var bundleApp = bundleApps && bundleApps.find(function (app) { return app.webSolutionBase.id === appID; });
    return bundleApp && bundleApp.appSavedPrice;
};
//# sourceMappingURL=index.js.map