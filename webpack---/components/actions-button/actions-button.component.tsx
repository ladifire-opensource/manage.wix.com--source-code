import React, { FC } from 'react';
import { useTranslation } from 'yoshi-flow-bm-runtime';
import ChevronDown from 'wix-ui-icons-common/ChevronDown';
import { Button } from 'wix-style-react';
import {
  DialogResult,
  ISiteActionsTopology,
  QuickActionsPopover,
  TOrigin,
  TQuickActionsDTO,
} from '@wix/quick-actions-dropdown';
import { ExperimentsBag } from '@wix/wix-experiments';
import { ACTIONS_BUTTON_DATA_HOOKS } from '@src/components/data-hooks';

export interface Props {
  locale: string;
  origin: TOrigin;
  metaSiteId: string;
  debug: boolean;
  topology: ISiteActionsTopology;
  siteActionsStaticsUrl: string;
  quickActionsData: TQuickActionsDTO;
  experiments: ExperimentsBag;
  onActionCompleted(dialogResult: DialogResult): void;
}

export const ActionsButtonComponent: FC<Props> = ({
  locale,
  origin,
  metaSiteId,
  debug,
  topology,
  siteActionsStaticsUrl,
  quickActionsData,
  experiments,
  onActionCompleted,
}) => {
  const [t] = useTranslation();
  return (
    <QuickActionsPopover
      locale={locale}
      origin={origin}
      metaSiteId={metaSiteId}
      debug={debug}
      topology={topology}
      siteActionsStaticsUrl={siteActionsStaticsUrl}
      dataSourceReady
      experiments={experiments}
      quickActionsData={quickActionsData}
      onDialogActionComplete={onActionCompleted}
      popoverOptions={{
        showArrow: false,
        moveBy: { y: 4 },
        appendTo: 'window',
      }}
    >
      <Button
        dataHook={ACTIONS_BUTTON_DATA_HOOKS.CTA}
        size="small"
        suffixIcon={<ChevronDown />}
        priority={'secondary'}
      >
        {t('actions-button.cta')}
      </Button>
    </QuickActionsPopover>
  );
};
