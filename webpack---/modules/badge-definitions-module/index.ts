import {
  BusinessManagerModule,
  ModuleId,
  PageComponentId,
  registerPageComponentMonitors,
} from '@wix/business-manager-api';

import { BusinessManager } from '../../services/business-manager';
import { BadgeDefinitionsLazyComponent } from '../';
import { sentryClient } from '../../services/sentry-client';
import { BadgeSetupModalLazyComponent } from '../badge-setup-modal/badge-setup-modal-lazy-component';
import { BadgeSelectModalLazyComponent } from '../badge-select-modal/badge-select-modal-lazy-component';
import { MemberAssignModalLazyComponent } from '../member-assign-modal/member-assign-modal-lazy-component';
import { BadgeAutomationActionLazyComponent } from '../badge-automation-action-component/badge-automation-action-lazy-component';
import { ExperimentsScope } from '../../constants/experiments';

export class BadgeDefinitionsModule extends BusinessManagerModule {
  constructor(moduleId: ModuleId) {
    super(moduleId);
    BusinessManager.registerLazyComponent(() => BadgeDefinitionsLazyComponent);
  }

  init() {
    registerPageComponentMonitors(PageComponentId.BadgeDefinitions, {
      // @ts-ignore
      sentryClient,
    });
    BusinessManager.registerBadgeSetupModalLazyComponent(BadgeSetupModalLazyComponent);
    BusinessManager.registerBadgeSelectModalLazyComponent(BadgeSelectModalLazyComponent);
    BusinessManager.registerMemberAssignModalLazyComponent(MemberAssignModalLazyComponent);
    BusinessManager.registerBadgeSetupModalMethod();
    BusinessManager.registerBadgeSelectModalMethod();
    BusinessManager.registerMemberAssignModalMethod();

    const experiments = this.appEssentials.createExperiments({
      scopes: [ExperimentsScope.MY_ACCOUNT_EXPERIMENT_SCOPE],
    });
    experiments.ready().then(async () => {
      if (
        BusinessManager.isMembersAreaInstalled() ||
        BusinessManager.isForumInstalled() ||
        BusinessManager.isBlogInstalled() ||
        BusinessManager.isGroupsInstalled()
      ) {
        const i18n = this.appEssentials.createI18n({
          asyncMessagesLoader: (locale) => import(`../../assets/locale/messages_${locale}.json`),
          disableAutoInit: true,
        });

        await i18n.init();

        BusinessManager.registerBadgesAutomationsLazyComponent(BadgeAutomationActionLazyComponent);
        BusinessManager.registerBadgesAction(i18n, experiments);
      }
    });
  }
}
