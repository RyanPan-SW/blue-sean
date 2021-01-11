import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import NotFound from '@/pages/404'
import Login from '@/pages/Login'
import BaseLayout from '@/components/Layout/BaseLayout'
import './App.css'

const Page = () => {
  return (
    <>
      <Switch>
        <Route exact path='/' render={() => <Redirect to='/base/home' push />} />
        <Route path='/base' component={BaseLayout} />
        <Route path='/404' component={NotFound} />
        <Route path='/login' component={Login} />
        <Route component={NotFound} />
      </Switch>
    </>
  )
}

export default Page
