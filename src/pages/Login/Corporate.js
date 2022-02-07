import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Checkbox, Popover, message } from 'antd'
import { CoprporateLogin } from '@/api/login'
import { Link } from 'react-router-dom'
import FieldDom from '@/components/Field'
import { getUrlParams, setCookie } from '@/helper/env'
import Cookies from 'js-cookie'
import LoadingSubmit from '@/components/LoadingSubmit'
import './index.scss'

function Corporate(props) {
  const { history } = props
  const { location: { search } } = history

  const [form] = Form.useForm()
  const [loginCorporateError, setLoginCorporateError] = useState(false)
  const [errormsg, setErrormsg] = useState('')
  const [hideRemeber, setHideRemeber] = useState(false)
  const [Loading, setLoading] = useState(false)

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


  const onFishCorporate = async (values) => {
    setLoading(true)
    try {
      const result = await CoprporateLogin({ ...values })
      const { code, data, msg } = result
      if (code === 0) {
        window.location.href = data.url
      } else {
        message.error(msg)
      }
    } finally {
      setLoading(false)
    }
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
          name='username'
          getValueFromEvent={(e) => {
            return e.target.value.replace(/\s+/g, '')
          }}
          rules={[{ required: true, message: <FieldDom /> }]}
        >
          <Input placeholder='Username' />
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
            iconRender={(visible) =>
              visible ? (
                <span style={{ color: visible && '#b38948' }}>Hide</span>
              ) : (
                <span style={{ color: !visible && '#333' }}>Show</span>
              )
            }
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
            name='rememberMe'
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
                    <b>Email:</b> info@dccgs.com.au
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
          {Loading ? (
            <LoadingSubmit className="loading" />
          ) : (
            <Button type='primary' htmlType='submit' className='login-form-button'>
              Log in
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  )
}

export default Corporate