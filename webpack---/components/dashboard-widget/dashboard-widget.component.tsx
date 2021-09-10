import * as s from './dashboard-widget.component.scss';
import React, { FC } from 'react';
import { Header } from './header';
import { Banner } from './banner';
import { CategorizedSteps } from './categorized-steps';
import { Col, Container, Row, Box, Divider } from 'wix-style-react';
import { HappyMoment } from '@src/components/dashboard-widget/happy-moment';
import { useDashboardWidgetData } from '@src/components/dashboard-widget/dashboard-widget.context';

export const DashboardWidgetComponent: FC = () => {
  const {
    setupCompleted,
    isFinishFeaturesWizard,
    isFeaturesWizardEnabled,
    hasFeaturesWizardPermissions,
  } = useDashboardWidgetData();

  if (setupCompleted) {
    return <HappyMoment />;
  }

  const shouldDisplayBanner =
    isFeaturesWizardEnabled &&
    !isFinishFeaturesWizard &&
    hasFeaturesWizardPermissions;

  return (
    <div className={s.dashboardWidget}>
      <Container fluid>
        <Row className={s.rowBottomMargin}>
          <Col>
            <Header />
          </Col>
        </Row>
        {/*
          TODO: check if banner should be rendered, and only then render <Row> wrapper.
          otherwise it will add extra vertical margins from empty Row & Col
         */}
        {shouldDisplayBanner && (
          <Row className={s.rowBottomMargin}>
            <Col className={s.bannerWrapper}>
              <Banner />
            </Col>
          </Row>
        )}
        <Row>
          <Col>
            {!isFeaturesWizardEnabled && (
              <Box marginBottom="8px">
                <Divider />
              </Box>
            )}
            <CategorizedSteps />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
