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

function Corporate(props) {
  const { login, setLoginUser, history } = props

  const [form] = Form.useForm()
  const [activeTab, setActiveTab] = useState(1)
  const [loginPersonError, setLoginPersonError] = useState(false)
  const [loginCorporateError, setLoginCorporateError] = useState(false)
  const [errormsg, setErrormsg] = useState('')
  const [hideRemeber, setHideRemeber] = useState(false)

  useEffect(() => {
    let cookie = Cookies.get('corporate')
    if (cookie) {
      let corporate = JSON.parse(cookie)
      form.setFieldsValue({
        userName: corporate.userName,
        password: corporate.password,
        remember: corporate.remember,
      })
    }
  }, [form])


  const changePassword = (e) => {
    let value = e.target.value
    if (!value) {
      setHideRemeber(true)
    }
  }


  const onFishCorporate = (values) => {
    const params = {
      password: values.password,
      userName: values.userName,
      loginType: '02',
    }
    loginApi(params).then((res) => {
      const { code, data, errmsg } = res


      if (code === '200') {

        if (values.remember) {
          let corporate = { userName: values.userName, password: values.password, remember: values.remember }
          Cookies.set('corporate', corporate)
        } else {
          Cookies.remove('corporate')
        }

        if (values.remember) {
          setCookie('token', data.token, 30)
        } else {
          setCookie('token', data.token, 7)
        }

        const loginUser = JSON.stringify(data.loginUser)
        localStorage.setItem('user', loginUser)
        setLoginCorporateError(false)
        history.push('/account')
      } else {
        setLoginCorporateError(true)
        setErrormsg(errmsg)
        setHideRemeber(false)
      }
    })
  }

  return (
    <div className='login-content'>
      {loginCorporateError && <FieldDom border message={errormsg} />}

      <div className='login-welcome'>WELCOME BACK</div>

      <div className='login-personal'>
        <span>Don't have a corporate account?</span>
        <Link to='/cooperate' className='login-sgin'>
          Sgin up.
        </Link>
      </div>

      <Form
        form={form}
        className='login-form'
        layout='vertical'
        onFinish={onFishCorporate}
        onFinishFailed={() => {
          setHideRemeber(true)
        }}
      >
        <Form.Item
          label={<span className='label'>USERNAME</span>}
          name='userName'
          getValueFromEvent={(e) => {
            return e.target.value.replace(/\s+/g, '')
          }}
          rules={[{ required: true, message: <FieldDom /> }]}
        >
          <Input placeholder='Username@email.com' />
        </Form.Item>

        <Form.Item
          label={<span className='label'>PASSWORD</span>}
          name='password'
          getValueFromEvent={(e) => {
            return e.target.value.replace(/\s+/g, '')
          }}
          rules={[{ required: true, message: <FieldDom /> }]}
        >
          <Input.Password
            placeholder='Password'
            iconRender={(visible) => (visible ? <span style={{ color: '#b38948' }}>hide</span> : 'show')}
            onChange={changePassword}
          />
        </Form.Item>

        {!hideRemeber && (
          <div className='remember'>
            <b>Remember:</b> Passwords are case sensitive.
          </div>
        )}

        <Form.Item>
          <Form.Item
            name='remember'
            className='login-remmeber-forgot'
            valuePropName='checked'
            noStyle
            initialValue={false}
          >
            <Checkbox>Keep me log in</Checkbox>
          </Form.Item>

          <span /* to='/forget' */ className='login-form-forgot'>
            <Popover
              placement='right'
              content={
                <div className='forget-popover'>
                  <p>Please contact us, you can call or email us.</p>
                  <p>
                    <b>Email:</b> info@dcglobalsolutions.com.au
                  </p>
                  <p>
                    <b>PH:</b> 07 5649 8619
                  </p>
                  <p>
                    <b>Office </b>Hours: Monday – Friday 8:30am-5:00pm
                  </p>
                </div>
              }
              trigger='hover'
            >
              Forgot password?
            </Popover>

          </span>
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' className='login-form-button'>
            Log In
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Corporate