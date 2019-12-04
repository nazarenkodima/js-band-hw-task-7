import { types } from './types';

const initialState = {
  todos: [
    {
      id: '1',
      title: 'Finish todo task',
      description: 'Ciklum internship',
      done: true,
      priority: 'high',
    },
    {
      id: '2',
      title: 'Master JS and React',
      description: 'finish Udemy courses',
      done: false,
      priority: 'normal',
    },
    {
      id: '3',
      title: 'Hello world 101',
      description: 'normal todo',
      done: false,
      priority: 'normal',
    },
    {
      id: '4',
      title: 'Hello world',
      description: 'low priority todo',
      done: false,
      priority: 'low',
    },
  ],
  title: '',
  description: '',
  done: false,
  priority: 'normal',
  currentTodoId: undefined,
  tasksFilter: '',
  showSaveButton: true,
  isModalShown: false,
};

// eslint-disable-next-line import/prefer-default-export
export const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_TODO:
      return {
        ...state,
        title: '',
        description: '',
        done: false,
        priority: 'normal',
        todos: [
          {
            id: Date.now().toString(),
            ...action.payload,
          },
          ...state.todos,
        ],
      };

    case types.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case types.DONE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => {
          const t = todo;
          if (t.id === action.payload) {
            t.done = !t.done;
          }
          return t;
        }),
      };

    case types.TOGGLE_MODAL:
      return {
        ...state,
        title: '',
        description: '',
        priority: 'normal',
        isModalShown: !state.isModalShown,
        currentTodoId: action.payload,
        showSaveButton: true,
      };

    case types.UPDATE_EDITED_TODO:
      return {
        ...state,
        ...action.payload,
      };

    case types.EDIT_TODO:
      return {
        ...state,
        showSaveButton: false,
      };

    case types.FILL_TODO:
      // eslint-disable-next-line no-case-declarations
      const { description, done, priority, title } = state.todos.find(
        todo => todo.id === action.payload,
      );
      return {
        ...state,
        title,
        description,
        done,
        priority,
      };

    case types.UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => {
          const t = todo;
          if (todo.id === state.currentTodoId) {
            t.title = state.title;
            t.description = state.description;
            t.done = state.todo;
            t.priority = state.priority;
          }
          return t;
        }),
      };
    default:
      return state;
  }
};
