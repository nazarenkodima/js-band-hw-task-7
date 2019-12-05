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
  toggleModal: id => {
    return {
      type: types.TOGGLE_MODAL,
      payload: id,
    };
  },
  updateEditedTodo: todo => {
    return {
      type: types.UPDATE_EDITED_TODO,
      payload: todo,
    };
  },
  editTodo: () => {
    return {
      type: types.EDIT_TODO,
    };
  },
  editCancel: () => {
    return {
      type: types.EDIT_CANCEL,
    };
  },
  fillTodo: todo => {
    return {
      type: types.FILL_TODO,
      payload: todo,
    };
  },
  updateTodo: id => {
    return {
      type: types.UPDATE_TODO,
      payload: id,
    };
  },
};
