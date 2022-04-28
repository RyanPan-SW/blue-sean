import React from 'react'
import { /* Route, Switch */, useLocation } from 'react-router-dom'
import FooterComponent from '@/components/Footer'
import PageHeader from '@/components/Header/Header'
import { Layout } from 'antd'
// import Home from '@/pages/Home'
// import Services from '@/pages/Services'
// import Login from '@/pages/Login'
// import SignUp from '@/pages/SignUp'
// import Become from '@/pages/Become'
// import Privacy from '@/pages/Privacy&CookiePolicy'
// import BusinessCooperation from '@/pages/BusinessCooperation'
// import Cooperate from '@/pages/Cooperate'
// import Forget from '@/pages/Forget'
// import Personal from '@/pages/Personal'
// import Help from '@/pages/Help'
// import Contact from '@/pages/Contact'
// import ContactUs from '@/pages/ContactUs'
// import MyAccount from '@/pages/MyAccount'
// import MyOrders from '@/pages/MyOrders'
// import MyAddress from '@/pages/MyAddress'
// import ChangePassword from '@/pages/ChangePassword'
// import Logout from '@/pages/LogOut'
// import Page404 from '@/pages/404/404'

// import DetailsView from '@/pages/DetailsView'
// import { Redirect } from 'react-router'
// import FileStep from '@/pages/FileStep'
// import ContractTerms from '@/pages/ContractTerms'
// import WebsiteTerms from '@/pages/WebsiteTerms'
import './index.scss'

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
        {this.props.children}
      </Layout.Content>

      <Layout.Footer style={{ padding: 0 }}>
        <FooterComponent />
      </Layout.Footer>
    </Layout>
  )
}

export default BaseLayout
