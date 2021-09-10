import React from 'react';
import { Box } from 'wix-style-react';
import { SuggestionLayoutProps } from './suggestion-layout';
import styles from './layout.scss';

export const SectionSuggestionLayout: React.FC<SuggestionLayoutProps> = props => {
  const { title, description, mainCTA, secondaryCTA, image, dataHook, actionsMenu } = props;

  return (
    <Box className={styles.section} align="space-between" dataHook={dataHook}>
      <Box
        direction="horizontal"
        paddingTop="16px"
        paddingLeft="26px"
        paddingBottom="16px"
        verticalAlign="middle"
      >
        {image}
        <Box
          direction="vertical"
          paddingLeft="16px"
          maxWidth="490px"
          minWidth="400px"
          height="80px"
          className={styles['text-area']}
        >
          <Box direction="vertical">
            <Box paddingBottom="4px">{title}</Box>
            <Box>{description}</Box>
          </Box>
          <Box verticalAlign="bottom" paddingTop="8px" className={styles.actionsContainer}>
            {secondaryCTA && <Box className={styles.secondaryCta}>{secondaryCTA}</Box>}
            <Box marginRight="18px" className={styles.mainCta}>
              {mainCTA}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box paddingRight="8px" paddingTop="8px">
        {actionsMenu}
      </Box>
    </Box>
  );
};
