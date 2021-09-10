import * as React from 'react';
import {
  navigate,
  sendItemSidebarCtaClicked,
  sendSidebarItemVisibility,
  isPremiumStep,
} from '../common';
import { SidebarTooltip } from '../sidebar-tooltip/sidebar-tooltip.component';
import { SidebarTooltipContent } from '../sidebar-tooltip-content/sidebar-tooltip-content.component';
import { IItem } from '../api';
import { WithTranslation, withTranslation } from '@wix/wix-i18n-config';

const visibilityBiPerItem = new Set();

export interface IProps extends WithTranslation {
  item: IItem;
  metaSiteId: string;
  hideTooltip(): void;
  enlargedProgressBarPopup: boolean;
}

export class SidebarItemComponent extends React.PureComponent<IProps> {
  componentDidMount() {
    const { id } = this.props.item;

    if (!visibilityBiPerItem.has(id)) {
      visibilityBiPerItem.add(id);
      sendSidebarItemVisibility(this.props.item);
    }
  }

  handleClick = () => {
    const { metaSiteId, item, hideTooltip } = this.props;
    hideTooltip();
    navigate({ metaSiteId, item, fromProgressBar: true });
    sendItemSidebarCtaClicked(item);
  };

  render() {
    const {
      item: { title, description, actionLabel, isPermitted },
      t,
      enlargedProgressBarPopup,
    } = this.props;

    return (
      <SidebarTooltip enlargedProgressBarPopup={enlargedProgressBarPopup}>
        <SidebarTooltipContent
          isPremiumStep={isPremiumStep(this.props.item)}
          title={`${t('sidebar.next_step')} ${t(title)}`}
          description={t(description)}
          actionLabel={t(actionLabel)}
          isPermitted={isPermitted}
          onClick={this.handleClick}
          enlargedProgressBarPopup={enlargedProgressBarPopup}
        />
      </SidebarTooltip>
    );
  }
}

export const SidebarItem = withTranslation()(SidebarItemComponent);
