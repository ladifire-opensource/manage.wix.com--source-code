import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ModuleRegistry, ReactLazyComponent } from 'react-module-container';
import * as BM from '@wix/business-manager-api';
import { getBusinessSettings } from '@wix/business-settings-api';
import { BadgeType } from '@wix/members-badge-lib';
import type Experiments from '@wix/fe-essentials-business-manager/experiments';
import type { i18n } from '@wix/fe-essentials-business-manager/i18n';

import { COMPONENT_ID, MODULE_ID, LAZY_COMPONENT_ID, MY_ACCOUNT_APP_DEF_ID } from '../../config';
import { BadgeSetupModalProps } from '../../components/badge-setup-modal/badge-setup-modal/badge-setup-modal';
import { BadgeSelectModalProps } from '../../components/badge-select-modal/badge-select-modal/badge-select-modal';
import { MemberAssignModalProps } from '../../components/member-assign-modal/member-assign-modal/member-assign-modal';
import { Member } from '../../typings/members-api';
import { BadgesService } from '../badges';
import { createAxiosInstance } from '../axios';
import {
  BADGE_SELECT_MODAL,
  BADGE_SETUP_MODAL,
  BADGES_AUTOMATIONS_SMART_ACTION,
  MEMBER_ASSIGN_MODAL,
  OPEN_BADGE_SELECT_MODAL,
  OPEN_BADGE_SETUP_MODAL,
  OPEN_MEMBER_ASSIGN_MODAL,
} from '../../constants/module-names';
import { Experiments as ExperimentsEnum } from '../../constants/experiments';
import { badgesBaseURL } from '../../constants/urls';

const files = ({ config, debug }: BusinessManagerComponentProps) => [
  `${config.topology.staticsUrl}badge-definitions-app.bundle${debug ? '' : '.min'}.js`,
  `${config.topology.staticsUrl}badge-definitions-app${debug ? '' : '.min'}.css`,
];

export const withModuleParams = (Comp: typeof ReactLazyComponent) => {
  const badgesModule = ModuleRegistry.getModule(BM.ModuleId.BadgeDefinitions);
  return (props: object) => <Comp {...props} {...badgesModule._moduleParams} />;
};

interface NavigateConfigContextData {
  appState?: string;
  referrer?: string;
}

interface NavigateConfig {
  pageComponentId: BM.PageComponentId;
  contextData?: NavigateConfigContextData;
  payload?: object;
}

interface BackToastConfig {
  text: string;
  buttonText: string;
}

const BADGE_SETUP_DIV_ID = 'badge-setup-portal';
const BADGE_SELECT_DIV_ID = 'badge-select-portal';
const MEMBER_ASSIGN_DIV_ID = 'member-assign-portal';

export class BusinessManager {
  static navigateToAndShowBackToast(
    toConfig: NavigateConfig,
    backConfig: NavigateConfig,
    backToastConfig: BackToastConfig,
  ) {
    ModuleRegistry.invoke('businessManager.navigateToAndShowBackToast', toConfig, backConfig, backToastConfig);
  }

  static navigateTo(toConfig: NavigateConfig) {
    ModuleRegistry.invoke('businessManager.navigateTo', toConfig);
  }

  static registerBadgeSetupModalLazyComponent = (component: typeof ReactLazyComponent) => {
    ModuleRegistry.registerComponent(BADGE_SETUP_MODAL, () => withModuleParams(component));
  };

  static registerBadgesAutomationsLazyComponent = (component: typeof ReactLazyComponent) => {
    ModuleRegistry.registerComponent(BADGES_AUTOMATIONS_SMART_ACTION, () => withModuleParams(component));
  };

  static registerBadgeSelectModalLazyComponent = (component: typeof ReactLazyComponent) => {
    ModuleRegistry.registerComponent(BADGE_SELECT_MODAL, () => withModuleParams(component));
  };

  static registerMemberAssignModalLazyComponent = (component: typeof ReactLazyComponent) => {
    ModuleRegistry.registerComponent(MEMBER_ASSIGN_MODAL, () => withModuleParams(component));
  };

  static getInstance = () => {
    return BM.getCurrentInstance(BM.appDefIds.metaSite);
  };

  static registerModule = (bmModule: typeof BM.BusinessManagerModule) => {
    BM.registerModule(MODULE_ID, bmModule);
  };

  static notifyLoadingStarted = () => {
    ModuleRegistry.notifyListeners('businessManager.viewStartLoading', MODULE_ID);
  };

  static notifyLoadingFinished = () => {
    ModuleRegistry.notifyListeners('businessManager.viewFinishedLoading', MODULE_ID);
  };

  static registerLazyComponent = (getComponent: () => typeof ReactLazyComponent) => {
    ModuleRegistry.registerComponent(LAZY_COMPONENT_ID, getComponent);
  };

  static registerBMNavigationListener = (listener: (pause: () => void, navigate: () => void) => void) => {
    return ModuleRegistry.addListener('businessManager.onNavigation', listener);
  };

  static chooseMediaItem = (onSuccess: Function, onCancel?: Function) => {
    const categories = ModuleRegistry.invoke('mediaManager.categories');
    return ModuleRegistry.invoke('mediaManager.open', categories.VECTOR_ART, '3fdba72b-c9e7-4529-9219-807ad4b36d91', {
      multiSelect: false,
      path: 'public/98285ba8ab164d17a935742bd019e150/958a35dc-d691-4395-8876-c8e2fe5a2aab/all/any/all',
      onSuccess,
      onCancel,
    });
  };

  static aComponent = <P extends {}>(componentName: string): React.ComponentClass<P> => {
    return ModuleRegistry.component(componentName);
  };

  static removeBadgeSetupModal = () => {
    const portal = document.getElementById(BADGE_SETUP_DIV_ID);
    ReactDOM.unmountComponentAtNode(portal);
    portal.parentNode.removeChild(portal);
  };

  static removeBadgeSelectModal = () => {
    const portal = document.getElementById(BADGE_SELECT_DIV_ID);
    ReactDOM.unmountComponentAtNode(portal);
    portal.parentNode.removeChild(portal);
  };

  static removeMemberAssignModal = () => {
    const portal = document.getElementById(MEMBER_ASSIGN_DIV_ID);
    ReactDOM.unmountComponentAtNode(portal);
    portal.parentNode.removeChild(portal);
  };

  static registerBadgeSetupModalMethod = () => {
    const component = BusinessManager.aComponent<BadgeSetupModalProps>(BADGE_SETUP_MODAL);

    ModuleRegistry.registerMethod(
      OPEN_BADGE_SETUP_MODAL,
      () =>
        ({ onSave, onClose, badgeId, badge, formOrigin, serviceId }: BadgeSetupModalProps) => {
          const props = {
            onSave: (b: BadgeType) => {
              onSave && onSave(b);
              BusinessManager.removeBadgeSetupModal();
            },
            onClose: () => {
              onClose && onClose();
              BusinessManager.removeBadgeSetupModal();
            },
            badgeId,
            badge,
            formOrigin,
            serviceId,
          };

          const portal = document.createElement('div');
          portal.setAttribute('id', BADGE_SETUP_DIV_ID);
          document.body.appendChild(portal);
          const element = React.createElement(component, props);
          ReactDOM.render(element, portal);
        },
    );
  };

  static openBadgeSetupModal = ({ badgeId, onSave, onClose, formOrigin, serviceId, badge }: BadgeSetupModalProps) => {
    ModuleRegistry.invoke('badges.open-badge-setup-modal', {
      badgeId,
      badge,
      onSave,
      onClose,
      formOrigin,
      serviceId,
    });
  };

  static openBadgeSelectModal = ({
    onSave,
    serviceId,
    preselectedBadgeIds,
    formOrigin,
    useAlternateLayout,
  }: BadgeSelectModalProps) => {
    ModuleRegistry.invoke('badges.open-badge-select-modal', {
      onSave,
      serviceId,
      preselectedBadgeIds,
      formOrigin,
      useAlternateLayout,
    });
  };

  static openMemberAssignModal = ({ badgeId, onSave, onClose, badge, formOrigin }: MemberAssignModalProps) => {
    ModuleRegistry.invoke('badges.open-member-assign-modal', {
      badgeId,
      onSave,
      onClose,
      badge,
      formOrigin,
    });
  };

  static registerBadgeSelectModalMethod = () => {
    const component = BusinessManager.aComponent<BadgeSelectModalProps>(BADGE_SELECT_MODAL);

    ModuleRegistry.registerMethod(
      OPEN_BADGE_SELECT_MODAL,
      () =>
        ({
          onSave,
          onClose,
          formOrigin,
          preselectedBadgeIds,
          serviceId,
          emptyStateTitle,
          emptyStateSubtitle,
          hideMemberAssign,
          useAlternateLayout,
        }: BadgeSelectModalProps) => {
          const props = {
            onSave: (badges: BadgeType[]) => {
              onSave && onSave(badges);
              BusinessManager.removeBadgeSelectModal();
            },
            onClose: () => {
              onClose && onClose();
              BusinessManager.removeBadgeSelectModal();
            },
            preselectedBadgeIds,
            formOrigin,
            serviceId,
            emptyStateTitle,
            emptyStateSubtitle,
            hideMemberAssign,
            useAlternateLayout,
          };

          const portal = document.createElement('div');
          portal.setAttribute('id', BADGE_SELECT_DIV_ID);
          document.body.appendChild(portal);
          const element = React.createElement(component, props);
          ReactDOM.render(element, portal);
        },
    );
  };

  static registerMemberAssignModalMethod = () => {
    const component = BusinessManager.aComponent<MemberAssignModalProps>(MEMBER_ASSIGN_MODAL);

    ModuleRegistry.registerMethod(
      OPEN_MEMBER_ASSIGN_MODAL,
      () =>
        ({ onSave, onClose, badgeId, badge, formOrigin }: MemberAssignModalProps) => {
          const props = {
            onSave: (members: Member[]) => {
              onSave && onSave(members);
              BusinessManager.removeMemberAssignModal();
            },
            onClose: () => {
              onClose && onClose();
              BusinessManager.removeMemberAssignModal();
            },
            badgeId,
            badge,
            formOrigin,
          };

          const portal = document.createElement('div');
          portal.setAttribute('id', MEMBER_ASSIGN_DIV_ID);
          document.body.appendChild(portal);
          const element = React.createElement(component, props);
          ReactDOM.render(element, portal);
        },
    );
  };

  static createManifest = (props: BusinessManagerComponentProps) => ({
    files: files(props),
    component: COMPONENT_ID,
    resolve: (): Promise<BusinessManagerResolvedProps> => {
      return Promise.all([getBusinessSettings(props.metaSiteId)]).then(([businessSettings]) => ({
        businessSettings,
      }));
    },
  });

  static viewMemberCard = (id: string) => {
    ModuleRegistry.invoke('contacts.showContact', { contactId: id, excludeInbox: true });
  };

  static dissmissMemberCard = () => {
    ModuleRegistry.invoke('contacts.hideContact');
  };

  static registerBadgesAction = (i18next: i18n, experiments: Experiments) => {
    const badgesMissing = async (badges: string[]) => {
      try {
        const badgesAxiosInstance = createAxiosInstance(badgesBaseURL, BusinessManager.getInstance);
        const badgesService = new BadgesService(badgesAxiosInstance);
        const badgesResponse = await badgesService.listBadges();
        const existingBadges = badgesResponse.reduce((acc: { [key: string]: boolean }, badgeObj: BadgeType) => {
          acc[badgeObj.id] = true;
          return acc;
        }, {});

        return badges.reduce((acc, badge) => acc || !existingBadges[badge], false);
      } catch (ex) {
        return true;
      }
    };

    BM.configModule(BM.ModuleId.BadgeDefinitions, BM.ModuleId.Triggers, {
      appDefId: BM.appDefIds.badgeDefinitions,
      actions: {
        assignBadge: {
          displayName: i18next.t('bo_badges_automations_action_card_title'),
          displayInfo: i18next.t('bo_badges_automations_action_card_title_tooltip_description'),
          componentName: BADGES_AUTOMATIONS_SMART_ACTION,
          verifyConfig: async ({ actionConfig }: { actionConfig: string }): Promise<boolean> => {
            const { badgeIds } = JSON.parse(actionConfig);
            const isSpecificErrorsEnabled = experiments.enabled(ExperimentsEnum.AUTOMATIONS_SPECIFIC_ACTION_ERRORS);
            const areBadgesEmpty = !badgeIds || badgeIds.length === 0;

            if (areBadgesEmpty) {
              return isSpecificErrorsEnabled
                ? Promise.reject(i18next.t('bo_badges_automations_action_card_specific_error_badges_empty'))
                : false;
            }

            const areBadgesMissing = await badgesMissing(badgeIds);

            if (areBadgesMissing) {
              return isSpecificErrorsEnabled
                ? Promise.reject(i18next.t('bo_badges_automations_action_card_specific_error_badges_missing'))
                : false;
            }

            return true;
          },
        },
      },
    });
  };

  static isMembersAreaInstalled = () => {
    return Boolean(ModuleRegistry.invoke('businessManager.getCurrentInstance', MY_ACCOUNT_APP_DEF_ID));
  };

  static isForumInstalled = () => {
    return BM.isAppInstalled(BM.appDefIds.forum);
  };

  static isBlogInstalled = () => {
    return BM.isAppInstalled(BM.appDefIds.socialBlog);
  };

  static isGroupsInstalled = () => {
    return BM.isAppInstalled(BM.appDefIds.wixGroups);
  };
}
