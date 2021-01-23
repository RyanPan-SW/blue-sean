import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { PrivateRoute, RouteWithSubRoutes } from './router/renderRoutes'
import { routesConfig } from './router'
import './App.css'

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
      </Switch>
    </Router>
  )
}

export default App
