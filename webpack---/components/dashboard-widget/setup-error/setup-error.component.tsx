import React, { FC } from 'react';
import { useTranslation } from '@wix/wix-i18n-config';
import { Container, Row, Col, Card, EmptyState } from 'wix-style-react';
import { DashboardWidgetDataHooks } from '../dashboard-widget.data-hooks';
import * as s from '../dashboard-widget.component.scss';

export const SetupError: FC = () => {
  const [t] = useTranslation();

  return (
    <div className={s.dashboardWidgetSetupFailure}>
      <Container fluid>
        <Row className={s.rowBottomMargin}>
          <Col>
            <Card>
              <Card.Header title={t('setup.header')} />
              <div className={s.dashboardWidgetSetupFailureDivider}>
                <Card.Divider />
              </div>
              <Card.Content>
                <EmptyState
                  dataHook={DashboardWidgetDataHooks.InitFailureError}
                  title={t('setup.load-failure.title')}
                  subtitle={t('setup.load-failure.text')}
                />
              </Card.Content>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
