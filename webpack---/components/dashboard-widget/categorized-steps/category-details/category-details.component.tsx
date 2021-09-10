import React, { FC } from 'react';
import { Box, Text, Heading, CircularProgressBar } from 'wix-style-react';
import { useTranslation } from '@wix/wix-i18n-config';
import { StepsProgress } from '@src/utils';
import * as s from './category-details.scss';
import { CategorizedStepsDataHooks as Hooks } from '../categorized-steps.data-hooks';

interface Props {
  title: string;
  description: string;
  stepsProgress: StepsProgress;
}

export const CategoryDetails: FC<Props> = ({
  title,
  description,
  stepsProgress,
}: Props) => {
  const [t] = useTranslation();
  const { completedPercentage, completedCount, totalCount } = stepsProgress;

  // 0% should be displayed as 4% for better UX
  const actualPercentage = completedPercentage ? completedPercentage : 4;

  return (
    <Box direction="horizontal" paddingTop="9px" className={s.categoryDetails}>
      <CircularProgressBar
        value={actualPercentage}
        label={`${completedCount}/${totalCount}`}
      />
      <Box paddingLeft="medium" direction="vertical" verticalAlign="top">
        <Box marginBottom="4px">
          <Text
            size="small"
            weight="bold"
            dataHook={Hooks.CategoryDetailsTitle}
          >
            {t(title)}
          </Text>
        </Box>
        <Text secondary size="tiny" dataHook={Hooks.CategoryDetailsDescription}>
          {t(description)}
        </Text>
      </Box>
    </Box>
  );
};
