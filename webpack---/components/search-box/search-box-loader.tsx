import React from 'react';
import { SEARCH_BOX_LOADER } from '@data-hooks';
import { Box, Loader as WSRLoader } from 'wix-style-react';

export const Loader: React.FC = () => (
  <Box align="center" paddingBottom="7px" paddingTop="7px">
    <WSRLoader size="tiny" dataHook={SEARCH_BOX_LOADER} />
  </Box>
);
