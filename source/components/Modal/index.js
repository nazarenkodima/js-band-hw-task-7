// Core
import React, { Component } from 'react';
import TodoContext from '../ThemeContext/ThemeContext';

// Instruments
import Styles from './styles.m.css';

export default class Modal extends Component {
  // eslint-disable-next-line react/sort-comp,react/static-property-placement
  static contextType = TodoContext;

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      priority: 'normal',
      done: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.createTodo = this.createTodo.bind(this);
    this.cancelTodo = this.cancelTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.fillTodo = this.fillTodo.bind(this);
  }

  componentDidMount() {
    this.fillTodo();
  }

  fillTodo() {
    const { todos } = this.context;
    const { currentTodoId } = this.props;

    todos.map(todo => {
      const t = todo;
      if (t.id === currentTodoId) {
        this.setState({
          title: t.title,
          description: t.description,
          priority: t.priority,
          done: t.done,
        });
      }
      return todo;
    });
  }

  handleInputChange(event) {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  createTodo() {
    const { createTodo, toggleModal } = this.props;
    const { title, description, priority, done } = this.state;

    if (!title.trim()) {
      return null;
    }

    createTodo({
      id: Date.now().toString(),
      title,
      description,
      done,
      priority,
    });

    toggleModal();
  }

  updateTodo() {
    const { updateTodo, currentTodoId, toggleModal } = this.props;
    const { title, description, priority } = this.state;
    const { todos } = this.context;

    todos.map(todo => {
      const t = todo;
      if (todo.id === currentTodoId) {
        t.title = title;
        t.description = description;
        t.priority = priority;
      }

      return t;
    });

    updateTodo(todos);

    toggleModal();
  }

  cancelTodo() {
    const { toggleModal } = this.props;
    toggleModal();
  }

  render() {
    const { title, description, priority } = this.state;
    const { showSaveButton } = this.props;

    return (
      <>
        <div className={Styles.todoModal}>
          <label htmlFor="title">
            <input
              className={Styles.createInput}
              name="title"
              type="text"
              placeholder="title"
              value={title}
              onChange={this.handleInputChange}
            />
          </label>
          <label htmlFor="description">
            <textarea
              value={description}
              name="description"
              className={Styles.createDescription}
              cols="30"
              rows="10"
              placeholder="description"
              onChange={this.handleInputChange}
            />
          </label>
          <select
            className="create-priority form-control"
            name="priority"
            value={priority}
            onChange={this.handleInputChange}
          >
            <option value="high">high</option>
            <option value="normal">normal</option>
            <option value="low">low</option>
          </select>
          <div className={Styles.modalActions}>
            <div>
              <button
                className="button btn btn-dark cancel-todo"
                type="button"
                onClick={this.cancelTodo}
              >
                Cancel
              </button>
            </div>
            <div>
              {showSaveButton ? (
                <button
                  className="button btn btn-dark save-todo"
                  type="button"
                  onClick={this.createTodo}
                >
                  Save
                </button>
              ) : (
                <button
                  className="button btn btn-dark update-todo"
                  type="button"
                  onClick={this.updateTodo}
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
