import { combineReducers } from 'redux';

// reducers
import { todosReducer } from '../bus/Todos/reducer';

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
  todosReducer,
});
