import React from 'react'
import { Switch, useLocation } from 'react-router-dom'
import { Layout, Affix } from 'antd'
import HomeHeader from '@/components/Header'
import OtherHeader from '@/components/OtherPageHeader'
// import Footer from '@/components/Footer'
import routesConfig from '@/router/routesConfig'
import { renderRoutes } from '@/router/renderRoutes'

console.log(process.env.REACT_APP_BASEURL)

function BaseLayout() {
  const { pathname } = useLocation()
  console.log(pathname.search('/base/home') > -1)

  return (
    <div className='App'>
      <Layout style={{ background: '#f8f8f8' }}>
        <Affix>{pathname.search('/base/home') > -1 ? <HomeHeader /> : <OtherHeader />}</Affix>
        <Layout.Content>
          <Switch>{renderRoutes(routesConfig)}</Switch>
        </Layout.Content>
        {/* <Footer /> */}
      </Layout>
    </div>
  )
}

export default BaseLayout
