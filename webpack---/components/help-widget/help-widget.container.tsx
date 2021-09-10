import React, { FC, useEffect } from 'react';
import { ThemeProvider } from 'wix-style-react';
import { HelpWidgetComponent } from './help-widget.component';
import { theme } from 'wix-style-react/themes/businessDashboard';
import { AccountContext } from '@contexts/account';
import { useTranslation } from 'yoshi-flow-bm-runtime';
import { InitialData } from '@types';

export interface HelpWidgetProps extends InitialData {
  onLoaded?(): void;
}

export const HelpWidget: FC<HelpWidgetProps> = ({ onLoaded, partnersEntryPointUrl }) => {
  const { ready: translationsReady } = useTranslation();

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    translationsReady && onLoaded?.();
  }, [translationsReady, onLoaded]);

  return (
    <ThemeProvider theme={theme()}>
      <AccountContext.Provider
        value={{
          hireProfessionalUrl: partnersEntryPointUrl,
        }}
      >
        <HelpWidgetComponent />
      </AccountContext.Provider>
    </ThemeProvider>
  );
};
