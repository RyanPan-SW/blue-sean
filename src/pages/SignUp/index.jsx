import React, { useState } from 'react'
import { Button, Form, Input } from 'antd'
import { Link } from 'react-router-dom'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { /* emailMsg, passwordMsg, */ setCookie } from '@/helper/env'
import { signup } from '@/api/signup'
import { errorCodeMessage } from '@/helper/error'
import './index.scss'

function SignUp(props) {
  const [showError, setShowError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errormsg, setErrormsg] = useState('')
  const [hidenTip, setHidenTip] = useState(true)

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
      sessionStorage.setItem('user', JSON.stringify(data.loginUser))
      props.history.push('/personal')
      setLoading(false)
    })
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
              { required: true, type: 'email', message: 'This field is required.' },
              // { required: true, message: emailMsg.email },
            ]}
          >
            <Input placeholder='yourname@email.com' />
          </Form.Item>
          <Form.Item
            label='PASSWORD'
            name='password'
            getValueFromEvent={(e) => {
              return e.target.value.replace(/\s+/g, '')
            }}
            rules={[
              { required: true, message: 'This field is required.' },
              // { min: 6, max: 20, message: passwordMsg.pattern },
              // {
              //   pattern: patterns.pwd,
              //   message: passwordMsg.pattern,
              // },
            ]}
          >
            <Input.Password
              autocomplete
              placeholder='Password'
              iconRender={(visible) =>
                visible ? <span style={{ color: '#b38948' }}>hide</span> : 'show'
              }
            />
          </Form.Item>
          {hidenTip && (
            <p className='tips'>
              Please use at least 6 characters. <b>Remember:</b> Passwords are case sensitive.
            </p>
          )}
          <br />
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
            {!loading && (
              <Button type='primary' htmlType='submit' className='signup-form-button'>
                Sign Up
              </Button>
            )}

            {loading && (
              <Button type='primary' htmlType='submit' className='signup-form-loading'>
                <div className='signup-loading'>
                  <i></i>
                  <i></i>
                  <i></i>
                </div>
              </Button>
            )}
          </Form.Item>
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
