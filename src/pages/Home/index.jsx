import React from 'react'
import { connect } from 'react-redux'
import * as UserActionCreator from '@/store/actions/user'

import { Layout } from 'antd'
import PageHeader from '@/components/Header/Header'
import FooterComponent from '@/components/Footer'
import Top from '@/pages/Home/component/Top'
import AboutUs from '@/pages/Home/component/AboutUs'
import ModalList from '@/pages/Home/component/OurServicer'
import JoinUs from '@/pages/Home/component/JoinUs'

import './index.css'

const { Header, Content, Footer } = Layout

const Home = (props) => {
  return (
    <Layout>
      <Header
        className='layout-header'
        style={{ height: '120px', background: 'transparent', padding: 0 }}
      >
        <PageHeader
          {...props}
          className
          // style={{
          //   height: 'auto',
          //   position: 'fixed',
          //   zIndex: 2,
          //   width: '100%',
          //   padding: 0,
          //   background: 'none',
          // }}
        />
      </Header>
      <Content
        style={{
          // paddingTop: pathname === '/' ? '-120px' : '120px',
          minHeight: 'calc(100vh - 60px)',
          background: '#FFF',
        }}
      >
        <Top />
        <AboutUs />
        <ModalList />
        <JoinUs />
      </Content>
      <Footer style={{ padding: 0 }}>
        <FooterComponent />
      </Footer>
    </Layout>
  )
}

const mapStateToProps = ({ user }) => ({
  isLogin: user.isLogin,
})

export default connect(mapStateToProps, UserActionCreator)(Home)
