import * as React from 'react';
import { ErrorPageThemes, withErrorBoundaryMethods, ErrorBoundaryWrappedComponentProps } from '@wix/business-manager-common-utils';
import { PageComponentId, navigateTo } from '@wix/business-manager-api';
import BaseErrorPage from './BaseErrorPage';

interface BrokenComponentErrorPageProps extends ErrorBoundaryWrappedComponentProps {
  location: string;
}

export const BrokenComponentErrorPage = withErrorBoundaryMethods()(({ location, clearError }: BrokenComponentErrorPageProps) => (
  <BaseErrorPage location={location}
                 onClick={clearError}
                 titleKey="errorMessage.title"
                 contentKey="errorMessage.content"
                 linkTextKey="errorMessage.link"
                 theme={ErrorPageThemes.DEFAULT}
  />
));

export const PageNotFoundErrorPage = () => (
  <BaseErrorPage location="business-manager-page-not-found"
                 onClick={() => navigateTo({ pageComponentId: PageComponentId.Home })}
                 titleKey="pageNotFound.title"
                 contentKey="pageNotFound.content"
                 linkTextKey="pageNotFound.link"
                 theme={ErrorPageThemes.PAGE_NOT_FOUND}
  />);

export const UndefinedComponentErrorPage = () => (
  <BaseErrorPage location="business-manager-undefined-component"
                 onClick={() => window.location.reload()}
                 titleKey="errorMessage.title"
                 contentKey="errorMessage.content"
                 linkTextKey="errorMessage.link"
                 theme={ErrorPageThemes.DEFAULT}
  />);

export const FullPageErrorPage = () => (
  <BaseErrorPage location="business-manager-full-page-error-page"
                 onClick={() => window.location.reload()}
                 titleKey="errorMessage.title"
                 contentKey="errorMessage.content"
                 linkTextKey="errorMessage.link"
                 theme={ErrorPageThemes.DEFAULT}
  />);
