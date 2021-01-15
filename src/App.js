import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import routesConfig from './router'
import { PrivateRoute, RouteWithSubRoutes } from './router/renderRoutes'
import './App.css'

const App = () => {
  return (
    <Router>
      <Switch>
        {routesConfig.map((route, i) => {
          if (route.auth) {
            return (
              <PrivateRoute key={i} path={route.path}>
                <route.component />
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
