import { ActiveDashboardColumns } from '@types';
import React, { FC, useCallback, useState, useEffect } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { calculateFromTo, determineColumnLayout } from '@utils/dnd';
import { DndLayoutComponent } from './layout.component';
import { createHtmlPortalNode, InPortal } from 'react-reverse-portal';
import { useRenderWidgets } from '@hooks/render-widgets';
import { useActiveDashboardSection } from '@components/active-dashboard-section/active-dashboard-section.context';

export const DndLayout: FC = () => {
  const {
    actions: { handleDragEnd },
    selectors: { getWidgets },
  } = useActiveDashboardSection();

  const { left, right } = getWidgets();

  const columns = {
    [ActiveDashboardColumns.LEFT]: {
      id: ActiveDashboardColumns.LEFT,
      widgets: left,
    },
    [ActiveDashboardColumns.RIGHT]: {
      id: ActiveDashboardColumns.RIGHT,
      widgets: right,
    },
  };

  const allWidgets = useRenderWidgets()(left).concat(useRenderWidgets()(right));

  const [portalNodes, setPortalNodes] = useState<any>(
    allWidgets.reduce((res, { widgetId }) => {
      return { ...res, [widgetId]: createHtmlPortalNode() };
    }, {}),
  );

  useEffect(() => {
    const newNodes = allWidgets.reduce((res, { widgetId }) => {
      if (portalNodes[widgetId]) {
        return res;
      }

      return { ...res, [widgetId]: createHtmlPortalNode() };
    }, {});

    setPortalNodes({
      ...portalNodes,
      ...newNodes,
    });
  }, [left, right]);

  const onDragEnd = useCallback(
    (dropResult: DropResult) => {
      const newLayout = determineColumnLayout({ columns, dropResult });
      if (newLayout) {
        handleDragEnd({
          layout: newLayout,
          widgetId: dropResult.draggableId,
          ...calculateFromTo(dropResult),
        });
      }
    },
    [columns],
  );

  return (
    <>
      {allWidgets.map(({ widgetId, component }) => {
        const node = portalNodes[widgetId];

        if (!node) {
          return null;
        }

        return (
          <InPortal key={widgetId} node={portalNodes[widgetId]}>
            {component}
          </InPortal>
        );
      })}
      <DndLayoutComponent onDragEnd={onDragEnd} columns={columns} portalNodes={portalNodes} />
    </>
  );
};
