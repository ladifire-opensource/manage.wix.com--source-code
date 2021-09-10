import * as React from 'react';
import { Provider, Store } from 'react-redux';
import { History } from 'history';
import { PageComponentLinkBuilderProvider } from './navigation/PageComponentLinkBuilderProvider';
import { IState } from './types/store';
import { Router } from 'react-router';
import { createRoutes } from './routes';
import { getMetaSiteId } from './selectors/siteMetaDataSelectors';
import { getPageComponentsInfo } from './selectors/pageComponentsSelectors';
import { i18n as i18N, I18nextProvider } from '@wix/wix-i18n-config';
import { ErrorBoundary } from '@wix/business-manager-common-utils';

type AppParams = {
  store: Store<IState>;
  basename: string;
  history: History;
  i18n: i18N;
};

export const buildApp = ({ store, basename, history, i18n }: AppParams): JSX.Element => {
  const state = store.getState();
  const metaSiteId = getMetaSiteId(state);
  const pageComponentsInfo = getPageComponentsInfo(state);

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <PageComponentLinkBuilderProvider
          metaSiteId={metaSiteId}
          pageComponentsInfo={pageComponentsInfo}
          basename={basename}
        >
          <I18nextProvider i18n={i18n}>
            <Router history={history}>
              {createRoutes(store)}
            </Router>
          </I18nextProvider>
        </PageComponentLinkBuilderProvider>
      </ErrorBoundary>
    </Provider>
  );
};
