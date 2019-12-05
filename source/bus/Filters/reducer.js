// Core

import { types } from './types';

const initialState = {
  done: false,
  priority: 'normal',
  tasksFilter: '',
};

// eslint-disable-next-line import/prefer-default-export
export const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_SEARCH_FILTER:
      return {
        ...state,
        tasksFilter: action.payload,
      };

    case types.UPDATE_SELECT_CHANGE:
      console.log(action.payload);
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
