import { ACTIVE_DASHBOARD_COLUMN_ORDER, ColumnRecord, PlaceholderProps } from '@types';
import React, { FC, useState } from 'react';
import { DragDropContext, DropResult, DragStart, DragUpdate } from 'react-beautiful-dnd';
import * as css from './layout.scss';
import { calculateStartPlaceholderPosition, calculateUpdatePlaceholderPosition } from '@utils/dnd';
import { DroppableColumnContainer } from '@components/dnd/droppable-column';

export interface Props {
  onDragEnd(result: DropResult): void;
  columns: ColumnRecord;
  portalNodes: any;
}

export const DndLayoutComponent: FC<Props> = ({ onDragEnd, columns, portalNodes }) => {
  const [placeholderProps, setPlaceholderProps] = useState<PlaceholderProps>(
    {} as PlaceholderProps,
  );

  const handleDragEnd = (event: DropResult) => {
    setPlaceholderProps({} as PlaceholderProps);
    onDragEnd(event);
  };

  const handleDragStart = (event: DragStart) => {
    const coordinates = calculateStartPlaceholderPosition(event);

    if (coordinates) {
      setPlaceholderProps(coordinates);
    }
  };

  const handleDragUpdate = (event: DragUpdate) => {
    const coordinates = calculateUpdatePlaceholderPosition(event);

    if (coordinates) {
      setPlaceholderProps(coordinates);
    }
  };

  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragUpdate={handleDragUpdate}
    >
      <div className={css.widgetsWrapper}>
        {ACTIVE_DASHBOARD_COLUMN_ORDER.map(columnId => (
          <DroppableColumnContainer
            key={columnId}
            column={columns[columnId]}
            portalNodes={portalNodes}
            placeholderProps={placeholderProps}
          />
        ))}
      </div>
    </DragDropContext>
  );
};
