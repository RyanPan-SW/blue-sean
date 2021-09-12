import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, Checkbox, Popover } from 'antd'
import { loginApi } from '@/api/login'
import * as UserActionCreator from '@/store/actions/user'
import { Link } from 'react-router-dom'
import './index.scss'
import FieldDom from '@/components/Field'
import { getCookie, setCookie } from '@/helper/env'
import Cookies from 'js-cookie'
import Corporate from './Corporate'
import Personal from './Personal'

const loginType = { personal: '01', corporate: '02' }

const Login = ({ login, setLoginUser, history }) => {
  const [form] = Form.useForm()
  const [activeTab, setActiveTab] = useState(1)
  const [loginPersonError, setLoginPersonError] = useState(false)
  const [loginCorporateError, setLoginCorporateError] = useState(false)
  const [errormsg, setErrormsg] = useState('')
  const [hideRemeber, setHideRemeber] = useState(false)

  useEffect(() => {
    if (getCookie('token')) {
      window.location.href = '/account'
    }
  }, [])

  const changeTab = (key) => {
    setActiveTab(key)
    setLoginPersonError(false)
    setHideRemeber(false)
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
