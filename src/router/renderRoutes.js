import React from 'react'
import { Route, Redirect } from 'react-router-dom'

/*登录检测路由*/
export function PrivateRoute({ children, ...route }) {
  let isAuthenticated = sessionStorage.auth

  return (
    <Route
      {...route}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

/*开放路由*/
export function RouteWithSubRoutes(route) {
  const { path, exact = false, component: Component, routes = [] } = route

  return (
    <Route exact={exact} path={path} render={(props) => <Component {...props} routes={routes} />} />
  )
}

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
