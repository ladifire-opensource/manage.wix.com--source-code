import { AccountData } from '@types';
import { createContext } from 'react';

export const AccountContext = createContext<AccountData>({ hireProfessionalUrl: '' });
