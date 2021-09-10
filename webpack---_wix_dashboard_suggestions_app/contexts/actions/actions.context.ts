import { createContext, useContext } from 'react';
import { Actions } from '../../actions';

export const ActionsContext = createContext({} as Actions);

export const useActions = () => useContext(ActionsContext);
