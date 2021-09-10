import { useActiveDashboardSection } from '@components/active-dashboard-section/active-dashboard-section.context';
import { useRenderWidgets } from '@hooks/render-widgets';
import React, { FC } from 'react';
import { DroppableColumn, ContainerProps } from './droppable-column.component';

export const DroppableColumnContainer: FC<ContainerProps> = ({
  column,
  portalNodes,
  placeholderProps,
}) => {
  const widgets = useRenderWidgets()(column.widgets);
  const {
    selectors: { getIsCustomizing, getNextWidgetCol },
  } = useActiveDashboardSection();
  const isCustomizing = getIsCustomizing();
  const isDragDisabled = !isCustomizing;
  const nextWidgetCol = getNextWidgetCol();
  const shouldShowIndicator = nextWidgetCol === column.id && isCustomizing;

  return (
    <DroppableColumn
      widgets={widgets}
      isDragDisabled={isDragDisabled}
      column={column}
      portalNodes={portalNodes}
      placeholderProps={placeholderProps}
      shouldShowIndicator={shouldShowIndicator}
    />
  );
};
