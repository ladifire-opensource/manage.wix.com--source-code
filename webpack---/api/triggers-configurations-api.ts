import { ActionTriggersServer, GetTriggerSchemaResponse } from '@wix/ambassador-action-triggers-server/http';
import { appDefIds, getCurrentInstance,  } from '@wix/business-manager-api';
import { memoize } from 'lodash';

export const triggersBaseUrl = '/_api/action-triggers-server';

export class TriggersConfigurationsApi {
  private get triggersConfigurationService() {
    const instance = getCurrentInstance(appDefIds.triggers);
    const headers = { 'X-Wix-Instance': instance, Authorization: instance };
    return ActionTriggersServer(
      triggersBaseUrl
    ).TriggersConfigurationService()(headers);
  }

  getTriggersCatalog = () => {
    return this.triggersConfigurationService.resolveTriggersConfiguration({ paging: { limit: 100, offset: 0 } });
  }

  _getTriggerSchema = async ({ id, selectedConditions }): Promise<GetTriggerSchemaResponse> => {
    let result;
    try {
      result = await this.triggersConfigurationService.getTriggerSchema({ id, selectedConditions });
    } catch {
      console.error('error fetching the trigger schema response for id:', id)
      result = { schemaConfiguration: { fields: [] } };
    }
    return result
  }

  clearTriggerSchemaCache = () => {
    this.getTriggerSchema.cache.clear();
  }

  getTriggerSchema = memoize(this._getTriggerSchema, args => `${args.id}${JSON.stringify(args.selectedConditions)}`);
}
