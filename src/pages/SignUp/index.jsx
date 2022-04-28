import React, { useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { Link } from 'react-router-dom'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { setCookie } from '@/helper/env'
import { signup } from '@/api/signup'
import { getCookie } from '@/helper/env'
import { errorCodeMessage } from '@/helper/error'
import './index.scss'
import LoadingSubmit from '@/components/LoadingSubmit'

function SignUp(props) {
  const [showError, setShowError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errormsg, setErrormsg] = useState('')
  const [hidenTip, setHidenTip] = useState(false)

  useEffect(() => {
    if (getCookie('token')) {
      props.history.push('/account')
    }
  })

  const onFinish = (values) => {
    setLoading(true)

    signup({ ...values }).then((res) => {
      const { code, data, errmsg } = res
      if (code !== '200') {
        console.log(errorCodeMessage[code])
        setErrormsg(errmsg)
        setShowError(true)
        setLoading(false)
        return
      }
      setShowError(false)
      setCookie('token', data.token)
      
      localStorage.setItem('user', JSON.stringify(data.loginUser))
      props.history.push('/personal')
      setLoading(false)
    })
  }

  const isRequire = (rule, value, fn) => {
    if (!value) {
      setHidenTip(true)
      fn('This field is required.')
    } else if (value.length < 6) {
      setHidenTip(true)
      fn(
        'Use a password of at least 6 characters. Suggest you include an uppercase letter, a lowercase letter, a number, and a special character',
      )
    } else if (value.length > 20) {
      setHidenTip(true)
      fn('Password can only be entered up to 20 characters.')
    } else {
      setHidenTip(false)
      fn()
    }
  }

  return (
    <div className='signup'>
      <div className='signup-content'>
        {showError && (
          <div className='message-error'>
            <ExclamationCircleFilled style={{ width: 16, color: '#A40000' }} />
            <span>{errormsg}</span>
          </div>
        )}

        <div className='signup-welcome'>SIGN UP FOR FREE</div>

        <div className='signup-personal'>
          <p>
            Please complete this form to create your personal account.Create an account and help you
            keep track of informed delivery.
          </p>
          <br />
          <span>Already have an account ?</span>
          <Link to='/login' className='signup-sgin'>
            Log in.
          </Link>
        </div>

        <Form
          className='signup-form'
          layout='vertical'
          onFinish={onFinish}
          onFinishFailed={() => setHidenTip(false)}
        >
          <Form.Item
            label={'YOUR EMAIL'}
            name='userName'
            getValueFromEvent={(e) => {
              return e.target.value.replace(/\s+/g, '')
            }}
            rules={[
              { required: true, type: 'email', message: 'Please enter a vaild email address.' },
            ]}
          >
            <Input placeholder='yourname@email.com' />
          </Form.Item>

          <div style={{ height: '120px' }}>
            <Form.Item
              label='PASSWORD'
              name='password'
              extra={
                hidenTip ? null : (
                  <p className='tips'>
                    Please use at least 6 characters. <b>Remember:</b> Passwords are case sensitive.
                  </p>
                )
              }
              getValueFromEvent={(e) => {
                return e.target.value.replace(/\s+/g, '')
              }}
              rules={[
                // { required: true, message: 'This field is required.' },
                // { min: 6, max: 20, message: passwordMsg.pattern },
                {
                  validator: (rule, value, fn) => {
                    isRequire(rule, value, fn)
                  },
                },
              ]}
            >
              <Input.Password
                autocomplete
                placeholder='Password'
                iconRender={(visible) =>
                  visible ? (
                    <span style={{ color: visible && '#b38948' }}>Hide</span>
                  ) : (
                    <span style={{ color: !visible && '#333' }}>Show</span>
                  )
                }
              />
            </Form.Item>
          </div>
          <br />
          <div>
            <p>
              <span>By pressing the Sign Up button below, you agree to our&nbsp;</span>
              <Link to='/website' target='_blank'>
                Terms of use
              </Link>
              <span> &nbsp;and&nbsp;</span>
              <Link to='/privacypolicy' target='_blank'>
                Privacy Policy
              </Link>
              .
            </p>
            <br />
            <Form.Item>
              {loading ? (
                <LoadingSubmit />
              ) : (
                <Button type='primary' htmlType='submit' className='signup-form-button'>
                  Sign Up
                </Button>
              )}
            </Form.Item>
          </div>
        </Form>

        {/* <Button onClick={signupClick}>登录</Button> */}
      </div>

      <p className='create'>
        <Link to='/cooperate'>Create an account</Link> for corporate
      </p>
    </div>
  )
}

export default SignUp
