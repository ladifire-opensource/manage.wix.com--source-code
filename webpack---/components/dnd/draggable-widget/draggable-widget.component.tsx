import { DRAGGABLE_DATA_HOOK, DRAGGABLE_WRAPPER_DATA_HOOK } from '@consts';
import React, { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import classnames from 'classnames';
import * as styles from './draggable-widget.scss';
import { DragHandle } from '@components/dnd/drag-handle';

export interface Props {
  widgetId: string;
  children: JSX.Element;
  index: number;
  isDragDisabled: boolean;
}

export const DraggableWidget: FC<Props> = ({ widgetId, index, children, isDragDisabled }) => (
  <Draggable draggableId={widgetId} index={index} isDragDisabled={isDragDisabled}>
    {(provided, snapshot) => (
      <div
        data-hook={DRAGGABLE_DATA_HOOK}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={classnames(styles.draggable, {
          [styles.dropAnimation]: snapshot.isDropAnimating,
        })}
      >
        <div
          className={classnames(styles.wrapper, {
            [styles.widgetDragging]: snapshot.isDragging && !snapshot.isDropAnimating,
            [styles.customizable]: !isDragDisabled,
          })}
          data-hook={DRAGGABLE_WRAPPER_DATA_HOOK}
        >
          <DragHandle isEnabled={!isDragDisabled} />
          {children}
        </div>
      </div>
    )}
  </Draggable>
);
