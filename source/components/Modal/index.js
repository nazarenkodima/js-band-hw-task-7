// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Instruments
import Styles from './styles.m.css';

// actions
import { todosActions } from '../../bus/Todos/actions';

const mapStateToProps = state => {

  return {
    title: state.todosReducer.title,
    description: state.todosReducer.description,
    priority: state.todosReducer.priority,
    done: state.todosReducer.done,
    todos: state.todosReducer.todos,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
        {
          ...todosActions,
        },
        dispatch,
    ),
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      priority: 'normal',
      done: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.cancelTodo = this.cancelTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.fillTodo = this.fillTodo.bind(this);
  }

  componentDidMount() {
    this.fillTodo();
  }

  createTodo = () => {
    const {
      actions,
      toggleModal,
      title,
      description,
      priority,
      done
    } = this.props;

    if (!title.trim()) {
      return null;
    }

    actions.createTodo({

      title,
      description,
      done,
      priority,
    });

    toggleModal();
  };

  handleInputChange(event) {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    const { actions } = this.props;

    actions.updateEditedTodo({[name]: value})

  }

  fillTodo() {
    const { currentTodoId, todos } = this.props;

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
    const { showSaveButton, title, description, priority } = this.props;

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
