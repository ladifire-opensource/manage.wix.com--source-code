import React, { FC } from 'react';
import classnames from 'classnames';
import * as styles from './drag-handle.scss';
import DragAndDropSmall from 'wix-ui-icons-common/system/DragAndDropSmall';

export interface Props {
  isEnabled: boolean;
}

export const DragHandle: FC<Props> = ({ isEnabled }) => (
  <DragAndDropSmall className={classnames(styles.dragHandle, { [styles.enabled]: isEnabled })} />
);
