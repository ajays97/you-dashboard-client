import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DashboardPage from '../containers/DashboardPage';
import LoginPage from '../containers/LoginPage';
import { PrivateRoute } from './utils/PrivateRoute';

const RootRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/" component={DashboardPage} />
      </Switch>
    </Router>
  );
};

export default RootRouter;
