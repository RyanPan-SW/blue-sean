import React, { useRef, useEffect } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
// import PageHeader from '@/components/Header'
import FooterComponent from '@/components/Footer'
import PageHeader from '@/components/Header/selfHeader'
// import OtherHeader from '@/components/OtherPageHeader'
// import OtherHeader from '@/components/OtherPageHeader/selfHeader'
// import Footer from '@/components/Footer'
import { Layout } from 'antd'
import Home from '@/pages/Home'
import Services from '@/pages/Services'
import Login from '@/pages/Login'
import SignUp from '@/pages/SignUp'
import Become from '@/pages/Become'
import Privacy from '@/pages/Privacy&CookiePolicy'
import TermsOfUse from '@/pages/TermsOfUse'
import BusinessCooperation from '@/pages/BusinessCooperation'
import Cooperate from '@/pages/Cooperate'
import Forget from '@/pages/Forget'
import Help from '@/pages/Help'
import ContactUs from '@/pages/ContactUs'
import MyAccount from '@/pages/MyAccount'
import MyOrders from '@/pages/MyOrders'
import Page404 from '@/pages/404'

import './index.scss'

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
        className='layout-main'
        style={{
          paddingTop: pathname === '/home' ? 0 : 125,
          minHeight: 'calc(100vh - 60px)',
        }}
      >
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
          <Route path='/home' component={Home} />
          <Route path='/services' component={Services}>
            {/* <Route path='/services:id' component={'1'} /> */}
          </Route>
          <Route path='/become' component={Become} />
          <Route path='/privacypolicy' component={Privacy} />
          <Route path='/terms' component={TermsOfUse} />
          <Route path='/business' component={BusinessCooperation} />
          <Route path='/cooperate' component={Cooperate} />
          <Route path='/forget' component={Forget} />
          <Route path='/help' component={Help} />
          <Route path='/contactus' component={ContactUs} />
          <Route path='/account' component={MyAccount} />
          <Route path='/Orders' component={MyOrders} />
          <Route path='/404' component={Page404} />
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
