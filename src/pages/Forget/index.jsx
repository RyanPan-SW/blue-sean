import React, { useState } from 'react'
import { Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import { ExclamationCircleFilled } from '@ant-design/icons'

import './index.scss'

function Forget() {
  const [type, setType] = useState('email')
  const [email, setEmail] = useState('')
  const sendEmail = (values) => {
    console.log('sendEmail', values)
    setEmail(values.email)
    setType('code')
  }
  const sendCode = (values) => {
    console.log('sendEmail', values)
  }

  return (
    <div>
      {type === 'email' && (
        <div className='forget-content'>
          <h4>FORGOT YOUR PASSWORD?</h4>

          <p>
            Enter your email address and we'll send you a code you can use to reset your password.
          </p>

          <Form layout='vertical' onFinish={sendEmail}>
            <Form.Item
              label='YOU EMAIL'
              name='email'
              rules={[{ type: 'email', message: 'Please enter a valid email address.' }]}
            >
              <Input placeholder='yourname@email.com' />
            </Form.Item>

            <Form.Item>
              <Button htmlType='submit' className='forget-continue'>
                Continue
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}

      {type === 'code' && (
        <div className='code-content'>
          <h4>ENTER THE CODE WE DENT TO</h4>
          <h4>{email}</h4>

          <p>
            We sent a 6-digit code to your email address.Enter that code to reset your password.
          </p>

          <Form layout='vertical' onFinish={sendCode}>
            <Form.Item
              label='6-Digit Code'
              name='code'
              rules={[
                {
                  required: true,
                  message: (
                    <>
                      <ExclamationCircleFilled style={{ color: 'red', marginTop: -1 }} />
                      <span>This field is required.</span>
                    </>
                  ),
                },
              ]}
            >
              <Input placeholder='yourname@email.com' />
            </Form.Item>
            <p>
              Didn't get the email? <Link to='/'>Send email again</Link>
            </p>

            <Form.Item>
              <Button htmlType='submit' className='forget-continue'>
                Continue
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  )
}

export default Forget
