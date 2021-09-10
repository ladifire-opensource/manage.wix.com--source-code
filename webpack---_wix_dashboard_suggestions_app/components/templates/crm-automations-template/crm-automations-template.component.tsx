import React, { useCallback } from 'react';
import { BasicTemplateTitle } from '../basic-template/sub-components';
import { ActionsMenu } from '../../actions-menu/actions-menu.container';
import { SuggestionOffer, ViewType } from '@src/common/types';
import { CrmAutomationsTemplateData } from '@src/common/templates';
import { Box } from 'wix-style-react';
import styles from './crm-automations-template.scss';
import { CrmAutomationsDataHooks } from '@src/common/hooks';
import { useTranslation } from '@wix/yoshi-flow-bm';
import { AutomationsTemplateContent, MainCTA } from './sub-components';

export interface CrmAutomationsTemplateProps {
  viewType: ViewType;
  dataHook?: string;
  index: number;
  image: React.ReactElement | undefined;
  suggestion: SuggestionOffer;
  onMainCTAClick: () => void;
  basicLayout: boolean;
  isLoading: boolean;
  automationsWidget: React.ReactNode;
}

export const CrmAutomationsTemplateComponent: React.FC<CrmAutomationsTemplateProps> = ({
  suggestion,
  image,
  dataHook,
  index,
  viewType,
  basicLayout,
  isLoading,
  automationsWidget,
  onMainCTAClick,
}) => {
  const [t] = useTranslation();
  const { titleKey, actionTarget } = suggestion.data as CrmAutomationsTemplateData;
  const mainCtaText = basicLayout
    ? t('suggestion.widget.use.automations.single.post.cta')
    : t(actionTarget?.titleKey);
  const onContainerClick = useCallback(() => {
    if (basicLayout) {
      onMainCTAClick();
    }
  }, [basicLayout, onMainCTAClick]);

  if (viewType === ViewType.SECTION || viewType === ViewType.PAGE) {
    return (
      <div
        data-hook={CrmAutomationsDataHooks.CRM_AUTOMATIONS_TEMPLATE_CONTAINER_DATA_HOOK}
        onClick={onContainerClick}
      >
        <Box
          className={`${styles.section} ${basicLayout ? styles.basicLayout : ''}`}
          align="space-between"
          dataHook={dataHook}
        >
          <Box
            direction="horizontal"
            paddingTop="16px"
            paddingLeft="26px"
            paddingBottom="16px"
            verticalAlign="middle"
            width="100%"
          >
            {basicLayout && image}
            <Box
              direction="vertical"
              paddingLeft={basicLayout ? '16px' : '0'}
              width="100%"
              verticalAlign="space-between"
            >
              <Box direction="vertical">
                <Box paddingBottom="12px">
                  <BasicTemplateTitle titleKey={titleKey} />
                </Box>
                <Box direction="vertical" width="100%">
                  <AutomationsTemplateContent
                    isLoading={isLoading}
                    automationsWidget={automationsWidget}
                  />
                </Box>
              </Box>
              <Box verticalAlign="bottom" paddingTop="8px">
                <Box marginRight="18px" className={styles.mainCta}>
                  <MainCTA
                    text={mainCtaText}
                    baseLayout={basicLayout}
                    onClick={e => {
                      e.stopPropagation();
                      onMainCTAClick();
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box paddingRight="8px" paddingTop="8px" marginLeft={basicLayout ? '0' : '-6px'}>
            <ActionsMenu suggestion={suggestion} index={index} />
          </Box>
        </Box>
      </div>
    );
  }
  return null;
};
