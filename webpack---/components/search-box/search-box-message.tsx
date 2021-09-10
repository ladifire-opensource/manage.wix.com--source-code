import React from 'react';
import { Text, Box } from 'wix-style-react';

interface SearchMessageProps {
  title: string;
  subtitle: string;
  dataHook?: string;
}

export const SearchMessage: React.FC<SearchMessageProps> = ({ title, subtitle, dataHook }) => {
  return (
    <Box
      direction="vertical"
      paddingTop="4px"
      paddingBottom="4px"
      paddingLeft="12px"
      paddingRight="12px"
      dataHook={dataHook}
    >
      <Box paddingBottom="4px">
        <Text dataHook={`${dataHook}-title`} size="tiny">
          {title}
        </Text>
      </Box>
      <Text size="tiny" secondary>
        {subtitle}
      </Text>
    </Box>
  );
};
