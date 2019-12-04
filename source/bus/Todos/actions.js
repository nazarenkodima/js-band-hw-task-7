// Actions
import { types } from './types';

// eslint-disable-next-line import/prefer-default-export
export const todosActions = {
  createTodo: todo => {
    return {
      type: types.CREATE_TODO,
      payload: todo,
    };
  },
  deleteTodo: id => {
    return {
      type: types.DELETE_TODO,
      payload: id,
    };
  },
  doneTodo: id => {
    return {
      type: types.DONE_TODO,
      payload: id,
    };
  },
};
