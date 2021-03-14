import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import { APP_CONTENT } from '../constants/AppRouter';

const AppRouter = () => (
  <Suspense
    fallback={
      <div className="app-info-container">
        <CircularProgress disableShrink />
      </div>
    }
  >
    <Switch>
      {Object.keys(APP_CONTENT).map((id) => (
        <Route
          key={`app-router-${id}`}
          exact
          path={APP_CONTENT[id].path}
          component={lazy(() => APP_CONTENT[id].component)}
        />
      ))}
      <Route component={lazy(() => import('../pages/404'))} />
    </Switch>
  </Suspense>
);

export default AppRouter;
