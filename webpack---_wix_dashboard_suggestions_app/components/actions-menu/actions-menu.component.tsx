import React from 'react';
import { PopoverMenu } from 'wix-style-react';
import HiddenSmall from 'wix-ui-icons-common/HiddenSmall';
import NotificationSmall from 'wix-ui-icons-common/NotificationSmall';
import { useTranslation } from '@wix/yoshi-flow-bm';
import { GeneralDataHooks, ActionMenuDataHooks } from '@src/common/hooks';
import { MenuTrigger } from './sub-components/menu-trigger';

export interface ActionMenuComponentProps {
  onSkipClick: () => void;
  onMenuClick: () => void;
  onShowLaterClick: () => void;
}

export const ActionsMenuComponent: React.FC<ActionMenuComponentProps> = ({
  onSkipClick,
  onMenuClick,
  onShowLaterClick,
}) => {
  const [t] = useTranslation();

  return (
    <PopoverMenu
      dataHook={GeneralDataHooks.MENU_DATA_HOOK}
      showArrow={false}
      placement="bottom-end"
      moveBy={{ x: 14 }}
      maxWidth={181}
      textSize="small"
      triggerElement={({ toggle }) => <MenuTrigger onClick={onMenuClick} toggle={toggle} />}
    >
      <PopoverMenu.MenuItem
        dataHook={ActionMenuDataHooks.SKIP}
        onClick={onSkipClick}
        text={t('suggestion.widget.remove.from.feed')}
        prefixIcon={<HiddenSmall />}
      />
      <PopoverMenu.MenuItem
        dataHook={ActionMenuDataHooks.SHOW_LATER}
        onClick={onShowLaterClick}
        text={t('suggestion.widget.show.me.later')}
        prefixIcon={<NotificationSmall />}
      />
    </PopoverMenu>
  );
};
