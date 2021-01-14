import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import NotFound from '@/pages/404'
import Login from '@/pages/Login'
import BaseLayout from '@/Layout'
import './App.css'

const App = () => {
  return (
    <Switch>
      <Route exact path='/' render={() => <Redirect to='/base/home' push />} />
      <Route path='/base' component={BaseLayout} />
      <Route path='/404' component={NotFound} />
      <Route path='/login' component={Login} />
      <Route component={NotFound} />
      <Route render={() => <Redirect to='/base/home' />} />
    </Switch>
  )
}

export default App
