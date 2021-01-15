import React from 'react'
import { Route, Redirect } from 'react-router-dom'

/*登录检测路由*/
export function PrivateRoute({ children, ...rest }) {
  let isAuthenticated = sessionStorage.auth
  return (
    <Route
      {...rest}
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
export /*开放路由*/
function RouteWithSubRoutes(route) {
  return (
    <Route
      exact={route.exact}
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
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
