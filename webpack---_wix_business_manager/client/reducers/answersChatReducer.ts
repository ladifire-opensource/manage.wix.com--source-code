import { Reducer } from 'redux';
import { ANSWERS_CHAT_IS_VISIBLE } from '../actionTypes/answersChatActionsTypes';

export const answersChat: Reducer<boolean> = (state = false, action) => {
  switch (action.type) {
    case ANSWERS_CHAT_IS_VISIBLE:
      return true;
    default:
      return state;
  }
};
