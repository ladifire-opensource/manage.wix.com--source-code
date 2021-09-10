'use strict'
const constants = require('./constants.json')
const i18n = require('./translations')

let translate

/**
 * normalize arguments for G5 to G6 transition
 * @param {array} argData
 * @returns {{options: object, appId: string}}
 */
function getArguments(argData) {
    const defaultArgs = {
        options: {},
        appId: constants.UNKNOWN_APPLICATION_ID
    }
    return argData.reduce((result, argument) => {
        if (typeof argument === 'string') {
            result.appId = argument
        } else if (argument && Object.keys(argument).length) {
            result.options = argument
        }
        return result
    }, defaultArgs)
}

/**
 * mmgr media type
 * @param {object}  mmgrDataObj
 * @returns {string}
 */
function getMMGRMediaType(mmgrDataObj) {
    return mmgrDataObj.mediaParams.mediaType
}

/**
 * mmgr item selection
 * @param {object}  mmgrDataObj
 * @returns {string}
 */
function getMMGRSelectionType(mmgrDataObj) {
    return constants.MMGR_SELECTION_TYPE[mmgrDataObj.canSubmitMultipleMedia ? constants.MULTIPLE : constants.SINGLE]
}

/**
 * mmgr i18nPrefix - G5 for translation purposes
 * @param {object}  mmgrDataObj
 * @returns {string}
 */
function getMMGRI18nPrefix(mmgrDataObj) {
    const prefix = mmgrDataObj.mediaParams.i18nPrefix
    return prefix[mmgrDataObj.canSubmitMultipleMedia ? constants.MULTIPLE : constants.SINGLE]
}

/**
 * mmgr tabs to display (exclude restricted tabs)
 * @param {object} mmgrDataObj
 * @returns {array}
 */
function getMMGRTabsList(mmgrDataObj) {
    const filteredContentTabs = mmgrDataObj.restrictContent ? mmgrDataObj.tabsList.filter(value => !~mmgrDataObj.restrictedTabs.indexOf(value)) : mmgrDataObj.tabsList
    const filteredK12Tabs = mmgrDataObj.restrictK12Content ? mmgrDataObj.tabsList.filter(value => !~mmgrDataObj.restrictedK12Tabs.indexOf(value)) : mmgrDataObj.tabsList
    const filteredTabs = filteredContentTabs.filter(value => ~filteredK12Tabs.indexOf(value))

    const tabList = filteredTabs.map(getMMGRTab)
    if (mmgrDataObj.recommended && tabList.indexOf(constants.MMGR_TABS_MAP.MY_RECOMMENDED) < 0) {
        return [constants.MMGR_TABS_MAP.MY_RECOMMENDED].concat(tabList)
    }

    return tabList
}

/**
 * mmmgr networks to display (exclude restricted networks)
 * @param {object} mmgrDataObj
 * @returns {array}
 */
function getMMGRServicesList(mmgrDataObj) {
    const filteredServices = mmgrDataObj.restrictK12Content ? mmgrDataObj.networksList.filter(value => !~mmgrDataObj.restrictedK12Networks.indexOf(value)) : mmgrDataObj.networksList
    const serviceList = filteredServices.map(getMMGRService)

    return serviceList
}

/**
 * returns mmgr tab name
 * @param {string} tabName
 * @returns {string}
 */
function getMMGRTab(tabName) {
    return constants.MMGR_TABS_MAP[tabName]
}

/**
 * returns mmgr service name
 * @param {string} serviceName
 * @returns {string}
 */
function getMMGRService(serviceName) {
    return constants.MMGR_SERVICES_LIST_MAP[serviceName]
}

/**
 * returns custom tab data structure
 * @param {object} mmgrDataObj
 * @returns {{}}
 */
function getMMGRRecommendedData(mmgrDataObj) {
    const customDataArr = mmgrDataObj.recommended.map(item => {
        const data = {
            title: item.sectionTitle,
            data: item.sectionItems
        }

        if (item.moreButton) {
            const linkTo = item.moreButton.linkTo && String(item.moreButton.linkTo).toUpperCase()

            data.action = {
                title: item.moreButton.caption || constants.MMGR_RECOMMENDED_ACTION.caption,
                url: linkTo ?
                    constants.MMGR_RECOMMENDED_ACTION.linkTo[linkTo] || constants.MMGR_RECOMMENDED_ACTION.linkTo.DEFAULT :
                    constants.MMGR_RECOMMENDED_ACTION.linkTo.DEFAULT
            }
        }

        return data
    })

    return {
        title: translate('MMGR_API_MY_RECOMMENDED_TAB'),
        sections: customDataArr
    }
}


/**
 * returns custom tab data structure
 * @param {object} options
 * @returns {array}
 */
function getImageAnalysisOptions(options) {
    options = options || {}
    // concat array of arrays into a single array, returning a new array
    return [].concat.apply([], Object.keys(constants.MMGR_IMAGE_ANALYSIS_OPTIONS)
    // map to values
        .map(option => {
            // return the value if it's not in options, or explicitly truthy
            if (!(option in options) || options[option]) {
                return constants.MMGR_IMAGE_ANALYSIS_OPTIONS[option]
            }
            return void 0
        })
        // remove undefined's
        .filter(value => value))
    // unique
        .filter((value, index, result) => result.indexOf(value) === index)
}


/**
 * mmgr translations
 * no items (empty state) text
 * title, tab caption, tab description, submit button caption, upload button caption
 *
 * @param {object}  mmgrDataObj
 */
function getMMGRTranslations(mmgrDataObj) {
    const translations = {}
    let translationKey
    let mmgrTranslationKey

    // addition of multiple media is allowed
    const canSubmitMultipleMediaStr = mmgrDataObj.canSubmitMultipleMedia ? '_MULTISELECT' : ''

    // set title
    if (mmgrDataObj.translationsList.title) {
        translationKey = `MMGR_API_${mmgrDataObj.categoryName}${mmgrDataObj.manageMode ? '_MANAGE' : '_OPEN'}_TITLE${canSubmitMultipleMediaStr}`.toUpperCase()
        mmgrTranslationKey = constants.MMGR_TRANSLATION_KEYS_MAP.title
        translations[mmgrTranslationKey] = mmgrDataObj.translation.title || translate(translationKey)
    }

    // set upload button caption
    if (mmgrDataObj.translationsList.uploadCaption) {
        translationKey = `MMGR_API_${mmgrDataObj.categoryName}_UPLOAD_BUTTON`.toUpperCase()
        mmgrTranslationKey = constants.MMGR_TRANSLATION_KEYS_MAP.uploadButton
        translations[mmgrTranslationKey] = translate(translationKey)
    }

    // set submit button caption
    if (mmgrDataObj.translationsList.submitCaption) {
        translationKey = `MMGR_API_${mmgrDataObj.categoryName}_SUBMIT_BUTTON${canSubmitMultipleMediaStr}`.toUpperCase()
        mmgrTranslationKey = constants.MMGR_TRANSLATION_KEYS_MAP.submitButton
        translations[mmgrTranslationKey] = mmgrDataObj.translation.submitButton || translate(translationKey)
    }

    // set tabs' name, description, noItems and removeItems
    mmgrDataObj.tabsList.forEach(tabName => {
        // set tab caption, applicable to private media only
        if (getMMGRTab(tabName) === constants.MMGR_TABS_MAP.MY_MEDIA && mmgrDataObj.translationsList.tabCaption) {
            translationKey = `MMGR_API_${tabName}_TAB`.toUpperCase()
            mmgrTranslationKey = constants.MMGR_TRANSLATION_KEYS_MAP.tab[getMMGRTab(tabName)]
            translations[mmgrTranslationKey] = translate(translationKey)
        }

        // set tab's description
        if (mmgrDataObj.translationsList.description) {
            translationKey = `MMGR_API_${tabName}_DESCRIPTION`.toUpperCase()
            mmgrTranslationKey = constants.MMGR_TRANSLATION_KEYS_MAP.description[getMMGRTab(tabName)]
            translations[mmgrTranslationKey] = translate(translationKey)
        }

        // set no media items (empty state) text, applicable to private media only
        // for 3 different folders All Media, Site Media and user generated folder
        if (getMMGRTab(tabName) === constants.MMGR_TABS_MAP.MY_MEDIA && mmgrDataObj.translationsList.noItems) {
            // all media folder
            // header
            translationKey = `MMGR_API_${tabName}_NO_ITEMS_HEADER_ALL_MEDIA`.toUpperCase()
            mmgrTranslationKey = constants.MMGR_TRANSLATION_KEYS_MAP.noItems.allMediaFolder.header
            translations[mmgrTranslationKey] = translate(translationKey)
            // text
            translationKey = `MMGR_API_${tabName}_NO_ITEMS_TEXT_ALL_MEDIA`.toUpperCase()
            mmgrTranslationKey = constants.MMGR_TRANSLATION_KEYS_MAP.noItems.allMediaFolder.text
            translations[mmgrTranslationKey] = translate(translationKey)

            // site media folder
            // header
            translationKey = `MMGR_API_${tabName}_NO_ITEMS_HEADER_SITE_MEDIA`.toUpperCase()
            mmgrTranslationKey = constants.MMGR_TRANSLATION_KEYS_MAP.noItems.siteMediaFolder.header
            translations[mmgrTranslationKey] = translate(translationKey)
            // text
            translationKey = `MMGR_API_${tabName}_NO_ITEMS_TEXT_SITE_MEDIA`.toUpperCase()
            mmgrTranslationKey = constants.MMGR_TRANSLATION_KEYS_MAP.noItems.siteMediaFolder.text
            translations[mmgrTranslationKey] = translate(translationKey)

            // user folder
            // header
            translationKey = `MMGR_API_${tabName}_NO_ITEMS_HEADER_USER_FOLDER`.toUpperCase()
            mmgrTranslationKey = constants.MMGR_TRANSLATION_KEYS_MAP.noItems.userMediaFolder.header
            translations[mmgrTranslationKey] = translate(translationKey)
            // text
            translationKey = `MMGR_API_${tabName}_NO_ITEMS_TEXT_USER_FOLDER`.toUpperCase()
            mmgrTranslationKey = constants.MMGR_TRANSLATION_KEYS_MAP.noItems.userMediaFolder.text
            translations[mmgrTranslationKey] = translate(translationKey)
        }

        // item delete confirmation modal window text, applicable to private media only
        // set text for item(s) and folder
        if (getMMGRTab(tabName) === constants.MMGR_TABS_MAP.MY_MEDIA && mmgrDataObj.translationsList.removeItems) {
            // item
            // title
            translationKey = `MMGR_API_${tabName}_REMOVE_ITEM_TITLE`.toUpperCase()
            mmgrTranslationKey = constants.MMGR_TRANSLATION_KEYS_MAP.removeItems.item.title
            translations[mmgrTranslationKey] = translate(translationKey)
            // text
            translationKey = `MMGR_API_${tabName}_REMOVE_ITEM_TEXT`.toUpperCase()
            mmgrTranslationKey = constants.MMGR_TRANSLATION_KEYS_MAP.removeItems.item.text
            translations[mmgrTranslationKey] = translate(translationKey)

            // items
            // title
            translationKey = `MMGR_API_${tabName}_REMOVE_ITEMS_TITLE`.toUpperCase()
            mmgrTranslationKey = constants.MMGR_TRANSLATION_KEYS_MAP.removeItems.items.title
            translations[mmgrTranslationKey] = translate(translationKey)
            // text
            translationKey = `MMGR_API_${tabName}_REMOVE_ITEMS_TEXT`.toUpperCase()
            mmgrTranslationKey = constants.MMGR_TRANSLATION_KEYS_MAP.removeItems.items.text
            translations[mmgrTranslationKey] = translate(translationKey)

            // folder
            // title
            translationKey = `MMGR_API_${tabName}_REMOVE_FOLDER_TITLE`.toUpperCase()
            mmgrTranslationKey = constants.MMGR_TRANSLATION_KEYS_MAP.removeItems.folder.title
            translations[mmgrTranslationKey] = translate(translationKey)
            // text
            translationKey = `MMGR_API_${tabName}_REMOVE_FOLDER_TEXT`.toUpperCase()
            mmgrTranslationKey = constants.MMGR_TRANSLATION_KEYS_MAP.removeItems.folder.text
            translations[mmgrTranslationKey] = translate(translationKey)
        }
    })

    return translations
}

/**
 * download language translation json
 */
function xhr(url, done, fail) {
    const request = new window.XMLHttpRequest()
    request.addEventListener('load', () => {
        if (request.readyState === request.DONE) {
            if (request.status === 200 || request.status === 304) {
                try {
                    const json = JSON.parse(request.responseText)
                    done(json)
                } catch (e) {
                    fail()
                }
            } else {
                fail()
            }
        }
    })
    request.addEventListener('error', fail)
    request.open('GET', url)
    request.send()
}

/**
 * set language code
 * @param {string} languageCode
 * @returns {}
 */
function setLanguageCode(languageCode) {
    return xhr(getLangsURL(languageCode), json => {
        i18n[languageCode] = json
        translateFactory(languageCode)
    }, () => translateFactory(constants.DEFAULT_LANGUAGE_CODE))
}

/**
 * language translation json url
 * @param {string} languageCode
 * @returns {string}
 */
function getLangsURL(languageCode) {
    return `${constants.MMGR_LANGS_BASE_URL}${languageCode}.json`
}

/**
 * language translation json url
 * @param {string} languageCode
 * @returns {string}
 */
function translateFactory(languageCode) {
    translate = function (key) {
        return i18n[languageCode] && i18n[languageCode][key] || i18n[constants.DEFAULT_LANGUAGE_CODE][key]
    }
}

// fetch language translations json
translateFactory(constants.DEFAULT_LANGUAGE_CODE)

module.exports = {
    getArguments,
    setLanguageCode,
    getMMGRMediaType,
    getMMGRSelectionType,
    getMMGRI18nPrefix,
    getMMGRTabsList,
    getMMGRRecommendedData,
    getMMGRServicesList,
    getMMGRTranslations,
    getImageAnalysisOptions
}
