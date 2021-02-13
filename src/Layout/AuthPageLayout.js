import React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
// import PageHeader from '@/components/Header'
import PageHeader from '@/components/Header/selfHeader'
// import OtherHeader from '@/components/OtherPageHeader'
// import OtherHeader from '@/components/OtherPageHeader/selfHeader'
// import Footer from '@/components/Footer'
import Home from '@/pages/Home'
import Services from '@/pages/Services'
import { Layout } from 'antd'
import Login from '@/pages/Login'
import Become from '@/pages/Become'

import './index.scss'
import FooterComponent from '@/components/Footer'

function BaseLayout({ footer = true }) {
  const { pathname } = useLocation()

  return (
    <Layout>
      <Layout.Header
        style={{
          height: 'auto',
          position: 'fixed',
          zIndex: 2,
          width: '100%',
          padding: 0,
          background: 'none',
        }}
      >
        <PageHeader />
      </Layout.Header>
      <Layout.Content style={{ paddingTop: pathname === '/home' ? 0 : 130, background: '#fff' }}>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/home' component={Home} />
          <Route path='/services' component={Services} />
          <Route path='/become' component={Become} />
        </Switch>
      </Layout.Content>

      {footer && (
        <Layout.Footer style={{ padding: 0 }}>
          <FooterComponent />
        </Layout.Footer>
      )}
    </Layout>
  )
}

export default BaseLayout
