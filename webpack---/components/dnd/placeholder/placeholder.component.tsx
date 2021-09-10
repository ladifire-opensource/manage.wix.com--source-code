import { PlaceholderProps } from '@types';
import React, { FC } from 'react';
import * as css from './placeholder.scss';

export const Placeholder: FC<PlaceholderProps> = ({
  clientY,
  clientX,
  clientWidth,
  clientHeight,
}) => (
  <div
    className={css.outer}
    style={{
      top: clientY,
      left: clientX,
      height: clientHeight,
      width: clientWidth,
    }}
  >
    <div className={css.inner} />
  </div>
);
