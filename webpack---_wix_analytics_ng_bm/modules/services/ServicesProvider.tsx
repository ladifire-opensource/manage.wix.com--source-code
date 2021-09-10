import React, { ReactNode, FC } from 'react';

import { IServices } from './types';
import { ServicesContext } from './context';

interface IServicesProvider extends IServices {
  children: ReactNode;
}

export const ServicesProvider: FC<IServicesProvider> = ({ children, ...services }) => {
  return <ServicesContext.Provider value={services} children={children} />;
};
