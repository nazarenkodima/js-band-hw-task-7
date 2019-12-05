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
    currentTodoId: state.todosReducer.currentTodoId,
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

  componentDidMount() {
    const { showSaveButton } = this.props;

    if (!showSaveButton) {
      this.fillTodo();
    }
  }

  createTodo = () => {
    const { actions, title, description, priority, done } = this.props;

    if (!title.trim()) {
      return null;
    }

    actions.createTodo({
      title,
      description,
      done,
      priority,
    });

    actions.toggleModal(null);
  };

  handleInputChange = event => {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    const { actions } = this.props;

    actions.updateEditedTodo({ [name]: value });
  };

  fillTodo = () => {
    const { currentTodoId, actions } = this.props;

    actions.fillTodo(currentTodoId);
  };

  updateTodo = () => {
    const { actions } = this.props;

    actions.updateTodo();

    actions.toggleModal(null);
  };

  cancelTodo = () => {
    const { actions } = this.props;
    actions.editCancel();

    actions.toggleModal(null);
  };

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
