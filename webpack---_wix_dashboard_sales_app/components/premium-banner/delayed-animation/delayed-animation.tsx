import React, { useState, useEffect, FC } from 'react';
import { AnimatorProps, Animator } from 'wix-animations';

export interface DelayedAnimationProps extends AnimatorProps {
  delayDuration?: 'long' | 'low';
}

const delayDurationMapping = {
  long: 1000,
  low: 400,
};

export const DelayedAnimation: FC<DelayedAnimationProps> = ({
  children,
  delayDuration,
  show,
  ...rest
}) => {
  const [finalShow, setFinalShow] = useState(false);

  useEffect(() => {
    setTimeout(
      () => setFinalShow(true),
      delayDuration ? delayDurationMapping[delayDuration] : delayDurationMapping.long,
    );
  }, [delayDuration]);

  return (
    <Animator {...rest} show={finalShow && show}>
      {children}
    </Animator>
  );
};
