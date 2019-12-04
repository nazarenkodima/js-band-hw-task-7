// Core
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';

// Styles
import Styles from './Styles.m.css';

// actions
import { todosActions } from '../../bus/Todos/actions';

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

@connect(null, mapDispatchToProps)
export default class Todo extends PureComponent {
  deleteTodo = () => {
    const { id, actions } = this.props;

    actions.deleteTodo(id);
  };

  doneTodo = () => {
    const { id, actions } = this.props;

    actions.doneTodo(id);
  };

  editTodo = () => {
    const { id, actions } = this.props;

    actions.toggleModal(id);
    actions.editTodo();
  };

  render() {
    const { title, description, priority, done } = this.props;

    return (
      <li className={cx(Styles.todoItem, { [Styles.completed]: done })}>
        <h4 className="title">{title}</h4>
        <div className={Styles.description}>{description}</div>
        <div className={Styles.todoItem__footer}>
          <div className={Styles.priorityBox}>{priority}</div>
          <div className={Styles.actionBox}>
            <div className={Styles.actionBox__menu}>...</div>
            <div className={Styles.actions}>
              <button className="button btn btn-dark" type="button" onClick={this.doneTodo}>
                done
              </button>
              <button className="button btn btn-dark" type="button" onClick={this.editTodo}>
                edit
              </button>
              <button className="button btn btn-dark" type="button" onClick={this.deleteTodo}>
                delete
              </button>
            </div>
          </div>
        </div>
      </li>
    );
  }
}
