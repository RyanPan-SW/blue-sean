import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, Checkbox, Popover } from 'antd'
import { loginApi } from '@/api/login'
import { Link } from 'react-router-dom'
import './index.scss'
import FieldDom from '@/components/Field'
import { setCookie } from '@/helper/env'
import Cookies from 'js-cookie'
import values from 'postcss-modules-values'

function PerSonal(props) {
  const { history } = props

  const [form] = Form.useForm()
  const [loginPersonError, setLoginPersonError] = useState(false)
  const [loginCorporateError, setLoginCorporateError] = useState(false)
  const [errormsg, setErrormsg] = useState('')
  const [hideRemeber, setHideRemeber] = useState(false)


  useEffect(() => {
    let cookie = Cookies.get('personal')
    if (cookie) {
      let personal = JSON.parse(cookie)
      form.setFieldsValue({
        userName: personal.userName,
        password: personal.password,
        remember: personal.remember,
      })
    }
  }, [form])

  const changePassword = (e) => {
    let value = e.target.value
    if (!value) {
      setHideRemeber(true)
    }
  }

  const onFinishPersonal = (values) => {
    loginApi({ ...values, loginType: '01' }).then((res) => {
      const { code, data, errmsg } = res

      if (code === '200' && data) {
        if (values.remember) {
          let personal = { userName: values.userName, password: values.password, remember: values.remember }
          Cookies.set('personal', personal)
        } else {
          Cookies.remove('personal')
        }

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

  return (
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
              message: <FieldDom message='Please enter a valid email address.' />,
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
            Log In
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default PerSonal