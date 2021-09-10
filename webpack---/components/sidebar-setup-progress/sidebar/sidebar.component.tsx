import * as React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import * as css from './sidebar.scss';
import { isPhaseCompleted, toDataSet } from '../common';
import { IViewMode } from '@wix/business-manager-api';
import { IDataSet, RealEstateDefinition } from '../api';
import { fetchSidebarItems } from '@src/services/sidebar';
import { omniSetupSidebarContentWrapperDataHook } from '@src/components/sidebar-setup-progress/sidebar/sidebar.data-hooks';

export const OWNER_ROLE = 'owner';

export interface IProps extends IDataSet {
  metaSiteId: string;
  userId: string;
  viewMode: IViewMode;
  isSidebarHidden?: boolean;
  userRole: string;
  realEstates: RealEstateDefinition[];
  excludedEventsFromAutoOpenPopover: string[];
  enlargedProgressBarPopup: boolean;
}

export interface IState extends IDataSet {
  barSection: string | undefined;
}

export class Sidebar extends React.PureComponent<IProps, IState> {
  readonly state = {
    barSection: undefined,
    data: this.props.data,
    sortedIds: this.props.sortedIds,
  };

  private SidebarApp: any;

  calculateBarSection({ data, sortedIds }: IDataSet) {
    const { userRole, realEstates } = this.props;

    if (userRole !== OWNER_ROLE) {
      return undefined;
    }

    return realEstates.find(
      ({ id, progressBar }) =>
        progressBar &&
        !isPhaseCompleted({
          data,
          sortedIds: sortedIds[id],
        }),
    )?.id;
  }

  async componentDidMount() {
    const { data, sortedIds } = this.props;
    const barSection = this.calculateBarSection({ data, sortedIds });

    if (barSection) {
      const component = await import('../sidebar-app/sidebar-app.component');
      this.SidebarApp = component.SidebarApp;
      this.setState({
        barSection,
      });
    }
  }

  onSectionCompleted = async () => {
    const { viewMode } = this.props;
    const { data, sortedIds } = toDataSet(await fetchSidebarItems(viewMode));

    this.setState({
      barSection: this.calculateBarSection({ data, sortedIds }),
      data,
      sortedIds,
    });
  };

  renderContent() {
    const { barSection, data, sortedIds } = this.state;

    if (!barSection) {
      return null;
    }

    return (
      <div
        className={css.fullWidthContainer}
        data-hook={omniSetupSidebarContentWrapperDataHook}
      >
        <this.SidebarApp
          {...this.props}
          data={data}
          sortedIds={sortedIds}
          onSectionCompleted={this.onSectionCompleted}
          sectionName={barSection}
        />
      </div>
    );
  }

  render() {
    return (
      <CSSTransitionGroup
        transitionAppear={false}
        transitionEnter
        transitionName={css as any}
        transitionEnterTimeout={700}
        transitionLeaveTimeout={300}
      >
        {this.renderContent()}
      </CSSTransitionGroup>
    );
  }
}
