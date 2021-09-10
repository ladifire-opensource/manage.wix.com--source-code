export type ItemAction = {
  index: number;
  item: any;
};

export const insertItem = (array: any[], action: ItemAction) => {
  return [
    ...array.slice(0, action.index),
    action.item,
    ...array.slice(action.index),
  ];
};

export const removeItem = (array: any[], index: number) => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

export const updateItem = (array: any[], action: ItemAction) => {
  return array.map((item, index) => {
    if (index !== action.index) {
      return item;
    }

    return {
      ...item,
      ...action.item,
    };
  });
};

export const isEqual = (
  firstObject: Record<string, any>,
  secondObject: Record<string, any>,
) => {
  return JSON.stringify(firstObject) === JSON.stringify(secondObject);
};
