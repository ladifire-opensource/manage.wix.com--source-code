import * as React from 'react';
import {
  sendProgressBarVisibility,
  toDataSet,
  getItemsCount,
  isPhaseCompleted,
  findFirstActive,
  isInDashboard,
  reloadPage,
  sendSectionCompleted,
} from '../common';
import { ModuleRegistry } from 'react-module-container';
import { SidebarItem } from '../sidebar-item/sidebar-item.component';
import { SidebarProgress } from '../sidebar-progress/sidebar-progress.component';
import { subscribeToEvents, closeConnection } from '../utilities/realtime';
import { StepCompleted } from '../step-completed/step-completed.component';
import { IViewMode } from '@wix/business-manager-api';
import {
  IDataSet,
  TSortedIds,
  ICount,
  IData,
  RealEstateDefinition,
} from '../api';
import { Box, Divider, Popover } from 'wix-style-react';
import { fetchSidebarItems } from '@src/services/sidebar';
import { ITEM_SKIPPED_TOGGLED } from '@src/consts';
import { clearWidgetDataCache } from '@src/services/initial-data';
import * as css from './sidebar-app.scss';
import { SidebarAppDataHooks } from './sidebar-app.data-hooks';

export const OWNER_ROLE = 'owner';

export enum TooltipLevel {
  normal,
  stepCompleted,
  happyMoment,
}

export interface IProps extends IDataSet {
  metaSiteId: string;
  userId: string;
  viewMode: IViewMode;
  isSidebarHidden: boolean;
  onSectionCompleted(): void;
  sectionName: string;
  realEstates: RealEstateDefinition[];
  excludedEventsFromAutoOpenPopover: string[];
  enlargedProgressBarPopup: boolean;
}

export interface IState {
  sortedIds: TSortedIds;
  data: IData;
  itemsCount: ICount;
  activeItemId: string | null;
  isTooltipOpen: boolean;
  suppressPopover: boolean;
  tooltipLevel: TooltipLevel;
}

type RemoveListener = undefined | { remove(): void };

export class SidebarApp extends React.PureComponent<IProps, IState> {
  private removeListener: RemoveListener;
  private SidebarHappyMoment: any;
  private isStepTooltipPending: boolean = false;

  constructor(props: IProps) {
    super(props);
    this.state = this.generateInitialState(props);
    this.subscribe();
  }

  generateInitialState(props: IProps): Readonly<IState> {
    const { data, sortedIds, sectionName, realEstates } = props;

    const sortedIdsForSection = sortedIds[sectionName];

    const itemsCount = getItemsCount({
      data,
      sortedIds: sortedIdsForSection,
    });

    const activeItemId = findFirstActive({
      data,
      sortedIds,
      realEstates,
    });

    return {
      data,
      sortedIds: sortedIdsForSection,
      itemsCount,
      activeItemId,
      isTooltipOpen: false,
      suppressPopover: false,
      tooltipLevel: TooltipLevel.normal,
    };
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.sectionName !== this.props.sectionName) {
      this.subscribe();
      this.setState(this.generateInitialState(this.props), () => {
        this.sendProgressBarVisibility();
      });
    }

    if (
      !this.props.isSidebarHidden &&
      prevProps.isSidebarHidden &&
      this.isStepTooltipPending
    ) {
      this.isStepTooltipPending = false;
      setTimeout(this.calculateNextStep, 500); // wait until sidebar is fully visible
    }
  }

  onStepCompleted = (payload: any) => {
    clearWidgetDataCache();

    if (this.props.excludedEventsFromAutoOpenPopover.includes(payload?.event)) {
      this.setState({ suppressPopover: true });
    }

    if (this.props.isSidebarHidden) {
      this.isStepTooltipPending = true;
      return;
    }

    return this.calculateNextStep();
  };

  getNextStepState = async () => {
    const { sectionName, viewMode } = this.props;
    const { data, sortedIds } = toDataSet(await fetchSidebarItems(viewMode));

    const sortedIdsForSection = sortedIds[sectionName];

    const itemsCount = getItemsCount({
      data,
      sortedIds: sortedIdsForSection,
    });

    return {
      isTooltipOpen: !this.state.suppressPopover,
      suppressPopover: false,
      data,
      sortedIds: sortedIdsForSection,
      itemsCount,
    };
  };

  async loadAndSetHappyMoment(commonState: any) {
    const component = await import(
      '../sidebar-happy-moment/sidebar-happy-moment.component'
    );
    this.SidebarHappyMoment = component.SidebarHappyMoment;
    this.setState({
      ...commonState,
      tooltipLevel: TooltipLevel.happyMoment,
    });
  }

  calculateNextStep = async () => {
    const commonState = await this.getNextStepState();
    const { itemsCount, data, sortedIds } = commonState;
    const { metaSiteId, sectionName, realEstates } = this.props;

    if (itemsCount.unCompletedSteps === 0) {
      sendSectionCompleted(sectionName);
      if (isInDashboard(metaSiteId)) {
        reloadPage();
      } else {
        this.setState({
          ...commonState,
          activeItemId: null,
          isTooltipOpen: false,
        });
      }
    } else if (
      itemsCount.completedSteps !== this.state.itemsCount.completedSteps
    ) {
      this.setState({
        ...commonState,
        tooltipLevel: TooltipLevel.stepCompleted,
        activeItemId: findFirstActive({
          data,
          sortedIds: {
            [sectionName]: sortedIds,
          },
          realEstates,
        }),
      });
    }
  };

  subscribe = () => {
    const { metaSiteId, userId } = this.props;

    this.removeListener = ModuleRegistry.addListener(
      ITEM_SKIPPED_TOGGLED,
      this.itemSkippedToggled,
    );

    subscribeToEvents({
      metaSiteId,
      userId,
      eventHandler: this.onStepCompleted,
    });
  };

  unsubscribe = () => {
    if (this.removeListener) {
      this.removeListener.remove();
    }
    closeConnection();
  };

  itemSkippedToggled = ({
    itemId,
    isSkipped,
  }: {
    itemId: string;
    isSkipped: boolean;
  }) => {
    const { data, sortedIds } = this.state;
    const item = data[itemId];
    const { onSectionCompleted, sectionName, realEstates } = this.props;

    if (!item) {
      return;
    }

    const newData = { ...data, [itemId]: { ...item, isSkipped } };

    const shouldShowBar = !isPhaseCompleted({
      data: newData,
      sortedIds,
    });

    const itemsCount = getItemsCount({
      data: newData,
      sortedIds,
    });

    const activeItemId = shouldShowBar
      ? findFirstActive({
          data: newData,
          sortedIds: {
            [sectionName]: sortedIds,
          },
          realEstates,
        })
      : null;

    this.setState({ data: newData, itemsCount, activeItemId });

    if (!shouldShowBar) {
      this.unsubscribe();
      sendSectionCompleted(sectionName);
      onSectionCompleted();
    }
  };

  sendProgressBarVisibility() {
    const {
      itemsCount: { completedSteps, skippedSteps, totalSteps },
    } = this.state;

    sendProgressBarVisibility({
      done_steps: completedSteps,
      skipped_steps: skippedSteps,
      steps: totalSteps,
      sectionName: this.props.sectionName,
    });
  }

  componentDidMount() {
    this.sendProgressBarVisibility();
  }

  showTooltip = () => {
    this.setState({
      isTooltipOpen: true,
    });
  };

  hideTooltip = () => {
    this.setState({
      isTooltipOpen: false,
      tooltipLevel: TooltipLevel.normal,
    });
  };

  onHappyMomentClicked = () => {
    const { onSectionCompleted } = this.props;
    this.unsubscribe();
    this.setState({
      isTooltipOpen: false,
    });
    onSectionCompleted();
  };

  renderTooltip() {
    const { metaSiteId, sectionName, realEstates, enlargedProgressBarPopup } =
      this.props;
    const { activeItemId, tooltipLevel, itemsCount, data } = this.state;

    if (!activeItemId) {
      return null;
    }

    if (tooltipLevel === TooltipLevel.happyMoment) {
      return (
        <this.SidebarHappyMoment
          onClose={this.onHappyMomentClicked}
          realEstate={realEstates.find(({ id }) => id === sectionName)}
          enlargedProgressBarPopup={enlargedProgressBarPopup}
        />
      );
    }

    if (tooltipLevel === TooltipLevel.stepCompleted) {
      return (
        <StepCompleted
          item={data[activeItemId]}
          metaSiteId={metaSiteId}
          hideTooltip={this.hideTooltip}
          itemsCount={itemsCount}
          enlargedProgressBarPopup={enlargedProgressBarPopup}
        />
      );
    }

    return (
      <SidebarItem
        item={data[activeItemId]}
        metaSiteId={metaSiteId}
        hideTooltip={this.hideTooltip}
        enlargedProgressBarPopup={enlargedProgressBarPopup}
      />
    );
  }

  isNormalLevel(): boolean {
    return this.state.tooltipLevel === TooltipLevel.normal;
  }

  isStepCompletedLevel(): boolean {
    return this.state.tooltipLevel === TooltipLevel.stepCompleted;
  }

  render() {
    const { sortedIds, itemsCount, isTooltipOpen } = this.state;
    const { realEstates, sectionName } = this.props;

    const renderSidebarProgress = () => {
      return (
        <SidebarProgress
          sortedIds={sortedIds}
          itemsCount={itemsCount}
          showTooltip={this.showTooltip}
          realEstate={realEstates.find(({ id }) => id === sectionName)}
        />
      );
    };

    return (
      <Popover
        animate
        placement={'right-start'}
        showArrow
        shown={isTooltipOpen}
        appendTo="viewport"
        onMouseEnter={this.showTooltip}
        onMouseLeave={this.isNormalLevel() ? this.hideTooltip : undefined}
        flip={false}
        moveArrowTo={19}
        moveBy={{
          x: 0,
          y: 18,
        }}
      >
        <Popover.Element>
          <div>
            <Box className={css.sideBarWrapper}>{renderSidebarProgress()}</Box>
            <div data-hook={SidebarAppDataHooks.BottomDivider}>
              <Divider className={css.divider} />
            </div>
          </div>
        </Popover.Element>
        <Popover.Content>{this.renderTooltip()}</Popover.Content>
      </Popover>
    );
  }
}
