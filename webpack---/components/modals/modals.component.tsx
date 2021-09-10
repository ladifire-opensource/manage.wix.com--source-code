import { ErrorBoundary } from '@components/error-boundary';
import { MODALS_COMPONENT_NAME } from '@consts';
import { useServices } from '@hooks/services';
import React, { FC, memo } from 'react';
import { ModuleRegistry } from 'react-module-container';
import { useModuleParams } from 'yoshi-flow-bm-runtime';

export const ModalsComponent: FC = memo(() => {
  const Component = ModuleRegistry.component(MODALS_COMPONENT_NAME);

  const { sentry } = useServices();
  const { userId, metaSiteId } = useModuleParams();

  if (!Component) {
    sentry.captureException(`No modals component was found`);
    return null;
  }

  return (
    <ErrorBoundary
      errorLogger={sentry}
      componentId={'MODALS'}
      loggerMetaData={{ userId, metaSiteId }}
    >
      <Component />
    </ErrorBoundary>
  );
});
