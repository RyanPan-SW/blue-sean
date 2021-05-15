import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, Checkbox, Popover } from 'antd'
import { loginApi } from '@/api/login'
import * as UserActionCreator from '@/store/actions/user'
import { Link } from 'react-router-dom'
import './index.scss'
import FieldDom from '@/components/Field'
import { setCookie } from '@/helper/env'

const loginType = { personal: '01', corporate: '02' }

const Login = ({ login, setLoginUser, history }) => {
  const [activeTab, setActiveTab] = useState(1)
  const [loginPersonError, setLoginPersonError] = useState(false)
  const [loginCorporateError, setLoginCorporateError] = useState(false)
  const [errormsg, setErrormsg] = useState('')

  useEffect(() => {})

  const changeTabs = (key) => {
    setActiveTab(key)
    console.log(key)
  }

  const onFinishPersonal = (values) => {
    loginApi({ ...values, loginType: loginType['personal'] }).then((res) => {
      const { code, data, errmsg } = res
      if (code === '200') {
        const token = data.token
        const loginUser = JSON.stringify(data.loginUser)
        setCookie(token)
        login()
        localStorage.setItem('user', loginUser)
        history.push('/account')
      } else {
        setLoginPersonError(true)
        setErrormsg(errmsg)
      }
    })
  }

  const onFishCorporate = (values) => {
    const params = {
      password: values.password,
      username: values.username,
      loginType: loginType['corporate'],
    }
    loginApi(params).then((res) => {
      const { code, data, errmsg } = res
      if (code === '200') {
        const token = data.token
        const loginUser = JSON.stringify(data.loginUser)
        setCookie(token)
        login()
        localStorage.setItem('user', loginUser)
        history.push('/account')
      } else {
        setLoginCorporateError(true)
        setErrormsg(errmsg)
      }
    })
  }

  return (
    <div className='login'>
      <div className='login-tabs'>
        <div className={activeTab === 1 ? 'active' : ''} onClick={() => changeTabs(1)}>
          Personal Account
        </div>
        <div className={activeTab === 2 ? 'active' : ''} onClick={() => changeTabs(2)}>
          Corporate Account
        </div>
      </div>

      {activeTab === 1 && (
        <div className='login-content'>
          {loginPersonError && <FieldDom border message={errormsg} />}

          <div className='login-welcome'>WELCOME BACK</div>

          <div className='login-personal'>
            <span>Don't have a personal account?</span>
            <Link to='/signup' className='login-sgin'>
              Sgin up.
            </Link>
          </div>

          <Form className='login-form' layout='vertical' onFinish={onFinishPersonal}>
            <Form.Item
              label={<span className='label'>YOUR EMAIL</span>}
              name='userName'
              rules={[
                {
                  required: true,
                  message: <FieldDom message='Please enter a valid email address.' />,
                },
              ]}
            >
              <Input placeholder='yourname@email.com' />
            </Form.Item>

            <Form.Item
              label={<span className='label'>PASSWORD</span>}
              name='password'
              rules={[{ required: true, message: <FieldDom /> }]}
            >
              <Input.Password placeholder='Password' />
            </Form.Item>

            <div>
              <b>Remember:</b> Passwords are case sensitive.
            </div>

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

              <Link to='/forget' className='login-form-forgot'>
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
              </Link>
            </Form.Item>

            <Form.Item>
              <Button type='primary' htmlType='submit' className='login-form-button'>
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}

      {activeTab === 2 && (
        <div className='login-content'>
          {loginCorporateError && <FieldDom border message={errormsg} />}

          <div className='login-welcome'>WELCOME BACK</div>

          <div className='login-personal'>
            <span>Don't have a corporate account?</span>
            {/* <span className='login-sgin'>Sgin up.</span> */}
            <Link to='/cooperate' className='login-sgin'>
              Sgin up.
            </Link>
          </div>

          <Form className='login-form' layout='vertical' onFinish={onFishCorporate}>
            <Form.Item
              label={<span className='label'>USERNAME</span>}
              name='username'
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input placeholder='yourname@email.com' />
            </Form.Item>

            <Form.Item
              label={<span className='label'>PASSWORD</span>}
              name='password'
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input.Password placeholder='Password' />
            </Form.Item>

            <div>
              <span>Remember:</span> Passwords are case sensitive.
            </div>

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

              <Link to='/forget' className='login-form-forgot'>
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
              </Link>
            </Form.Item>

            <Form.Item>
              <Button type='primary' htmlType='submit' className='login-form-button'>
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  )
}
const mapStateToProps = ({ user }) => ({
  isLogin: user.isLogin,
})
export default connect(mapStateToProps, UserActionCreator)(Login)
