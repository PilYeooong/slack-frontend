import React, { FC } from 'react';
import loadable from '@loadable/component';
import { Switch, Route, Redirect } from 'react-router-dom';

const Workspace = loadable(() => import('@layouts/Workspace'));
const Login = loadable(() => import('@pages/Login'));
const SignUp = loadable(() => import('@pages/SignUp'));

const App: FC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/workspace/:workspace" component={Workspace} />
    </Switch>
  );
};

export default App;
