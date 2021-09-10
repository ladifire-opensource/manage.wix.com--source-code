import * as React from 'react';
import * as s from './SiteLevelWidgetContent.scss';
import { InjectedTranslateProps, translate } from 'react-i18next';
import ThisSiteTab from '../ThisSiteTab/ThisSiteTab';
import AllSitesTab from '../AllSitesTab/AllSitesTab';
import {
  InjectedCloseWidgetProps,
  withClosingWidgetCapability,
} from '../CloseWidgetProvider/CloseWidgetProvider';
import {
  getInstanceId,
  navigateToInbox,
} from '../../services/BusinessManagerService';
import {
  createBiLogForClick,
  createBiLogForMarkAllAsRead,
} from '../../services/biLogger/biLogger';
import { chatSdk } from '@wix/chat-sdk';
import {
  InjectedExperimentsProps,
  withExperiments,
} from '@wix/wix-experiments-react';
import NoPermissionsTab from '../NoPermissionsTab/NoPermissionsTab';
import {
  InjectedUnseenCountsProps,
  withUnseenCounts,
} from '../withUnseenCounts/withUnseenCounts';
import UserSettingsService from '../../services/userSettingsService';

import { Tabs, Heading, TextButton, Loader } from 'wix-style-react';

interface WidgetContentProps
  extends InjectedTranslateProps,
    InjectedExperimentsProps,
    InjectedUnseenCountsProps,
    InjectedCloseWidgetProps {}

export type WidgetTab = 'this_site' | 'all_sites';
interface WidgetState {
  selectedTab: WidgetTab;
  hasInboxPermissions: boolean;
  isMultiSite: boolean;
  ready: boolean;
}

class WidgetContentComponent extends React.Component<
  WidgetContentProps,
  WidgetState
> {
  constructor(props: WidgetContentProps) {
    super(props);
    this.state = {
      selectedTab: 'this_site',
      hasInboxPermissions: false,
      isMultiSite: undefined,
      ready: false,
    };
  }

  async componentDidMount() {
    const { permissions } = await UserSettingsService.getPermissions();
    const isMultiSite = await UserSettingsService.isUserWithMultiSites();
    this.setState({
      hasInboxPermissions: this.hasInboxPermission(permissions),
      ready: true,
      isMultiSite,
    });
  }

  onClickingTab = ({ id }: { id: WidgetTab; title: string }) => {
    this.setState({ selectedTab: id });
    createBiLogForClick(id);
  };

  hasInboxPermission = (permissions: string[]) => {
    return permissions.includes('INBOX');
  };

  renderSelectedTab = () => {
    if (this.isAllSitesTabSelected()) {
      return <AllSitesTab />;
    }

    if (this.isThisSiteTabSelected()) {
      return this.state.hasInboxPermissions ? (
        <ThisSiteTab />
      ) : (
        <NoPermissionsTab />
      );
    }
  };

  isThisSiteTabSelected = () => this.state.selectedTab === 'this_site';
  isAllSitesTabSelected = () => this.state.selectedTab === 'all_sites';

  appendThisSiteUnseenCount(text: string) {
    const { thisSiteUnseenCount, thisSiteUnseenOverflow } = this.props;
    if (!thisSiteUnseenCount) {
      return text;
    }
    return `${text} (${thisSiteUnseenCount}${
      thisSiteUnseenOverflow ? '+' : ''
    })`;
  }

  appendAllSitesUnseenCount(text: string) {
    const { allSitesUnseenCount, allSitesUnseenOverflow } = this.props;
    if (!allSitesUnseenCount) {
      return text;
    }
    return `${text} (${allSitesUnseenCount}${
      allSitesUnseenOverflow ? '+' : ''
    })`;
  }

  render() {
    const { t, experiments, closeWidget } = this.props;
    const { hasInboxPermissions, isMultiSite } = this.state;

    if (!this.state.ready) {
      return (
        <div
          className={`${s.widgetContent} ${s.loading}`}
          data-hook="inbox-header-widget-content"
        >
          <Loader status={'loading'} dataHook="inbox-header-loader" />
        </div>
      );
    }

    return (
      <div className={s.widgetContent} data-hook="inbox-header-widget-content">
        <div data-hook="widget-headline" className={s.headline}>
          <Heading appearance="H3" dataHook="widget-title">
            {t('widget.title')}
          </Heading>
          <div className={s.links}>
            <TextButton
              dataHook="mark-all-as-read-link"
              size="small"
              disabled={!hasInboxPermissions && this.isThisSiteTabSelected()}
              onClick={async () => {
                await chatSdk.setAllRoomsAsRead({
                  isArchived: false,
                  participantType: 'business',
                  participantIds:
                    this.state.selectedTab === 'this_site'
                      ? [getInstanceId()]
                      : [],
                });
                createBiLogForMarkAllAsRead(this.state.selectedTab);
              }}
            >
              {t('widget.mark.all.as.read')}
            </TextButton>
            <span key="divider" className={s.divider} />
            <TextButton
              dataHook="inbox-link"
              size="small"
              disabled={!hasInboxPermissions}
              onClick={() => {
                navigateToInbox();
                closeWidget();
                createBiLogForClick('go_to_inbox');
              }}
            >
              {t('widget.inbox.link')}
            </TextButton>
          </div>
        </div>
        {isMultiSite && (
          <div className={s.tabsContainer}>
            <Tabs
              dataHook="sites-scope-selection"
              onClick={this.onClickingTab}
              hasDivider={false}
              activeId={this.state.selectedTab}
              items={[
                {
                  id: 'this_site',
                  title: experiments.enabled('specs.chat.UnseenChatroomCount')
                    ? this.appendThisSiteUnseenCount(t('tabs.this_site'))
                    : t('tabs.this_site'),
                },
                {
                  id: 'all_sites',
                  title: experiments.enabled('specs.chat.UnseenChatroomCount')
                    ? this.appendAllSitesUnseenCount(t('tabs.all_sites'))
                    : t('tabs.all_sites'),
                },
              ]}
            />
          </div>
        )}
        <div className={s.tabsContent}>{this.renderSelectedTab()}</div>
      </div>
    );
  }
}

export default withUnseenCounts(
  translate()(
    withClosingWidgetCapability(withExperiments(WidgetContentComponent)),
  ),
);
