import { createSentryScope, SentryMetaData } from '@services/sentry';
import * as React from 'react';
import type { useSentry } from 'yoshi-flow-bm-runtime';

const SENTRY_EVENT_ID = 'component-rendering-error';

export interface ErrorBoundaryProps {
  errorLogger: ReturnType<typeof useSentry>;
  componentId: string;
  loggerMetaData: SentryMetaData;
  onError?: (error: Error) => void;
}

export interface ErrorBoundaryState {
  error?: any;
}

export class ErrorBoundary extends React.PureComponent<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {};

  static getDerivedStateFromError(error: any) {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    try {
      const { componentId, errorLogger, loggerMetaData, onError } = this.props;

      if (onError) {
        onError(error);
      }

      errorLogger.captureException(
        error,
        {
          event_id: SENTRY_EVENT_ID,
          data: { componentId, info },
        },
        createSentryScope(loggerMetaData),
      );
    } catch (loggingError) {
      console.error(loggingError);
    }
  }

  render() {
    if (this.state.error) {
      return null;
    }
    return this.props.children;
  }
}
