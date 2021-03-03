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
import SignUp from '@/pages/SignUp'
import Become from '@/pages/Become'
import PrivacyPolicy from '@/pages/PrivacyPolicy'
import TermsOfUse from '@/pages/TermsOfUse'
import BusinessCooperation from '@/pages/BusinessCooperation'

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
      <Layout.Content
        style={{
          paddingTop: pathname === '/home' ? 0 : 130,
          background: '#fff',
          paddingBottom: 50,
        }}
      >
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
          <Route path='/home' component={Home} />
          <Route path='/services' component={Services} />
          <Route path='/become' component={Become} />
          <Route path='/privacypolicy' component={PrivacyPolicy} />
          <Route path='/terms' component={TermsOfUse} />
          <Route path='/business' component={BusinessCooperation} />
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
