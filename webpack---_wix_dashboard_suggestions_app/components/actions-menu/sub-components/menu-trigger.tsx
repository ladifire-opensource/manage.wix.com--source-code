import { ActionMenuDataHooks } from '@src/common/hooks';
import React from 'react';
import { IconButton } from 'wix-style-react';
import MoreSmall from 'wix-ui-icons-common/MoreSmall';

export interface MenuTriggerProps {
  toggle: () => void;
  onClick: () => void;
}
export const MenuTrigger: React.FC<MenuTriggerProps> = ({ toggle, onClick }) => {
  const onMenuClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    toggle();
    onClick();
  };

  return (
    <IconButton
      skin="light"
      priority="secondary"
      size="tiny"
      onClick={onMenuClick}
      dataHook={ActionMenuDataHooks.MENU_TRIGGER}
    >
      <MoreSmall />
    </IconButton>
  );
};
