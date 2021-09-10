import {ADD_APPLICATION_TYPE, BIZ_MGR_NAMESPACE, LIVE_PREVIEW_REFRESH_TYPE, MIGRATE_TYPE, MODULE_ID} from './constants'
import {BusinessManagerModule, registerModule} from '@wix/business-manager-api'
import {ModuleRegistry} from 'react-module-container'

export class EditorModule extends BusinessManagerModule {
    constructor(moduleId) {
        super(moduleId)
        ModuleRegistry.registerMethod('editor.addApplication', () => appDefinitionId => {
            this.sendEditorAddApplication(appDefinitionId)
        })
        ModuleRegistry.registerMethod('editor.migrateApplication', () => (appDefinitionId, payload) => {
            this.sendEditorMigrate(appDefinitionId, payload)
        })
        ModuleRegistry.registerMethod('editor.refreshLivePreview', () => (appDefinitionIds, options) => {
            this.sendEditorRefreshLivePreview(appDefinitionIds, options)
        })
    }
    buildMessage(type, data) {
        return JSON.stringify({
            intent: 'TPA2',
            type,
            namespace: BIZ_MGR_NAMESPACE,
            data
        })
    }
    sendEditorAddApplication(appDefinitionId) {
        const message = this.buildMessage(ADD_APPLICATION_TYPE, {
            appDefinitionId
        })
        parent.postMessage(message, '*')
    }
    sendEditorMigrate(appDefinitionId, payload) {
        const message = this.buildMessage(MIGRATE_TYPE, {
            appDefinitionId,
            payload
        })
        parent.postMessage(message, '*')
    }
    sendEditorRefreshLivePreview(appDefinitionIds, options) {
        const message = this.buildMessage(LIVE_PREVIEW_REFRESH_TYPE, {
            appDefinitionIds,
            options
        })
        parent.postMessage(message, '*')
    }
}

registerModule(MODULE_ID, EditorModule)

