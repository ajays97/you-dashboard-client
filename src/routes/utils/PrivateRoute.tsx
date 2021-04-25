import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { IStore } from '../../shared/redux/interfaces';

export const PrivateRoute = ({
  component: Component,
  ...rest
}: {
  component: any;
  path: string;
}) => {
  const isAuth = useSelector((state: IStore) => state.auth.isAuthenticated);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
