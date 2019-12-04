import React from 'react';

const TodoContext = React.createContext({});

export const TodoProvider = TodoContext.Provider;
export const TodoConsumer = TodoContext.Consumer;
export default TodoContext;
