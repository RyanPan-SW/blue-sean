import React, { useState } from 'react'
import { Button, Form, Input /* message */ } from 'antd'
import { Link } from 'react-router-dom'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { emailMsg, passwordMsg } from '@/helper/env'
import { signup } from '@/api/signup'

import './index.scss'

function SignUp(props) {
  const [showError, setShowError] = useState(false)
  const [loading, setLoading] = useState(false)

  const onFinish = (values) => {
    console.log('Received values of form: ', values)

    setLoading(true)
    signup({ ...values }).then((res) => {
      console.log('signup res', res)
      if (res.code === 200) {
        setShowError(false)
        console.log(props)
      } else {
        setShowError(true)
        // message.success({
        //   content: 'This is a prompt message with custom className and style',
        //   className: 'custom-class',
        //   duration: 2,
        //   style: {
        //     marginTop: '20vh',
        //   },
        // })
      }
      setLoading(false)
    })
  }

  // const messageError = {
  //   2001: 'Email has already been registered.',
  //   2002: 'Use a password of at least 6 characters. Suggest you include an uppercase letter, a lowercase letter, a number, and a special character.',
  //   2003: 'Passwords can only be entered up to 20 characters.',
  // }

  return (
    <div className='signup'>
      <div className='signup-content'>
        {showError && (
          <div className='message-error'>
            <ExclamationCircleFilled style={{ color: '#A40000' }} />
            <span>Email has already been registered.</span>
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

        <Form className='signup-form' layout='vertical' onFinish={onFinish}>
          <Form.Item
            label={'YOUR EMAIL'}
            name='email'
            rules={[
              { type: 'email', message: emailMsg.email },
              { required: true, message: emailMsg.email },
            ]}
          >
            <Input placeholder='yourname@email.com' />
          </Form.Item>
          <Form.Item
            label={'PASSWORD'}
            name='password'
            rules={[
              { required: true, message: passwordMsg.required },
              { min: 6, max: 20, message: passwordMsg.pattern },
              // {
              //   pattern: patterns.pwd,
              //   message: passwordMsg.pattern,
              // },
            ]}
          >
            <Input.Password autocomplete placeholder='Password' />
          </Form.Item>
          {true && (
            <p>
              Please use at least 6 characters. <b>Remember:</b> Passwords are case sensitive.
            </p>
          )}
          <br />
          <p>
            <span>By pressing the Sign Up button below, you agree to our&nbsp;</span>
            <Link to='/terms' target='_blank'>
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
        <Link to='/business'>Create an account</Link> for corporate
      </p>
    </div>
  )
}

export default SignUp
