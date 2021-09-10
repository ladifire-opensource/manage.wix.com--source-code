import { MethodFn } from 'yoshi-flow-bm-runtime';
import { appDefIds, isAppInstalled, navigateTo, PageComponentId } from '@wix/business-manager-api';

function generateOldFormAppState(navigationOptions: navigationProps) {
  let appState = 'create';
  const params = new URLSearchParams();

  if (navigationOptions.id) {
    if (navigationOptions.duplicate) {
      params.set('from', navigationOptions.id);
    } else {
      appState = `${navigationOptions.id}/edit`
    }
  }

  if (navigationOptions.interaction) {
    params.set('interaction', navigationOptions.interaction);
  }

  return `${appState}${Array.from(params).length ? '?' : ''}${params}`;
}

const navigateToOldRecurringInvoicesForm = (navigationOptions: navigationProps) => {
  const appState = generateOldFormAppState(navigationOptions);

  navigateTo({
    pageComponentId: PageComponentId.Invoices,
    contextData: {
      appState,
    },
  })
};

function generateRecurringFormParams(navigationOptions: navigationProps) {
  const params = new URLSearchParams();

  if (navigationOptions.interaction) {
    params.set('interaction', navigationOptions.interaction);
  }

  if (navigationOptions.id) {
    params.set('id', navigationOptions.id);
  }

  if (navigationOptions.duplicate) {
    params.set('copy', 'true');
  }

  return Array.from(params).length ? `?${params}` : '';
}

function navigateToRecurringInvoicesForm(navigationOptions: navigationProps, partnersSpec: boolean) {
  const isPartnerDashboard = isAppInstalled(appDefIds.wixExpertsDashboard);
  const appState = isPartnerDashboard && partnersSpec ? 'partners-form' : 'form';

  const queryParams = generateRecurringFormParams(navigationOptions);

  navigateTo({
    pageComponentId: PageComponentId.RecurringInvoices,
    contextData: {
      appState: appState+queryParams,
    },
  })
}

export type navigationExperimentsProps = {
  InvoiceAndRecurringInvoicesFormEnabled: boolean;
  PartnersRecurringFormEnabled: boolean;
}

export const navigateToRecurringForm = (navigationOptions: navigationProps, experiments: navigationExperimentsProps) => {
  if (experiments.InvoiceAndRecurringInvoicesFormEnabled) {
    return navigateToRecurringInvoicesForm(navigationOptions, experiments.PartnersRecurringFormEnabled)
  } else {
    return navigateToOldRecurringInvoicesForm(navigationOptions);
  }
}

export type navigationProps = {
  interaction?: string;
  id?: string;
  duplicate?: boolean;
};

const exportedNavigateToRecurringInvoicesForm: MethodFn = async (flowAPI,navigationOptions: navigationProps): Promise<void> => {
  const experiments = await flowAPI.getExperiments();
  await experiments.ready();

  const recurringFormExperiments = {
    InvoiceAndRecurringInvoicesFormEnabled: experiments.enabled('specs.crm.InvoiceAndRecurringInvoicesForm'),
    PartnersRecurringFormEnabled: experiments.enabled('specs.crm.PartnersRecurringForm'),
  }

  return navigateToRecurringForm(navigationOptions, recurringFormExperiments);
};

export default exportedNavigateToRecurringInvoicesForm;
