import React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { Layout, Affix } from 'antd'
import Header from '@/components/Header'
// import Footer from '@/components/Footer'
import OtherPageHeader from '@/components/OtherPageHeader'

import routes from '@/config/BaseRoutes'

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
  const { pathname } = useLocation()
  console.log(pathname.search('/base/home') > -1)
  return (
    <div className='App'>
      <Layout style={{ background: '#f8f8f8' }}>
        <Affix>{pathname.search('/base/home') > -1 ? <Header /> : <OtherPageHeader />}</Affix>
        <Layout.Content>
          <Page />
        </Layout.Content>
        {/* <Footer /> */}
      </Layout>
    </div>
  )
}

export default App
