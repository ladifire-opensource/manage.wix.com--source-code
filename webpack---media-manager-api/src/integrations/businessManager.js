'use strict'
/*global ModuleRegistry*/
/*global mediaManager*/

//Registration in Business Manager Module registry
if (ModuleRegistry && mediaManager) {
    ModuleRegistry.registerMethod('mediaManager.open', () => function (category, appDefId, options) {
        if (typeof appDefId === 'object') {
            options = appDefId
            appDefId = options && options.appDefId || 'BUSINESS_MANAGER'
        }
        return mediaManager.open(category, appDefId, options)
    })

    ModuleRegistry.registerMethod('mediaManager.categories', () => function () {
        return mediaManager.categories
    })

    ModuleRegistry.registerMethod('mediaManager.updateSiteMediaToken', () => function (siteMediaToken) {
        return mediaManager.updateSiteMediaToken(siteMediaToken)
    })

    ModuleRegistry.registerMethod('mediaManager.updateMetaSiteToken', () => function (metaSiteToken) {
        return mediaManager.updateMetaSiteToken(metaSiteToken)
    })

    ModuleRegistry.registerMethod('mediaManager.warmup', () => function () {
        return mediaManager.warmup()
    })

    ModuleRegistry.registerMethod('mediaManager.addUploadProgressListener', () => function (handler, categories) {
        return mediaManager.addUploadProgressListener(handler, categories)
    })

    ModuleRegistry.registerMethod('mediaManager.removeUploadProgressListener', () => function (handler) {
        return mediaManager.removeUploadProgressListener(handler)
    })
}
