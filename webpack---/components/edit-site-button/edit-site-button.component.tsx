import { useTranslation } from '@wix/wix-i18n-config';
import React, { FC } from 'react';
import { Button, Tooltip } from 'wix-style-react';
import { useModuleParams } from 'yoshi-flow-bm-runtime';
import { EDIT_SITE_HOOK } from '../data-hooks';

export interface EditSiteProps {
  onClick(): void;
  isPermittedToEdit: boolean;
}

export const EditSite: FC<EditSiteProps> = ({ onClick, isPermittedToEdit }) => {
  const { t } = useTranslation();
  const { liveSite } = useModuleParams();
  const url = liveSite?.editUrl;

  if (!url) {
    return null;
  }

  return (
    <Tooltip
      dataHook={EDIT_SITE_HOOK.TOOLTIP}
      content={t('edit-site.permissions-tooltip')}
      disabled={isPermittedToEdit}
    >
      <Button
        as="a"
        target="_blank"
        dataHook={EDIT_SITE_HOOK.BUTTON}
        href={url}
        onClick={onClick}
        disabled={!isPermittedToEdit}
        size="small"
      >
        {t('edit-site.cta')}
      </Button>
    </Tooltip>
  );
};
