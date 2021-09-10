import React from 'react';
import { Box } from 'wix-style-react';
import { SuggestionLayoutProps } from './suggestion-layout';

export const TopSuggestionLayout: React.FC<SuggestionLayoutProps> = props => {
  const { title, description, mainCTA, image, secondaryCTA, dataHook, typeIndication } = props;
  return (
    <Box dataHook={dataHook} paddingBottom="8px">
      <Box paddingRight="16px">{image}</Box>
      <Box direction="vertical" overflow="hidden">
        {typeIndication && (
          <Box paddingBottom="4px" verticalAlign="middle">
            {typeIndication}
          </Box>
        )}
        <Box paddingBottom="4px" verticalAlign="middle">
          {title}
        </Box>
        <Box paddingBottom="8px">{description}</Box>
        <Box flexWrap="wrap-reverse" gap="8px">
          <Box verticalAlign="middle" paddingRight="8px" direction="vertical" overflow="hidden">
            {mainCTA}
          </Box>
          {secondaryCTA && <Box>{secondaryCTA}</Box>}
        </Box>
      </Box>
    </Box>
  );
};
