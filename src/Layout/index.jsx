import React from 'react'
import { /* Redirect, */ useLocation } from 'react-router-dom'
import OpenPageLayout from './OpenPageLayout'
import AuthPageLayout from './AuthPageLayout'
import { isOpenPages } from '@/helper/env'

function BaseLayout(props) {
  const { children } = props
  const { pathname } = useLocation()
  // if (pathname === '/') {
  //   return <Redirect to='/home' />
  // }

  if (isOpenPages(pathname)) {
    return <OpenPageLayout>{children}</OpenPageLayout>
  }

  // if (pathname.search('/o/') > -1) {
  //   return <AuthPageLayout>{children}</AuthPageLayout>
  // }

  return <AuthPageLayout>{children}</AuthPageLayout>
}

export default BaseLayout
