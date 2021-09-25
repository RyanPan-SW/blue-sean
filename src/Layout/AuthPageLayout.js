import React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import FooterComponent from '@/components/Footer'
import PageHeader from '@/components/Header/Header'
import { Layout } from 'antd'
import Home from '@/pages/Home'
import Services from '@/pages/Services'
import Login from '@/pages/Login'
import SignUp from '@/pages/SignUp'
import Become from '@/pages/Become'
import Privacy from '@/pages/Privacy&CookiePolicy'
import BusinessCooperation from '@/pages/BusinessCooperation'
import Cooperate from '@/pages/Cooperate'
import Forget from '@/pages/Forget'
import Personal from '@/pages/Personal'
import Help from '@/pages/Help'
import Contact from '@/pages/Contact'
import ContactUs from '@/pages/ContactUs'
import MyAccount from '@/pages/MyAccount'
import MyOrders from '@/pages/MyOrders'
import MyAddress from '@/pages/MyAddress'
import ChangePassword from '@/pages/ChangePassword'
import Logout from '@/pages/LogOut'
import Page404 from '@/pages/404/404'

import './index.scss'
import DetailsView from '@/pages/DetailsView'
// import { Redirect } from 'react-router'
import FileStep from '@/pages/FileStep'
import ContractTerms from '@/pages/ContractTerms'
import WebsiteTerms from '@/pages/WebsiteTerms'

function BaseLayout(props) {
  const { pathname } = useLocation()

  return (
    <Layout {...props}>
      <Layout.Header
        {...props}
        style={{
          height: 'auto',
          position: 'fixed',
          zIndex: 2,
          width: '100%',
          padding: 0,
          background: 'none',
        }}
      >
        <PageHeader {...props} />
      </Layout.Header>
      <Layout.Content
        className='layout-main'
        style={{
          paddingTop: pathname === '/home' ? 0 : 120,
          minHeight: 'calc(100vh - 60px)',
          background: '#FFF',
        }}
      >
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
          <Route path='/home' component={Home} />
          <Route path='/services/:id' component={Services} />
          <Route path='/become' component={Become} />
          <Route path='/business' component={BusinessCooperation} />
          <Route path='/cooperate' component={Cooperate} />
          <Route path='/personal' component={Personal} />
          <Route path='/forget' component={Forget} />
          <Route path='/help' component={Help} />
          <Route path='/contact' component={Contact} />
          <Route path='/contactus' component={ContactUs} />
          <Route path='/account' component={MyAccount} />
          <Route path='/orders' component={MyOrders} />
          <Route path='/detailsview/:id' component={DetailsView} />
          <Route path='/address' component={MyAddress} />
          <Route path='/changepassword' component={ChangePassword} />
          <Route path='/logOut' component={Logout} />
          <Route path='/filestep' component={FileStep} />

          <Route path='/privacypolicy' component={Privacy} />
          <Route path='/website' component={WebsiteTerms} />
          <Route path='/contract' component={ContractTerms} />

          <Route path='/notFound' component={Page404} />
          {/* <Redirect to='/home' /> */}
        </Switch>
      </Layout.Content>

      <Layout.Footer style={{ padding: 0 }}>
        <FooterComponent />
      </Layout.Footer>
    </Layout>
  )
}

export default BaseLayout
