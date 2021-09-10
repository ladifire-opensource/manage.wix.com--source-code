import React from 'react';

export interface ErrorBoundaryProps {
  errorLogger: (e: Error) => void;
}

export interface ErrorBoundaryState {
  error?: any;
}

export class ErrorBoundary extends React.PureComponent<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {};

  static getDerivedStateFromError(error: any) {
    return { error };
  }

  componentDidCatch(error: Error) {
    try {
      const { errorLogger } = this.props;
      errorLogger(error);
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
