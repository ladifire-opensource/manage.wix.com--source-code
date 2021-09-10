import * as React from 'react';
import { WithTranslation, withTranslation } from '@wix/wix-i18n-config';
import { Card, EmptyState } from 'wix-style-react';

class ErrorComponentView extends React.Component<WithTranslation> {
  render() {
     const { t } = this.props;
    return (
      <Card data-hook="error-component">
        <Card.Content>
          <EmptyState title={t('hosting-component-loading-error-title')}
            subtitle={t('hosting-component-loading-error-content')}/>
        </Card.Content>
      </Card>
    );
  }
}

export const ErrorComponent = withTranslation()(ErrorComponentView);
