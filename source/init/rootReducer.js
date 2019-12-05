import { combineReducers } from 'redux';

// reducers
import { todosReducer } from '../bus/Todos/reducer';
import { filtersReducer } from '../bus/Filters/reducer';

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
  filtersReducer,
  todosReducer,

});
