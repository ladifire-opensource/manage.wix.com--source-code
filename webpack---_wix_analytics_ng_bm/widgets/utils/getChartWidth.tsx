export const getChartWidth = (itemsInRow, boxWidth) => {
  if (boxWidth && boxWidth < 712) {
    return itemsInRow === 3 ? 58 : 129;
  }
  return itemsInRow === 3 ? 69 : 129;
};
