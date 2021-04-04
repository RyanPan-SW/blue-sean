import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, Checkbox } from 'antd'
import { loginApi } from '@/api/login'
import * as UserActionCreator from '@/store/actions/user'
import { Link } from 'react-router-dom'
import './index.scss'
import FieldDom from '@/components/Field'
import { ExclamationCircleFilled } from '@ant-design/icons'

const Login = ({ login, history }) => {
  const [activeTab, setActiveTab] = useState(1)
  const [loginError, setLoginError] = useState(false)

  useEffect(() => {})

  const changeTabs = (key) => {
    setActiveTab(key)
    console.log(key)
  }

  const onFinish = (values) => {
    console.log('Received values of form: ', values)
    loginApi(values).then((res) => {
      let data = res.data
      if (data.verifySuccess) {
        history.push('/account')
      } else {
        setLoginError(true)
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
          {loginError && (
            <div className='login-error'>
              <ExclamationCircleFilled style={{ color: '#A40000' }} />
              <span>Incorrect email address or password.</span>
            </div>
          )}

          <div className='login-welcome'>WELCOME BACK</div>

          <div className='login-personal'>
            <span>Don't have a personal account?</span>
            <Link to='/signup' className='login-sgin'>
              Sgin up.
            </Link>
          </div>

          <Form
            // form={form}
            className='login-form'
            layout='vertical'
            onFinish={onFinish}
            // initialValues={{ requiredMark }}
            // onValuesChange={onRequiredTypeChange}
            // requiredMark={requiredMark}
          >
            <Form.Item
              label={<span className='label'>YOUR EMAIL</span>}
              name='username'
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
              >
                <Checkbox>Keep me log in</Checkbox>
              </Form.Item>

              <Link to='/forget' className='login-form-forgot'>
                Forgot password
              </Link>
            </Form.Item>

            <Form.Item>
              <Button type='primary' htmlType='submit' className='login-form-button'>
                Log in
              </Button>
            </Form.Item>
          </Form>
          {/* <Button onClick={loginClick}>登录</Button> */}
        </div>
      )}

      {activeTab === 2 && (
        <div className='login-content'>
          <div className='login-welcome'>WELCOME BACK</div>

          <div className='login-personal'>
            <span>Don't have a corporate account?</span>
            <span className='login-sgin'>Sgin up.</span>
          </div>

          <Form
            // form={form}
            className='login-form'
            layout='vertical'
            onFinish={onFinish}
            // initialValues={{ requiredMark }}
            // onValuesChange={onRequiredTypeChange}
            // requiredMark={requiredMark}
          >
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
              >
                <Checkbox>Keep me log in</Checkbox>
              </Form.Item>

              <Link to='/forget' className='login-form-forgot'>
                Forgot password
              </Link>
            </Form.Item>

            <Form.Item>
              <Button type='primary' htmlType='submit' className='login-form-button'>
                Log in
              </Button>
            </Form.Item>
          </Form>
          {/* <Button onClick={loginClick}>登录</Button> */}
        </div>
      )}
    </div>
  )
}
const mapStateToProps = ({ user }) => ({
  isLogin: user.isLogin,
})
export default connect(mapStateToProps, UserActionCreator)(Login)
