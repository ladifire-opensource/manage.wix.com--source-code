import { ServicesProvider } from '@types';
import { createContext } from 'react';

// We know there is a provider with value, so we can set default value as any
export const Services = createContext<ServicesProvider>({} as any);
