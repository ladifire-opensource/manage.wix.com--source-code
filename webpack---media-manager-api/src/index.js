'use strict'
const adapterG5 = require('./adapterG5')
const adapterG6 = require('./adapterG6')
const constants = require('./constants')
const presetsG6 = require('./presetsG6.json')
const utils = require('./utils')

/**
 * the options for initial configuration
 * @typedef  {object} MediaManagerConfig
 * @property {string} siteMediaToken           required
 * @property {string} [metaSiteToken]          optional (TODO required)
 * @property {string} version                  required 'G5' or 'G6'
 * @property {string} [languageCode]           optional i18n code defaults to 'en'
 * @property {string} origin                   required
 */

/**
 *
 * @param {MediaManagerConfig} options
 * @returns {{manage: func, open: func, categories: object}}
 */
function create(options) {
    const result = validate(options)
    if (!result.success) {
        throw new Error(result.message)
    }

    options.languageCode = options.languageCode || constants.DEFAULT_LANGUAGE_CODE

    utils.setLanguageCode(options.languageCode)

    const mediaManagerConf = Object.assign({}, options)
    const adapter = options.version.toLowerCase() === 'g6' ? adapterG6 : adapterG5
    const updateSiteMediaToken = siteMediaToken => {
        mediaManagerConf.siteMediaToken = siteMediaToken
    }
    const updateMetaSiteToken = metaSiteToken => {
        mediaManagerConf.metaSiteToken = metaSiteToken
    }

    const progressListenersMap = new Map()
    const canvas = window.document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    function arrayBufferToBase64(buffer, width, height) {
        const array = new Uint8ClampedArray(buffer)
        const imgData = new window.ImageData(array, width, height)

        canvas.width = width
        canvas.height = height

        ctx.putImageData(imgData, 0, 0)

        return canvas.toDataURL()
    }

    function prepareNotification(notification) {
        if (notification.thumbnailBuffer) {
            const {thumbnailBuffer, thumbnailWidth, thumbnailHeight} = notification

            notification.thumbnail = arrayBufferToBase64(thumbnailBuffer, thumbnailWidth, thumbnailHeight)

            delete notification.thumbnailBuffer
            delete notification.thumbnailWidth
            delete notification.thumbnailHeight
        }

        const clone = Object.assign({}, notification)
        // delete black-listed properties
        delete clone.namespace

        return clone
    }

    function filterProgressNotifications(notifications, filter) {
        return notifications.filter(n =>
            filter.namespaces.has(n.namespace) &&
            filter.mediaTypes.has(n.mediaType)
        ).map(prepareNotification)
    }

    function onUploadProgress(notifications) {
        if (!notifications || !notifications.length) {
            return
        }

        progressListenersMap.forEach((filter, fn) => {
            // filter objects from progress
            const filtered = filterProgressNotifications(notifications, filter)

            if (filtered.length) {
                fn(filtered)
            }
        })
    }

    function getFilterByKeys(keys) {
        keys = Array.isArray(keys) ? keys : [keys]

        return keys.reduce((filter, key) => {
            if (key && presetsG6[key]) {
                const params = presetsG6[key].mediaParams
                filter.namespaces.add(params.namespace)
                params.mediaType.split(',').forEach(type => filter.mediaTypes.add(type))
            }

            return filter
        }, {
            namespaces: new Set(),
            mediaTypes: new Set()
        })
    }

    /**
     * Add an event handler for 'uploadprogress" notifications.
     *
     * @param {function} fn
     * @param {string[]} [filter]
     */
    const addUploadProgressListener = (fn, filter) => {
        const filterObject = getFilterByKeys(filter || adapter.categories.ALL_MEDIA)
        progressListenersMap.set(fn, filterObject)
    }

    /**
     * Rmove an event handler from reciving 'uploadprogress" notifications.
     *
     * @param {function} fn
     */
    const removeUploadProgressListener = fn => {
        progressListenersMap.delete(fn)
    }

    mediaManagerConf.onUploadProgress = onUploadProgress

    return {
        //manage: adapter.manage.bind(null, mediaManagerConf),
        open: adapter.open.bind(null, mediaManagerConf),
        updateSiteMediaToken,
        updateMetaSiteToken,
        warmup: adapter.warmup.bind(null, mediaManagerConf),
        categories: adapter.categories,
        addUploadProgressListener,
        removeUploadProgressListener
    }
}

/**
 *
 * @param {MediaManagerConfig} options
 * @returns {{success: boolean, message: string}}
 */
function validate(options) {
    // TODO metaSiteToken mandatory
    const requireProps = ['siteMediaToken', 'version', 'origin']
    const msgs = requireProps.filter(prop => !(prop in options))
    return {
        success: msgs.length === 0,
        message: `mandatory fields are missing ${msgs.join(', ')}`
    }
}

module.exports = {
    create,
    origins: Object.freeze(constants.ORIGINS)
}

