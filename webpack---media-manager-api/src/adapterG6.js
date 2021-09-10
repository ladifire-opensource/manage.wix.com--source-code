'use strict'
const presets = require('./presetsG6.json')
const constants = require('./constants.json')
const utils = require('./utils')

let isRegisteredToUploadProgress = false

function registerToUploadProgress(mediaFrame, config) {
    if (!isRegisteredToUploadProgress) {
        isRegisteredToUploadProgress = true
        mediaFrame.on('uploadprogress', config.onUploadProgress)
    }
}

/**
 * open media manager in open mode
 * @param {MediaManagerConfig}  config
 * @param {string} categoryName
 * @param {object}      [args]
 * @param {function}    args.options.onSuccess
 * @param {function}    args.options.onCancel
 * @param {function}    args.options.onRemove
 * @param {function}    args.options.multiSelect
 * @param {function}    args.options.restrictContent
 * @param {string}      args.options.path
 * @param {{title: string, submitButton: string}} args.options.translation
 * @param {{sectionTitle: string, sectionItems: object}} args.options.recommended
 */
function open(config, categoryName, ...args) {
    const {options, appId} = utils.getArguments(args)
    const categoryData = presets[categoryName]

    // set open mode related data
    const mmgrDataObj = {
        appId,
        categoryName,
        mediaType: categoryData.mediaParams.mediaType,
        publicMediaRoot: categoryData.mediaParams.publicMediaRoot,
        videoEncodingProfile: categoryData.mediaParams.videoEncodingProfile,
        namespace: categoryData.mediaParams.namespace,

        restrictContent: options.restrictContent === true,
        restrictK12Content: options.restrictK12Content === true,

        tabsList: categoryData.tabsList.open,
        restrictedTabs: categoryData.tabsList.restrictedTabs,
        restrictedK12Tabs: categoryData.tabsList.restrictedK12Tabs,


        networksList: categoryData.networksList.open,
        restrictedK12Networks: categoryData.networksList.restrictedK12Networks,


        canSubmitMedia: categoryData.canSubmitMedia,
        canSubmitTransparentVideos: categoryData.canSubmitTransparentVideos,
        canSubmitMultipleMedia: options.multiSelect === undefined ? categoryData.canSubmitMultipleMedia : options.multiSelect,
        canSubmitMediaBeforeEncodingComplete: categoryData.canSubmitMediaBeforeEncodingComplete,
        canUseImageAnalysis: categoryData.canUseImageAnalysis,
        path: options.path || (options.recommended ? constants.MMGR_TABS_MAP.MY_RECOMMENDED : constants.MMGR_TABS_MAP[categoryData.tabsList.default]),
        translation: {},
        translationsList: categoryData.translationsList,
        recommended: options.recommended || null,
        manageMode: false
    }

    // set selection type
    mmgrDataObj.selectionType = constants.MMGR_SELECTION_TYPE[mmgrDataObj.canSubmitMultipleMedia ? constants.MULTIPLE : constants.SINGLE]

    // set translations
    if (options.translation) {
        // title
        if (options.translation.title) {
            mmgrDataObj.translation.title = options.translation.title
        }

        // submitButton
        if (options.translation.submitButton) {
            mmgrDataObj.translation.submitButton = options.translation.submitButton
        }
    }

    // set callback
    if (options.callback) {
        mmgrDataObj.callback = (items, info) => {
            options.callback.apply(null, [items, info])
            window.focus()
        }
    } else {
        // Or onSuccess/onCancel/onRemove
        if (options.onSuccess) {
            mmgrDataObj.onSuccess = payload => {
                options.onSuccess.call(null, payload)
                window.focus()
            }
        }
        if (options.onCancel) {
            mmgrDataObj.onCancel = () => {
                options.onCancel.call(null)
                window.focus()
            }
        }
        if (options.onRemove) {
            mmgrDataObj.onRemove = payload => {
                options.onRemove.call(null, payload)
                window.focus()
            }
        }
    }

    // show the media manager
    showMMGRWindow(config, mmgrDataObj)
}

/**
 * media manager warm-up
 * @param {MediaManagerConfig}  config
 */
function warmup(config) {
    // mmgr iFrame
    const mediaFrame = getMediaFrame()
    // populate configuration object (mmgr api)
    const settings = {
        // media frame version
        version: 'G6',
        // language
        i18nCode: config.languageCode,
        // site based media
        siteMediaToken: config.siteMediaToken,
        // meta site
        metaSiteToken: config.metaSiteToken
    }
    mediaFrame.warmup(settings)

    registerToUploadProgress(mediaFrame, config)
}

/**
 * actual open media manager
 * @param {MediaManagerConfig}  config
 * @param {object}              mmgrDataObj
 */
function showMMGRWindow(config, mmgrDataObj) {
    // mmgr iFrame
    const mediaFrame = getMediaFrame()

    // populate configuration object (mmgr api)
    const settings = {
        // media frame version
        version: 'G6',
        openSource: mmgrDataObj.appId,
        origin: config.origin,

        // gui
        i18nCode: config.languageCode,
        mediaType: mmgrDataObj.mediaType,
        selectionType: mmgrDataObj.selectionType,
        canShowSelectButton: mmgrDataObj.canSubmitMedia,
        canSubmitTransparentVideos: mmgrDataObj.canSubmitTransparentVideos,
        canSubmitUntranscoded: mmgrDataObj.canSubmitMediaBeforeEncodingComplete,
        tabsList: utils.getMMGRTabsList(mmgrDataObj),
        path: mmgrDataObj.path,

        // restricted content
        restrictContent: mmgrDataObj.restrictContent,

        // restricted K12 content
        restrictK12: mmgrDataObj.restrictK12Content,

        // site based media
        siteMediaToken: config.siteMediaToken,

        // meta site
        metaSiteToken: config.metaSiteToken

        // additional keys to populate if needed
        // otherwise not presented in settings object
        // ------------------------------------------
        // publicMediaRoot:
        // servicesList:
        // videoEncodingProfile:
        // namespace:
    }

    // gui - set translations
    settings.translations = utils.getMMGRTranslations(mmgrDataObj)

    // gui - set the "Free from Wix" root media folder
    if (mmgrDataObj.publicMediaRoot) {
        settings.publicMediaRoot = mmgrDataObj.publicMediaRoot
    }

    // gui - set social networks list
    if (mmgrDataObj.networksList && mmgrDataObj.networksList.length) {
        settings.servicesList = utils.getMMGRServicesList(mmgrDataObj)
    }

    // gui - recommended tab (custom)
    if (mmgrDataObj.recommended) {
        settings.customData = utils.getMMGRRecommendedData(mmgrDataObj)
    }

    // server - indicates video encoding profile in need
    if (mmgrDataObj.videoEncodingProfile) {
        settings.videoEncodingProfile = mmgrDataObj.videoEncodingProfile
    }

    // server - namespace - indicates allocated user's media space
    if (mmgrDataObj.namespace) {
        settings.namespace = mmgrDataObj.namespace
    }

    // server - image analysis - ignore imageAnalysis api input
    if (mmgrDataObj.canUseImageAnalysis) {
        settings.vision = utils.getImageAnalysisOptions({})
    }

    // set callback
    function onItems(payload) {
        removeCallbacks()

        if (mmgrDataObj.callback) {
            const items = payload && payload.items || null
            const info = items && {path: payload.path} || null
            mmgrDataObj.callback(items, info)
        } else if (mmgrDataObj.onSuccess) {
            mmgrDataObj.onSuccess(payload)
        }
    }

    function onRemove(payload) {
        if (mmgrDataObj.onRemove) {
            mmgrDataObj.onRemove(payload)
        }
    }

    function onClose() {
        const callback = mmgrDataObj.callback || mmgrDataObj.onCancel

        removeCallbacks()

        if (callback) {
            callback(null, null)
        }
    }

    function removeCallbacks() {
        mediaFrame.off('items', onItems)
        mediaFrame.off('close', onClose)
        mediaFrame.off('notauthorized', removeCallbacks)
        mediaFrame.off('itemremove', onRemove)
    }

    // show MMGR, subscribe events only once
    mediaFrame.on('items', onItems)
        .on('close', onClose)
        .on('notauthorized', removeCallbacks)
        .on('itemremove', onRemove)

    registerToUploadProgress(mediaFrame, config)

    mediaFrame.open(settings)
    window.document.getElementById('mediaGalleryFrame').contentWindow.focus()
}

/**
 * get the categories object
 * @returns {{}}
 */
function getCategories() {
    return Object.keys(presets).reduce((result, key) => {
        result[key] = key
        return result
    }, {})
}

function getMediaFrame() {
    return window.MediaFrame
}

module.exports = {
    open,
    warmup,
    categories: getCategories(),
    // for tests only!
    resetInnerState() {
        isRegisteredToUploadProgress = false
    }
}

