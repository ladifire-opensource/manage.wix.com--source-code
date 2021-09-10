import { PredefinedTimeframe } from '@wix/ambassador-analytics-ng-server/types';

import { ITimeframeOption } from './types';
import { ICreateOptions } from '../types';
import { t } from '../../../utils/translate';

export const timeframeOptions: ICreateOptions<ITimeframeOption> = () => [
  {
    id: PredefinedTimeframe.THIS_MONTH,
    value: t('widget.dashboard.header.timeframe.option.this-month'),
  },
  {
    id: PredefinedTimeframe.THIS_WEEK,
    value: t('widget.dashboard.header.timeframe.option.this-week'),
  },
  {
    id: PredefinedTimeframe.LAST_7_DAYS,
    value: t('widget.dashboard.header.timeframe.option.seven-days'),
  },
  {
    id: PredefinedTimeframe.LAST_30_DAYS,
    value: t('widget.dashboard.header.timeframe.option.thirty-days'),
  },
  {
    id: PredefinedTimeframe.LAST_90_DAYS,
    value: t('widget.dashboard.header.timeframe.option.ninety-days'),
  },
];
