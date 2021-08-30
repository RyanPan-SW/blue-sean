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

const loginType = { personal: '01', corporate: '02' }

const Login = ({ login, setLoginUser, history }) => {
  const [form] = Form.useForm()
  const [activeTab, setActiveTab] = useState(1)
  const [loginPersonError, setLoginPersonError] = useState(false)
  const [loginCorporateError, setLoginCorporateError] = useState(false)
  const [errormsg, setErrormsg] = useState('')
  const [hideRemeber, setHideRemeber] = useState(false)

  useEffect(() => {
    if (Cookies.get('type') === 'personal') {
      form.setFieldsValue({
        userName: Cookies.get('userName-personal'),
        password: Cookies.get('password-personal'),
        remember: Cookies.get('remember-personal'),
      })
    }
    if (Cookies.get('type') === 'corporate') {
      form.setFieldsValue({
        userName: Cookies.get('userName-corporate'),
        password: Cookies.get('password-corporate'),
        remember: Cookies.get('remember-corporate'),
      })
    }
  }, [form])

  useEffect(() => {
    if (getCookie('token')) {
      window.location.href = '/account'
    }
  }, [])

  const onFinishPersonal = (values) => {
    loginApi({ ...values, loginType: loginType['personal'] }).then((res) => {
      const { code, data, errmsg } = res
      if (values.remember) {
        Cookies.set('type', 'personal')
        Cookies.set('userName-personal', values.userName)
        Cookies.set('password-personal', values.password)
        Cookies.set('remember-personal', values.remember)
      } else {
        Cookies.remove('type', 'personal')
        Cookies.remove('userName-personal')
        Cookies.remove('password-personal')
        Cookies.remove('remember-personal')
      }
      if (code === '200' && data) {
        setCookie('token', data.token, values.remember ? 30 : 7)
        const loginUser = JSON.stringify(data.loginUser)
        localStorage.setItem('user', loginUser)
        history.push('/account')
      } else {
        setLoginPersonError(true)
        setErrormsg(errmsg)
        setHideRemeber(false)
      }
    })
  }

  const onFishCorporate = (values) => {
    const params = {
      password: values.password,
      userName: values.userName,
      loginType: loginType['corporate'],
    }
    loginApi(params).then((res) => {
      if (values.remember) {
        Cookies.set('type', 'corporate')
        Cookies.set('userName-corporate', values.userName)
        Cookies.set('password-corporate', values.password)
        Cookies.set('remember-corporate', values.remember)
      } else {
        Cookies.remove('type', 'corporate')
        Cookies.remove('userName-corporate')
        Cookies.remove('password-corporate')
        Cookies.remove('remember-corporate')
      }
      const { code, data, errmsg } = res
      if (code === '200') {
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
    <div className='login'>
      <div className='login-tabs'>
        <div
          className={activeTab === 1 ? 'active' : ''}
          onClick={() => {
            setActiveTab(1)
            setLoginPersonError(false)
            setHideRemeber(false)
          }}
        >
          Personal Account
        </div>
        <div
          className={activeTab === 2 ? 'active' : ''}
          onClick={() => {
            setActiveTab(2)
            setLoginPersonError(false)
            setHideRemeber(false)
          }}
        >
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

          <Form
            form={form}
            className='login-form'
            layout='vertical'
            onFinish={onFinishPersonal}
            onFinishFailed={() => {
              setHideRemeber(true)
            }}
          >
            <Form.Item
              label={<span className='label'>YOUR EMAIL</span>}
              name='userName'
              getValueFromEvent={(e) => {
                return e.target.value.replace(/\s+/g, '')
              }}
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: <FieldDom message='This field is required.' />,
                },
              ]}
            >
              <Input placeholder='Yourname@email.com' />
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
                iconRender={(visible) => (visible ? 'hide' : 'show')}
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
                        <b>Office Hours:</b> Monday – Friday 8:30am-5:00pm
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
                iconRender={(visible) => (visible ? 'hide' : 'show')}
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
      )}
    </div>
  )
}
const mapStateToProps = ({ user }) => ({
  isLogin: user.isLogin,
})
export default connect(mapStateToProps, UserActionCreator)(Login)
