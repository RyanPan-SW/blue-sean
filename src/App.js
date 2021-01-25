import React from 'react'
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import { PrivateRoute, RouteWithSubRoutes } from './router/renderRoutes'
import { routesConfig } from './router'
import './App.css'
import Page404 from './pages/404'

const App = () => {
  return (
    <Router>
      <Switch>
        {routesConfig.map((route, i) => {
          const { auth, path, component: Component } = route
          if (auth) {
            return (
              <PrivateRoute key={i} path={path}>
                <Component />
              </PrivateRoute>
            )
          }

          return <RouteWithSubRoutes key={i} {...route} />
        })}
        <Redirect exact path='/notFound' component={Page404} />
      </Switch>
    </Router>
  )
}

export default App
