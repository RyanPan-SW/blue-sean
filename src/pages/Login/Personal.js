import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Checkbox } from 'antd'
import { loginApi } from '@/api/login'
import { Link } from 'react-router-dom'
import FieldDom from '@/components/Field'
import { getUrlParams, setCookie } from '@/helper/env'
import Cookies from 'js-cookie'
import LoadingSubmit from '@/components/LoadingSubmit'
import './index.scss'
import { decrypt, encrypt } from '@/utils/jsCrypto'

function PerSonal(props) {
  const { history } = props
  const { location: { search } } = history

  const [form] = Form.useForm()
  const [loginPersonError, setLoginPersonError] = useState(false)
  // const [loginCorporateError, setLoginCorporateError] = useState(false)
  const [errormsg, setErrormsg] = useState('')
  const [hideRemeber, setHideRemeber] = useState(false)
  const [Loading, setLoading] = useState(false)


  useEffect(() => {
    let userName = Cookies.get('userName')
    let password = Cookies.get('password')
    let remember = Cookies.get('remember')
    if (remember === 'true') {
      form.setFieldsValue({
        userName: userName, password: decrypt(password), remember: remember,
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
    setLoading(true)
    loginApi({ ...values, loginType: '01' }).then((res) => {
      const { code, data, errmsg } = res
      setLoading(false)
      if (code === '200' && data) {
        if (values.remember) {
          Cookies.set('userName', values.userName)
          Cookies.set('password', encrypt(values.password))
          Cookies.set('remember', values.remember)
        } else {
          Cookies.remove('userName')
          Cookies.remove('password')
          Cookies.set('remember', values.remember)
        }
        var t = new Date(new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0));
        setCookie('token', data.token, t)

        localStorage.setItem('user', JSON.stringify(data.loginUser))
        if (search && search.includes('from')) {
          history.push(`/${getUrlParams('from')}`)
        } else {
          history.push('/account')
        }
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
          validateTrigger="onBlur"
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
            iconRender={(visible) => (
              visible ? (
                <span style={{ color: visible && '#b38948' }}>Hide</span>
              ) : (
                <span style={{ color: !visible && '#333' }}>Show</span>
              )
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
            name='remember'
            className='login-remmeber-forgot'
            valuePropName='checked'
            noStyle
            initialValue={false}
          >
            <Checkbox>Keep me log in</Checkbox>
          </Form.Item>

          <Link to='/forget' className='login-form-forgot'>
            Forgot password?
          </Link>
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

export default PerSonal