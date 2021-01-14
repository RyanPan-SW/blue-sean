import React from 'react'
import { Route } from 'react-router-dom'

export function renderRoutes(routesConfig = []) {
  return routesConfig.map(({ path, exact = false, component: Component, routes = [] }, index) => (
    <Route
      path={path}
      exact={exact}
      key={index}
      render={(props) => {
        return <Component {...props} routes={routes} />
      }}
    />
  ))
}
