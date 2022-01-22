import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
// import { PrivateRoute, RouteWithSubRoutes } from './router/renderRoutes'
import { routesConfig } from './router'
import Page404 from './pages/404/404'
import { createBrowserHistory } from 'history'
import './App.css'

const App = () => {
  return (
    <Router history={createBrowserHistory()}>
      <Switch>
        {routesConfig.map((route, i) => {
          const { path, component: Component, exact, routes } = route
          return (
            <Route
              key={i}
              exact={exact}
              path={path}
              render={(props) => <Component {...props} routes={routes} />}
            />
          )
        })}
        <Redirect exact to='/notFound' component={Page404} />
      </Switch>
    </Router>
  )
}

export default App
