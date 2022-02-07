import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as UserActionCreator from '@/store/actions/user'
import { getCookie } from '@/helper/env'
import Corporate from './Corporate'
import Personal from './Personal'

import './index.scss'

const Login = ({ login, setLoginUser, history }) => {
  const [activeTab, setActiveTab] = useState(1)

  useEffect(() => {
    if (getCookie('token')) {
      history.push('/account')
    }
    let activeT = +localStorage.getItem('active-tab')
    setActiveTab(activeT || 1)
  })

  const changeTab = (key) => {
    setActiveTab(key)
    localStorage.setItem('active-tab', key)
  }

  const Tabs = [
    { key: 1, title: 'Personal Account' },
    { key: 2, title: 'Corporate Account' },
  ]

  return (
    <div className='login'>
      <div className='login-tabs'>
        {Tabs.map((item, index) => {
          return (
            <div
              key={item.key}
              className={activeTab === item.key ? 'active' : ''}
              onClick={() => changeTab(item.key)}
            >
              {item.title}
            </div>
          )
        })}
      </div>

      {activeTab === 1 && <Personal history={history} />}

      {activeTab === 2 && <Corporate history={history} />}
    </div>
  )
}
const mapStateToProps = ({ user }) => ({
  isLogin: user.isLogin,
})
export default connect(mapStateToProps, UserActionCreator)(Login)
