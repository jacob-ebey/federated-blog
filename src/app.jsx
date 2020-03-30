import React from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from './routes';

export default function App() {
  return (
    <React.Suspense fallback="">
      <Switch>
        {routes.map((route) => (
          <Route exact key={route.path} path={route.path} component={route.component} />
        ))}
      </Switch>
    </React.Suspense>
  );
}
