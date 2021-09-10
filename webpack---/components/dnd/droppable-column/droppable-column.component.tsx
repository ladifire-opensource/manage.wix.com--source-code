import { Column, PlaceholderProps, DraggableWidgetMap } from '@types';
import { ActiveDashboardColumnsDataHook } from '@components/active-dashboard-section/active-dashboard-section.datahooks';
import React, { FC } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { DraggableWidget } from '@components/dnd/draggable-widget';
import * as css from './droppable-column.scss';
import { OutPortal } from 'react-reverse-portal';
import { Placeholder } from '@components/dnd/placeholder';
import { NextWidgetIndicator } from '@components/active-dashboard-section/next-widget-indecator';

export interface ContainerProps {
  column: Column;
  portalNodes: any;
  placeholderProps: PlaceholderProps;
}

export interface Props extends ContainerProps {
  widgets: DraggableWidgetMap[];
  isDragDisabled: boolean;
  shouldShowIndicator: boolean;
}

export const DroppableColumn: FC<Props> = ({
  column,
  portalNodes,
  placeholderProps,
  widgets,
  isDragDisabled,
  shouldShowIndicator,
}) => (
  <div className={css.widgetsCol}>
    <Droppable droppableId={column.id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          data-hook={ActiveDashboardColumnsDataHook[column.id]}
          className={css.wrapper}
        >
          {widgets.map(({ widgetId }, index: number) => {
            const node = portalNodes[widgetId];

            if (!node) {
              return null;
            }

            return (
              <DraggableWidget
                key={widgetId}
                index={index}
                widgetId={widgetId}
                isDragDisabled={isDragDisabled}
              >
                <OutPortal node={node} />
              </DraggableWidget>
            );
          })}
          {provided.placeholder}
          {!!Object.keys(placeholderProps).length && snapshot.isDraggingOver && (
            <Placeholder {...placeholderProps} />
          )}
        </div>
      )}
    </Droppable>
    {shouldShowIndicator && <NextWidgetIndicator />}
  </div>
);
