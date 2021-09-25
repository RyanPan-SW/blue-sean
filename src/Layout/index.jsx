import React from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import OpenPageLayout from './OpenPageLayout'
import AuthPageLayout from './AuthPageLayout'
import { isOpenPages } from '@/helper/env'

function LayoutIndex(props) {
  const { children } = props
  const { pathname } = useLocation()
  if (pathname === '/') {
    return <Redirect to='/home' />
  }

  if (isOpenPages(pathname)) {
    return <OpenPageLayout {...props}>{children}</OpenPageLayout>
  }

  // if (pathname.search('/o/') > -1) {
  //   return <AuthPageLayout>{children}</AuthPageLayout>
  // }

  return <AuthPageLayout {...props}>{children}</AuthPageLayout>
}

export default LayoutIndex
