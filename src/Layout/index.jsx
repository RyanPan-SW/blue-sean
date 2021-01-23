import React from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import OpenPageLayout from './OpenPageLayout'
import AuthPageLayout from './AuthPageLayout'
import { isOpenPages } from '@/helper/env'
// import { Container } from 'react-bootstrap'

console.log(process.env.REACT_APP_BASEURL)

function BaseLayout(props) {
  const { children } = props
  const { pathname } = useLocation()

  // if (pathname.search('/o/') > -1) {
  //   return <AuthPageLayout>{children}</AuthPageLayout>
  // }

  if (pathname === '/') {
    
    return <Redirect to='/home' />
  }

  if (isOpenPages(pathname)) {
    return <OpenPageLayout>{children}</OpenPageLayout>
  }

  return <AuthPageLayout>{children}</AuthPageLayout>
}

export default BaseLayout
