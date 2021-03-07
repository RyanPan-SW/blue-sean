import React, { useState } from 'react'
import { Form, Input, Button, Modal } from 'antd'

import './index.scss'
import FieldDom from '@/components/Field'

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
              rules={[
                {
                  required: true,
                  message: <FieldDom />,
                },
                { type: 'email', message: 'Please enter a valid email address.' },
              ]}
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
                  message: <FieldDom />,
                },
              ]}
            >
              <Input placeholder='yourname@email.com' />
            </Form.Item>
            <span>
              Didn't get the email? <b>Send email again</b>
            </span>

            <Form.Item>
              <Button htmlType='submit' className='forget-continue'>
                Continue
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}

      {/* <Modal visible={true} cancelText={'Resend Code'} okText={'Try Again'}>
        That code doesn't work. Please try again.
      </Modal> */}

      <Modal visible={false}>
        <span>We resent a 6-digit code to your email address.</span>
        <br />
        <span>Please Check.</span>
      </Modal>
    </div>
  )
}

export default Forget
