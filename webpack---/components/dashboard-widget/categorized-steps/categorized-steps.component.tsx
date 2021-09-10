import React, { FC } from 'react';
import { Row, Col, Container, Divider } from 'wix-style-react';
import {
  CategorizedSteps,
  Category,
  Step as IStep,
} from '@wix/dashboard-setup-common';
import * as s from './categorized-steps.component.scss';
import { CategoryDetails } from './category-details';
import { CategorizedStepsDataHooks as Hooks } from './categorized-steps.data-hooks';
import { calculateCategoryStepsProgress } from '@src/utils';
import { VisibilityDetector } from '@wix/os-dashboard-shared-components';
import { Step } from './step';
import { AssetVisibilityTrigger } from '@src/utils/bi-mappers';
import { useDashboardWidgetData } from '../dashboard-widget.context';

interface Props {
  categorizedSteps: CategorizedSteps;
  skippedSteps: Set<string>;
  onStepView(step: IStep, trigger: AssetVisibilityTrigger): void;
}

export const CategorizedStepsComponent: FC<Props> = ({
  categorizedSteps,
  skippedSteps,
  onStepView,
}: Props) => {
  const { dismissFeatureEnabled, isStepSkipped } = useDashboardWidgetData();
  const onStepViewHandler = (step: IStep, isFirstCheck: boolean) => {
    const visibilityTrigger = isFirstCheck
      ? AssetVisibilityTrigger.normal
      : AssetVisibilityTrigger.windowScrolled;

    onStepView(step, visibilityTrigger);
  };

  return (
    <Container fluid className={s.categorizedSteps}>
      {categorizedSteps?.map((category: Category, index: number) => {
        const isLastCategory = categorizedSteps.length - 1 === index;

        return (
          <React.Fragment key={category.id}>
            <Row dataHook={Hooks.Category} className={s.category}>
              <Col
                span="4"
                className={s.categoryCol}
                dataHook={Hooks.CategoryDetails}
              >
                <CategoryDetails
                  stepsProgress={calculateCategoryStepsProgress(
                    category,
                    skippedSteps,
                    !!dismissFeatureEnabled,
                  )}
                  title={category.title}
                  description={category.description}
                />
              </Col>
              <Col span="8" className={s.stepsCol}>
                {category.steps.map((step: IStep, i: number) => (
                  <div
                    className={`${
                      dismissFeatureEnabled && isStepSkipped(step)
                        ? ''
                        : s.stepWrapper
                    }`}
                    key={i}
                  >
                    <VisibilityDetector
                      onVisible={(params) =>
                        onStepViewHandler(step, params.isFirstCheck)
                      }
                    >
                      <div key={step.id}>
                        <Step step={step} />
                      </div>
                    </VisibilityDetector>
                  </div>
                ))}
              </Col>
            </Row>
            {!isLastCategory && <Divider className={s.divider} />}
          </React.Fragment>
        );
      })}
    </Container>
  );
};
