import { IDataSet, IItem, ItemsDto } from '../../api';

export const toDataSet = (response: ItemsDto): IDataSet => {
  const dataSet: {
    sortedIds: any;
    data: any;
  } = {
    sortedIds: {},
    data: {},
  };

  Object.keys(response).forEach((key: string) => {
    dataSet.sortedIds[key] = response[key].map((item: IItem) => {
      dataSet.data[item.id] = {
        ...item,
        sectionId: key,
      };
      return item.id;
    });
  });

  return dataSet;
};
