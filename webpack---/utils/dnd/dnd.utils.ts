import {
  ColumnRecord,
  ActiveDashboardSectionLayout,
  PlaceholderProps,
  ActiveDashboardColumns,
  ActiveDashboardLayout,
} from '@types';
import { DragStart, DragUpdate, DropResult } from 'react-beautiful-dnd';

export const determineColumnLayout = ({
  columns,
  dropResult,
}: {
  columns: ColumnRecord;
  dropResult: DropResult;
}): ActiveDashboardLayout | undefined => {
  const { source, destination, reason } = dropResult;
  if (!destination) {
    return undefined;
  }

  if (reason === 'CANCEL') {
    return undefined;
  }

  if (destination.droppableId === source.droppableId && destination.index === source.index) {
    return undefined;
  }

  const start = columns[source.droppableId];
  const finish = columns[destination.droppableId];
  const draggable = start.widgets[source.index];

  if (start === finish) {
    const newWidget = Array.from(start.widgets);
    newWidget.splice(source.index, 1);
    newWidget.splice(destination.index, 0, draggable);

    const newColumn = {
      ...start,
      widgets: newWidget,
    };

    return columnRecordToLayout({
      ...columns,
      [newColumn.id]: newColumn,
    });
  }

  // Moving from one list to another
  const startWidgetIds = Array.from(start.widgets);
  startWidgetIds.splice(source.index, 1);
  const newStart = {
    ...start,
    widgets: startWidgetIds,
  };

  const finishWidgetIds = Array.from(finish.widgets);
  finishWidgetIds.splice(destination.index, 0, draggable);
  const newFinish = {
    ...finish,
    widgets: finishWidgetIds,
  };

  return columnRecordToLayout({
    [newStart.id]: newStart,
    [newFinish.id]: newFinish,
  });
};

const columnRecordToLayout = (columnRecord: ColumnRecord): ActiveDashboardLayout =>
  Object.keys(columnRecord).reduce(
    (result, columnId) => ({
      ...result,
      [columnId]: columnRecord[columnId].widgets,
    }),
    {} as ActiveDashboardLayout,
  );

const getModifier = (columnId: string): number =>
  columnId === ActiveDashboardColumns.LEFT ? 0 : 1;

export const calculateFromTo = (
  event: DropResult,
): { fromLocation: string; toLocation: string } => ({
  fromLocation: (2 * event.source.index + getModifier(event.source.droppableId)).toString(),
  toLocation: (
    2 * event.destination!.index +
    getModifier(event.destination!.droppableId)
  ).toString(),
});

const queryAttr = 'data-rbd-drag-handle-draggable-id';

const getDraggedDom = (draggableId: string): Element | null => {
  const domQuery = `[${queryAttr}='${draggableId}']`;
  return document.querySelector(domQuery);
};

const calculateClientY = ({
  draggedDOM,
  children,
}: {
  draggedDOM: Element;
  children: Element[];
}): number => {
  return (
    parseFloat(window.getComputedStyle(draggedDOM.parentNode as Element).paddingTop) +
    children.reduce((total, curr) => {
      const style = window.getComputedStyle(curr);
      const marginBottom = parseFloat(style.marginBottom);
      return total + curr.clientHeight + marginBottom;
    }, 0)
  );
};

const calculateHeightWithMargin = (draggedDOM: Element): number =>
  draggedDOM.clientHeight + parseFloat(window.getComputedStyle(draggedDOM).marginBottom);

const calculateClientX = (draggedDOM: Element): number =>
  parseFloat(window.getComputedStyle(draggedDOM.parentNode as Element).paddingLeft);

export const calculateStartPlaceholderPosition = (
  event: DragStart,
): PlaceholderProps | undefined => {
  const draggedDOM = getDraggedDom(event.draggableId);

  if (!draggedDOM) {
    return;
  }

  const { clientWidth } = draggedDOM;
  const sourceIndex = event.source.index;
  const sourceColumn = event.source.droppableId;

  const sourceArray = [
    ...document.querySelectorAll(`[data-rbd-droppable-id=${sourceColumn}] [${queryAttr}]`),
  ];

  const clientY = calculateClientY({
    draggedDOM,
    children: sourceArray.slice(0, sourceIndex),
  });

  return {
    clientHeight: calculateHeightWithMargin(draggedDOM),
    clientWidth,
    clientY,
    clientX: calculateClientX(draggedDOM),
  };
};

export const calculateUpdatePlaceholderPosition = (
  event: DragUpdate,
): PlaceholderProps | undefined => {
  if (!event.destination) {
    return;
  }

  const draggedDOM = getDraggedDom(event.draggableId);

  if (!draggedDOM) {
    return;
  }

  const { clientWidth } = draggedDOM;
  const destinationIndex = event.destination.index;
  const destinationColumn = event.destination.droppableId;
  const sourceColumn = event.source.droppableId;
  const sourceIndex = event.source.index;

  const destinationArray = [
    ...document.querySelectorAll(`[data-rbd-droppable-id=${destinationColumn}] [${queryAttr}]`),
  ];

  const movedItem = draggedDOM;

  if (destinationColumn === sourceColumn) {
    destinationArray.splice(sourceIndex, 1);
  }

  const updatedArray = [
    ...destinationArray.slice(0, destinationIndex),
    movedItem,
    ...destinationArray.slice(destinationIndex + 1),
  ];

  const clientY = calculateClientY({
    draggedDOM,
    children: updatedArray.slice(0, destinationIndex),
  });

  return {
    clientHeight: calculateHeightWithMargin(draggedDOM),
    clientWidth,
    clientY,
    clientX: calculateClientX(draggedDOM),
  };
};
