import React from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { Layout, Affix } from 'antd'
import HomeHeader from '@/components/Header'
import OtherHeader from '@/components/OtherPageHeader'
// import Footer from '@/components/Footer'
import Home from '@/pages/Home'
import Services from '@/pages/Services'
import { Container } from 'react-bootstrap'

console.log(process.env.REACT_APP_BASEURL)

function BaseLayout() {
  const { pathname } = useLocation()
  if (pathname === '/') {
    return <Redirect to='/home' />
  }

  // return (
  //   <div className='App'>
  //     <Layout style={{ background: '#f8f8f8' }}>
  //       <Affix>{pathname.search('/home') > -1 ? <HomeHeader /> : <OtherHeader />}</Affix>
  //       <Layout.Content>
  //         <Switch>
  //           <Route path='/home' component={Home} />
  //           <Route path='/services' component={Services} />
  //         </Switch>
  //       </Layout.Content>
  //       {/* <Footer /> */}
  //     </Layout>
  //   </div>
  // )

  return (
    <>
      <HomeHeader />
      <div>
        <Switch>
          <Route path='/home' component={Home} />
          <Route path='/services' component={Services} />
        </Switch>
      </div>
    </>
  )
}

export default BaseLayout
