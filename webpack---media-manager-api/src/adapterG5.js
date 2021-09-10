'use strict'
const presets = require('./presetsG5.json')
const constant = require('./constants.json')
const utils = require('./utils')

/**
 * open media manager in manage mode
 * @param {Object}  config
 * @param {string} categoryName
 * @param {Object}  [options]
 * @param {string}  [appID]
 */
function manage(config, categoryName, ...args) {
    const {options, appId} = utils.getArguments(args)
    const categoryData = presets[categoryName]

    // make sure only required keys are passed
    const mmgrDataObj = {
        categoryName,
        appId,
        tabsList: categoryData.tabsList.manage,
        networksList: categoryData.networksList,
        mediaParams: categoryData.mediaParams,
        restrictContent: options.restrictContent === true,
        restrictedTabs: categoryData.tabsList.restrict,
        helpId: categoryData.helpId,

        canSubmitMedia: false,
        canSubmitMultipleMedia: false,
        canSubmitMediaBeforeEncodingComplete: false,
        canUploadMedia: categoryData.canUploadMedia,
        manageMode: true,

        path: options.path || constant.MMGR_TABS_MAP[categoryData.tabsList.default],
        translation: {},
        translationsList: categoryData.translationsList,
        imageAnalysis: categoryData.canUseImageAnalysis ? options.imageAnalysis || true : null
    }

    // check if external translations
    if (options.translation && options.translation.title) {
        mmgrDataObj.translation.title = options.translation.title
    }

    // set callback
    if (options.callback) {
        mmgrDataObj.callback = options.callback
    } else {
        // Or onSuccess/onCancel
        if (options.onSuccess) {
            mmgrDataObj.onSuccess = options.onSuccess
        }
        if (options.onCancel) {
            mmgrDataObj.onCancel = options.onCancel
        }
    }

    // if un-managed category - throw
    if (!(mmgrDataObj.tabsList && Object.keys(mmgrDataObj.tabsList).length)) {
        throw new Error(`${categoryName} is an un-managed category`)
    } else {
        // show the media manager
        showMMGRWindow(config, mmgrDataObj)
    }
}


/**
 * open media manager in open mode
 * @param {MediaManagerConfig}  config
 * @param {string} categoryName
 * @param {[appId, options]} args
 * @param {object}      [args[1]] options
 * @param {function}    options.onSuccess
 * @param {function}    options.onCancel
 * @param {string}      options.path
 * @param {{title: string, submitButton: string}} options.translation
 * @param {{sectionTitle: string, sectionItems: object}} options.recommended
 */
function open(config, categoryName, ...args) {
    const {options, appId} = utils.getArguments(args)
    const categoryData = presets[categoryName]
    // make sure only required keys are passed
    const mmgrDataObj = {
        categoryName,
        appId,
        tabsList: categoryData.tabsList.open,
        networksList: categoryData.networksList,
        mediaParams: categoryData.mediaParams,
        restrictContent: options.restrictContent === true,
        restrictedTabs: categoryData.tabsList.restrict,
        helpId: categoryData.helpId,

        canSubmitMedia: categoryData.canSubmitMedia,
        canSubmitMultipleMedia: options.multiSelect === undefined ? categoryData.canSubmitMultipleMedia : options.multiSelect,
        canSubmitMediaBeforeEncodingComplete: categoryData.canSubmitMediaBeforeEncodingComplete,
        canUploadMedia: categoryData.canUploadMedia,
        manageMode: false,

        path: options.path || (options.recommended ? constant.MMGR_TABS_MAP.MY_RECOMMENDED : constant.MMGR_TABS_MAP[categoryData.tabsList.default]),
        translation: {},
        translationsList: categoryData.translationsList,
        imageAnalysis: categoryData.canUseImageAnalysis ? options.imageAnalysis || true : null,
        recommended: options.recommended || null,
        namespace: options.ns || null
    }

    // check if external translations
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
        // Or onSuccess/onCancel
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
    }
    if (options.onRemove) {
        mmgrDataObj.onRemove = payload => {
            options.onRemove.call(null, payload)
            window.focus()
        }
    }

    // show the media manager
    showMMGRWindow(config, mmgrDataObj)
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
        // media frame version , origin opener and the appId
        version: 'G5',
        openSource: mmgrDataObj.appId,
        origin: config.origin,
        // gui
        i18nCode: config.languageCode,
        windowStyle: constant.MMGR_WINDOW_STYLE,

        i18nPrefix: utils.getMMGRI18nPrefix(mmgrDataObj),
        mediaType: utils.getMMGRMediaType(mmgrDataObj),
        selectionType: utils.getMMGRSelectionType(mmgrDataObj),
        canShowSelectButton: mmgrDataObj.canSubmitMedia,
        canSubmitUntranscoded: mmgrDataObj.canSubmitMediaBeforeEncodingComplete,
        disableUpload: !mmgrDataObj.canUploadMedia,

        tabsList: utils.getMMGRTabsList(mmgrDataObj),
        path: mmgrDataObj.path,

        // restricted content
        restrictContent: mmgrDataObj.restrictContent,

        // contributors
        siteMediaToken: config.siteMediaToken,
        // max parallel uploads
        maxParallelUploads: constant.MMGR_MAX_PARALLEL_UPLOADS

        // additional keys to populate if needed
        // otherwise not presented in settings object
        // ------------------------------------------
        // publicMediaRoot:
        // helpId:
        // servicesList:
        // videoEncodingProfile:
        // namespace:
    }

    // gui - set translations
    settings.translations = utils.getMMGRTranslations(mmgrDataObj)

    // gui - set the "Free from Wix" root media folder
    if (mmgrDataObj.mediaParams.publicMediaRoot) {
        settings.publicMediaRoot = mmgrDataObj.mediaParams.publicMediaRoot
    }

    // gui - set social networks list
    if (mmgrDataObj.networksList && mmgrDataObj.networksList.length) {
        settings.servicesList = utils.getMMGRServicesList(mmgrDataObj)
    }

    // gui - recommended tab (custom)
    if (mmgrDataObj.recommended) {
        settings.customData = utils.getMMGRRecommendedData(mmgrDataObj)
    }


    // gui - help Id
    if (mmgrDataObj.helpId) {
        settings.helpId = mmgrDataObj.helpId
    }

    // server - indicates video encoding profile in need
    if (mmgrDataObj.mediaParams.videoEncodingProfile) {
        settings.videoEncodingProfile = mmgrDataObj.mediaParams.videoEncodingProfile
    }

    // server - namespace - indicates allocated user's media space
    if (Object.keys(mmgrDataObj.mediaParams.namespace || {}).length) {
        settings.namespace = mmgrDataObj.mediaParams.namespace.external ? mmgrDataObj.namespace : mmgrDataObj.mediaParams.namespace.value
    }

    // server - image analysis
    if (mmgrDataObj.imageAnalysis) {
        const imageAnalysisInput = typeof mmgrDataObj.imageAnalysis === 'object' ? mmgrDataObj.imageAnalysis : {}
        const imageAnalysisOptions = utils.getImageAnalysisOptions(imageAnalysisInput)

        if (imageAnalysisOptions.length) {
            settings.vision = imageAnalysisOptions
        }
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

    // set item remove callback
    function onRemove(payload) {
        //mediaFrame.off('itemremove', onRemove)

        if (mmgrDataObj.onRemove) {
            mmgrDataObj.onRemove(payload)
        }

        //mediaFrame.on('itemremove', onRemove)
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

    mediaFrame.open(settings)
    window.document.getElementById('mediaGalleryFrame').contentWindow.focus()
}

function warmup(config) {
    // mmgr iFrame
    const mediaFrame = getMediaFrame()
    // populate configuration object (mmgr api)
    const settings = {
        // language
        i18nCode: config.languageCode,
        // media frame version
        version: 'G5'
    }
    mediaFrame.warmup(settings)
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
    manage,
    warmup,
    categories: Object.freeze(getCategories())
}
