import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Layout, Affix } from 'antd'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import routes from '@/config/BaseRoutes'

const { Content } = Layout
console.log(process.env.REACT_APP_BASEURL)
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={`${route.path}`}
      exact={route.exact}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  )
}

function Page() {
  return (
    <Switch>
      {routes.map((route) => (
        <RouteWithSubRoutes key={route.name} {...route} />
      ))}
    </Switch>
  )
}
function App() {
  return (
    <div className='App'>
      <Layout>
        <Affix>
          <Header />
        </Affix>
        <Content>
          <Page />
        </Content>
        <Footer />
      </Layout>
    </div>
  )
}

export default App
