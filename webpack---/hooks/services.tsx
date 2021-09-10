import { useContext } from 'react';
import { Services } from '@contexts/services';

export const useServices = () => useContext(Services);
