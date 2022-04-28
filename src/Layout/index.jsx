import React from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { Layout } from 'antd'
import PageHeader from '@/components/Header/Header'
import FooterComponent from '@/components/Footer'
import './index.scss'

function LayoutIndex(props) {
  const { children } = props
  const { pathname } = useLocation()

  const { Header, Content, Footer } = Layout
  if (pathname === '/') {
    return <Redirect to='/' />
  }
  return (
    <Layout>
      <Header
        className='layout-header'
        style={{ height: '120px', background: 'transparent', padding: 0 }}
      >
        <PageHeader
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
      </Header>
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
      <Footer style={{ padding: 0 }}>
        <FooterComponent />
      </Footer>
    </Layout>
  )
}

export default LayoutIndex
