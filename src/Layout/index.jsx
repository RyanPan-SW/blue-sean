import React from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { Layout } from 'antd'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer'
import './index.scss'

function LayoutIndex(props) {
  const { children } = props
  const { Content } = Layout
  const { pathname } = useLocation()


  return (
    <Layout>
      <Header
        {...props}
        style={{
          height: 'auto',
          position: 'fixed',
          zIndex: 2,
          width: '100%',
          padding: 0,
          background: 'none',
        }}
      />
      <Content
        style={{
          // paddingTop: pathname === '/home' ? '-120px' : '120px',
          minHeight: 'calc(100vh - 60px)',
          background: '#FFF',
        }}
      >
        {children.map((item) => {
          return <Route path={item.path} component={item.component} key={item.path}></Route>
        })}
      </Content>
      <Footer />
    </Layout>
  )
}

export default LayoutIndex
