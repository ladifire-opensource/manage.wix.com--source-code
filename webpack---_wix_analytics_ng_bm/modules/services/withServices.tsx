import React from 'react';

import { IServices } from './types';

interface IWithServicesProps {
  component: any;
  services?: IServices;
}

export function withServices({ component: Component, services = {} }: IWithServicesProps) {
  return (props) => {
    return <Component {...props} services={services} />;
  };
}
