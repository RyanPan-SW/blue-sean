import React from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import HomeHeader from '@/components/Header'
import OtherHeader from '@/components/OtherPageHeader'
// import Footer from '@/components/Footer'
import Home from '@/pages/Home'
import Services from '@/pages/Services'
import { Layout } from 'antd'
import './index.scss'

function BaseLayout(props) {
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
          background: 'none'
        }}
      >
        {pathname.search('/home') > -1 ? <HomeHeader /> : <OtherHeader />}
      </Layout.Header>
      <Layout.Content>
        <Switch>
          <Route path='/home' component={Home} />
          <Route path='/services' component={Services} />
        </Switch>
      </Layout.Content>
    </Layout>
  )
}

export default BaseLayout
