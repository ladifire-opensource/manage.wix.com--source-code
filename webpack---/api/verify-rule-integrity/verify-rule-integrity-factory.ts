import { ModuleRegistry } from 'react-module-container';
import { RuleDTO } from '../../core';
import Experiments from '@wix/wix-experiments';
import { getMandatoryBIFields } from '@wix/business-manager-api';

async function loadDeps() {
  const { getModule, ModuleId } = await import('@wix/business-manager-api');
  const { verifyRuleIntegrity } = await import('./verify-rule-integrity');
  const { registriesApiBuilder } = await import('../registries-api/registries-api.factory');
  const biLoggerFactory = await import('@wix/web-bi-logger');
  const { biSchema } = await import('../../core/bi');
  const { endpoint, src } = biSchema;
  const automationsExperiments = await ModuleRegistry.invoke('automations.getExperiments');
  const experiments = new Experiments({ experiments: automationsExperiments });
  const metaSiteId = getModule(ModuleId.Triggers)['moduleParams'].metaSiteId;
  const biLogger = biLoggerFactory
    .factory({ endpoint })
    .setDefaults({ src, msid: metaSiteId, ...getMandatoryBIFields() })
    .logger();

  const registriesApiFactory = registriesApiBuilder({
      experiments,
      t: x => x,
    });

  return {
    getModule,
    ModuleId,
    verifyRuleIntegrity,
    experiments,
    biLogger,
    registriesApi: registriesApiFactory(),
  };
}

export const verifyRuleIntegrityFactory = () => ({ rule, setPartialActionIndex, setActionStatus }:
  {
    rule: RuleDTO;
    setPartialActionIndex?: Function;
    setActionStatus?(props: { componentName: string; componentProps: object }): void;
  }) => {
  return loadDeps().then(
    ({
      getModule,
      ModuleId,
      verifyRuleIntegrity,
      experiments,
      biLogger,
      registriesApi,
    }) => {
    const triggersModule = getModule(ModuleId.Triggers);
    const registerCatalogEventPromise = triggersModule['registerCatalogEventPromise'] || Promise.resolve();
    const experimentsPromise = ModuleRegistry.invoke('automations.getExperiments') || Promise.resolve();
    const shouldStartPolling = Promise.all([
      registerCatalogEventPromise,
      experimentsPromise,
    ])

    return verifyRuleIntegrity({
      registriesApi,
      experiments,
      biLogger,
      locale: 'en', // not used for now in verifyRuleIntegrity,
      debug: getModule(ModuleId.Triggers)['moduleParams'].debug,
      rule,
      shouldStartPolling,
      setPartialActionIndex,
      setActionStatus,
    });
  });
};
