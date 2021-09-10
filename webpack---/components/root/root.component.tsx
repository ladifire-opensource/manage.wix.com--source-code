import React, { FC, memo, useEffect } from 'react';
import * as styles from './root.scss';
import {
  Card,
  Box,
  ThemeProvider,
  Divider,
  Layout,
  Button,
} from 'wix-style-react';
import { AppContextProvider } from '../app-context/app-context';
import { ServerResponse } from '@wix/dashboard-site-details-api';
import { DomainInformationContainer } from '../domain-information';
import { ContributorsContainer } from '../contributors';
import { PlanContainer } from '../plan';
import { theme } from 'wix-style-react/themes/businessDashboard';
import { Preview } from '../preview';
import { useTranslation } from 'yoshi-flow-bm-runtime';
import { ROOT_DATA_HOOK } from '../data-hooks';
import { ActionsButton } from '../actions-button';
import { EditSiteButton } from '../edit-site-button';
import { MailboxContainer } from '../mailbox/mailbox.container';
import { AscendContainer } from '../ascend/ascend.container';

interface BusinessDashboardProps {
  onLoaded?(): void;
}

export interface Props extends BusinessDashboardProps {
  serverResponse: ServerResponse;
}

export const Root: FC<Props> = memo(({ onLoaded, serverResponse }: Props) => {
  const { ready, t } = useTranslation();

  useEffect(() => {
    onLoaded && ready && onLoaded();
  }, [ready, onLoaded]);

  return (
    <AppContextProvider serverResponse={serverResponse} t={t}>
      <ThemeProvider theme={theme({ active: true })}>
        <Card dataHook={ROOT_DATA_HOOK} className={styles.container}>
          <Box align="left">
            <Box verticalAlign="middle" align="left" width="100%">
              <Preview />
              <Box paddingLeft="16px" width="100%">
                <Layout cols={1} gap="16px">
                  <DomainInformationContainer />
                </Layout>
              </Box>
              <Box
                width="100%"
                paddingLeft="16px"
                paddingRight="4px"
                height="100%"
                paddingTop="4px"
                align="right"
                gap="12px"
              >
                <ActionsButton />
                <EditSiteButton />
              </Box>
            </Box>
          </Box>
          <Box paddingLeft="148px" height="1px" paddingBottom="16px">
            <Divider direction="horizontal" />
          </Box>
          <Layout cols={4} gap="8px">
            <ContributorsContainer />
            <PlanContainer />
            <MailboxContainer />
            <AscendContainer />
          </Layout>
        </Card>
      </ThemeProvider>
    </AppContextProvider>
  );
});
