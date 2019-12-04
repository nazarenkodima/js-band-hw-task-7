// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spring } from 'react-spring';
import {bindActionCreators} from 'redux';

// Components
import Todo from '../Todo';
import Modal from '../Modal';

// Styles
import Styles from './styles.m.css';

import {todosActions} from '../../bus/Todos/actions';

const mapStateToProps = state => {
  return {
    todos: state.todosReducer.todos,
    isModalShown: state.todosReducer.isModalShown,
    showSaveButton: state.todosReducer.showSaveButton,
    currentTodoId: state.todosReducer.currentTodoId
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
export default class Todos extends Component {
  constructor() {
    super();

    this.state = {
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
      done: false,
      priority: 'normal',
      currentTodoId: undefined,
      tasksFilter: '',
      showSaveButton: true,
      isModalShown: false,
    };

    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.createTodo = this.createTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.updateTasksFilter = this.updateTasksFilter.bind(this);
  }

  filterTasks = todo => {
    const { done, priority } = this.state;

    if (done && todo.priority === 'high') return todo.priority === priority && todo.done;

    if (done && todo.priority === 'normal') return todo.priority === priority && todo.done;

    if (done && todo.priority === 'low') return todo.priority === priority && todo.done;

    if (!done && priority) {
      switch (priority) {
        case 'high':
          return todo.priority === priority && !todo.done;

        case 'normal':
          return todo;

        case 'low':
          return todo.priority === priority && !todo.done;

        default:
          return todo;
      }
    }
  };

  searchTasks = todo => {
    const { tasksFilter } = this.state;

    return todo.title.toLowerCase().includes(tasksFilter);
  };

  toggleModal = () => {
    const { isModalShown, actions } = this.props;

    if (!isModalShown) {
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    actions.toggleModal();

    // this.setState(prevState => ({
    //   isModalShown: !prevState.isModalShown,
    //   currentTodoId: id,
    //   showSaveButton: true,
    // }));
  }

  handleOutsideClick(e) {
    if (this.node.contains(e.target)) {
      return;
    }

    this.toggleModal();
  }

  createTodo(todo) {
    this.setState(({ todos }) => ({
      todos: [todo, ...todos],
    }));
  }

  updateTodo(todos) {
    this.setState({
      todos,
    });
  }

  editTodo() {
    this.setState(() => ({
      showSaveButton: false,
    }));
  }

  updateTasksFilter(event) {
    this.setState({
      tasksFilter: event.target.value.toLocaleLowerCase(),
    });
  }

  handleInputChange(event) {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    const { done } = this.state;

    if (name === 'priority') {
      this.setState({
        [name]: value,
        priority: value,
      });
    }

    if (name === 'done') {
      this.setState({
        [name]: value,
        done: !done,
      });
    }
  }

  render() {
    const { tasksFilter } = this.state;

    const { todos, isModalShown, showSaveButton, currentTodoId } = this.props;

    const completed = (a, b) => (a > b) - (a < b);

    const todoJSX = todos
      .sort((a, b) => completed(a.done, b.done))
      .filter(this.searchTasks)
      .filter(this.filterTasks)
      .map(todo => (
        <Todo
          key={todo.id}
          id={todo.id}
          title={todo.title}
          description={todo.description}
          done={todo.done}
          priority={todo.priority}
          deleteTodo={this.deleteTodo}
          todoDone={this.todoDone}
          toggleModal={this.toggleModal}
          editTodo={this.editTodo}
        />
      ));

    return (
        <main>
          <div className="container">
            <section className={Styles.toolbar}>
              <div>
                <input
                  className="searchTodo form-control"
                  type="text"
                  placeholder="search by title"
                  value={tasksFilter}
                  onChange={this.updateTasksFilter}
                />
              </div>
              <div>
                <select
                  name="done"
                  className="status form-control"
                  defaultValue="open"
                  onChange={this.handleInputChange}
                >
                  <option value="open">open</option>
                  <option value="done">done</option>
                </select>
              </div>
              <div>
                <select
                  name="priority"
                  className="priority form-control"
                  defaultValue="normal"
                  onChange={this.handleInputChange}
                >
                  <option value="high">high</option>
                  <option value="normal">normal</option>
                  <option value="low">low</option>
                </select>
              </div>
              <div>
                <button className="button create-todo" type="button" onClick={this.toggleModal}>
                  create
                </button>
              </div>
            </section>
            <section className={Styles.todos}>
              <Spring
                from={{
                  opacity: 0,
                  transform: 'translate3d(0,400px,0) scale(2) rotateX(90deg)',
                }}
                to={{ opacity: 1, transform: 'translate3d(0,0px,0) scale(1) rotateX(0deg)' }}
              >
                {props => (
                  <ul style={props} className={Styles.grid}>
                    {' '}
                    {todoJSX}{' '}
                  </ul>
                )}
              </Spring>
            </section>
          </div>
          <div
            ref={node => {
              this.node = node;
            }}
          >
            {isModalShown && (
              <Modal
                createTodo={this.createTodo}
                updateTodo={this.updateTodo}
                toggleModal={this.toggleModal}
                showSaveButton={showSaveButton}
                currentTodoId={currentTodoId}
              />
            )}
            {isModalShown && <div className={Styles.modalWrapper} />}
          </div>
        </main>
    );
  }
}
