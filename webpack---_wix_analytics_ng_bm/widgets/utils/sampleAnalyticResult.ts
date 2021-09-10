import { format, subDays } from 'date-fns';

import { IAnalyticResult } from '../../types/types';

const view = {
  dimensions: [
    {
      name: 'sample.dimension',
      description: '',
      label: 'Sample',
      sortable: false,
      canFilter: false,
      isNumeric: false,
      isTimeframe: true,
      enumerations: [],
    },
  ],
  measures: [
    {
      name: 'sample.measures',
      description: '',
      label: 'Sample',
      sortable: false,
      canFilter: false,
      isNumeric: false,
      isTimeframe: false,
      enumerations: [],
    },
  ],
  filters: [],
};

export function createSampleResult(): IAnalyticResult {
  const today = new Date();

  const dataPoints = [];

  for (let i = 0; i < 30; i++) {
    dataPoints.push({
      data: {
        'sample.dimension': format(subDays(today, i), 'yyyy-MM-dd'),
        'sample.measures': 0,
      },
      fromDate: format(subDays(today, i), 'yyyy-MM-dd'),
      toDate: format(subDays(today, i), 'yyyy-MM-dd'),
    });
  }

  const measuredResult = {
    currentPeriod: {
      data: {
        'sample.dimension': format(today, 'yyyy-MM-dd'),
        'sample.measures': 0,
      },
      fromDate: '',
      toDate: '',
    },
    today: {
      data: {
        'sample.dimension': format(today, 'yyyy-MM-dd'),
        'sample.measures': 0,
      },
      fromDate: '',
      toDate: '',
    },
    yesterday: {
      data: {
        'sample.dimension': format(subDays(today, 1), 'yyyy-MM-dd'),
        'sample.measures': 0,
      },
      fromDate: '',
      toDate: '',
    },
    dataPoints,
  };

  return {
    measuredResult,
    view,
    updatedAt: '',
  };
}
