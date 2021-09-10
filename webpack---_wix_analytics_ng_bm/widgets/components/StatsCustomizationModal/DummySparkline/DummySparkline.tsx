import React, { ReactElement, useState, useEffect } from 'react';
import { SparklineChart } from 'wix-style-react';

interface DummySparklineProps {
  color: string;
  height?: number;
  width?: number;
  values?: number[];
}

export function DummySparkline(props: DummySparklineProps): ReactElement {
  const { color, height = 14, width } = props;
  const [dataSet, setDataSet] = useState(createDummyDataSet());

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setDataSet(createDummyDataSet()), [props.values]);

  function createDummyDataSet() {
    const values = props.values || generateRandomNumbers(20);
    const formattedValues = values.map((n) => n.toString());
    return {
      name: null,
      color,
      values,
      visible: true,
      metaData: {
        formattedValues,
      },
    };
  }

  function generateRandomNumbers(numberToGenerate: number, initialNumbersArray = []) {
    const numbers = [];
    for (let i = 0; i < numberToGenerate; i++) {
      numbers[i] = initialNumbersArray[i] || getRandomNumber(1, 5000);
    }
    return numbers;
  }

  function getRandomNumber(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function getDatePlusDays(plusDays: number): Date {
    const date = new Date(new Date().setDate(new Date().getDate() + plusDays));
    date.setHours(0, 0, 0, 0);
    return date;
  }

  const labels = dataSet.values.map((value, i) => getDatePlusDays(i));

  const sparklineDataSet = dataSet.values.map((value, index) => {
    const label = labels[index];
    return { value, label };
  });

  return <SparklineChart data={sparklineDataSet} height={height} width={width} color={color} />;
}
