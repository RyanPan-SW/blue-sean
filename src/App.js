import React from 'react'
import { Switch } from 'react-router-dom'
import routesConfig from './router'
import { PrivateRoute, RouteWithSubRoutes } from './router/renderRoutes'
import './App.css'

const App = () => {
  return (
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
  )
}

export default App
