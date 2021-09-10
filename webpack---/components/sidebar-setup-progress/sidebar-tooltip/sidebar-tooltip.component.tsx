import * as React from 'react';
import css from './sidebar-tooltip.scss';
import CancelIcon from 'wix-ui-icons-common/X';

export const sideBarTooltipDataHook = 'sidebar-tooltip-data-hook';

export interface IProps {
  children: JSX.Element;
  happyMoment?: boolean;
  onCancel?(): void;
  enlargedProgressBarPopup: boolean;
}

export class SidebarTooltip extends React.PureComponent<IProps> {
  renderCancel() {
    const { onCancel } = this.props;
    if (!onCancel) {
      return null;
    }

    return (
      <CancelIcon
        size="16px"
        className={css.cancelContainer}
        onClick={onCancel}
      />
    );
  }

  render() {
    const { children, happyMoment, enlargedProgressBarPopup } = this.props;

    return (
      <div
        className={`${css.container} ${happyMoment ? css.wide : ''} ${
          enlargedProgressBarPopup ? css.enlarged : ''
        }`}
        data-hook={sideBarTooltipDataHook}
      >
        {this.renderCancel()}
        {children}
      </div>
    );
  }
}
