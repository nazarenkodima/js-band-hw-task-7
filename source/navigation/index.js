import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { hot } from 'react-hot-loader';

import Scheduler from '../pages/Scheduler';

@hot(module)
export default class Index extends Component {
  render() {
    return (
      <Switch>
        <Redirect exact from="/" to="/todos" />
        <Route component={Scheduler} path="/todos" />
        <Route path="*">Oops..not found</Route>
      </Switch>
    );
  }
}
