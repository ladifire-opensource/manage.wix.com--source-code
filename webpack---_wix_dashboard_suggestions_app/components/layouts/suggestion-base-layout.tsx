import React from 'react';
import { Box, BoxProps } from 'wix-style-react';

export interface SuggestionBaseLayoutProps extends Pick<BoxProps, 'padding'> {
  dataHook?: string;
  title: React.ReactNode;
  content: React.ReactNode;
  mainCTA: React.ReactNode;
  secondaryCTA?: React.ReactNode;
  image?: React.ReactNode;
  actionsMenu?: React.ReactNode;
}

export const SuggestionBaseLayout: React.FC<SuggestionBaseLayoutProps> = props => {
  const { title, content, mainCTA, secondaryCTA, image, dataHook, actionsMenu, padding } = props;

  return (
    <Box
      dataHook={dataHook}
      flex="1"
      position="relative"
      border="solid 1px #DFE5EB"
      borderRadius="8px"
      padding={padding}
    >
      <Box position="absolute" top="8px" right="8px">
        {actionsMenu}
      </Box>
      {image}
      <Box verticalAlign="middle" direction="vertical" align="space-between" flex="1">
        <Box>{title}</Box>
        <Box direction="vertical" flex="1">
          {content}
        </Box>
        <Box verticalAlign="bottom">
          {secondaryCTA && <Box>{secondaryCTA}</Box>}
          <Box verticalAlign="middle" marginRight="18px">
            {mainCTA}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
